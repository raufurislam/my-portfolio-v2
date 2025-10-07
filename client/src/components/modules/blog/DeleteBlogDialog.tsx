"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash2, AlertTriangle } from "lucide-react";
import { deleteBlog } from "@/services/BlogServices";
import { toast } from "sonner";

interface DeleteBlogDialogProps {
  blog: {
    _id: string;
    title: string;
  };
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function DeleteBlogDialog({
  blog,
  isOpen,
  onClose,
  onSuccess,
}: DeleteBlogDialogProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteBlog(blog._id);
      toast.success("Blog deleted successfully!");
      onSuccess();
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to delete blog"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            Delete Blog
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this blog? This action cannot be
            undone.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium text-sm mb-1">Blog to be deleted:</h4>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {blog.title}
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            {isLoading ? "Deleting..." : "Delete Blog"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
