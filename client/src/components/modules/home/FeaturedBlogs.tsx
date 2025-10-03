import BlogCard from "../blog/BlogCard";
import Image from "next/image";
import Link from "next/link";

export default async function FeaturedBlogs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/blog/featured`, {
    cache: "no-cache",
  });
  const { data: blogs } = await res.json();
  const featured = (blogs ?? []).slice(0, 3);
  const rest = (blogs ?? []).slice(3);

  return (
    <section className="my-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            Featured Posts
          </h2>
          <Link href="/blogs" className="text-sm text-primary hover:underline">
            See all
          </Link>
        </div>
        {/* Hero: 1 large + 2 secondary */}
        {featured.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Large hero (first) */}
            <Link
              href={`/blogs/${featured[0].slug}`}
              className="group relative col-span-1 lg:col-span-2 overflow-hidden rounded-3xl border bg-card"
            >
              <div className="relative h-[360px] md:h-[460px] w-full">
                <Image
                  src={featured[0].thumbnail}
                  alt={featured[0].title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {featured[0].tags?.slice(0, 3).map((tag: string) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-primary/90 text-primary-foreground px-2.5 py-0.5 text-[10px] font-semibold shadow"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl md:text-3xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {featured[0].title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm md:text-base text-muted-foreground line-clamp-2">
                    {featured[0].content}
                  </p>
                </div>
              </div>
            </Link>

            {/* Two secondary cards (second and third) */}
            <div className="grid grid-rows-2 gap-5">
              {featured.slice(1).map((item: any) => (
                <Link
                  key={item._id}
                  href={`/blogs/${item.slug}`}
                  className="group relative overflow-hidden rounded-3xl border bg-card"
                >
                  <div className="relative h-[170px] md:h-[220px] w-full">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="flex flex-wrap gap-2 mb-2">
                        {item.tags?.slice(0, 2).map((tag: string) => (
                          <span
                            key={tag}
                            className="inline-flex items-center rounded-full bg-primary/90 text-primary-foreground px-2.5 py-0.5 text-[10px] font-semibold shadow"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h4 className="text-lg font-semibold tracking-tight line-clamp-2 group-hover:text-primary">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        {/* Grid
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight mt-16 text-center">
          Featured Posts
        </h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest?.slice(0, 6).map((blog: any) => (
            <BlogCard key={blog._id} post={blog} />
          ))}
        </div> */}
      </div>
    </section>
  );
}
