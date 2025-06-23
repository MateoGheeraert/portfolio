"use client";

import { BlogPost } from "@/dal/blog";
import Image from "next/image";
import Link from "next/link";

interface BlogPostCardProps {
  post: BlogPost;
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
    <article className='bg-white rounded-lg shadow-lg overflow-hidden flex flex-col'>
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
        <h2 className='text-2xl font-semibold mb-2 text-gray-900'>
          {post.title}
        </h2>
        <div className='flex items-center text-sm text-gray-500 mb-4'>
          <span>{formattedDate}</span>
        </div>
        <p className='text-gray-600 mb-4'>{post.description}</p>

        {post.tags && post.tags.length > 0 && (
          <div className='flex flex-wrap gap-2 mb-4'>
            {post.tags.map((tag, index) => (
              <span
                key={`${tag}-${index}`}
                className='px-2 py-1 text-xs rounded bg-purple-100 text-purple-800'
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <Link
          href={`/${locale}/blog/${post.id}`}
          className='text-blue-600 font-medium hover:underline inline-block'
        >
          Read more →
        </Link>
      </div>
    </article>
  );
}
