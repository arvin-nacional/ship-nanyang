import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getAllBlogs } from "@/lib/actions/blog.action";
import BlogCard from "@/components/BlogCard";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import Pagination from "@/components/shared/search/Pagination";
import { SearchParamsProps } from "@/types";
import { PenSquare } from "lucide-react";
import { BLOG_CATEGORIES } from "@/components/forms/BlogForm";
import AdminBlogFilter from "@/components/shared/search/AdminBlogFilter";

const page = async ({ searchParams }: SearchParamsProps) => {
  const resolvedParams = await searchParams;

  const result = await getAllBlogs({
    searchQuery: resolvedParams.q,
    filter: resolvedParams.filter,
    page: resolvedParams.page ? +resolvedParams.page : 1,
    status: resolvedParams.status,
  });

  return (
    <div className="w-full p-12 max-sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <p className="h2-semibold text-primary-500">Blog Posts</p>
        <Link href="/admin/blogs/add">
          <Button className="bg-primary-500 text-light-900 flex items-center gap-2">
            <PenSquare size={16} />
            New Post
          </Button>
        </Link>
      </div>

      {/* Search + Filters */}
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <LocalSearchbar
          route="/admin/blogs"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search blog posts..."
          otherClasses="flex-1 min-w-[200px]"
        />
        <AdminBlogFilter
          route="/admin/blogs"
          categories={BLOG_CATEGORIES}
        />
      </div>

      {/* Stats */}
      <div className="flex gap-4 mb-6 text-sm text-slate-500">
        <span>{result.totalCount} total post{result.totalCount !== 1 ? "s" : ""}</span>
      </div>

      {/* Blog Grid */}
      {result.blogs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400">
          <PenSquare size={48} className="mb-4 opacity-30" />
          <p className="text-lg font-medium">No blog posts yet</p>
          <p className="text-sm mt-1">Create your first post to get started.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {result.blogs.map((blog: any) => (
            <BlogCard
              key={blog._id}
              {...blog}
              showActions={true}
            />
          ))}
        </div>
      )}

      <div className="mt-10">
        <Pagination
          pageNumber={resolvedParams?.page ? +resolvedParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </div>
  );
};

export default page;
