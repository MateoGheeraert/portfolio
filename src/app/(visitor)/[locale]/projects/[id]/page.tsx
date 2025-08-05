"use client";

import { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { fetchProjectById } from "../actions";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowSquareOut,
  GithubLogo,
  CalendarBlank,
  Stack,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Project } from "@/dal/projects";
import { LoadingSkeleton } from "@/components/ui/loading-spinner";

interface ProjectDetailPageProps {
  params: {
    locale: Locale;
    id: string;
  };
}

export default function ProjectDetailPage({
  params: { locale, id },
}: ProjectDetailPageProps) {
  const [project, setProject] = useState<Project | null>(null);
  const [dictionary, setDictionary] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        const [projectData, dict] = await Promise.all([
          fetchProjectById(id),
          getDictionary(locale),
        ]);

        if (!projectData) {
          notFound();
          return;
        }

        setProject(projectData);
        setDictionary(dict);
      } catch (err) {
        console.error("Error loading project:", err);
        setError("Failed to load project");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [id, locale]);

  // Helper function to validate image URL
  const isValidImageUrl = (url: string): boolean => {
    if (!url || typeof url !== "string") return false;
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === "http:" || urlObj.protocol === "https:";
    } catch {
      return url.startsWith("/");
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300'>
        <div className='container mx-auto px-4 py-8 max-w-6xl'>
          {/* Back Button Skeleton */}
          <div className='mb-8'>
            <LoadingSkeleton className='h-6 w-32' />
          </div>

          {/* Project Header Skeleton */}
          <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-700/20 overflow-hidden mb-8 border border-gray-100 dark:border-gray-700'>
            <LoadingSkeleton className='h-64 md:h-80 lg:h-96 w-full' />
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Main Content Skeleton */}
            <div className='lg:col-span-2 space-y-8'>
              {/* Project Description Skeleton */}
              <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700/20 p-8 border border-gray-100 dark:border-gray-700'>
                <div className='flex items-center gap-3 mb-6'>
                  <LoadingSkeleton className='w-8 h-8 rounded-lg' />
                  <LoadingSkeleton className='h-7 w-48' />
                </div>
                <div className='space-y-3'>
                  <LoadingSkeleton className='h-6 w-full' />
                  <LoadingSkeleton className='h-6 w-full' />
                  <LoadingSkeleton className='h-6 w-3/4' />
                </div>
              </div>

              {/* Technology Stack Skeleton */}
              <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700/20 p-8 border border-gray-100 dark:border-gray-700'>
                <div className='flex items-center gap-3 mb-6'>
                  <LoadingSkeleton className='w-8 h-8 rounded-lg' />
                  <LoadingSkeleton className='h-7 w-40' />
                </div>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                  {Array.from({ length: 6 }).map((_, index) => (
                    <div
                      key={index}
                      className='p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'
                    >
                      <LoadingSkeleton className='h-6 w-full' />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Skeleton */}
            <div className='space-y-6'>
              {/* Project Info Skeleton */}
              <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700/20 p-6 border border-gray-100 dark:border-gray-700'>
                <LoadingSkeleton className='h-6 w-32 mb-4' />
                <div className='space-y-4'>
                  <div className='flex items-center gap-3'>
                    <LoadingSkeleton className='w-5 h-5 rounded' />
                    <div className='space-y-1'>
                      <LoadingSkeleton className='h-4 w-16' />
                      <LoadingSkeleton className='h-5 w-28' />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Skeleton */}
              <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700/20 p-6 border border-gray-100 dark:border-gray-700'>
                <LoadingSkeleton className='h-6 w-28 mb-4' />
                <div className='space-y-3'>
                  <LoadingSkeleton className='h-12 w-full rounded-lg' />
                  <LoadingSkeleton className='h-12 w-full rounded-lg' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !project || !dictionary) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 flex items-center justify-center'>
        <div className='text-center px-4'>
          <div className='mx-auto w-32 h-32 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-8'>
            <svg
              className='w-16 h-16 text-red-500 dark:text-red-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={1.5}
                d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z'
              />
            </svg>
          </div>
          <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            {error ||
              dictionary?.projects?.project_not_found?.title ||
              "Project Not Found"}
          </h1>
          <p className='text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto'>
            {error
              ? dictionary?.projects?.project_not_found?.description_error ||
                "Something went wrong while loading this project."
              : dictionary?.projects?.project_not_found
                  ?.description_not_found ||
                "The project you're looking for doesn't exist."}
          </p>
          <Link
            href={`/${locale}/projects`}
            className='inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200'
          >
            <ArrowLeft size={20} />
            {dictionary?.projects?.back_to_projects || "Back to Projects"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300'>
      <div className='container mx-auto px-4 py-8 max-w-6xl'>
        {/* Back Button */}
        <Link
          href={`/${locale}/projects`}
          className='inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 mb-8 group'
        >
          <ArrowLeft
            size={20}
            className='transition-transform group-hover:-translate-x-1'
          />
          {dictionary.projects.back_to_projects}
        </Link>

        {/* Project Header */}
        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-700/20 overflow-hidden mb-8 border border-gray-100 dark:border-gray-700'>
          {/* Project Image */}
          {project.image_url && isValidImageUrl(project.image_url) && (
            <div className='relative h-64 md:h-80 lg:h-96 w-full'>
              <Image
                src={project.image_url}
                alt={project.title}
                fill
                className='object-cover'
                priority
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent' />
              <div className='absolute bottom-6 left-6 right-6'>
                <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2'>
                  {project.title}
                </h1>
              </div>
            </div>
          )}

          {/* Project Header Content (when no image) */}
          {(!project.image_url || !isValidImageUrl(project.image_url)) && (
            <div className='p-8 md:p-12'>
              <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4'>
                {project.title}
              </h1>
            </div>
          )}
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Project Description */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700/20 p-8 border border-gray-100 dark:border-gray-700'>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3'>
                <div className='w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center'>
                  <span className='text-blue-600 dark:text-blue-400 text-sm font-bold'>
                    📝
                  </span>
                </div>
                {dictionary.projects.project_description}
              </h2>
              <p className='text-gray-700 dark:text-gray-300 leading-relaxed text-lg'>
                {project.description}
              </p>
            </div>

            {/* Technology Stack */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700/20 p-8 border border-gray-100 dark:border-gray-700'>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3'>
                <div className='w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center'>
                  <Stack
                    size={18}
                    className='text-green-600 dark:text-green-400'
                  />
                </div>
                {dictionary.projects.technology_stack}
              </h2>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                {project.techstack.map((tech, index) => (
                  <div
                    key={`${tech}-${index}`}
                    className='flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500 transition-colors duration-200'
                  >
                    <div className='w-2 h-2 bg-blue-500 rounded-full' />
                    <span className='font-medium text-gray-900 dark:text-white'>
                      {tech}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Project Info */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700/20 p-6 border border-gray-100 dark:border-gray-700'>
              <h3 className='text-lg font-bold text-gray-900 dark:text-white mb-4'>
                {dictionary.projects.project_information}
              </h3>

              <div className='space-y-4'>
                <div className='flex items-center gap-3 text-gray-600 dark:text-gray-400'>
                  <CalendarBlank size={18} />
                  <div>
                    <p className='text-sm'>{dictionary.projects.created}</p>
                    <p className='font-medium text-gray-900 dark:text-white'>
                      {new Date(project.created_at).toLocaleDateString(locale, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700/20 p-6 border border-gray-100 dark:border-gray-700'>
              <h3 className='text-lg font-bold text-gray-900 dark:text-white mb-4'>
                {dictionary.projects.quick_links}
              </h3>

              <div className='space-y-3'>
                {project.demo_url && (
                  <Link
                    href={project.demo_url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center justify-center gap-3 w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200'
                  >
                    <ArrowSquareOut size={18} />
                    {dictionary.projects.view_live_demo}
                  </Link>
                )}

                {project.github_url && (
                  <Link
                    href={project.github_url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center justify-center gap-3 w-full px-4 py-3 bg-gray-900 hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-medium rounded-lg transition-colors duration-200'
                  >
                    <GithubLogo size={18} />
                    {dictionary.projects.view_source_code}
                  </Link>
                )}

                {!project.demo_url && !project.github_url && (
                  <div className='text-center py-4'>
                    <p className='text-gray-500 dark:text-gray-400 text-sm'>
                      {dictionary.projects.no_links_available}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
