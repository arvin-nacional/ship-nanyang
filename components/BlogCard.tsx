import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Tag, User } from "lucide-react";

interface BlogCardProps {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  coverImage: string;
  author: string;
  status: string;
  publishedAt: string;
  createdAt: string;
  showActions?: boolean;
  onDelete?: (id: string) => void;
}

const BlogCard = ({
  _id,
  title,
  slug,
  excerpt,
  category,
  tags,
  coverImage,
  author,
  publishedAt,
  createdAt,
  showActions = false,
  status,
}: BlogCardProps) => {
  const displayDate = publishedAt || createdAt;
  const formatted = displayDate
    ? new Date(displayDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";

  return (
    <div className="group flex flex-col rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
      {/* Cover Image */}
      <Link href={showActions ? `/admin/blogs/${_id}/edit` : `/blog/${slug}`}>
        <div className="relative h-48 w-full bg-gradient-to-br from-red-50 to-slate-100 overflow-hidden cursor-pointer">
          {coverImage ? (
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Image
                src="/assets/icons/new-logo-english-colored.png"
                width={120}
                height={48}
                alt="SD Express"
                className="opacity-30"
              />
            </div>
          )}
          {/* Category badge */}
          <span className="absolute top-3 left-3 bg-primary-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {category}
          </span>
          {showActions && (
            <span
              className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full ${
                status === "published"
                  ? "bg-green-500 text-white"
                  : "bg-yellow-400 text-dark-500"
              }`}
            >
              {status === "published" ? "Published" : "Draft"}
            </span>
          )}
        </div>
      </Link>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <Link href={showActions ? `/admin/blogs/${_id}/edit` : `/blog/${slug}`}>
          <h3 className="text-dark-500 font-bold text-lg leading-snug line-clamp-2 hover:text-primary-500 transition-colors cursor-pointer">
            {title}
          </h3>
        </Link>

        {excerpt && (
          <p className="text-sm text-slate-500 line-clamp-3 leading-relaxed">
            {excerpt}
          </p>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full"
              >
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <User size={12} />
            <span>{author}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Calendar size={12} />
            <span>{formatted}</span>
          </div>
        </div>

        {/* Admin action buttons */}
        {showActions && (
          <div className="flex gap-2 pt-2">
            <Link
              href={`/admin/blogs/${_id}/edit`}
              className="flex-1 text-center text-sm py-2 rounded-lg border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white transition-colors"
            >
              Edit
            </Link>
            <Link
              href={`/blog/${slug}`}
              target="_blank"
              className="flex-1 text-center text-sm py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Preview
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCard;
