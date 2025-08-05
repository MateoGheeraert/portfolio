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
  // Duplicate the technologies array to create seamless loop
  const duplicatedTechnologies = [...technologies, ...technologies];

  return (
    <div className='relative overflow-hidden py-8'>
      {/* Container with slope effect */}
      <div className='transform -rotate-2 scale-110 origin-center'>
        <div className='flex animate-scroll-horizontal gap-8 whitespace-nowrap'>
          {duplicatedTechnologies.map((tech, index) => (
            <div
              key={`${tech.name}-${index}`}
              className='flex-shrink-0 flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl dark:shadow-gray-700/20 dark:hover:shadow-gray-700/40 transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:scale-105 group'
              style={{ minWidth: "140px" }}
            >
              <div className='w-16 h-16 mb-4 flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-full p-3 transition-all duration-300 group-hover:from-blue-200 group-hover:to-blue-300 dark:group-hover:from-blue-800/40 dark:group-hover:to-blue-700/40'>
                <Image
                  src={`/logos/${tech.logo}`}
                  alt={`${tech.name} logo`}
                  width={40}
                  height={40}
                  className='object-contain transition-transform duration-300 group-hover:scale-110'
                />
              </div>
              <span className='font-semibold text-gray-900 dark:text-white transition-colors duration-300 text-center text-sm'>
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Gradient overlays for fade effect */}
      <div className='absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent pointer-events-none z-10'></div>
      <div className='absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent pointer-events-none z-10'></div>
    </div>
  );
}
