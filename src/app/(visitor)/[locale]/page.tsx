import { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Link from "next/link";
import Image from "next/image";
import TechCard from "@/components/TechCard";
import TypewriterEffect from "@/components/TypewriterEffect";
import ImageTooltip from "@/components/ImageTooltip";
import { fetchProjects } from "./projects/actions";
import { LocalizedProject } from "@/dal/projects";

interface HomePageProps {
  params: { locale: string };
}

export default async function HomePage({ params: { locale } }: HomePageProps) {
  const dictionary = await getDictionary(locale as Locale);

  // Fetch projects and get the first 3 for featured section
  let featuredProjects: LocalizedProject[] = [];
  try {
    const allProjects = await fetchProjects(locale as Locale);
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
            {" "}
            <div className='space-y-6 py-10'>
              <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white min-h-[1.2em]'>
                <TypewriterEffect
                  text={dictionary.hero.title}
                  speed={80}
                  showCursor={true}
                  cursorChar='|'
                  startDelay={800}
                />
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
          </div>{" "}
          <div className='md:col-span-5 order-1 md:order-2 flex items-center justify-center'>
            <ImageTooltip
              greeting={dictionary.tooltip.greeting}
              question={dictionary.tooltip.question}
              action={dictionary.tooltip.action}
              button={dictionary.tooltip.button}
              locale={locale}
            >
              <Image
                src='/mateo.png'
                alt='Mateo profile picture'
                width={300}
                height={300}
                priority
                unoptimized
              />
            </ImageTooltip>
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
