import { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

interface BlogPageProps {
  params: { locale: string };
}

export default async function BlogPage({ params: { locale } }: BlogPageProps) {
  const dictionary = await getDictionary(locale as Locale);

  return (
    <div className='container mx-auto px-4 py-16 max-w-4xl'>
      <h1 className='text-4xl font-bold mb-8 text-gray-900 dark:text-white'>
        {dictionary.navigation.blog}
      </h1>
      <div className='space-y-8'>
        {/* Blog posts will go here */}
        <article className='bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6'>
          <h2 className='text-2xl font-semibold mb-2 text-gray-900 dark:text-white'>
            Blog Post Title
          </h2>
          <div className='flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4'>
            <span>June 12, 2023</span>
            <span className='mx-2'>•</span>
            <span>5 min read</span>
          </div>
          <p className='text-gray-600 dark:text-gray-400 mb-4'>
            Blog post preview will go here. This is a sample of what the content
            might look like.
          </p>
          <a
            href='#'
            className='text-blue-600 dark:text-blue-400 font-medium hover:underline'
          >
            Read more →
          </a>
        </article>
      </div>
    </div>
  );
}
