"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IProject } from "@/types";
import { updateProject } from "@/services/ProjectServices";
import { toast } from "sonner";
import { Loader2, Plus, X } from "lucide-react";

const editProjectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  technologies: z.array(z.string().min(1, "Technology cannot be empty")),
  github: z.object({
    frontend: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    backend: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    monorepo: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  }).optional(),
  liveUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  thumbnail: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  screenshots: z.array(z.string().url("Must be a valid URL")).optional(),
  isFeatured: z.boolean(),
  isPublished: z.boolean(),
});

type EditProjectFormData = z.infer<typeof editProjectSchema>;

interface EditProjectModalProps {
  project: IProject | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EditProjectModal({
  project,
  isOpen,
  onClose,
  onSuccess,
}: EditProjectModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [newTechnology, setNewTechnology] = useState("");
  const [newScreenshot, setNewScreenshot] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EditProjectFormData>({
    resolver: zodResolver(editProjectSchema),
    defaultValues: {
      title: "",
      description: "",
      technologies: [],
      github: {
        frontend: "",
        backend: "",
        monorepo: "",
      },
      liveUrl: "",
      thumbnail: "",
      screenshots: [],
      isFeatured: false,
      isPublished: true,
    },
  });

  const watchedTechnologies = watch("technologies") || [];
  const watchedScreenshots = watch("screenshots") || [];

  useEffect(() => {
    if (project && isOpen) {
      reset({
        title: project.title,
        description: project.description,
        technologies: project.technologies || [],
        github: {
          frontend: project.github?.frontend || "",
          backend: project.github?.backend || "",
          monorepo: project.github?.monorepo || "",
        },
        liveUrl: project.liveUrl || "",
        thumbnail: project.thumbnail || "",
        screenshots: project.screenshots || [],
        isFeatured: project.isFeatured || false,
        isPublished: project.isPublished !== false,
      });
    }
  }, [project, isOpen, reset]);

  const addTechnology = () => {
    if (newTechnology.trim() && !watchedTechnologies.includes(newTechnology.trim())) {
      setValue("technologies", [...watchedTechnologies, newTechnology.trim()]);
      setNewTechnology("");
    }
  };

  const removeTechnology = (index: number) => {
    const updated = watchedTechnologies.filter((_, i) => i !== index);
    setValue("technologies", updated);
  };

  const addScreenshot = () => {
    if (newScreenshot.trim() && !watchedScreenshots.includes(newScreenshot.trim())) {
      setValue("screenshots", [...watchedScreenshots, newScreenshot.trim()]);
      setNewScreenshot("");
    }
  };

  const removeScreenshot = (index: number) => {
    const updated = watchedScreenshots.filter((_, i) => i !== index);
    setValue("screenshots", updated);
  };

  const onSubmit = async (data: EditProjectFormData) => {
    if (!project) return;

    setIsLoading(true);
    try {
      // Clean up empty strings and undefined values
      const cleanedData = {
        ...data,
        github: {
          frontend: data.github?.frontend || undefined,
          backend: data.github?.backend || undefined,
          monorepo: data.github?.monorepo || undefined,
        },
        liveUrl: data.liveUrl || undefined,
        thumbnail: data.thumbnail || undefined,
        screenshots: data.screenshots?.length ? data.screenshots : undefined,
      };

      await updateProject(project._id, cleanedData);
      toast.success("Project updated successfully!");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating project:", error);
      toast.error("Failed to update project. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
          <DialogDescription>
            Update your project information. All fields are optional except title and description.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Basic Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                {...register("title")}
                placeholder="Project title"
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                {...register("description")}
                placeholder="Project description"
                rows={4}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>
          </div>

          {/* Technologies */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Technologies</h3>
            
            <div className="flex gap-2">
              <Input
                value={newTechnology}
                onChange={(e) => setNewTechnology(e.target.value)}
                placeholder="Add technology"
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology())}
              />
              <Button type="button" onClick={addTechnology} size="sm">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {watchedTechnologies.map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="flex items-center gap-1 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                >
                  <span>{tech}</span>
                  <button
                    type="button"
                    onClick={() => removeTechnology(index)}
                    className="hover:text-red-500 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </motion.div>
              ))}
            </div>
            {errors.technologies && (
              <p className="text-sm text-red-500">{errors.technologies.message}</p>
            )}
          </div>

          {/* GitHub Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">GitHub Links</h3>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="frontend">Frontend Repository</Label>
                <Input
                  id="frontend"
                  {...register("github.frontend")}
                  placeholder="https://github.com/username/frontend"
                />
                {errors.github?.frontend && (
                  <p className="text-sm text-red-500">{errors.github.frontend.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="backend">Backend Repository</Label>
                <Input
                  id="backend"
                  {...register("github.backend")}
                  placeholder="https://github.com/username/backend"
                />
                {errors.github?.backend && (
                  <p className="text-sm text-red-500">{errors.github.backend.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="monorepo">Monorepo</Label>
                <Input
                  id="monorepo"
                  {...register("github.monorepo")}
                  placeholder="https://github.com/username/monorepo"
                />
                {errors.github?.monorepo && (
                  <p className="text-sm text-red-500">{errors.github.monorepo.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Live URL */}
          <div className="space-y-2">
            <Label htmlFor="liveUrl">Live URL</Label>
            <Input
              id="liveUrl"
              {...register("liveUrl")}
              placeholder="https://your-project.com"
            />
            {errors.liveUrl && (
              <p className="text-sm text-red-500">{errors.liveUrl.message}</p>
            )}
          </div>

          {/* Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Media</h3>
            
            <div className="space-y-2">
              <Label htmlFor="thumbnail">Thumbnail URL</Label>
              <Input
                id="thumbnail"
                {...register("thumbnail")}
                placeholder="https://example.com/thumbnail.jpg"
              />
              {errors.thumbnail && (
                <p className="text-sm text-red-500">{errors.thumbnail.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Screenshots</Label>
              <div className="flex gap-2">
                <Input
                  value={newScreenshot}
                  onChange={(e) => setNewScreenshot(e.target.value)}
                  placeholder="Add screenshot URL"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addScreenshot())}
                />
                <Button type="button" onClick={addScreenshot} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {watchedScreenshots.map((screenshot, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-1 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm"
                  >
                    <span className="truncate max-w-[200px]">{screenshot}</span>
                    <button
                      type="button"
                      onClick={() => removeScreenshot(index)}
                      className="hover:text-red-500 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </motion.div>
                ))}
              </div>
              {errors.screenshots && (
                <p className="text-sm text-red-500">{errors.screenshots.message}</p>
              )}
            </div>
          </div>

          {/* Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Settings</h3>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="isFeatured"
                {...register("isFeatured")}
                className="rounded border-gray-300"
              />
              <Label htmlFor="isFeatured">Featured Project</Label>
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
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Update Project
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
