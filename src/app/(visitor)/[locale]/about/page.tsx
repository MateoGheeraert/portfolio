import Image from "next/image";
import { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

interface AboutPageProps {
  params: { locale: string };
}

export default async function AboutPage({
  params: { locale },
}: AboutPageProps) {
  const dictionary = await getDictionary(locale as Locale);

  return (
    <div className='container mx-auto px-4 py-16 max-w-5xl'>
      <h1 className='text-5xl font-bold mb-12 text-gray-900 dark:text-white relative transition-colors duration-300'>
        {dictionary.navigation.about}
        <span className='absolute -bottom-3 left-0 w-24 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full'></span>
      </h1>

      <div className='bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-xl dark:shadow-gray-700/20 p-8 mb-12 transition-colors duration-300'>
        {/* Hero section with image and intro */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-12'>
          <div className='lg:col-span-4 flex justify-center lg:justify-start'>
            <div className='relative h-80 w-80 lg:h-96 lg:w-96 overflow-hidden rounded-2xl shadow-lg border-4 border-white dark:border-gray-600 transition-colors duration-300'>
              <Image
                src='/mateo.png'
                alt='Mateo Gheeraert'
                fill
                style={{ objectFit: "cover" }}
                className='transition-transform hover:scale-105 duration-500'
              />
            </div>
          </div>

          <div className='lg:col-span-8 space-y-6'>
            <h2 className='text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3 transition-colors duration-300'>
              Hi there! I&apos;m{" "}
              <span className='text-blue-600 dark:text-blue-400'>
                Mateo Gheeraert
              </span>
            </h2>
            <p className='text-xl text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300'>
              A 20-year-old software developer from Merkem, Belgium with almost
              five years of experience in software development. I&apos;m
              passionate about turning ideas into real, usable digital
              solutions. I love building things that work well and look great.
            </p>

            <div className='flex flex-wrap gap-3 pt-4'>
              <span className='px-4 py-2 text-sm font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 shadow-sm transition-colors duration-300'>
                TypeScript
              </span>
              <span className='px-4 py-2 text-sm font-medium rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 shadow-sm transition-colors duration-300'>
                React
              </span>
              <span className='px-4 py-2 text-sm font-medium rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 shadow-sm transition-colors duration-300'>
                Next.js
              </span>
              <span className='px-4 py-2 text-sm font-medium rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 shadow-sm transition-colors duration-300'>
                Node.js
              </span>
              <span className='px-4 py-2 text-sm font-medium rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 shadow-sm transition-colors duration-300'>
                Java
              </span>
              <span className='px-4 py-2 text-sm font-medium rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 shadow-sm transition-colors duration-300'>
                C#
              </span>
              <span className='px-4 py-2 text-sm font-medium rounded-full bg-teal-100 dark:bg-teal-900/30 text-teal-800 dark:text-teal-300 shadow-sm transition-colors duration-300'>
                MongoDB
              </span>
            </div>
          </div>
        </div>

        {/* Main content in cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          <div className='bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg dark:shadow-gray-700/20 dark:hover:shadow-gray-700/30 transition-all duration-300 border border-gray-100 dark:border-gray-700'>
            <div className='w-12 h-12 bg-blue-500 dark:bg-blue-600 text-white rounded-lg flex items-center justify-center mb-4 transition-colors duration-300'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 14l-7 7m0 0l-7-7m7 7V3'
                />
              </svg>
            </div>
            <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3 transition-colors duration-300'>
              Education & Skills
            </h3>
            <p className='text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300'>
              I&apos;m currently studying Software Development at VIVES
              University of Applied Sciences in Kortrijk, where I&apos;ve been
              sharpening my skills in JavaScript, React, Node.js, Java, C#,
              Kotlin, Swift, and Angular. I work with both SQL and NoSQL
              databases, and I&apos;m especially into using MongoDB for most of
              my personal projects.
            </p>
          </div>

          <div className='bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg dark:shadow-gray-700/20 dark:hover:shadow-gray-700/30 transition-all duration-300 border border-gray-100 dark:border-gray-700'>
            <div className='w-12 h-12 bg-yellow-500 dark:bg-yellow-600 text-white rounded-lg flex items-center justify-center mb-4 transition-colors duration-300'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                />
              </svg>
            </div>
            <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3 transition-colors duration-300'>
              Leadership & Community
            </h3>
            <p className='text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300'>
              Outside of school, I&apos;m very involved in youth work as the
              president of KLJ Merkem. I organize events, lead a fantastic team
              of volunteers, and even built our official website kljmerkem.be.
              Being in this role has taught me a lot about leadership, teamwork,
              and staying creative — skills that I bring into every software
              project I work on.
            </p>
          </div>

          <div className='bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md hover:shadow-lg dark:shadow-gray-700/20 dark:hover:shadow-gray-700/30 transition-all duration-300 border border-gray-100 dark:border-gray-700 md:col-span-2'>
            <div className='w-12 h-12 bg-green-500 dark:bg-green-600 text-white rounded-lg flex items-center justify-center mb-4 transition-colors duration-300'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
                />
              </svg>
            </div>
            <h3 className='text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3 transition-colors duration-300'>
              Technical Experience
            </h3>
            <p className='text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300'>
              Over the years, I&apos;ve taken on a wide range of technical
              challenges: from building secure APIs with Spring Boot and JWT, to
              creating cross-platform mobile apps using React Native and Expo,
              to deploying containerized fullstack applications with Docker,
              Kubernetes, and CI/CD pipelines. I&apos;m also currently diving
              into NestJS and GraphQL for a personal project that helps manage
              agile development workflows.
            </p>
          </div>
        </div>
      </div>

      {/* Final section */}
      <div className='bg-blue-600 dark:bg-blue-700 text-white p-8 rounded-2xl shadow-xl dark:shadow-gray-700/20 transform hover:-translate-y-1 transition-all duration-300'>
        <h3 className='text-2xl font-bold mb-4'>
          Always Learning, Always Building
        </h3>
        <p className='text-blue-100 dark:text-blue-200 leading-relaxed mb-6 transition-colors duration-300'>
          I&apos;m always exploring new technologies, always building, and
          always learning. Whether it&apos;s experimenting with UX improvements,
          optimizing performance, or writing clean and scalable code — I care
          deeply about the quality of what I create.
        </p>
        <p className='text-blue-100 dark:text-blue-200 leading-relaxed transition-colors duration-300'>
          Thanks for visiting my portfolio! If you&apos;re curious about what
          I&apos;ve built so far, head over to the Projects page. Want to chat
          or collaborate? You can reach out via the Contact page. I also share
          some thoughts and lessons learned on my Blog.
        </p>
      </div>
    </div>
  );
}
