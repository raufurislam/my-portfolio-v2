export interface IProject {
  _id: string;
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
  author: string;
  views: number;
  isFeatured: boolean;
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IBlog {
  _id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  thumbnail?: string;
  author: string;
  tags: string[];
  isPublished: boolean;
  views: number;
  createdAt?: string;
  updatedAt?: string;
}
