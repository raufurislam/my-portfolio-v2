import BlogDetails from "@/components/modules/blog/BlogDetails";

export default async function BlogDetailsPage({
  params,
}: {
  params: { slug: string };
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/blog/${params.slug}`,
    { cache: "no-cache" }
  );
  const { data: blog } = await res.json();

  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center text-muted-foreground">
        <h2 className="text-2xl font-semibold">Blog not found 😔</h2>
      </div>
    );
  }

  return <BlogDetails blog={blog} />;
}
