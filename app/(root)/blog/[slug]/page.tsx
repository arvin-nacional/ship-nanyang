import React from "react";
import { getBlogBySlug, getPublishedBlogs } from "@/lib/actions/blog.action";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Calendar, User, Tag, ArrowLeft, Folder } from "lucide-react";
import RequestQuoteSection from "@/components/RequestQuoteSection";
import BlogCard from "@/components/BlogCard";

type tParams = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: tParams }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  if (!blog) return { title: "Blog Post Not Found" };
  return {
    title: blog.title,
    description: blog.excerpt,
  };
}

const page = async ({ params }: { params: tParams }) => {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) notFound();

  const displayDate = blog.publishedAt || blog.createdAt;
  const formatted = displayDate
    ? new Date(displayDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  // Get related posts (same category, exclude current)
  const related = await getPublishedBlogs({ filter: blog.category, page: 1 });
  const relatedBlogs = related.blogs
    .filter((b: any) => b._id !== blog._id)
    .slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section
        className="relative pt-36 pb-12 px-5 overflow-hidden"
        style={
          blog.coverImage
            ? {
                backgroundImage: `url(${blog.coverImage})`,
                backgroundSize: "cover",
                backgroundPosition: blog.coverImagePosition || "center center",
              }
            : {}
        }
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 ${
            blog.coverImage
              ? "bg-primary-500/85"
              : "bg-primary-500"
          }`}
        />
        <div className="relative z-10 max-w-[1200px] mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-white/20 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
              <Folder size={11} />
              {blog.category}
            </span>
          </div>
          <h1 className="h1-bold text-white mb-4 leading-tight">{blog.title}</h1>
          {blog.excerpt && (
            <p className="paragraph-regular text-white/80 max-w-2xl">
              {blog.excerpt}
            </p>
          )}
          <div className="flex flex-wrap gap-5 mt-6 text-sm text-white/60">
            <span className="flex items-center gap-1.5">
              <User size={14} />
              {blog.author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              {formatted}
            </span>
          </div>
        </div>
      </section>


      {/* Content */}
      <section className="py-14 px-5 bg-white">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-12">
          {/* Main content */}
          <article className="flex-1 min-w-0">
            <div className="prose max-w-none text-dark-400 leading-relaxed whitespace-pre-wrap text-base">
              {blog.content}
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-gray-100">
                <span className="text-sm text-slate-400 flex items-center gap-1 mr-1">
                  <Tag size={14} /> Tags:
                </span>
                {blog.tags.map((tag: string) => (
                  <Link
                    key={tag}
                    href={`/blog?q=${encodeURIComponent(tag)}`}
                    className="text-sm bg-slate-100 text-slate-600 px-3 py-1 rounded-full hover:bg-primary-500 hover:text-white transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </article>

          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="sticky top-24 flex flex-col gap-6">
              {/* Author card */}
              <div className="rounded-2xl border border-gray-100 p-5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Written by
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center">
                    <User size={20} className="text-primary-500" />
                  </div>
                  <div>
                    <p className="font-semibold text-dark-500">{blog.author}</p>
                    <p className="text-xs text-slate-400">SD Express Team</p>
                  </div>
                </div>
              </div>

              {/* Category */}
              <div className="rounded-2xl border border-gray-100 p-5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Category
                </p>
                <Link
                  href={`/blog?filter=${encodeURIComponent(blog.category)}`}
                  className="inline-flex items-center gap-2 text-primary-500 hover:underline font-medium text-sm"
                >
                  <Folder size={14} />
                  {blog.category}
                </Link>
              </div>

              {/* Share */}
              <div className="rounded-2xl border border-gray-100 p-5">
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Share
                </p>
                <div className="flex gap-2">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      `https://shipnanyang.com/blog/${slug}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center text-sm py-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors font-medium"
                  >
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related Posts */}
      {relatedBlogs.length > 0 && (
        <section className="py-14 px-5 bg-gray-50">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="h2-semibold text-dark-500 mb-8">
              More in{" "}
              <span className="text-primary-500">{blog.category}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedBlogs.map((related: any) => (
                <BlogCard key={related._id} {...related} />
              ))}
            </div>
          </div>
        </section>
      )}

      <RequestQuoteSection variant="default" />
    </div>
  );
};

export default page;
