"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RefreshCw, Plus } from "lucide-react";
import BlogCardManage from "@/components/modules/blog/BlogCardManage";
import { getAllBlogsForManagement } from "@/services/BlogServices";
import { useAuth } from "@/hooks/useAuth";

interface IBlog {
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
}

export default function ManageBlogs() {
  // const router = useRouter();
  const { isLoading: authLoading } = useAuth();
  // const { user, isLoading: authLoading } = useAuth();
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchBlogs = async () => {
    try {
      const data = await getAllBlogsForManagement();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchBlogs();
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleBlogUpdate = () => {
    fetchBlogs();
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading blogs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Manage Blogs</h1>
            <p className="text-muted-foreground mt-2">
              Create, edit, and manage your blog posts
            </p>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
            <Button asChild>
              <Link href="/dashboard/blogs/add-blog">
                <Plus className="w-4 h-4 mr-2" />
                New Blog
              </Link>
            </Button>
          </div>
        </div>

        {/* Blogs Grid */}
        {blogs.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <Plus className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No blogs yet
            </h3>
            <p className="text-muted-foreground mb-6">
              Get started by creating your first blog post
            </p>
            <Button asChild>
              <Link href="/dashboard/blogs/add-blog">
                <Plus className="w-4 h-4 mr-2" />
                Create Blog
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <BlogCardManage blog={blog} onBlogUpdate={handleBlogUpdate} />
              </motion.div>
            ))}
          </div>
        )}

        {/* Stats */}
        {blogs.length > 0 && (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-card rounded-lg p-6 border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                  <Plus className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {blogs.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Blogs</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                  <Plus className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {blogs.filter((b) => b.isPublished).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Published</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg flex items-center justify-center">
                  <Plus className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">
                    {blogs.filter((b) => b.isFeatured).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Featured</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
