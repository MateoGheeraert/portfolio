"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BlogPostForm from "@/components/admin/BlogPostForm";
import { BlogPost } from "@/dal/blog";
import { getAdminBlogPostById } from "../../actions";

export default function EditBlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      if (!params.id || typeof params.id !== "string") {
        setError("No blog post ID provided");
        setLoading(false);
        return;
      }

      try {
        const result = await getAdminBlogPostById(params.id);

        if (result.error) {
          throw new Error(result.error);
        }

        if (result.post) {
          setPost(result.post);
        } else {
          setError("Blog post not found");
        }
      } catch (error: any) {
        console.error("Error fetching blog post:", error);
        setError(error.message || "Failed to fetch blog post");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [params.id]);

  if (loading) {
    return <div className='py-4'>Loading blog post...</div>;
  }

  if (error) {
    return (
      <div className='py-4 px-4 bg-red-50 text-red-800 rounded-md'>
        <h2 className='text-lg font-medium'>Error</h2>
        <p>{error}</p>
        <button
          onClick={() => router.push("/admin/blog")}
          className='mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          Back to Blog Posts
        </button>
      </div>
    );
  }

  if (!post) {
    return (
      <div className='py-4 px-4 bg-yellow-50 text-yellow-800 rounded-md'>
        <h2 className='text-lg font-medium'>Blog Post Not Found</h2>
        <p>The requested blog post could not be found.</p>
        <button
          onClick={() => router.push("/admin/blog")}
          className='mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          Back to Blog Posts
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Edit Blog Post</h1>
      <BlogPostForm post={post} mode='edit' />
    </div>
  );
}
