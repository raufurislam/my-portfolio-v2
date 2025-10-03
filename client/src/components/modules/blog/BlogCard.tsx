"use client";

import Link from "next/link";
import Image from "next/image";
import { Calendar, Eye } from "lucide-react";

export interface BlogCardProps {
  post: {
    _id: string;
    title: string;
    content: string;
    thumbnail: string;
    slug: string;
    tags: string[];
    author: {
      name: string;
      email: string;
    };
    views: number;
    createdAt: string;
  };
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="group rounded-2xl border bg-card shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
      {/* Thumbnail */}
      <Link href={`/blogs/${post.slug}`} className="relative block h-48 w-full">
        <Image
          src={post.thumbnail}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <Link href={`/blogs/${post.slug}`}>
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>

        {/* Description */}
        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
          {post.content}
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-4 text-sm text-muted-foreground border-t">
          <div className="flex items-center gap-2">
            <span className="font-medium text-foreground">
              {post.author.name}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(post.createdAt).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" /> {post.views}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
