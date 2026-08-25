import { Suspense } from "react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import ProjectCard from "@/components/ProjectCard";
import { LoadingSkeleton } from "@/components/ui/loading-spinner";
import { fetchProjects } from "./actions";

interface ProjectsPageProps {
  params: Promise<{ locale: Locale }>;
}

function ProjectsLoadingSkeleton() {
  return (
    <div>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="grid gap-8 border-t border-gray-300 py-10 dark:border-gray-700 md:grid-cols-2 md:py-14">
          <LoadingSkeleton className="aspect-[4/3] w-full" />
          <div className="space-y-5 py-2"><LoadingSkeleton className="h-4 w-10" /><LoadingSkeleton className="h-10 w-3/4" /><LoadingSkeleton className="h-5 w-full" /><LoadingSkeleton className="h-5 w-4/5" /></div>
        </div>
      ))}
    </div>
  );
}

async function ProjectsList({ locale, emptyTitle, emptyDescription }: { locale: Locale; emptyTitle: string; emptyDescription: string }) {
  const projects = await fetchProjects(locale);
  if (projects.length === 0) {
    return (
      <div className="border-y border-gray-300 py-16 dark:border-gray-700">
        <h2 className="text-2xl font-semibold tracking-[-0.025em] text-gray-950 dark:text-white">{emptyTitle}</h2>
        <p className="mt-3 max-w-xl leading-7 text-gray-600 dark:text-gray-400">{emptyDescription}</p>
      </div>
    );
  }
  return <div>{projects.map((project) => <ProjectCard key={project.id} project={project} locale={locale} />)}</div>;
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-24">
      <header className="grid gap-8 border-b border-gray-300 pb-10 dark:border-gray-700 sm:pb-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end lg:gap-20">
        <div>
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">{dictionary.projects.title}</p>
          <h1 className="text-6xl font-semibold leading-[0.95] tracking-[-0.055em] text-gray-950 dark:text-white sm:text-8xl">{dictionary.navigation.projects}</h1>
        </div>
        <p className="max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-400">{dictionary.projects.description}</p>
      </header>

      <Suspense fallback={<ProjectsLoadingSkeleton />}>
        <ProjectsList locale={locale} emptyTitle={dictionary.projects.no_projects.title} emptyDescription={dictionary.projects.no_projects.description} />
      </Suspense>
    </div>
  );
}
