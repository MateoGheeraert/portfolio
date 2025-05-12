"use client";

import { Project } from "@/dal/projects";
import Image from "next/image";
import Link from "next/link";
import { ArrowSquareOut, GithubLogo } from "@phosphor-icons/react";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className='bg-white rounded-lg shadow-lg overflow-hidden flex flex-col h-full'>
      {project.image_url && (
        <div className='relative h-48 w-full'>
          <Image
            src={project.image_url}
            alt={project.title}
            fill
            className='object-cover'
          />
        </div>
      )}
      <div className='p-6 flex-grow'>
        <h3 className='text-xl font-semibold mb-2 text-gray-900'>
          {project.title}
        </h3>
        <p className='text-gray-600 mb-4'>{project.description}</p>
        <div className='flex flex-wrap gap-2 mb-4'>
          {project.techstack.map((tech, index) => (
            <span
              key={`${tech}-${index}`}
              className='px-2 py-1 text-xs rounded bg-blue-100 text-blue-800'
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
              className='flex items-center text-sm text-gray-700 hover:text-gray-900'
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
              className='flex items-center text-sm text-gray-700 hover:text-gray-900'
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
