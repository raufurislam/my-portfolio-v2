import FeaturedBlogs from "@/components/modules/home/FeaturedBlogs";
import BlogCard from "@/components/modules/blog/BlogCard";

export default async function BlogPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog`, {
    cache: "no-cache",
  });
  const { data: blogs } = await res.json();

  return (
    <main className="pb-16">
      <FeaturedBlogs />
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Latest Articles
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {blogs?.map((blog: any) => (
            <BlogCard key={blog._id} post={blog} />
          ))}
        </div>
      </section>
    </main>
  );
}
