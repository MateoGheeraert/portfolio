import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import BlogPostCard from "@/components/BlogPostCard";
import { fetchBlogPosts } from "./actions";

interface BlogPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const dictionary = await getDictionary(locale);
  const blogPosts = await fetchBlogPosts(locale);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16 lg:px-10 lg:py-24">
      <header className="border-b border-gray-300 pb-10 dark:border-gray-700 sm:pb-14">
        <p className="mb-5 font-mono text-xs uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400">{dictionary.blog.title}</p>
        <h1 className="text-6xl font-semibold leading-[0.95] tracking-[-0.055em] text-gray-950 dark:text-white sm:text-8xl">{dictionary.navigation.blog}</h1>
      </header>

      {blogPosts.length === 0 ? (
        <p className="border-b border-gray-300 py-16 leading-7 text-gray-600 dark:border-gray-700 dark:text-gray-400">{dictionary.blog.no_posts}</p>
      ) : (
        <div>{blogPosts.map((post) => <BlogPostCard key={post.id} post={post} locale={locale} />)}</div>
      )}
    </div>
  );
}
