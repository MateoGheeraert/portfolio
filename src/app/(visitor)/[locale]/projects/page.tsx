import { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

interface ProjectsPageProps {
  params: { locale: string };
}

export default async function ProjectsPage({
  params: { locale },
}: ProjectsPageProps) {
  const dictionary = await getDictionary(locale as Locale);

  return (
    <div className='container mx-auto px-4 py-16 max-w-4xl'>
      <h1 className='text-4xl font-bold mb-8 text-gray-900'>
        {dictionary.navigation.projects}
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {/* Project cards will go here */}
        <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
          <div className='p-6'>
            <h3 className='text-xl font-semibold mb-2 text-gray-900'>
              Project Title
            </h3>
            <p className='text-gray-600 mb-4'>
              Project description will go here.
            </p>
            <div className='flex flex-wrap gap-2 mb-4'>
              <span className='px-2 py-1 text-xs rounded bg-blue-100 text-blue-800'>
                React
              </span>
              <span className='px-2 py-1 text-xs rounded bg-purple-100 text-purple-800'>
                TypeScript
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
