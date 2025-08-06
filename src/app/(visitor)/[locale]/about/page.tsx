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
        {dictionary.about.title}
        <span className='absolute -bottom-3 left-0 w-24 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full'></span>
      </h1>

      <div className='bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl shadow-xl dark:shadow-gray-700/20 p-8 mb-12 transition-colors duration-300'>
        {/* Hero section with image and intro */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-12'>
          <div className='lg:col-span-4 flex justify-center lg:justify-start'>
            <div className='relative h-80 w-80 lg:h-96 lg:w-96 overflow-hidden rounded-2xl shadow-lg border-4 border-white dark:border-gray-600 transition-colors duration-300'>
              <Image
                src='/mateo2.jpg'
                alt='Mateo Gheeraert'
                fill
                style={{ objectFit: "cover" }}
                className='transition-transform hover:scale-105 duration-500'
              />
            </div>
          </div>

          <div className='lg:col-span-8 space-y-6'>
            <h2 className='text-3xl font-bold text-gray-800 dark:text-gray-100 mb-3 transition-colors duration-300'>
              {dictionary.about.hero.greeting}{" "}
              <span className='text-blue-600 dark:text-blue-400'>
                {dictionary.about.hero.name}
              </span>
            </h2>
            <p className='text-xl text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300'>
              {dictionary.about.hero.bio}
            </p>
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
              {dictionary.about.sections.education.title}
            </h3>
            <p className='text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300'>
              {dictionary.about.sections.education.content}
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
              {dictionary.about.sections.leadership.title}
            </h3>
            <p className='text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300'>
              {dictionary.about.sections.leadership.content}
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
              {dictionary.about.sections.experience.title}
            </h3>
            <p className='text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300'>
              {dictionary.about.sections.experience.content}
            </p>
          </div>{" "}
        </div>
      </div>

      {/* Timeline section */}
      <div className='bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl dark:shadow-gray-700/20 mb-12 transition-colors duration-300'>
        <div className='text-center mb-10'>
          <h3 className='text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2 transition-colors duration-300'>
            {dictionary.about.sections.timeline.title}
          </h3>
          <p className='text-gray-600 dark:text-gray-400 transition-colors duration-300'>
            {dictionary.about.sections.timeline.subtitle}
          </p>
        </div>

        <div className='relative'>
          {/* Timeline line */}
          <div className='absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-blue-200 dark:bg-blue-700 transition-colors duration-300'></div>

          {/* Timeline items */}
          <div className='space-y-12'>
            {/* High School */}
            <div className='relative flex items-center'>
              <div className='flex-1 pr-8 text-right'>
                <div className='bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-md transition-colors duration-300'>
                  <div className='text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1 transition-colors duration-300'>
                    {
                      dictionary.about.sections.timeline.items.high_school
                        .period
                    }
                  </div>
                  <h4 className='text-lg font-bold text-gray-800 dark:text-gray-100 mb-2 transition-colors duration-300'>
                    {dictionary.about.sections.timeline.items.high_school.title}
                  </h4>
                  <div className='text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300'>
                    {
                      dictionary.about.sections.timeline.items.high_school
                        .institution
                    }
                  </div>
                  <p className='text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300'>
                    {
                      dictionary.about.sections.timeline.items.high_school
                        .description
                    }
                  </p>
                </div>
              </div>
              <div className='absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 dark:bg-blue-400 rounded-full border-4 border-white dark:border-gray-800 transition-colors duration-300'></div>
              <div className='flex-1 pl-8'></div>
            </div>

            {/* Bachelor */}
            <div className='relative flex items-center'>
              <div className='flex-1 pr-8'></div>
              <div className='absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-500 dark:bg-blue-400 rounded-full border-4 border-white dark:border-gray-800 transition-colors duration-300'></div>
              <div className='flex-1 pl-8'>
                <div className='bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-md transition-colors duration-300'>
                  <div className='text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1 transition-colors duration-300'>
                    {dictionary.about.sections.timeline.items.bachelor.period}
                  </div>
                  <h4 className='text-lg font-bold text-gray-800 dark:text-gray-100 mb-2 transition-colors duration-300'>
                    {dictionary.about.sections.timeline.items.bachelor.title}
                  </h4>
                  <div className='text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300'>
                    {
                      dictionary.about.sections.timeline.items.bachelor
                        .institution
                    }
                  </div>
                  <p className='text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300'>
                    {
                      dictionary.about.sections.timeline.items.bachelor
                        .description
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Internship */}
            <div className='relative flex items-center'>
              <div className='flex-1 pr-8 text-right'>
                <div className='bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-xl shadow-md border-2 border-blue-200 dark:border-blue-700 transition-colors duration-300'>
                  <div className='text-sm font-semibold text-blue-600 dark:text-blue-400 mb-1 transition-colors duration-300'>
                    {dictionary.about.sections.timeline.items.internship.period}
                  </div>
                  <h4 className='text-lg font-bold text-gray-800 dark:text-gray-100 mb-2 transition-colors duration-300'>
                    {dictionary.about.sections.timeline.items.internship.title}
                  </h4>
                  <div className='text-sm font-medium text-gray-600 dark:text-gray-300 mb-2 transition-colors duration-300'>
                    {
                      dictionary.about.sections.timeline.items.internship
                        .institution
                    }
                  </div>
                  <p className='text-gray-600 dark:text-gray-400 text-sm transition-colors duration-300'>
                    {
                      dictionary.about.sections.timeline.items.internship
                        .description
                    }
                  </p>
                  <div className='flex flex-wrap gap-2 mt-3 justify-end'>
                    <span className='px-3 py-1 text-xs font-medium rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 transition-colors duration-300'>
                      Google Vertex AI
                    </span>
                    <span className='px-3 py-1 text-xs font-medium rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 transition-colors duration-300'>
                      OpenAI
                    </span>
                    <span className='px-3 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 transition-colors duration-300'>
                      Full-Stack AI
                    </span>
                  </div>
                </div>
              </div>
              <div className='absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-white dark:border-gray-800 transition-colors duration-300'></div>
              <div className='flex-1 pl-8'></div>
            </div>
          </div>
        </div>
      </div>

      {/* Final section */}
      <div className='bg-blue-600 dark:bg-blue-700 text-white p-8 rounded-2xl shadow-xl dark:shadow-gray-700/20 transform hover:-translate-y-1 transition-all duration-300'>
        <h3 className='text-2xl font-bold mb-4'>
          {dictionary.about.sections.learning.title}
        </h3>
        <p className='text-blue-100 dark:text-blue-200 leading-relaxed mb-6 transition-colors duration-300'>
          {dictionary.about.sections.learning.content_intro}
        </p>
        <p className='text-blue-100 dark:text-blue-200 leading-relaxed transition-colors duration-300'>
          {dictionary.about.sections.learning.content_outro}
        </p>
      </div>
    </div>
  );
}
