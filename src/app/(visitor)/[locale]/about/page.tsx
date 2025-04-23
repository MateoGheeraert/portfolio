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
    <div className='container mx-auto px-4 py-16 max-w-4xl'>
      <h1 className='text-4xl font-bold mb-8 text-gray-900'>
        {dictionary.navigation.about}
      </h1>
      <div className='bg-white rounded-lg shadow-lg p-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='md:col-span-1'>
            <div className='aspect-square rounded-full bg-gray-200 mb-4 overflow-hidden'>
              {/* Profile image placeholder */}
              <div className='w-full h-full flex items-center justify-center text-gray-400'>
                Profile Image
              </div>
            </div>
          </div>
          <div className='md:col-span-2 space-y-6'>
            <h2 className='text-2xl font-semibold text-gray-900'>
              Mateo Gheeraert
            </h2>
            <p className='text-gray-600'>
              Full-Stack Developer with expertise in React, Next.js, and
              Node.js. Passionate about creating intuitive, performant web
              applications that solve real-world problems.
            </p>
            <div>
              <h3 className='text-lg font-medium text-gray-900 mb-2'>Skills</h3>
              <div className='flex flex-wrap gap-2'>
                <span className='px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-800'>
                  TypeScript
                </span>
                <span className='px-3 py-1 text-sm rounded-full bg-green-100 text-green-800'>
                  React
                </span>
                <span className='px-3 py-1 text-sm rounded-full bg-purple-100 text-purple-800'>
                  Next.js
                </span>
                <span className='px-3 py-1 text-sm rounded-full bg-yellow-100 text-yellow-800'>
                  Node.js
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
