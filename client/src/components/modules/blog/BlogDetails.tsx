"use client";

import Image from "next/image";
import { Calendar, Eye, User } from "lucide-react";

interface BlogDetailsProps {
  blog: {
    _id: string;
    title: string;
    content: string;
    thumbnail: string;
    tags: string[];
    author: {
      name: string;
      email: string;
    };
    views: number;
    createdAt: string;
  };
}

export default function BlogDetails({ blog }: BlogDetailsProps) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      {/* Thumbnail / Hero */}
      <div className="relative w-full h-72 md:h-96 mb-8 overflow-hidden rounded-2xl shadow-md">
        <Image
          src={blog.thumbnail}
          alt={blog.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
        {blog.title}
      </h1>

      {/* Metadata */}
      <div className="flex flex-wrap items-center gap-6 text-muted-foreground text-sm mb-8">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span className="font-medium text-foreground">
            {blog.author.name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          {new Date(blog.createdAt).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4" /> {blog.views} views
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-10">
        {blog.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="prose prose-lg max-w-none dark:prose-invert">
        {blog.content}
      </div>
    </article>
  );
}
