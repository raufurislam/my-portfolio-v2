import FeaturedBlogs from "@/components/modules/home/FeaturedBlogs";
import FeaturedProjects from "@/components/modules/home/FeaturedProjects";
import Hero from "@/components/modules/home/Hero";
import Skills from "@/components/modules/home/Skills";

export default function Home() {
  return (
    <div>
      <Hero />
      <Skills />
      <FeaturedProjects />
      <FeaturedBlogs />
    </div>
  );
}
