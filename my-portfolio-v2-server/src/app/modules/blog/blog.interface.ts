// blog.interface.ts
import { Types } from "mongoose";

export interface IBlog {
  _id?: string;
  title: string;
  slug: string;
  content: string;
  thumbnail?: string;
  tags?: string[];
  author: Types.ObjectId;
  views: number;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
