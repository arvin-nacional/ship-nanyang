import { Schema, models, model, Document } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  coverImage: string;
  coverImagePosition: string;
  author: string;
  status: "draft" | "published";
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String, default: "" },
    category: { type: String, required: true },
    tags: [{ type: String }],
    coverImage: { type: String, default: "" },
    coverImagePosition: { type: String, default: "center center" },
    author: { type: String, default: "Admin" },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

const Blog = models.Blog || model<IBlog>("Blog", BlogSchema);

export default Blog;
