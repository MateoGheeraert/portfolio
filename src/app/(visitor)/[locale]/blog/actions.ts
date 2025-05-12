"use server";

import { getAllBlogPosts, getBlogPostById, BlogPost } from "@/dal/blog";

/**
 * Server action to fetch all blog posts
 */
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  try {
    return await getAllBlogPosts();
  } catch (error) {
    console.error("Error in fetchBlogPosts action:", error);
    throw new Error("Failed to fetch blog posts");
  }
}

/**
 * Server action to fetch a single blog post by ID
 */
export async function fetchBlogPostById(id: string): Promise<BlogPost | null> {
  if (!id) {
    throw new Error("Blog post ID is required");
  }

  try {
    return await getBlogPostById(id);
  } catch (error) {
    console.error(`Error in fetchBlogPostById action for ID ${id}:`, error);
    throw new Error("Failed to fetch blog post");
  }
}
