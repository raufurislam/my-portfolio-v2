import { Document, Schema } from "mongoose";

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  technologies: string[];
  github?: {
    frontend?: string;
    backend?: string;
    monorepo?: string;
  };
  liveUrl?: string;
  thumbnail?: string;
  screenshots?: string[];
  author: Schema.Types.ObjectId;
  views: number;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
