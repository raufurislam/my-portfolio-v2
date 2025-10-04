import { notFound } from "next/navigation";
import ProjectDetails from "@/components/modules/projects/ProjectDetails";
import { Metadata } from "next";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/project/${params.slug}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return {
        title: "Project Not Found",
        description: "The requested project could not be found.",
      };
    }

    const { data: project } = await res.json();

    return {
      title: `${project.title} - Project Details`,
      description: project.description,
      openGraph: {
        title: project.title,
        description: project.description,
        images: project.thumbnail ? [project.thumbnail] : [],
      },
    };
  } catch (error) {
    return {
      title: "Project Not Found",
      description: "The requested project could not be found.",
    };
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/project/${params.slug}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      notFound();
    }

    const { data: project } = await res.json();

    return <ProjectDetails project={project} />;
  } catch (error) {
    notFound();
  }
}
