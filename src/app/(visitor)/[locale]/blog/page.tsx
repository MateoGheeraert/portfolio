import { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import BlogPostCard from "@/components/BlogPostCard";
import { fetchBlogPosts } from "./actions";

interface BlogPageProps {
  params: { locale: Locale };
}

export default async function BlogPage({ params: { locale } }: BlogPageProps) {
  const dictionary = await getDictionary(locale);
  const blogPosts = await fetchBlogPosts(locale);

  return (
    <div className='container mx-auto px-4 py-16 max-w-4xl'>
      <h1 className='text-5xl font-bold mb-12 text-gray-900 dark:text-white relative transition-colors duration-300'>
        {dictionary.navigation.blog}
        <span className='absolute -bottom-3 left-0 w-12 h-1.5 bg-blue-500 dark:bg-blue-400 rounded-full'></span>
      </h1>

      {blogPosts.length === 0 ? (
        <p className='text-gray-600 dark:text-gray-400 text-center py-10'>
          {dictionary.blog.no_posts}
        </p>
      ) : (
        <div className='space-y-8'>
          {blogPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
