import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { BlogServices } from "./blog.service";
import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";

const createBlog = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as JwtPayload;
  const blogData = req.body;

  const blog = await BlogServices.createBlog(blogData, user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Blog created successfully",
    data: blog,
  });
});

const getBlogBySlug = catchAsync(async (req: Request, res: Response) => {
  const blog = await BlogServices.getBlogBySlug(req.params.slug);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog fetched successfully",
    data: blog,
  });
});

const getAllBlogsScroll = catchAsync(async (req: Request, res: Response) => {
  const blogs = await BlogServices.getAllBlogsScroll(
    req.query as Record<string, string>
  );

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blogs fetched successfully",
    data: blogs,
  });
});

const updateBlog = catchAsync(async (req: Request, res: Response) => {
  const blogs = await BlogServices.updateBlog(req.params.id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blogs updated successfully",
    data: blogs,
  });
});

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
  const blogs = await BlogServices.deleteBlog(req.params.id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Blog deleted successfully",
    data: blogs,
  });
});

const getFeaturedBlogs = catchAsync(async (req: Request, res: Response) => {
  const blogs = await BlogServices.getFeaturedBlogs();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Featured blogs retrieved successfully",
    data: blogs,
  });
});

export const BlogControllers = {
  createBlog,
  getBlogBySlug,
  getAllBlogsScroll,
  updateBlog,
  deleteBlog,
  getFeaturedBlogs,
};
