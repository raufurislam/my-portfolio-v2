import { JwtPayload } from "jsonwebtoken";
import { IBlog } from "./blog.interface";
import { Blog } from "./blog.model";

const createBlog = async (payload: IBlog, user: JwtPayload) => {
  // Slug will be generated in model pre('validate') based on title
  const blog = await Blog.create({
    ...payload,
    author: user.userId,
  });
  return blog;
};

const getBlogBySlug = async (slug: string) => {
  const blog = await Blog.findOneAndUpdate(
    { slug },
    { $inc: { views: 1 } }, // increment views
    { new: true }
  ).populate("author", "name email avatar");
  return blog;
};

const getAllBlogs = async () => {
  return await Blog.find({ isPublished: true })
    .sort({ createdAt: -1 })
    .populate("author", "name email avatar");
};

export const BlogServices = { createBlog, getBlogBySlug, getAllBlogs };
