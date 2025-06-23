"use client";

import Link from "next/link";
import { ArrowLeft, Warning } from "@phosphor-icons/react";
import { useEffect } from "react";

interface BlogErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function BlogErrorPage({ error, reset }: BlogErrorPageProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Blog post error:", error);
  }, [error]);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300 flex items-center justify-center'>
      <div className='text-center px-4 max-w-lg mx-auto'>
        {/* Error Icon */}
        <div className='mx-auto w-32 h-32 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-8'>
          <Warning size={64} className='text-red-500 dark:text-red-400' />
        </div>

        {/* Error Message */}
        <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
          Something went wrong!
        </h1>

        <p className='text-xl text-gray-600 dark:text-gray-400 mb-8'>
          We encountered an error while loading this blog post. This could be a
          temporary issue.
        </p>

        {/* Error Details (in development) */}
        {process.env.NODE_ENV === "development" && (
          <div className='mb-8 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-left'>
            <h3 className='font-semibold text-red-800 dark:text-red-200 mb-2'>
              Error Details:
            </h3>
            <p className='text-sm text-red-700 dark:text-red-300 font-mono break-all'>
              {error.message}
            </p>
            {error.digest && (
              <p className='text-xs text-red-600 dark:text-red-400 mt-2'>
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <button
            onClick={reset}
            className='inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200'
          >
            🔄 Try Again
          </button>

          <Link
            href='/blog'
            className='inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-lg transition-colors duration-200'
          >
            <ArrowLeft size={20} />
            Back to Blog
          </Link>
        </div>

        {/* Additional Help */}
        <div className='mt-8 pt-8 border-t border-gray-200 dark:border-gray-700'>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            If this problem persists, please{" "}
            <Link
              href='/contact'
              className='text-blue-600 dark:text-blue-400 hover:underline'
            >
              contact us
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
