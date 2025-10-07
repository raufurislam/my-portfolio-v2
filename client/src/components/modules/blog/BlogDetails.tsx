"use client";

import Image from "next/image";
import { Calendar, Eye, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";

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
  const [displayViews, setDisplayViews] = useState<number>(blog.views ?? 0);

  // Sanitize HTML content for security
  const sanitizedContent = DOMPurify.sanitize(blog.content, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "strong",
      "em",
      "u",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "a",
      "img",
      "blockquote",
      "pre",
      "code",
    ],
    ALLOWED_ATTR: ["href", "src", "alt", "title", "class", "style"],
  });

  useEffect(() => {
    if (!blog?._id) return;
    const sessionKey = `viewed-blog-${blog._id}`;
    const hasViewed =
      typeof window !== "undefined" && sessionStorage.getItem(sessionKey);
    if (hasViewed) return;

    // Optimistically update views instantly
    setDisplayViews((v) => v + 1);

    // Persist in background
    const persist = async () => {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/blog/${blog._id}/view`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slug: blog.title, increment: 1 }),
          }
        );
        sessionStorage.setItem(sessionKey, "1");
      } catch (err) {
        // Soft fail: keep optimistic value
        console.log(err);
      }
    };
    persist();
  }, [blog?._id, blog?.title]);

  return (
    <article className="max-w-5xl mx-auto px-4 py-12">
      {/* Hero */}
      <div className="relative w-full overflow-hidden rounded-3xl border bg-card">
        <div className="relative h-72 md:h-[420px]">
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="flex flex-wrap gap-2 mb-3">
              {blog.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center rounded-full bg-primary/90 text-primary-foreground px-2.5 py-0.5 text-[10px] font-semibold shadow"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
              {blog.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Meta */}
      <div className="mt-6 flex flex-wrap items-center gap-6 text-muted-foreground text-sm">
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
        <div className="flex items-center gap-2" aria-live="polite">
          <Eye className="h-4 w-4" /> {displayViews} views
        </div>
      </div>

      {/* Content and aside */}
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-4 gap-10">
        <div className="lg:col-span-3">
          <div
            className="prose prose-lg max-w-none dark:prose-invert [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mb-3 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mb-2 [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-lg"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        </div>

        {/* Aside */}
        <aside className="lg:col-span-1 space-y-6">
          <div className="rounded-2xl border p-5">
            <h3 className="text-sm font-semibold mb-3">On this page</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Introduction</li>
              <li>Key points</li>
              <li>Conclusion</li>
            </ul>
          </div>

          <div className="rounded-2xl border p-5">
            <h3 className="text-sm font-semibold mb-3">Share</h3>
            <div className="flex gap-2">
              <a
                className="text-xs rounded-full border px-3 py-1 hover:bg-muted"
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  blog.title
                )}&url=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.href : ""
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                Twitter
              </a>
              <a
                className="text-xs rounded-full border px-3 py-1 hover:bg-muted"
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  typeof window !== "undefined" ? window.location.href : ""
                )}`}
                target="_blank"
                rel="noreferrer"
              >
                Facebook
              </a>
            </div>
          </div>

          <div className="rounded-2xl border p-5">
            <h3 className="text-sm font-semibold mb-3">Related</h3>
            <ul className="space-y-3 text-sm">
              {blog.tags.slice(0, 3).map((tag) => (
                <li key={tag}>
                  <Link
                    className="text-muted-foreground hover:text-primary"
                    href={`/blogs?tag=${encodeURIComponent(tag)}`}
                  >
                    #{tag}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </article>
  );
}
