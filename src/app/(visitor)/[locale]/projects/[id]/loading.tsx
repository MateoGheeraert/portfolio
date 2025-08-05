import { LoadingSkeleton } from "@/components/ui/loading-spinner";

export default function ProjectDetailLoading() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300'>
      <div className='container mx-auto px-4 py-8 max-w-6xl'>
        {/* Back Button Skeleton */}
        <div className='mb-8'>
          <LoadingSkeleton className='h-6 w-32' />
        </div>

        {/* Project Header Skeleton */}
        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-700/20 overflow-hidden mb-8 border border-gray-100 dark:border-gray-700'>
          <LoadingSkeleton className='h-64 md:h-80 lg:h-96 w-full' />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content Skeleton */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Project Description Skeleton */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700/20 p-8 border border-gray-100 dark:border-gray-700'>
              <div className='flex items-center gap-3 mb-6'>
                <LoadingSkeleton className='w-8 h-8 rounded-lg' />
                <LoadingSkeleton className='h-7 w-48' />
              </div>
              <div className='space-y-3'>
                <LoadingSkeleton className='h-6 w-full' />
                <LoadingSkeleton className='h-6 w-full' />
                <LoadingSkeleton className='h-6 w-3/4' />
              </div>
            </div>

            {/* Technology Stack Skeleton */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700/20 p-8 border border-gray-100 dark:border-gray-700'>
              <div className='flex items-center gap-3 mb-6'>
                <LoadingSkeleton className='w-8 h-8 rounded-lg' />
                <LoadingSkeleton className='h-7 w-40' />
              </div>
              <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className='p-4 bg-gray-50 dark:bg-gray-700 rounded-lg'
                  >
                    <LoadingSkeleton className='h-6 w-full' />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Skeleton */}
          <div className='space-y-6'>
            {/* Project Info Skeleton */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700/20 p-6 border border-gray-100 dark:border-gray-700'>
              <LoadingSkeleton className='h-6 w-32 mb-4' />
              <div className='space-y-4'>
                <div className='flex items-center gap-3'>
                  <LoadingSkeleton className='w-5 h-5 rounded' />
                  <div className='space-y-1'>
                    <LoadingSkeleton className='h-4 w-16' />
                    <LoadingSkeleton className='h-5 w-28' />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons Skeleton */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700/20 p-6 border border-gray-100 dark:border-gray-700'>
              <LoadingSkeleton className='h-6 w-28 mb-4' />
              <div className='space-y-3'>
                <LoadingSkeleton className='h-12 w-full rounded-lg' />
                <LoadingSkeleton className='h-12 w-full rounded-lg' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
