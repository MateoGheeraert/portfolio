import { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import ProjectCard from "@/components/ProjectCard";
import { fetchProjects } from "./actions";
import { Suspense } from "react";
import { LoadingSkeleton } from "@/components/ui/loading-spinner";

interface ProjectsPageProps {
  params: { locale: Locale };
}

function ProjectsLoadingSkeleton() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className='bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700'
        >
          <LoadingSkeleton className='h-48 w-full' />
          <div className='p-6 space-y-4'>
            <LoadingSkeleton className='h-6 w-3/4' />
            <LoadingSkeleton className='h-4 w-full' />
            <LoadingSkeleton className='h-4 w-2/3' />
            <div className='flex gap-2 mt-4'>
              <LoadingSkeleton className='h-6 w-16 rounded-full' />
              <LoadingSkeleton className='h-6 w-20 rounded-full' />
              <LoadingSkeleton className='h-6 w-14 rounded-full' />
            </div>
            <div className='pt-4 border-t border-gray-100 dark:border-gray-700'>
              <LoadingSkeleton className='h-9 w-28 rounded-lg' />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

async function ProjectsList({ locale }: { locale: Locale }) {
  const projects = await fetchProjects();

  if (projects.length === 0) {
    return (
      <div className='text-center py-16'>
        <div className='mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6'>
          <svg
            className='w-12 h-12 text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.5}
              d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
            />
          </svg>
        </div>
        <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
          No projects found
        </h3>
        <p className='text-gray-600 dark:text-gray-400 max-w-md mx-auto'>
          It looks like there aren&apos;t any projects to display right now.
          Check back later for updates!
        </p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} locale={locale} />
      ))}
    </div>
  );
}

export default async function ProjectsPage({
  params: { locale },
}: ProjectsPageProps) {
  const dictionary = await getDictionary(locale);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300'>
      <div className='container mx-auto px-4 py-16 max-w-7xl'>
        {/* Header Section */}
        <div className='text-center mb-16'>
          <h1 className='text-5xl font-bold mb-6 text-gray-900 dark:text-white relative inline-block'>
            {dictionary.navigation.projects}
            <span className='absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-blue-600 dark:bg-blue-400 rounded-full'></span>
          </h1>
          <p className='text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed'>
            Explore my portfolio of projects showcasing various technologies and
            creative solutions. Each project represents a unique challenge and
            learning experience.
          </p>
        </div>

        {/* Projects Grid */}
        <Suspense fallback={<ProjectsLoadingSkeleton />}>
          <ProjectsList locale={locale} />
        </Suspense>
      </div>
    </div>
  );
}
