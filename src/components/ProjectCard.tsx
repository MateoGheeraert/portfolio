"use client";

import { LocalizedProject } from "@/dal/projects";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";
import Image from "next/image";
import Link from "next/link";
import { ArrowSquareOut, GithubLogo, Eye } from "@phosphor-icons/react";
interface ProjectCardProps {
  project: LocalizedProject;
  locale: string;
}

export default function ProjectCard({ project, locale }: ProjectCardProps) {
  // Helper function to validate image URL
  const isValidImageUrl = (url: string): boolean => {
    if (!url || typeof url !== "string") return false;
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === "http:" || urlObj.protocol === "https:";
    } catch {
      // If it's not a valid URL, check if it's a relative path
      return url.startsWith("/");
    }
  };

  return (
    <div className='group bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700/20 overflow-hidden flex flex-col h-full border border-gray-100 dark:border-gray-700 transition-all duration-300 hover:shadow-xl dark:hover:shadow-gray-700/40 hover:-translate-y-1'>
      {/* Project Image */}
      {project.image_url && isValidImageUrl(project.image_url) && (
        <div className='relative h-48 w-full overflow-hidden'>
          <Image
            src={project.image_url}
            alt={project.title}
            fill
            className='object-cover transition-transform duration-300 group-hover:scale-105'
            onError={() => {
              console.warn(`Failed to load image: ${project.image_url}`);
            }}
          />
          <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300' />
        </div>
      )}

      {/* Project Content */}
      <div className='p-6 flex-grow flex flex-col'>
        <h3 className='text-xl font-bold mb-3 text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400'>
          {project.title}
        </h3>        <div className='text-gray-600 dark:text-gray-300 mb-4 leading-relaxed transition-colors duration-300 line-clamp-3'>
          <MarkdownRenderer 
            content={project.description} 
            className="prose-sm [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
          />
        </div>

        {/* Tech Stack */}
        <div className='flex flex-wrap gap-2 mb-6'>
          {project.techstack.slice(0, 4).map((tech, index) => (
            <span
              key={`${tech}-${index}`}
              className='px-3 py-1 text-xs font-medium rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 transition-colors duration-300'
            >
              {tech}
            </span>
          ))}
          {project.techstack.length > 4 && (
            <span className='px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'>
              +{project.techstack.length - 4} more
            </span>
          )}
        </div>

        {/* Spacer to push actions to bottom */}
        <div className='flex-grow' />

        {/* Action Buttons */}
        <div className='flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700'>
          <Link
            href={`/${locale}/projects/${project.id}`}
            className='flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors duration-200'
          >
            <Eye size={16} />
            View Details
          </Link>{" "}
          <div className='flex items-center gap-3'>
            {project.github_url && project.github_url.trim() !== "" && (
              <Link
                href={project.github_url}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white transition-colors duration-200'
                title='View on GitHub'
              >
                <GithubLogo size={18} />
              </Link>
            )}

            {project.demo_url && project.demo_url.trim() !== "" && (
              <Link
                href={project.demo_url}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white transition-colors duration-200'
                title='View Demo'
              >
                <ArrowSquareOut size={18} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
