"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import QuillEditor from "@/components/ui/quill-editor";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createBlog } from "@/services/BlogServices";
import { toast } from "sonner";
import {
  Loader2,
  Plus,
  X,
  ArrowLeft,
  Save,
  Eye,
  FileText,
  Tag,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const createBlogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(1, "Content is required"),
  thumbnail: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  tags: z.array(z.string().min(1, "Tag cannot be empty")),
  isFeatured: z.boolean(),
  isPublished: z.boolean(),
});

type CreateBlogFormData = z.infer<typeof createBlogSchema>;

export default function AddBlog() {
  const router = useRouter();
  const { isLoading: authLoading } = useAuth();
  // const { user, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateBlogFormData>({
    resolver: zodResolver(createBlogSchema),
    defaultValues: {
      title: "",
      content: "",
      thumbnail: "",
      tags: [],
      isFeatured: false,
      isPublished: false,
    },
  });

  const watchedTags = watch("tags") || [];
  const watchedData = watch();

  // Redirect if not authenticated
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // if (!user) {
  //   router.push("/login");
  //   return null;
  // }

  const addTag = () => {
    if (newTag.trim() && !watchedTags.includes(newTag.trim())) {
      setValue("tags", [...watchedTags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (index: number) => {
    const updated = watchedTags.filter((_, i) => i !== index);
    setValue("tags", updated);
  };

  const onSubmit = async (data: CreateBlogFormData) => {
    setIsLoading(true);
    try {
      // Clean up empty strings and undefined values
      const cleanedData = {
        ...data,
        thumbnail: data.thumbnail || undefined,
        tags: data.tags?.length ? data.tags : undefined,
      };

      await createBlog(cleanedData);
      toast.success("Blog created successfully!");
      router.push("/dashboard/blogs");
    } catch (error: unknown) {
      console.error("Error creating blog:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to create blog. Please try again.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/dashboard/blogs" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Blogs
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Create New Blog Post
              </h1>
              <p className="text-muted-foreground mt-2">
                Write and publish your blog content
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setPreviewMode(!previewMode)}
            >
              <Eye className="w-4 h-4 mr-2" />
              {previewMode ? "Edit Mode" : "Preview Mode"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Basic Information
                  </CardTitle>
                  <CardDescription>
                    Provide the essential details about your blog post
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Blog Title *</Label>
                    <Input
                      id="title"
                      {...register("title")}
                      placeholder="Enter blog title"
                    />
                    {errors.title && (
                      <p className="text-sm text-red-500">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="thumbnail">Thumbnail URL</Label>
                    <Input
                      id="thumbnail"
                      {...register("thumbnail")}
                      placeholder="https://example.com/thumbnail.jpg"
                    />
                    {errors.thumbnail && (
                      <p className="text-sm text-red-500">
                        {errors.thumbnail.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Content */}
              <Card>
                <CardHeader>
                  <CardTitle>Blog Content</CardTitle>
                  <CardDescription>
                    Write your blog post content using the rich text editor
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="content">Content *</Label>
                    <QuillEditor
                      value={watchedData.content || ""}
                      onChange={(value) => setValue("content", value)}
                      placeholder="Write your blog content here..."
                    />
                    {errors.content && (
                      <p className="text-sm text-red-500">
                        {errors.content.message}
                      </p>
                    )}
                  </div>

                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <h4 className="font-medium text-sm mb-2">
                      Editor Features:
                    </h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>
                        • <strong>Bold</strong>, <em>italic</em>, and{" "}
                        <u>underline</u> text formatting
                      </li>
                      <li>• Headings (H1, H2, H3) for structure</li>
                      <li>• Bullet and numbered lists</li>
                      <li>• Insert links and images by URL</li>
                      <li>• Text alignment (left, center, right)</li>
                      <li>• Blockquotes and code blocks</li>
                      <li>• Clear formatting option</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="w-5 h-5" />
                    Tags
                  </CardTitle>
                  <CardDescription>
                    Add relevant tags to categorize your blog post
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      placeholder="Add tag (e.g., React, Tutorial)"
                      onKeyPress={(e) =>
                        e.key === "Enter" && (e.preventDefault(), addTag())
                      }
                    />
                    <Button type="button" onClick={addTag} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {watchedTags.map((tag, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => removeTag(index)}
                          className="hover:text-red-500 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                  {errors.tags && (
                    <p className="text-sm text-red-500">
                      {errors.tags.message}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Blog Settings</CardTitle>
                  <CardDescription>
                    Configure how your blog post appears
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isFeatured"
                      {...register("isFeatured")}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="isFeatured">Featured Blog Post</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isPublished"
                      {...register("isPublished")}
                      className="rounded border-gray-300"
                    />
                    <Label htmlFor="isPublished">Published</Label>
                  </div>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  <Save className="w-4 h-4 mr-2" />
                  Create Blog Post
                </Button>
              </div>
            </form>
          </div>

          {/* Preview Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>
                  See how your blog post will appear
                </CardDescription>
              </CardHeader>
              <CardContent>
                {previewMode ? (
                  <div className="space-y-4">
                    {watchedData.thumbnail && (
                      <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                        <Image
                          src={watchedData.thumbnail}
                          alt="Blog thumbnail"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div>
                      <h3 className="font-semibold text-lg">
                        {watchedData.title || "Blog Title"}
                      </h3>
                      <div className="text-sm text-muted-foreground mt-2 max-h-32 overflow-y-auto">
                        {watchedData.content ? (
                          <div
                            className="prose prose-sm max-w-none"
                            dangerouslySetInnerHTML={{
                              __html: watchedData.content,
                            }}
                          />
                        ) : (
                          "Blog content will appear here..."
                        )}
                      </div>
                    </div>

                    {watchedTags.length > 0 && (
                      <div>
                        <h4 className="font-medium text-sm mb-2">Tags</h4>
                        <div className="flex flex-wrap gap-1">
                          {watchedTags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-primary/10 text-primary px-2 py-1 rounded text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      {watchedData.isFeatured && (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                          Featured
                        </span>
                      )}
                      <span
                        className={
                          watchedData.isPublished
                            ? "text-green-600"
                            : "text-orange-600"
                        }
                      >
                        {watchedData.isPublished ? "Published" : "Draft"}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Eye className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Enable preview mode to see your blog post</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
