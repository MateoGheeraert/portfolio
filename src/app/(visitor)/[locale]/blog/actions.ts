"use server";

import {
  getAllBlogPosts,
  getBlogPostById,
  LocalizedBlogPost,
} from "@/dal/blog";
import { Locale } from "@/i18n/config";

/**
 * Server action to fetch all blog posts
 */
export async function fetchBlogPosts(
  locale: Locale = "en"
): Promise<LocalizedBlogPost[]> {
  try {
    return await getAllBlogPosts(locale);
  } catch (error) {
    console.error("Error in fetchBlogPosts action:", error);
    throw new Error("Failed to fetch blog posts");
  }
}

/**
 * Server action to fetch a single blog post by ID
 */
export async function fetchBlogPostById(
  id: string,
  locale: Locale = "en"
): Promise<LocalizedBlogPost | null> {
  if (!id) {
    throw new Error("Blog post ID is required");
  }
  try {
    return await getBlogPostById(id, locale);
  } catch (error) {
    console.error(`Error in fetchBlogPostById action for ID ${id}:`, error);
    throw new Error("Failed to fetch blog post");
  }
}
