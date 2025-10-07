"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Calendar,
  Eye,
  MoreVertical,
  Edit,
  Trash2,
  ExternalLink,
  User,
} from "lucide-react";
import EditBlogModal from "./EditBlogModal";
import DeleteBlogDialog from "./DeleteBlogDialog";
import DOMPurify from "dompurify";

interface BlogCardProps {
  blog: {
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
    isPublished: boolean;
    isFeatured: boolean;
  };
  onBlogUpdate?: () => void;
}

export default function BlogCardManage({ blog, onBlogUpdate }: BlogCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Strip HTML tags for preview text
  const previewText = DOMPurify.sanitize(blog.content, {
    ALLOWED_TAGS: [],
  }).substring(0, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group rounded-2xl border bg-card shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
    >
      {/* Thumbnail */}
      <Link href={`/blogs/${blog.slug}`} className="relative block w-full">
        <div className="relative h-52 w-full overflow-hidden">
          <Image
            src={blog.thumbnail}
            alt={blog.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={false}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          {/* Status Badges */}
          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            {blog.isFeatured && (
              <span className="inline-flex items-center rounded-full bg-yellow-500/90 text-yellow-900 px-2.5 py-0.5 text-[10px] font-semibold shadow-sm">
                Featured
              </span>
            )}
            {!blog.isPublished && (
              <span className="inline-flex items-center rounded-full bg-orange-500/90 text-orange-900 px-2.5 py-0.5 text-[10px] font-semibold shadow-sm">
                Draft
              </span>
            )}
          </div>

          {/* Tags */}
          <div className="absolute right-4 top-4 flex flex-wrap gap-2">
            {blog.tags.slice(0, 2).map((tag) => (
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
        <Link href={`/blogs/${blog.slug}`}>
          <h3 className="text-lg md:text-xl font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {blog.title}
          </h3>
        </Link>

        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
          {previewText}...
        </p>

        <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-6 items-center rounded-full bg-muted px-2 font-medium text-foreground">
              <User className="w-3 h-3 mr-1" />
              {blog.author.name}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {new Date(blog.createdAt).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" /> {blog.views}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-4 flex items-center justify-between">
          <Link
            href={`/blogs/${blog.slug}`}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm transition-colors duration-200"
          >
            View Details
            <ExternalLink className="w-4 h-4" />
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsEditModalOpen(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Blog
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setIsDeleteDialogOpen(true)}
                className="text-red-600 focus:text-red-600"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Blog
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Modals */}
      <EditBlogModal
        blog={blog}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={() => {
          onBlogUpdate?.();
          setIsEditModalOpen(false);
        }}
      />

      <DeleteBlogDialog
        blog={blog}
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onSuccess={() => {
          onBlogUpdate?.();
          setIsDeleteDialogOpen(false);
        }}
      />
    </motion.div>
  );
}
