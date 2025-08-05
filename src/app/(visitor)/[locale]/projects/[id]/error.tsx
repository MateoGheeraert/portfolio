"use client";

import Link from "next/link";
import { useEffect } from "react";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ProjectError({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Project error:", error);
  }, [error]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 flex items-center justify-center'>
      <div className='text-center px-4'>
        <div className='mx-auto w-32 h-32 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-8'>
          <svg
            className='w-16 h-16 text-red-500 dark:text-red-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.5}
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z'
            />
          </svg>
        </div>

        <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
          Something Went Wrong
        </h1>

        <p className='text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto'>
          We encountered an error while loading this project. Please try again.
        </p>

        <div className='space-y-4'>
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button
              onClick={reset}
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
                  d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                />
              </svg>
              Try Again
            </button>

            <Link
              href='/projects'
              className='inline-flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 font-medium rounded-lg transition-colors duration-200'
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
          </div>

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
