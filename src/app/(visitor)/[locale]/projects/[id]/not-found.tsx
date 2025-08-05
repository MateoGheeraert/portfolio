import Link from "next/link";

export default function ProjectNotFound() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 flex items-center justify-center'>
      <div className='text-center px-4'>
        <div className='mx-auto w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-8'>
          <svg
            className='w-16 h-16 text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.5}
              d='M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.522.881-6.172 2.344A7.962 7.962 0 014 12c0-4.418 3.582-8 8-8s8 3.582 8 8-3.582 8-8 8-8-3.582-8-8z'
            />
          </svg>
        </div>

        <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
          Project Not Found
        </h1>

        <p className='text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto'>
          The project you&apos;re looking for doesn&apos;t exist or may have
          been removed.
        </p>

        <div className='space-y-4'>
          <Link
            href='/projects'
            className='inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200'
          >
            <svg
              className='w-5 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M10 19l-7-7m0 0l7-7m-7 7h18'
              />
            </svg>
            Back to Projects
          </Link>

          <div>
            <Link
              href='/'
              className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200'
            >
              Or go back to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
