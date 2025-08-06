import { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { fetchBlogPostById } from "../actions";
import { notFound } from "next/navigation";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";
import Image from "next/image";
import Link from "next/link";

interface BlogPostDetailPageProps {
  params: {
    locale: Locale;
    id: string;
  };
}

export default async function BlogPostDetailPage({
  params: { locale, id },
}: BlogPostDetailPageProps) {
  // Fetch data on the server
  const [blogPost, dictionary] = await Promise.all([
    fetchBlogPostById(id, locale),
    getDictionary(locale),
  ]);

  if (!blogPost) {
    notFound();
  }

  // Helper function to validate image URL
  const isValidImageUrl = (url: string): boolean => {
    if (!url || typeof url !== "string") return false;
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === "http:" || urlObj.protocol === "https:";
    } catch {
      return url.startsWith("/");
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300'>
      <div className='container mx-auto px-4 py-8 max-w-6xl'>
        {/* Back Button */}
        <Link
          href={`/${locale}/blog`}
          className='inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 mb-8 group'
        >
          <svg
            className='w-5 h-5 transition-transform group-hover:-translate-x-1'
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
          {dictionary.blog.back_to_blog}
        </Link>

        {/* Blog Post Header */}
        <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-700/20 overflow-hidden mb-8 border border-gray-100 dark:border-gray-700'>
          {/* Blog Post Image */}
          {blogPost.image_url && isValidImageUrl(blogPost.image_url) && (
            <div className='relative h-64 md:h-80 lg:h-96 w-full'>
              <Image
                src={blogPost.image_url}
                alt={blogPost.title}
                fill
                className='object-cover'
                priority
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/50 to-transparent' />
              <div className='absolute bottom-6 left-6 right-6'>
                <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2'>
                  {blogPost.title}
                </h1>
                {blogPost.description && (
                  <p className='text-lg text-gray-200 max-w-3xl'>
                    {blogPost.description}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Blog Post Header Content (when no image) */}
          {(!blogPost.image_url || !isValidImageUrl(blogPost.image_url)) && (
            <div className='p-8 md:p-12'>
              <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4'>
                {blogPost.title}
              </h1>
              {blogPost.description && (
                <p className='text-xl text-gray-600 dark:text-gray-400 max-w-3xl'>
                  {blogPost.description}
                </p>
              )}
            </div>
          )}
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Blog Post Content */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700/20 p-8 border border-gray-100 dark:border-gray-700'>
              <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3'>
                <div className='w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center'>
                  <span className='text-blue-600 dark:text-blue-400 text-sm font-bold'>
                    📝
                  </span>
                </div>
                {dictionary.blog.article_content}
              </h2>
              <MarkdownRenderer content={blogPost.content} />
            </div>

            {/* Tags Section */}
            {blogPost.tags && blogPost.tags.length > 0 && (
              <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700/20 p-8 border border-gray-100 dark:border-gray-700'>
                <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3'>
                  <div className='w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center'>
                    <svg
                      className='w-4 h-4 text-green-600 dark:text-green-400'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
                      />
                    </svg>
                  </div>
                  {dictionary.blog.tags}
                </h2>
                <div className='flex flex-wrap gap-3'>
                  {blogPost.tags.map((tag, index) => (
                    <span
                      key={`${tag}-${index}`}
                      className='inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium rounded-full border border-blue-200 dark:border-blue-700'
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Blog Post Info */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700/20 p-6 border border-gray-100 dark:border-gray-700'>
              <h3 className='text-lg font-bold text-gray-900 dark:text-white mb-4'>
                {dictionary.blog.article_details}
              </h3>

              <div className='space-y-4'>
                <div className='flex items-center gap-3 text-gray-600 dark:text-gray-400'>
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
                      d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
                    />
                  </svg>
                  <div>
                    <p className='text-sm'>{dictionary.blog.published}</p>
                    <p className='font-medium text-gray-900 dark:text-white'>
                      {new Date(blogPost.created_at).toLocaleDateString(
                        locale,
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </div>

                {blogPost.read_time && (
                  <div className='flex items-center gap-3 text-gray-600 dark:text-gray-400'>
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
                        d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                    <div>
                      <p className='text-sm'>{dictionary.blog.read_time}</p>
                      <p className='font-medium text-gray-900 dark:text-white'>
                        {blogPost.read_time} min read
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Navigation */}
            <div className='bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700/20 p-6 border border-gray-100 dark:border-gray-700'>
              <h3 className='text-lg font-bold text-gray-900 dark:text-white mb-4'>
                {dictionary.blog.quick_navigation}
              </h3>

              <div className='space-y-3'>
                <Link
                  href={`/${locale}/blog`}
                  className='flex items-center justify-center gap-3 w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200'
                >
                  <svg
                    className='w-4 h-4'
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
                  {dictionary.blog.all_blog_posts}
                </Link>

                <Link
                  href={`/${locale}/contact`}
                  className='flex items-center justify-center gap-3 w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-lg transition-colors duration-200'
                >
                  💬 {dictionary.blog.contact_me}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
