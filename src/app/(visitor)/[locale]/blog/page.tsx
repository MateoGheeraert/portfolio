import { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import BlogPostCard from "@/components/BlogPostCard";
import { fetchBlogPosts } from "./actions";

interface BlogPageProps {
  params: { locale: Locale };
}

export default async function BlogPage({ params: { locale } }: BlogPageProps) {
  const dictionary = await getDictionary(locale);
  const blogPosts = await fetchBlogPosts();

  return (
    <div className='container mx-auto px-4 py-16 max-w-4xl'>
      <h1 className='text-4xl font-bold mb-8 text-gray-900'>
        {dictionary.navigation.blog}
      </h1>

      {blogPosts.length === 0 ? (
        <p className='text-gray-600 text-center py-10'>No blog posts found.</p>
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
