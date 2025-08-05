import { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Link from "next/link";
import Image from "next/image";
import TechCard from "@/components/TechCard";
import { fetchProjects } from "./projects/actions";
import { Project } from "@/dal/projects";

interface HomePageProps {
  params: { locale: string };
}

export default async function HomePage({ params: { locale } }: HomePageProps) {
  const dictionary = await getDictionary(locale as Locale);

  // Fetch projects and get the first 3 for featured section
  let featuredProjects: Project[] = [];
  try {
    const allProjects = await fetchProjects();
    featuredProjects = allProjects.slice(0, 3);
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    featuredProjects = [];
  }

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

  return (
    <div className='py-16'>
      {/* Hero Section */}
      <div className='container mx-auto px-4 mb-20'>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-8'>
          <div className='md:col-span-7 order-2 md:order-1'>
            <div className='space-y-6 py-10'>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white'>
                {dictionary.hero.title}
              </h1>
              <h2 className='text-xl md:text-2xl text-blue-600 dark:text-blue-400 font-medium'>
                {dictionary.hero.subtitle}
              </h2>
              <p className='max-w-xl text-lg leading-relaxed text-gray-700 dark:text-gray-300'>
                {dictionary.hero.description}
              </p>
              <div className='flex flex-wrap gap-4'>
                <Link
                  href={`/${locale}/projects`}
                  className='px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-md font-medium inline-flex items-center transition-colors'
                >
                  {dictionary.cta.view_projects}
                  <svg
                    className='w-5 h-5 ml-2'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M14 5l7 7m0 0l-7 7m7-7H3'
                    />
                  </svg>
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className='px-6 py-3 border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md font-medium transition-colors'
                >
                  {dictionary.cta.contact_me}
                </Link>
              </div>
            </div>
          </div>
          <div className='md:col-span-5 order-1 md:order-2 flex items-center justify-center'>
            <Image
              src='/mateo.png'
              alt='Mateo profile picture'
              width={300}
              height={300}
              priority
              unoptimized
            />
          </div>
        </div>
      </div>

      {/* Featured Projects Section */}
      <div className='bg-gray-50 dark:bg-gray-800 py-16 transition-colors duration-300'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold mb-4 text-gray-900 dark:text-white'>
              {dictionary.home.featured_projects.title}
            </h2>
            <p className='text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
              {dictionary.home.featured_projects.description}
            </p>
          </div>

          {featuredProjects.length === 0 ? (
            <div className='text-center py-12'>
              <div className='mx-auto w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4'>
                <svg
                  className='w-8 h-8 text-gray-400'
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
              <p className='text-gray-600 dark:text-gray-400'>
                {dictionary.home.featured_projects.no_projects}
              </p>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
              {featuredProjects.map((project) => (
                <div
                  key={project.id}
                  className='bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-lg dark:shadow-gray-700/20 dark:hover:shadow-gray-700/30 transition-all duration-300 hover:-translate-y-1 group'
                >
                  {/* Project Image */}
                  <div className='aspect-video relative bg-gray-200 dark:bg-gray-700'>
                    {project.image_url && isValidImageUrl(project.image_url) ? (
                      <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        className='object-cover transition-transform duration-300 group-hover:scale-105'
                      />
                    ) : (
                      <div className='w-full h-full flex items-center justify-center'>
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
                            d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
                          />
                        </svg>
                      </div>
                    )}
                    <div className='absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300' />
                  </div>

                  {/* Project Content */}
                  <div className='p-6'>
                    <h3 className='text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300'>
                      {project.title}
                    </h3>
                    <p className='text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed'>
                      {project.description}
                    </p>

                    {/* Tech Stack Preview */}
                    <div className='flex flex-wrap gap-1 mb-4'>
                      {project.techstack
                        .slice(0, 3)
                        .map((tech: string, index: number) => (
                          <span
                            key={`${tech}-${index}`}
                            className='px-2 py-1 text-xs font-medium rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                          >
                            {tech}
                          </span>
                        ))}
                      {project.techstack.length > 3 && (
                        <span className='px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'>
                          +{project.techstack.length - 3}
                        </span>
                      )}
                    </div>

                    {/* View Project Link */}
                    <Link
                      href={`/${locale}/projects/${project.id}`}
                      className='inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200'
                    >
                      {dictionary.home.featured_projects.view_project}
                      <svg
                        className='w-4 h-4 ml-1 transition-transform group-hover:translate-x-1'
                        fill='none'
                        stroke='currentColor'
                        viewBox='0 0 24 24'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M14 5l7 7m0 0l-7 7m7-7H3'
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className='text-center mt-12'>
            <Link
              href={`/${locale}/projects`}
              className='px-6 py-3 border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-md font-medium inline-flex items-center transition-colors'
            >
              {dictionary.home.featured_projects.view_all}
              <svg
                className='w-5 h-5 ml-2'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M14 5l7 7m0 0l-7 7m7-7H3'
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className='py-16'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold mb-4 text-gray-900 dark:text-white'>
              {dictionary.home.skills.title}
            </h2>
            <p className='text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
              {dictionary.home.skills.description}
            </p>
          </div>

          <TechCard
            technologies={[
              { name: "TypeScript", logo: "typescript.png" },
              { name: "React", logo: "react.png" },
              { name: "Next.js", logo: "nextjs.png" },
              { name: "Node.js", logo: "nodejs.png" },
              { name: "Tailwind CSS", logo: "tailwind.png" },
              { name: "PostgreSQL", logo: "postgresql.png" },
              { name: "Java", logo: "java.png" },
              { name: "C#", logo: "csharp.png" },
              { name: "Kotlin", logo: "kotlin.png" },
              { name: "Angular", logo: "angular.png" },
              { name: "Swift", logo: "swift.png" },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
