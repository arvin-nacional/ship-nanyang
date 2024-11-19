import { ObjectId } from "mongoose";

export interface SidebarLink {
  imgURL: string;
  label: string;
  route: string;
}

export interface SolutionsCardProps {
  id: number;
  icon: string;
  title: string;
  content: string;
}
export interface ProcessCardProps {
  id: number;
  icon: string;
  title: string;
  content: string;
}

export interface SearchParamsProps {
  searchParams?: { [key: string]: string | undefined };
}

export interface FilterParamsProps {
  filterParams?: { [key: string]: string | undefined };
}
export interface ParamsProps {
  params: { id: string };
}

export interface RelatedPostsProps {
  tagIds: ObjectId[];
  currentPostId: string;
}

export interface UrlQueryParams {
  params: string;
  key: string;
  value: string | null;
}

export interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export interface TagProps {
  _id: string | undefined;
  name: string;
  posts: ObjectId[];
  description?: string;
  createdOn?: Date;
}

export interface BlogCardProps {
  title: string;
  image: string;
  date: string;
  link: string;
  content: string;
  _id?: string;
  tags: TagProps[];
}
export interface CategoryProps {
  _id: ObjectId;
  name: string;
  projects: ObjectId[];
}
export interface ProjectCardProps {
  title: string;
  image: string;
  date: string;
  content: string;
  _id: string;
  category: CategoryProps[];
}
export interface ImageProps {
  src: string;
  alt: string;
  _id: ObjectId;
}

export interface PostProps {
  title: string;
  image: string;
  date: string;
  link: string;
  content: string;
  _id: string;
  tags: TagProps[];
  createdAt: string;
}
