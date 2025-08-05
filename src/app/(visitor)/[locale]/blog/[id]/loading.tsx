// Simple loading skeleton component to avoid Phosphor Icons SSR issues
function LoadingSkeleton({ className }: { className: string }) {
  return (
    <div
      className={`animate-pulse bg-gray-300 dark:bg-gray-600 rounded ${className}`}
    />
  );
}

export default function BlogPostLoading() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300'>
      <div className='container mx-auto px-4 py-8 max-w-6xl'>
        {/* Back Button Skeleton */}
        <div className='mb-8'>
          <LoadingSkeleton className='h-6 w-32' />
        </div>

        {/* Blog Post Header Skeleton */}
        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-700/20 overflow-hidden mb-8 border border-gray-100 dark:border-gray-700'>
          <LoadingSkeleton className='h-64 md:h-80 lg:h-96 w-full' />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content Skeleton */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Blog Post Content Skeleton */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700/20 p-8 border border-gray-100 dark:border-gray-700'>
              <div className='flex items-center gap-3 mb-6'>
                <LoadingSkeleton className='w-8 h-8 rounded-lg' />
                <LoadingSkeleton className='h-7 w-48' />
              </div>
              <div className='space-y-4'>
                <LoadingSkeleton className='h-6 w-full' />
                <LoadingSkeleton className='h-6 w-full' />
                <LoadingSkeleton className='h-6 w-3/4' />
                <LoadingSkeleton className='h-6 w-full' />
                <LoadingSkeleton className='h-6 w-5/6' />
                <LoadingSkeleton className='h-6 w-full' />
                <LoadingSkeleton className='h-6 w-2/3' />
                <LoadingSkeleton className='h-6 w-full' />
                <LoadingSkeleton className='h-6 w-4/5' />
              </div>
            </div>

            {/* Tags Skeleton */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700/20 p-8 border border-gray-100 dark:border-gray-700'>
              <div className='flex items-center gap-3 mb-6'>
                <LoadingSkeleton className='w-8 h-8 rounded-lg' />
                <LoadingSkeleton className='h-7 w-32' />
              </div>
              <div className='flex flex-wrap gap-3'>
                {Array.from({ length: 5 }).map((_, index) => (
                  <LoadingSkeleton
                    key={index}
                    className='h-8 w-20 rounded-full'
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className='space-y-6'>
            {/* Blog Post Info Skeleton */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700/20 p-6 border border-gray-100 dark:border-gray-700'>
              <LoadingSkeleton className='h-6 w-32 mb-4' />
              <div className='space-y-4'>
                <div className='flex items-center gap-3'>
                  <LoadingSkeleton className='w-5 h-5 rounded' />
                  <div className='space-y-2'>
                    <LoadingSkeleton className='h-4 w-16' />
                    <LoadingSkeleton className='h-5 w-28' />
                  </div>
                </div>
                <div className='flex items-center gap-3'>
                  <LoadingSkeleton className='w-5 h-5 rounded' />
                  <div className='space-y-2'>
                    <LoadingSkeleton className='h-4 w-20' />
                    <LoadingSkeleton className='h-5 w-16' />
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Navigation Skeleton */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700/20 p-6 border border-gray-100 dark:border-gray-700'>
              <LoadingSkeleton className='h-6 w-36 mb-4' />
              <div className='space-y-3'>
                <LoadingSkeleton className='h-12 w-full rounded-lg' />
                <LoadingSkeleton className='h-12 w-full rounded-lg' />
              </div>
            </div>
          </div>
        </div>

        {/* Floating Loading Indicator */}
        <div className='fixed bottom-8 right-8 bg-white dark:bg-gray-800 rounded-full p-4 shadow-lg dark:shadow-gray-700/20 border border-gray-200 dark:border-gray-700'>
          <div className='animate-spin h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full'></div>
        </div>
      </div>
    </div>
  );
}
