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
    <div className="group rounded-2xl border bg-card shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
      {/* Thumbnail */}
      <Link href={`/blogs/${post.slug}`} className="relative block w-full">
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={post.thumbnail}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-primary/90 text-primary-foreground px-2.5 py-0.5 text-[10px] font-semibold shadow-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <Link href={`/blogs/${post.slug}`}>
          <h3 className="text-lg md:text-xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>

        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
          {post.content}
        </p>

        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-6 items-center rounded-full bg-muted px-2 font-medium text-foreground">
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
