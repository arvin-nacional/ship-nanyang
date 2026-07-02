import React from "react";
import { getPublishedBlogs } from "@/lib/actions/blog.action";
import BlogCard from "@/components/BlogCard";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import Pagination from "@/components/shared/search/Pagination";
import BlogCategoryFilter from "@/components/shared/search/BlogCategoryFilter";
import RequestQuoteSection from "@/components/RequestQuoteSection";
import { SearchParamsProps } from "@/types";
import { BLOG_CATEGORIES } from "@/components/forms/BlogForm";
import { BookOpen } from "lucide-react";

const page = async ({ searchParams }: SearchParamsProps) => {
  const resolvedParams = await searchParams;

  const result = await getPublishedBlogs({
    searchQuery: resolvedParams.q,
    filter: resolvedParams.filter,
    page: resolvedParams.page ? +resolvedParams.page : 1,
  });

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-50 to-white pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="h1-bold mb-4 text-dark-500">Blog</h1>
            <p className="paragraph-regular text-dark-400">
              Stay informed with the latest news, shipping tips, and industry
              insights from the Ship Nanyang Team.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-5 bg-gray-50 min-h-[60vh]">
        <div className="max-w-[1200px] mx-auto">
          {/* Search + Filter */}
          <div className="flex flex-col items-center gap-5 mb-10">
            <div className="w-full max-w-2xl">
              <LocalSearchbar
                route="/blog"
                iconPosition="left"
                imgSrc="/assets/icons/search.svg"
                placeholder="Search articles..."
                otherClasses="w-full bg-white"
              />
            </div>
            <div className="flex justify-center w-full">
              <BlogCategoryFilter categories={BLOG_CATEGORIES} />
            </div>
          </div>

          {/* Results count */}
          {result.totalCount > 0 && (
            <p className="text-sm text-slate-400 mb-6">
              {result.totalCount} article{result.totalCount !== 1 ? "s" : ""}{" "}
              found
            </p>
          )}

          {/* Blog Grid */}
          {result.blogs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-slate-400">
              <BookOpen size={56} className="mb-4 opacity-30" />
              <p className="text-xl font-medium">No articles found</p>
              <p className="text-sm mt-1">Try adjusting your search or filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {result.blogs.map((blog: any) => (
                <BlogCard key={blog._id} {...blog} />
              ))}
            </div>
          )}

          <div className="mt-12">
            <Pagination
              pageNumber={resolvedParams?.page ? +resolvedParams.page : 1}
              isNext={result.isNext}
            />
          </div>
        </div>
      </section>

      <RequestQuoteSection variant="default" />
    </div>
  );
};

export default page;
