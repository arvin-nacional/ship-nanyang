"use client";

import React, { useTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "../ui/form";
import { PaymentSchema } from "@/lib/validations";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { submitPayment } from "@/lib/actions/order.action";
import { toast } from "@/hooks/use-toast";

interface Props {
  orderId: string;
  paymentDetails?: string;
}

const Payment = ({ orderId, paymentDetails }: Props) => {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const parsedPaymentDetails = paymentDetails
    ? JSON.parse(paymentDetails || "")
    : null;

  const [previewImages, setPreviewImages] = useState(
    parsedPaymentDetails ? parsedPaymentDetails : []
  );

  const form = useForm<z.infer<typeof PaymentSchema>>({
    resolver: zodResolver(PaymentSchema),
    defaultValues: {
      images: previewImages,
    },
  });

  // Handle multiple images and convert them to strings
  const handleMultipleImageChange = (files: FileList) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.onerror = reject;
        fileReader.readAsDataURL(readFile);
      });

    const promises = Array.from(files).map((file) => reader(file));

    Promise.all(promises).then((results: string[]) => {
      setPreviewImages((prevImages: any) => [
        ...prevImages,
        ...results.map((result, index) => ({
          alt: files[index]?.name,
          src: result,
          _id: Math.floor(Math.random() * 1000).toString(),
        })),
      ]);
    });
  };

  // removeImagefromListButton
  const handleRemoveImageFromList = (item: string) => {
    const updatedImages = previewImages.filter(
      (image: any) => image.src !== item
    );
    setPreviewImages(updatedImages);
  };

  async function onSubmit(values: z.infer<typeof PaymentSchema>) {
    startTransition(async () => {
      try {
        if (previewImages.length === 0) {
          toast({
            title: "No Images",
            description: "Please upload at least one payment image.",
          });
          return;
        }
        await submitPayment({
          orderId,
          paymentImages: previewImages,
          path: pathname,
        });
        toast({
          title: "Payment Submitted",
          description: "Payment will be reviewed by the admin. Thank you!",
        });
      } catch (error) {
        console.log(error);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-10"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex w-full flex-row gap-5 overflow-x-scroll">
          {previewImages &&
            previewImages.map((item: any) => (
              <TooltipProvider key={item._id}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Image
                      src={item.src}
                      height={300}
                      width={120}
                      alt="receipt"
                    />
                  </TooltipTrigger>
                  <TooltipContent className="background-light900_dark300">
                    <p
                      onClick={() => handleRemoveImageFromList(item.src)}
                      className="text-dark400_light800  cursor-pointer"
                    >
                      Remove
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
        </div>
        <FormField
          control={form.control}
          name="images"
          render={({ field: { onChange, value, ...rest } }) => (
            <>
              <FormItem>
                <FormLabel className="paragraph-semibold">
                  Payment Photo <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    {...rest}
                    multiple // Allow multiple file selection
                    onChange={(e) => {
                      // @ts-ignore
                      handleMultipleImageChange(e.target.files);
                    }}
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border align-baseline"
                  />
                </FormControl>
                <FormDescription className="body-regular mt-2.5 text-light-500">
                  Maximum size of 10mb.
                </FormDescription>
                <FormMessage className="text-red-500" />
              </FormItem>
            </>
          )}
        />
        <Button
          type="submit"
          className="w-fit rounded-3xl bg-primary-500 px-10 !text-light-900 mt-2"
          disabled={isPending}
        >
          {isPending ? "Saving" : "Save"}
        </Button>
      </form>
    </Form>
  );
};

export default Payment;
