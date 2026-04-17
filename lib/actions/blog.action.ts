"use server";

import Blog from "@/database/blog.model";
import dbConnect from "../mongoose";
import { revalidatePath } from "next/cache";
import { FilterQuery } from "mongoose";

const PAGE_SIZE = 6;

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export async function createBlog(params: {
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  coverImage: string;
  coverImagePosition: string;
  author: string;
  status: "draft" | "published";
}) {
  try {
    await dbConnect();

    const baseSlug = generateSlug(params.title);
    let slug = baseSlug;
    let count = 1;

    while (await Blog.findOne({ slug })) {
      slug = `${baseSlug}-${count++}`;
    }

    const publishedAt =
      params.status === "published" ? new Date() : undefined;

    await Blog.create({ ...params, slug, publishedAt });

    revalidatePath("/admin/blogs");
    revalidatePath("/blog");
  } catch (error) {
    console.error("createBlog error:", error);
    throw error;
  }
}

export async function updateBlog(params: {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  coverImage: string;
  coverImagePosition: string;
  author: string;
  status: "draft" | "published";
}) {
  try {
    await dbConnect();

    const { id, ...rest } = params;
    const existing = await Blog.findById(id);
    if (!existing) throw new Error("Blog not found");

    if (rest.status === "published" && !existing.publishedAt) {
      (rest as typeof rest & { publishedAt?: Date }).publishedAt = new Date();
    }

    await Blog.findByIdAndUpdate(id, { $set: rest });

    revalidatePath("/admin/blogs");
    revalidatePath("/blog");
    revalidatePath(`/blog/${existing.slug}`);
  } catch (error) {
    console.error("updateBlog error:", error);
    throw error;
  }
}

export async function deleteBlog(id: string) {
  try {
    await dbConnect();
    const blog = await Blog.findByIdAndDelete(id);

    revalidatePath("/admin/blogs");
    revalidatePath("/blog");
    if (blog) revalidatePath(`/blog/${blog.slug}`);
  } catch (error) {
    console.error("deleteBlog error:", error);
    throw error;
  }
}

export async function getBlogById(id: string) {
  try {
    await dbConnect();
    const blog = await Blog.findById(id).lean();
    return JSON.parse(JSON.stringify(blog));
  } catch (error) {
    console.error("getBlogById error:", error);
    throw error;
  }
}

export async function getBlogBySlug(slug: string) {
  try {
    await dbConnect();
    const blog = await Blog.findOne({ slug, status: "published" }).lean();
    return JSON.parse(JSON.stringify(blog));
  } catch (error) {
    console.error("getBlogBySlug error:", error);
    throw error;
  }
}

export async function getAllBlogs(params: {
  searchQuery?: string;
  filter?: string;
  page?: number;
  pageSize?: number;
  status?: string;
}) {
  try {
    await dbConnect();

    const {
      searchQuery,
      filter,
      page = 1,
      pageSize = PAGE_SIZE,
      status,
    } = params;

    const skip = (page - 1) * pageSize;

    const query: FilterQuery<typeof Blog> = {};

    if (status) {
      query.status = status;
    }

    if (filter && filter !== "all") {
      query.category = filter;
    }

    if (searchQuery) {
      query.$or = [
        { title: { $regex: searchQuery, $options: "i" } },
        { excerpt: { $regex: searchQuery, $options: "i" } },
        { tags: { $in: [new RegExp(searchQuery, "i")] } },
      ];
    }

    const totalCount = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    const isNext = totalCount > skip + blogs.length;

    return {
      blogs: JSON.parse(JSON.stringify(blogs)),
      isNext,
      totalCount,
    };
  } catch (error) {
    console.error("getAllBlogs error:", error);
    throw error;
  }
}

export async function getPublishedBlogs(params: {
  searchQuery?: string;
  filter?: string;
  page?: number;
}) {
  return getAllBlogs({ ...params, status: "published", pageSize: PAGE_SIZE });
}
