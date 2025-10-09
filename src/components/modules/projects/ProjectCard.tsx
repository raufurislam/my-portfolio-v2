"use client";
import { motion } from "framer-motion";
import { ExternalLink, Github, Calendar, Eye, Star } from "lucide-react";
import { IProject } from "@/types";
import Link from "next/link";
import Image from "next/image";

interface ProjectCardProps {
  project: IProject;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      className="group relative bg-card rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden border border-border"
    >
      {/* Project Image */}
      <div className="relative overflow-hidden">
        <Image
          src={project.thumbnail || "/api/placeholder/600/400"}
          alt={project.title}
          width={600}
          height={400}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Featured Badge */}
        {project.isFeatured && (
          <div className="absolute top-3 left-3">
            <span className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
              <Star className="w-3 h-3" />
              Featured
            </span>
          </div>
        )}

        {/* Overlay Actions */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="flex gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/90 hover:bg-white text-gray-900 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                title="Live Demo"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {(project.github?.frontend || project.github?.monorepo) && (
              <a
                href={project.github?.frontend || project.github?.monorepo}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/90 hover:bg-white text-gray-900 p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
                title="Source Code"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Project Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-card-foreground mb-3 group-hover:text-primary transition-colors duration-200">
          {project.title}
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 4).map((tech, techIndex) => (
            <span
              key={techIndex}
              className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-xs font-medium"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs font-medium">
              +{project.technologies.length - 4} more
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            <span>{project.views}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>
              {new Date(project.createdAt || "").toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* View Details Button */}
        <div className="mt-4">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm transition-colors duration-200"
          >
            View Details
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
