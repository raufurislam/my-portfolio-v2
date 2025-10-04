import FeaturedBlogs from "@/components/modules/home/FeaturedBlogs";
import FeaturedProjects from "@/components/modules/home/FeaturedProjects";
import Hero from "@/components/modules/home/Hero";

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProjects />
      <FeaturedBlogs />
    </div>
  );
}
