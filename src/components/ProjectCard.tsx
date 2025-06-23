"use client";

import { Project } from "@/dal/projects";
import Image from "next/image";
import Link from "next/link";
import { ArrowSquareOut, GithubLogo } from "@phosphor-icons/react";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
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
    <div className='bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700/20 overflow-hidden flex flex-col h-full border border-gray-100 dark:border-gray-700 transition-colors duration-300 hover:shadow-xl dark:hover:shadow-gray-700/30'>
      {project.image_url && isValidImageUrl(project.image_url) && (
        <div className='relative h-48 w-full'>
          <Image
            src={project.image_url}
            alt={project.title}
            fill
            className='object-cover'
            onError={() => {
              // Hide the image container if image fails to load
              console.warn(`Failed to load image: ${project.image_url}`);
            }}
          />
        </div>
      )}
      <div className='p-6 flex-grow'>
        <h3 className='text-xl font-semibold mb-2 text-gray-900 dark:text-white transition-colors duration-300'>
          {project.title}
        </h3>
        <p className='text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300'>
          {project.description}
        </p>
        <div className='flex flex-wrap gap-2 mb-4'>
          {project.techstack.map((tech, index) => (
            <span
              key={`${tech}-${index}`}
              className='px-2 py-1 text-xs rounded bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 transition-colors duration-300'
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {(project.github_url || project.demo_url) && (
        <div className='px-6 pb-4 flex gap-4'>
          {project.github_url && (
            <Link
              href={project.github_url}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300'
            >
              <GithubLogo size={18} className='mr-1' />
              GitHub
            </Link>
          )}

          {project.demo_url && (
            <Link
              href={project.demo_url}
              target='_blank'
              rel='noopener noreferrer'
              className='flex items-center text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-300'
            >
              <ArrowSquareOut size={18} className='mr-1' />
              Demo
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
