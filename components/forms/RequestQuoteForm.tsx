"use client";

import React, { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RequestQuoteFormSchema } from "@/lib/validations";
import emailjs from '@emailjs/browser';
import { uploadMultipleFilesToS3 } from '@/lib/aws/s3-upload';
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  type?: string;
}

// INCOTERMS options
const incotermsOptions = [
  "EXW - Ex Works",
  "FCA - Free Carrier",
  "CPT - Carriage Paid To",
  "CIP - Carriage and Insurance Paid To",
  "DAP - Delivered at Place",
  "DPU - Delivered at Place Unloaded",
  "DDP - Delivered Duty Paid",
  "FAS - Free Alongside Ship",
  "FOB - Free on Board",
  "CFR - Cost and Freight",
  "CIF - Cost, Insurance and Freight",
];

// Shipment type options
const shipmentTypeOptions = [
  "Air Freight",
  "Sea Freight - FCL",
  "Sea Freight - LCL",
  "Express Courier",
  "Road Transport",
  "Rail Transport",
];

const RequestQuoteForm = ({ type }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof RequestQuoteFormSchema>>({
    resolver: zodResolver(RequestQuoteFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      companyName: "",
      position: "",
      email: "",
      contactNumber: "",
      incoterms: "",
      cargoDescription: "",
      expectedShippingDate: "",
      cityPortOrigin: "",
      destination: "",
      shipmentType: "",
      files: [],
      comments: "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files) {
      const fileArray = Array.from(files);

    // Check for .exe files
    if (fileArray.some(f => f.name.toLowerCase().endsWith('.exe'))) {
      toast({
        title: "File Upload Error",
        description: "Executable files (.exe) are not allowed for security reasons.",
        variant: "destructive",
      });
      event.target.value = '';
      return;
    }
      setSelectedFiles(fileArray);
      form.setValue("files", fileArray);
    }
  };

  async function onSubmit(data: z.infer<typeof RequestQuoteFormSchema>) {
    startTransition(async () => {
      try {
        // Get current date and time
        const now = new Date();
        const requestDate = now.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
        const requestTime = now.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        });

        // Upload files to S3 if any
        let filesText = 'No files attached';
        
        if (selectedFiles.length > 0) {
          setIsUploading(true);
          toast({
            title: "Uploading Files",
            description: `Uploading ${selectedFiles.length} file(s) to cloud storage...`,
          });

          console.log('Starting file upload to S3...');
          const uploadResult = await uploadMultipleFilesToS3(selectedFiles);
          console.log('S3 upload result:', uploadResult);
          
          setIsUploading(false);

          if (uploadResult.success && uploadResult.uploadedFiles.length > 0) {
            // Create file links for email with clickable HTML URLs
            filesText = uploadResult.uploadedFiles
              .map(file => `<div style="margin-bottom: 8px;"><a href="${file.url}" target="_blank" style="color: #28a745; text-decoration: none; font-weight: 500;">📎 ${file.name}</a> <span style="color: #666; font-size: 10px;">(Click to download)</span></div>`)
              .join('');
            
            console.log('Files uploaded successfully:', uploadResult.uploadedFiles);
          } else if (uploadResult.failedFiles.length > 0) {
            
            // Some files failed to upload
            const failedFileNames = uploadResult.failedFiles.map(f => f.name).join(', ');
            toast({
              title: "Upload Failed",
              description: `Failed to upload files: ${failedFileNames}. Please try again or contact us directly.`,
              variant: "destructive",
            });
            return;
          }
        }

        // Prepare template parameters
        const templateParams = {
          firstName: data.firstName,
          lastName: data.lastName,
          companyName: data.companyName,
          position: data.position,
          email: data.email,
          contactNumber: data.contactNumber,
          incoterms: data.incoterms,
          cargoDescription: data.cargoDescription,
          expectedShippingDate: data.expectedShippingDate,
          cityPortOrigin: data.cityPortOrigin,
          destination: data.destination,
          shipmentType: data.shipmentType,
          files: filesText,
          comments: data.comments || 'No additional comments',
          requestDate: requestDate,
          requestTime: requestTime,
        };

        console.log('Sending email with params:', templateParams);

        // Show sending status
        toast({
          title: "Sending Request",
          description: "Sending quote request...",
        });

        // Send email using EmailJS
        const result = await emailjs.send(
          "service_obc6w4q",
          "template_l6dliau",
          templateParams,
          "Z4Wr91i_WWVhaZz0j"
        );

        console.log('EmailJS result:', result);

        if (result.status === 200) {
          toast({
            title: "Success!",
            description: "Quote request submitted successfully! We will get back to you within 24 hours.",
          });
          
          // Reset form on success
          form.reset();
          setSelectedFiles([]);
        } else {
          throw new Error('Failed to send email');
        }

      } catch (error) {
        console.error('Error submitting quote request:', error);
        toast({
          title: "Error",
          description: "Failed to submit quote request. Please try again or contact us directly.",
          variant: "destructive",
        });
      } finally {
        setIsUploading(false);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-5"
      >
        {/* Progress Message */}
        {(isUploading || isPending) && (
          <div className="p-4 rounded-lg border bg-blue-50 border-blue-200 text-blue-800">
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-800"></div>
              {isUploading ? "Uploading files..." : "Submitting..."}
            </div>
          </div>
        )}

        {/* Personal Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-dark400_light800">
            Personal Information
          </h3>
          
          <div className="flex flex-row gap-5 max-sm:flex-col">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    First Name <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Input
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Last Name <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Input
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-row gap-5 max-sm:flex-col">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Company Name <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Input
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Position <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Input
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-row gap-5 max-sm:flex-col">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Email Address <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Input
                      type="email"
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactNumber"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Contact Number <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Input
                     type="number"
                     step="0.01"
                     min="0"
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Cargo Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-dark400_light800">
            Cargo Information
          </h3>

          <div className="flex flex-row gap-5 max-sm:flex-col">
            <FormField
              control={form.control}
              name="incoterms"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    INCOTERMS <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border">
                        <SelectValue placeholder="Select INCOTERMS" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px] overflow-y-auto background-light900_dark300">
                        {incotermsOptions.map((incoterm) => (
                          <SelectItem 
                            key={incoterm} 
                            value={incoterm} 
                            className="cursor-pointer focus:bg-light-700 dark:focus:bg-dark-400"
                          >
                            {incoterm}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shipmentType"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Shipment Type <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border">
                        <SelectValue placeholder="Select Shipment Type" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px] overflow-y-auto background-light900_dark300">
                        {shipmentTypeOptions.map((type) => (
                          <SelectItem 
                            key={type} 
                            value={type} 
                            className="cursor-pointer focus:bg-light-700 dark:focus:bg-dark-400"
                          >
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="cargoDescription"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Cargo Description <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Textarea
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[100px] border resize-none"
                    placeholder="Please describe your cargo in detail..."
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <div className="flex flex-row gap-5 max-sm:flex-col">
            <FormField
              control={form.control}
              name="expectedShippingDate"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Expected Shipping Date <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Input
                      type="date"
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <div className="w-full"></div>
          </div>

          <div className="flex flex-row gap-5 max-sm:flex-col">
            <FormField
              control={form.control}
              name="cityPortOrigin"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    City/Port of Origin <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Input
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      placeholder="e.g., Shanghai, Guangzhou, Shenzhen"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="destination"
              render={({ field }) => (
                <FormItem className="flex w-full flex-col">
                  <FormLabel className="paragraph-semibold text-dark400_light800">
                    Destination <span className="text-primary-500">*</span>
                  </FormLabel>
                  <FormControl className="mt-3.5">
                    <Input
                      className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                      placeholder="e.g., Manila, Cebu, Davao"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* File Upload Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-dark400_light800">
            Supporting Documents
          </h3>
          
          <div className="flex w-full flex-col">
            <label className="paragraph-semibold text-dark400_light800 mb-3">
              Upload Files (Optional)
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border rounded-md p-3 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-500 file:text-white hover:file:bg-primary-400"
              accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
              disabled={isUploading || isPending}
            />
            {selectedFiles.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-dark400_light800">Selected files:</p>
                <ul className="text-sm text-dark300_light700">
                  {selectedFiles.map((file, index) => (
                    <li key={index}>• {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Comments Section */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Comments or Questions (Optional)
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Textarea
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[120px] border resize-none"
                    placeholder="Please share any additional information, special requirements, or questions..."
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="bg-primary-500 hover:bg-primary-400 w-fit !text-light-900"
          disabled={isPending || isUploading}
        >
          {isUploading ? "Uploading files..." : isPending ? "Submitting..." : "Submit Quote Request"}
        </Button>
      </form>
    </Form>
  );
};

export default RequestQuoteForm;
