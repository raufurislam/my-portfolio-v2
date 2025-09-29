import { JwtPayload } from "jsonwebtoken";
import { IBlog } from "./blog.interface";
import { Blog } from "./blog.model";

const createBlog = async (payload: IBlog, decodedToken: JwtPayload) => {
  return await Blog.create(payload);
};

export const BlogServices = { createBlog };
