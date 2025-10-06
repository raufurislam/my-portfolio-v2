import { Types } from "mongoose";

export interface IBlog {
  _id?: Types.ObjectId;
  title: string;
  slug: string;
  content: string;
  thumbnail?: string;
  tags?: string[];
  author: Types.ObjectId; // reference to User model
  views?: number;
  isFeatured?: boolean;
  isPublished?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
