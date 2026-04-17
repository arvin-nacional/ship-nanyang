import BlogForm from "@/components/forms/BlogForm";
import DeleteBlogButton from "@/components/DeleteBlogButton";
import { getBlogById } from "@/lib/actions/blog.action";
import React from "react";

type tParams = Promise<{ id: string }>;

const page = async ({ params }: { params: tParams }) => {
  const { id } = await params;
  const blog = await getBlogById(id);

  if (!blog) {
    return (
      <div className="w-full p-12 max-sm:p-6">
        <p className="h2-semibold text-primary-500">Blog post not found.</p>
      </div>
    );
  }

  return (
    <div className="w-full p-12 max-sm:p-6">
      <div className="flex items-center justify-between mb-2">
        <p className="h2-semibold text-primary-500">Edit Blog Post</p>
        <DeleteBlogButton id={id} />
      </div>
      <p className="paragraph-regular text-dark-400 mb-8">
        Update the details below to modify this blog post.
      </p>
      <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-8 max-sm:p-5">
        <BlogForm blogDetails={JSON.stringify(blog)} />
      </div>
    </div>
  );
};

export default page;
