import { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import ProjectCard from "@/components/ProjectCard";
import { fetchProjects } from "./actions";

interface ProjectsPageProps {
  params: { locale: Locale };
}

export default async function ProjectsPage({
  params: { locale },
}: ProjectsPageProps) {
  const dictionary = await getDictionary(locale);
  const projects = await fetchProjects();

  return (
    <div className='container mx-auto px-4 py-16 max-w-4xl'>
      <h1 className='text-4xl font-bold mb-8 text-gray-900 dark:text-white'>
        {dictionary.navigation.projects}
      </h1>

      {projects.length === 0 ? (
        <p className='text-gray-600 dark:text-gray-400 text-center py-10'>
          No projects found.
        </p>
      ) : (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
