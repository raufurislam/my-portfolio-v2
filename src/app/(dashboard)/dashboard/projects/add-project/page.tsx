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
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createProject } from "@/services/ProjectServices";
import { toast } from "sonner";
import { Loader2, Plus, X, ArrowLeft, Save, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const createProjectSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  technologies: z.array(z.string().min(1, "Technology cannot be empty")),
  github: z
    .object({
      frontend: z
        .string()
        .url("Must be a valid URL")
        .optional()
        .or(z.literal("")),
      backend: z
        .string()
        .url("Must be a valid URL")
        .optional()
        .or(z.literal("")),
      monorepo: z
        .string()
        .url("Must be a valid URL")
        .optional()
        .or(z.literal("")),
    })
    .optional(),
  liveUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  thumbnail: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  screenshots: z.array(z.string().url("Must be a valid URL")).optional(),
  isFeatured: z.boolean(),
  isPublished: z.boolean(),
});

type CreateProjectFormData = z.infer<typeof createProjectSchema>;

export default function AddProject() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [newTechnology, setNewTechnology] = useState("");
  const [newScreenshot, setNewScreenshot] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateProjectFormData>({
    resolver: zodResolver(createProjectSchema),
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

  const addTechnology = () => {
    if (
      newTechnology.trim() &&
      !watchedTechnologies.includes(newTechnology.trim())
    ) {
      setValue("technologies", [...watchedTechnologies, newTechnology.trim()]);
      setNewTechnology("");
    }
  };

  const removeTechnology = (index: number) => {
    const updated = watchedTechnologies.filter((_, i) => i !== index);
    setValue("technologies", updated);
  };

  const addScreenshot = () => {
    if (
      newScreenshot.trim() &&
      !watchedScreenshots.includes(newScreenshot.trim())
    ) {
      setValue("screenshots", [...watchedScreenshots, newScreenshot.trim()]);
      setNewScreenshot("");
    }
  };

  const removeScreenshot = (index: number) => {
    const updated = watchedScreenshots.filter((_, i) => i !== index);
    setValue("screenshots", updated);
  };

  const onSubmit = async (data: CreateProjectFormData) => {
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

      await createProject(cleanedData);
      toast.success("Project created successfully!");
      router.push("/dashboard/projects");
    } catch (error: unknown) {
      console.error("Error creating project:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to create project. Please try again.";
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
              <Link
                href="/dashboard/projects"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Create New Project
              </h1>
              <p className="text-muted-foreground mt-2">
                Add a new project to your portfolio
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
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Provide the essential details about your project
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title *</Label>
                    <Input
                      id="title"
                      {...register("title")}
                      placeholder="Enter project title"
                    />
                    {errors.title && (
                      <p className="text-sm text-red-500">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      {...register("description")}
                      placeholder="Describe your project in detail"
                      rows={6}
                    />
                    {errors.description && (
                      <p className="text-sm text-red-500">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Technologies */}
              <Card>
                <CardHeader>
                  <CardTitle>Technologies Used</CardTitle>
                  <CardDescription>
                    Add the technologies, frameworks, and tools used in this
                    project
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newTechnology}
                      onChange={(e) => setNewTechnology(e.target.value)}
                      placeholder="Add technology (e.g., React, Node.js)"
                      onKeyPress={(e) =>
                        e.key === "Enter" &&
                        (e.preventDefault(), addTechnology())
                      }
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
                        className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
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
                    <p className="text-sm text-red-500">
                      {errors.technologies.message}
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* GitHub Links */}
              <Card>
                <CardHeader>
                  <CardTitle>GitHub Repositories</CardTitle>
                  <CardDescription>
                    Link to your project&apos;s source code repositories
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="frontend">Frontend Repository</Label>
                    <Input
                      id="frontend"
                      {...register("github.frontend")}
                      placeholder="https://github.com/username/frontend"
                    />
                    {errors.github?.frontend && (
                      <p className="text-sm text-red-500">
                        {errors.github.frontend.message}
                      </p>
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
                      <p className="text-sm text-red-500">
                        {errors.github.backend.message}
                      </p>
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
                      <p className="text-sm text-red-500">
                        {errors.github.monorepo.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Live URL */}
              <Card>
                <CardHeader>
                  <CardTitle>Live URL</CardTitle>
                  <CardDescription>
                    Link to your deployed project
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="liveUrl">Live Demo URL</Label>
                    <Input
                      id="liveUrl"
                      {...register("liveUrl")}
                      placeholder="https://your-project.com"
                    />
                    {errors.liveUrl && (
                      <p className="text-sm text-red-500">
                        {errors.liveUrl.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Media */}
              <Card>
                <CardHeader>
                  <CardTitle>Media</CardTitle>
                  <CardDescription>
                    Add project thumbnail and screenshots
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
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

                  <div className="space-y-4">
                    <Label>Screenshots</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newScreenshot}
                        onChange={(e) => setNewScreenshot(e.target.value)}
                        placeholder="Add screenshot URL"
                        onKeyPress={(e) =>
                          e.key === "Enter" &&
                          (e.preventDefault(), addScreenshot())
                        }
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
                          <span className="truncate max-w-[200px]">
                            {screenshot}
                          </span>
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
                      <p className="text-sm text-red-500">
                        {errors.screenshots.message}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Settings</CardTitle>
                  <CardDescription>
                    Configure how your project appears in your portfolio
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
                  Create Project
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
                  See how your project will appear
                </CardDescription>
              </CardHeader>
              <CardContent>
                {previewMode ? (
                  <div className="space-y-4">
                    {watchedData.thumbnail && (
                      <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                        <Image
                          src={watchedData.thumbnail}
                          alt="Project thumbnail"
                          width={400}
                          height={225}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    <div>
                      <h3 className="font-semibold text-lg">
                        {watchedData.title || "Project Title"}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {watchedData.description ||
                          "Project description will appear here..."}
                      </p>
                    </div>

                    {watchedTechnologies.length > 0 && (
                      <div>
                        <h4 className="font-medium text-sm mb-2">
                          Technologies
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {watchedTechnologies.map((tech, index) => (
                            <span
                              key={index}
                              className="bg-primary/10 text-primary px-2 py-1 rounded text-xs"
                            >
                              {tech}
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
                    <p>Enable preview mode to see your project</p>
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
