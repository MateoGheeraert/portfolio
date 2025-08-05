import Link from "next/link";

export default function BlogNotFound() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 flex items-center justify-center'>
      <div className='text-center px-4 max-w-lg mx-auto'>
        {/* 404 Illustration */}
        <div className='mx-auto w-32 h-32 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-8'>
          <svg
            className='w-16 h-16 text-blue-500 dark:text-blue-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.5}
              d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
            />
          </svg>
        </div>

        {/* 404 Message */}
        <h1 className='text-6xl font-bold text-gray-900 dark:text-white mb-4'>
          404
        </h1>

        <h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4'>
          Blog Post Not Found
        </h2>

        <p className='text-lg text-gray-600 dark:text-gray-400 mb-8'>
          The blog post you're looking for doesn't exist or may have been moved.
        </p>

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Link
            href='/blog'
            className='inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200'
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
            Back to Blog
          </Link>

          <Link
            href='/'
            className='inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-lg transition-colors duration-200'
          >
            🏠 Home Page
          </Link>
        </div>

        {/* Helpful Suggestions */}
        <div className='mt-12 pt-8 border-t border-gray-200 dark:border-gray-700'>
          <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4'>
            Looking for something else?
          </h3>

          <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm'>
            <Link
              href='/projects'
              className='p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-colors duration-200 group'
            >
              <div className='text-2xl mb-2 group-hover:scale-110 transition-transform duration-200'>
                🚀
              </div>
              <h4 className='font-medium text-gray-900 dark:text-white mb-1'>
                My Projects
              </h4>
              <p className='text-gray-600 dark:text-gray-400'>
                Check out my latest work
              </p>
            </Link>

            <Link
              href='/contact'
              className='p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-colors duration-200 group'
            >
              <div className='text-2xl mb-2 group-hover:scale-110 transition-transform duration-200'>
                💬
              </div>
              <h4 className='font-medium text-gray-900 dark:text-white mb-1'>
                Get in Touch
              </h4>
              <p className='text-gray-600 dark:text-gray-400'>
                Let's start a conversation
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
