import BlogCard, { BlogCardProps } from "../blog/BlogCard";

export default async function FeaturedBlogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/featured`, {
    cache: "no-cache",
  });
  const { data: blogs } = await res.json();
  console.log({ blogs });

  return (
    <div className="my-10">
      <h2 className="text-center my-5 text-4xl">Featured Posts</h2>
      <div className="max-w-7xl mx-auto grid grid-cols-3 gap-4 my-5">
        {blogs.slice(0, 6).map((blog: any) => (
          <BlogCard key={blog._id} post={blog} />
        ))}
      </div>
    </div>
  );
}
