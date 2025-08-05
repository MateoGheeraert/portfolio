"use client";

import Image from "next/image";

interface Technology {
  name: string;
  logo: string;
}

interface TechCardProps {
  technologies: Technology[];
}

export default function TechCard({ technologies }: TechCardProps) {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
      {technologies.map((tech) => (
        <div
          key={tech.name}
          className='flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md dark:shadow-gray-700/20 dark:hover:shadow-gray-700/30 transition-all duration-300 border border-gray-200 dark:border-gray-700'
        >
          <div className='w-16 h-16 mb-4 flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 rounded-full p-2 transition-colors duration-300'>
            <Image
              src={`/logos/${tech.logo}`}
              alt={`${tech.name} logo`}
              width={48}
              height={48}
              className='object-contain'
            />
          </div>
          <span className='font-medium text-gray-900 dark:text-white transition-colors duration-300'>
            {tech.name}
          </span>
        </div>
      ))}
    </div>
  );
}
