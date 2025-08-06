"use client";

import { LocalizedBlogPost } from "@/dal/blog";
import Image from "next/image";
import Link from "next/link";

interface BlogPostCardProps {
  post: LocalizedBlogPost;
  locale: string;
}

export default function BlogPostCard({ post, locale }: BlogPostCardProps) {
  // Format date directly in the component
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formattedDate = formatDate(post.created_at);
  // Helper function to validate image URL
  const isValidImageUrl = (url: string): boolean => {
    if (!url || typeof url !== "string") return false;
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === "http:" || urlObj.protocol === "https:";
    } catch {
      // If it's not a valid URL, check if it's a relative path
      return url.startsWith("/");
    }
  };

  return (
    <article className='bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-gray-700/20 overflow-hidden flex flex-col border border-gray-100 dark:border-gray-700 transition-colors duration-300'>
      {post.image_url && isValidImageUrl(post.image_url) && (
        <div className='relative h-48 w-full'>
          <Image
            src={post.image_url}
            alt={post.title}
            fill
            className='object-cover'
            onError={() => {
              // Hide the image container if image fails to load
              console.warn(`Failed to load image: ${post.image_url}`);
            }}
          />
        </div>
      )}
      <div className='p-6 flex-grow'>
        <h2 className='text-2xl font-semibold mb-2 text-gray-900 dark:text-white transition-colors duration-300'>
          {post.title}
        </h2>
        <div className='flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4 transition-colors duration-300'>
          <span>{formattedDate}</span>
        </div>
        <p className='text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300'>
          {post.description}
        </p>

        {post.tags && post.tags.length > 0 && (
          <div className='flex flex-wrap gap-2 mb-4'>
            {post.tags.map((tag, index) => (
              <span
                key={`${tag}-${index}`}
                className='px-2 py-1 text-xs rounded bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 transition-colors duration-300'
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <Link
          href={`/${locale}/blog/${post.id}`}
          className='text-blue-600 dark:text-blue-400 font-medium hover:underline inline-block transition-colors duration-300'
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}
