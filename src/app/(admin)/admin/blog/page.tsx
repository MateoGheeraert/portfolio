"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BlogPost } from "@/dal/blog";
import { fetchAdminBlogPosts, deleteAdminBlogPost } from "./actions";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch blog posts
  useEffect(() => {
    async function fetchPosts() {
      try {
        const data = await fetchAdminBlogPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  // Delete a blog post
  const handleDeletePost = async (id: string) => {
    if (isDeleting) return;

    setIsDeleting(true);
    try {
      const result = await deleteAdminBlogPost(id);

      if (result.success) {
        // Update the state
        setPosts(posts.filter((post) => post.id !== id));
        setDeleteId(null);
      } else {
        console.error("Failed to delete blog post:", result.error);
      }
    } catch (error) {
      console.error("Error deleting blog post:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return <div className='py-4'>Loading blog posts...</div>;
  }

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Blog Posts</h1>
        <Link
          href='/admin/blog/new'
          className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          Add New Blog Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className='text-center py-10 bg-gray-50 rounded-lg'>
          <p className='text-gray-500'>No blog posts found.</p>
          <p className='mt-2'>
            <Link
              href='/admin/blog/new'
              className='text-indigo-600 hover:text-indigo-500'
            >
              Create your first blog post
            </Link>
          </p>
        </div>
      ) : (
        <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
          <table className='min-w-full divide-y divide-gray-300'>
            <thead className='bg-gray-50'>
              <tr>
                <th
                  scope='col'
                  className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
                >
                  Title
                </th>
                <th
                  scope='col'
                  className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                >
                  Tags
                </th>
                <th
                  scope='col'
                  className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                >
                  Created At
                </th>
                <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-6'>
                  <span className='sr-only'>Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200 bg-white'>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                    {post.title}
                  </td>
                  <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                    {post.tags && post.tags.length > 0
                      ? post.tags.slice(0, 3).join(", ") +
                        (post.tags.length > 3 ? "..." : "")
                      : "-"}
                  </td>
                  <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                    {new Date(post.created_at).toLocaleDateString()}
                  </td>
                  <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'>
                    <div className='flex justify-end gap-2'>
                      <Link
                        href={`/admin/blog/edit/${post.id}`}
                        className='text-indigo-600 hover:text-indigo-900'
                      >
                        Edit
                      </Link>
                      {deleteId === post.id ? (
                        <div className='flex gap-2 items-center'>
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            disabled={isDeleting}
                            className='text-red-600 hover:text-red-900 disabled:opacity-50'
                          >
                            {isDeleting ? "Deleting..." : "Confirm"}
                          </button>
                          <button
                            onClick={() => setDeleteId(null)}
                            className='text-gray-600 hover:text-gray-900'
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteId(post.id)}
                          className='text-red-600 hover:text-red-900'
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
