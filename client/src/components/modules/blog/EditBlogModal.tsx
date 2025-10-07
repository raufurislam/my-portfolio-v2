"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Eye, EyeOff } from "lucide-react";
import QuillEditor from "@/components/ui/quill-editor";
import { updateBlog } from "@/services/BlogServices";
import { toast } from "sonner";
import Image from "next/image";

const updateBlogSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(1, "Content is required"),
  thumbnail: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  tags: z.array(z.string().min(1, "Tag cannot be empty")),
  isFeatured: z.boolean(),
  isPublished: z.boolean(),
});

type UpdateBlogFormData = z.infer<typeof updateBlogSchema>;

interface EditBlogModalProps {
  blog: {
    _id: string;
    title: string;
    content: string;
    thumbnail: string;
    tags: string[];
    isFeatured: boolean;
    isPublished: boolean;
  };
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditBlogModal({
  blog,
  isOpen,
  onClose,
  onSuccess,
}: EditBlogModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<UpdateBlogFormData>({
    resolver: zodResolver(updateBlogSchema),
    defaultValues: {
      title: blog.title,
      content: blog.content,
      thumbnail: blog.thumbnail || "",
      tags: blog.tags || [],
      isFeatured: blog.isFeatured || false,
      isPublished: blog.isPublished || false,
    },
  });

  const watchedTags = watch("tags") || [];
  const watchedData = watch();

  // Reset form when blog changes
  useEffect(() => {
    if (isOpen && blog) {
      reset({
        title: blog.title,
        content: blog.content,
        thumbnail: blog.thumbnail || "",
        tags: blog.tags || [],
        isFeatured: blog.isFeatured || false,
        isPublished: blog.isPublished || false,
      });
    }
  }, [isOpen, blog, reset]);

  // Force content update when modal opens
  useEffect(() => {
    if (isOpen && blog) {
      console.log("EditBlogModal: Setting content:", blog.content);
      setValue("content", blog.content);
      // Force a small delay to ensure the editor is ready
      setTimeout(() => {
        console.log("EditBlogModal: Setting content again:", blog.content);
        setValue("content", blog.content);
      }, 200);
    }
  }, [isOpen, blog, setValue]);

  const addTag = () => {
    if (newTag.trim() && !watchedTags.includes(newTag.trim())) {
      setValue("tags", [...watchedTags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue(
      "tags",
      watchedTags.filter((tag) => tag !== tagToRemove)
    );
  };

  const onSubmit = async (data: UpdateBlogFormData) => {
    setIsLoading(true);
    try {
      // Clean up empty values
      const cleanedData = {
        ...data,
        thumbnail: data.thumbnail || undefined,
        tags: data.tags.filter((tag) => tag.trim() !== ""),
      };

      await updateBlog(blog._id, cleanedData);
      toast.success("Blog updated successfully!");
      onSuccess();
    } catch (error) {
      console.error("Error updating blog:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update blog"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Blog</DialogTitle>
          <DialogDescription>
            Update your blog post details and content.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Form */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  {...register("title")}
                  placeholder="Enter blog title"
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="thumbnail">Thumbnail URL</Label>
                <Input
                  id="thumbnail"
                  {...register("thumbnail")}
                  placeholder="https://example.com/image.jpg"
                />
                {errors.thumbnail && (
                  <p className="text-sm text-red-500">
                    {errors.thumbnail.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Tags</Label>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <Button type="button" onClick={addTag} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {watchedTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {tag}
                      <X
                        className="w-3 h-3 cursor-pointer hover:text-red-500"
                        onClick={() => removeTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isFeatured"
                    {...register("isFeatured")}
                    className="rounded"
                  />
                  <Label htmlFor="isFeatured">Featured</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isPublished"
                    {...register("isPublished")}
                    className="rounded"
                  />
                  <Label htmlFor="isPublished">Published</Label>
                </div>
              </div>
            </div>

            {/* Right Column - Preview */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Preview</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setPreviewMode(!previewMode)}
                >
                  {previewMode ? (
                    <>
                      <EyeOff className="w-4 h-4 mr-2" />
                      Hide Preview
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 mr-2" />
                      Show Preview
                    </>
                  )}
                </Button>
              </div>

              {previewMode && (
                <Card className="border-2 border-dashed">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <h3 className="text-lg font-semibold line-clamp-2">
                        {watchedData.title || "Blog Title"}
                      </h3>
                      {watchedData.thumbnail && (
                        <div className="relative h-32 w-full rounded-lg overflow-hidden">
                          <Image
                            src={watchedData.thumbnail}
                            alt="Thumbnail preview"
                            width={400}
                            height={128}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="text-sm text-muted-foreground">
                        <div
                          className="prose prose-sm max-w-none [&_h1]:text-lg [&_h1]:font-bold [&_h1]:mb-2 [&_h2]:text-base [&_h2]:font-bold [&_h2]:mb-2 [&_h3]:text-sm [&_h3]:font-bold [&_h3]:mb-1 [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded"
                          dangerouslySetInnerHTML={{
                            __html:
                              watchedData.content ||
                              "<p>Blog content will appear here...</p>",
                          }}
                        />
                      </div>
                      {watchedTags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {watchedTags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Content Editor */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <QuillEditor
                  key={blog._id}
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
                <h4 className="font-medium text-sm mb-2">Editor Features:</h4>
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

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Blog"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
