import { JwtPayload } from "jsonwebtoken";
import { IBlog } from "./blog.interface";
import { Blog } from "./blog.model";
import { QueryBuilder } from "../../utils/QueryBuilderManual";
import { blogSearchableFields } from "./blog.constant";
import { QueryBuilderScroll } from "../../utils/QueryBuilderScroll";

const createBlog = async (payload: IBlog, user: JwtPayload) => {
  const existingBlog = await Blog.findOne({ title: payload.title });

  if (existingBlog) {
    throw new Error("A Blog with this title already exists.");
  }

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

const getAllBlogsScroll = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilderScroll(
    Blog.find({ isPublished: true }),
    query
  );

  const blogs = await queryBuilder
    .search(blogSearchableFields)
    .filter()
    .sort()
    .fields()
    .paginate()
    .build()
    .populate("author", "name email avatar");

  return blogs;
};

export const BlogServices = { createBlog, getBlogBySlug, getAllBlogsScroll };
