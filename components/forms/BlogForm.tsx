"use client";

import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
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
import { BlogSchema } from "@/lib/validations";
import { createBlog, updateBlog } from "@/lib/actions/blog.action";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export const BLOG_CATEGORIES = [
  "Shipping Tips",
  "Company News",
  "Industry Updates",
  "How-to Guides",
  "Logistics Insights",
];

interface Props {
  blogDetails?: string;
}

const BlogForm = ({ blogDetails }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  const parsed = blogDetails ? JSON.parse(blogDetails) : null;

  const form = useForm<z.infer<typeof BlogSchema>>({
    resolver: zodResolver(BlogSchema),
    defaultValues: {
      title: parsed?.title || "",
      content: parsed?.content || "",
      excerpt: parsed?.excerpt || "",
      category: parsed?.category || "",
      tags: parsed?.tags?.join(", ") || "",
      coverImage: parsed?.coverImage || "",
      coverImagePosition: parsed?.coverImagePosition || "center center",
      author: parsed?.author || "Admin",
      status: parsed?.status || "draft",
    },
  });

  const onSubmit = (values: z.infer<typeof BlogSchema>) => {
    startTransition(async () => {
      try {
        const tagsArray = values.tags
          ? values.tags
              .split(",")
              .map((t) => t.trim())
              .filter(Boolean)
          : [];

        if (parsed?._id) {
          await updateBlog({
            id: parsed._id,
            title: values.title,
            content: values.content,
            excerpt: values.excerpt || "",
            category: values.category,
            tags: tagsArray,
            coverImage: values.coverImage || "",
            coverImagePosition: values.coverImagePosition || "center center",
            author: values.author,
            status: values.status,
          });
          toast({ title: "Blog updated successfully" });
        } else {
          await createBlog({
            title: values.title,
            content: values.content,
            excerpt: values.excerpt || "",
            category: values.category,
            tags: tagsArray,
            coverImage: values.coverImage || "",
            coverImagePosition: values.coverImagePosition || "center center",
            author: values.author,
            status: values.status,
          });
          toast({ title: "Blog created successfully" });
        }

        router.push("/admin/blogs");
      } catch {
        toast({
          title: "Something went wrong",
          description: "Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Title <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Input
                  className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  placeholder="Enter blog title"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* Excerpt */}
        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Excerpt{" "}
                <span className="text-slate-400 text-sm font-normal">
                  (short summary, max 300 chars)
                </span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Textarea
                  className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[80px] border resize-none"
                  placeholder="Brief description shown on the blog listing page"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* Content */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <FormLabel className="paragraph-semibold text-dark400_light800">
                Content <span className="text-primary-500">*</span>
              </FormLabel>
              <FormControl className="mt-3.5">
                <Textarea
                  className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[360px] border resize-y"
                  placeholder="Write your blog content here..."
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Category <span className="text-primary-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="mt-3.5">
                    <SelectTrigger className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {BLOG_CATEGORIES.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Author */}
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Author <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Input
                    className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    placeholder="Author name"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tags */}
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Tags{" "}
                  <span className="text-slate-400 text-sm font-normal">
                    (comma-separated)
                  </span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Input
                    className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    placeholder="e.g. shipping, logistics, tips"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Status */}
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Status <span className="text-primary-500">*</span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="mt-3.5">
                    <SelectTrigger className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>

        {/* Cover Image URL + Position */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="coverImage"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Cover Image URL{" "}
                  <span className="text-slate-400 text-sm font-normal">
                    (optional)
                  </span>
                </FormLabel>
                <FormControl className="mt-3.5">
                  <Input
                    className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                    placeholder="https://example.com/image.jpg"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="coverImagePosition"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Image Focus Point{" "}
                  <span className="text-slate-400 text-sm font-normal">
                    (optional)
                  </span>
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="mt-3.5">
                    <SelectTrigger className="paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border">
                      <SelectValue placeholder="Select focus point" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="center center">Middle</SelectItem>
                    <SelectItem value="center top">Top</SelectItem>
                    <SelectItem value="center bottom">Bottom</SelectItem>
                    <SelectItem value="left top">Top Left</SelectItem>
                    <SelectItem value="right top">Top Right</SelectItem>
                    <SelectItem value="left bottom">Bottom Left</SelectItem>
                    <SelectItem value="right bottom">Bottom Right</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4 justify-end mt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-primary-500 text-light-900 min-w-[140px]"
            disabled={isPending}
          >
            {isPending
              ? "Saving..."
              : parsed?._id
              ? "Update Blog"
              : "Create Blog"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BlogForm;
