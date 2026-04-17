import BlogForm from "@/components/forms/BlogForm";
import React from "react";

const page = () => {
  return (
    <div className="w-full p-12 max-sm:p-6">
      <p className="h2-semibold text-primary-500 mb-2">Create New Blog Post</p>
      <p className="paragraph-regular text-dark-400 mb-8">
        Fill in the details below to publish a new blog post.
      </p>
      <div className="rounded-2xl bg-white shadow-sm border border-gray-100 p-8 max-sm:p-5">
        <BlogForm />
      </div>
    </div>
  );
};

export default page;
