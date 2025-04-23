import { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Link from "next/link";
import Image from "next/image";
import TechCard from "@/components/TechCard";

interface HomePageProps {
  params: { locale: string };
}

export default async function HomePage({ params: { locale } }: HomePageProps) {
  const dictionary = await getDictionary(locale as Locale);

  return (
    <div className='py-16'>
      {/* Hero Section */}
      <div className='container mx-auto px-4 mb-20'>
        <div className='grid grid-cols-1 md:grid-cols-12 gap-8'>
          <div className='md:col-span-7 order-2 md:order-1'>
            <div className='space-y-6 py-10'>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900'>
                {dictionary.hero.title}
              </h1>
              <h2 className='text-xl md:text-2xl text-blue-600 font-medium'>
                {dictionary.hero.subtitle}
              </h2>
              <p className='max-w-xl text-lg leading-relaxed text-gray-700'>
                {dictionary.hero.description}
              </p>
              <div className='flex flex-wrap gap-4'>
                <Link
                  href={`/${locale}/projects`}
                  className='px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium inline-flex items-center'
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
                  className='px-6 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-md font-medium'
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
      <div className='bg-gray-50 py-16'>
        <div className='container mx-auto px-4'>
          <div className='text-center mb-12'>
            <h2 className='text-3xl font-bold mb-4 text-gray-900'>
              Featured Projects
            </h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              Here are some of my recent projects. Check out my projects page
              for more.
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className='bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow'
              >
                <div className='aspect-video relative'>
                  <div className='bg-gray-200 w-full h-full'></div>
                </div>
                <div className='p-6'>
                  <h3 className='text-xl font-semibold mb-2 text-gray-900'>
                    Project {item}
                  </h3>
                  <p className='text-gray-600 mb-4'>
                    A short description of project {item} and the technologies
                    used.
                  </p>
                  <Link
                    href={`/${locale}/projects/${item}`}
                    className='inline-flex items-center text-blue-600 hover:underline'
                  >
                    View Project
                    <svg
                      className='w-4 h-4 ml-1'
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

          <div className='text-center mt-12'>
            <Link
              href={`/${locale}/projects`}
              className='px-6 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-md font-medium inline-flex items-center'
            >
              View All Projects
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
            <h2 className='text-3xl font-bold mb-4 text-gray-900'>
              Skills & Technologies
            </h2>
            <p className='text-gray-600 max-w-2xl mx-auto'>
              These are the technologies and tools I work with regularly.
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
