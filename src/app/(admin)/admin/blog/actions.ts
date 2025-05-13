"use server";

import { supabaseAdmin } from "@/dal/db";
import { BlogPost } from "@/dal/blog";

/**
 * Server action to fetch all blog posts for admin
 */
export async function fetchAdminBlogPosts(): Promise<BlogPost[]> {
  try {
    if (!supabaseAdmin) {
      throw new Error("Database client is not available");
    }

    const { data, error } = await supabaseAdmin
      .from("blog")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Format blog data
    return data.map((post) => ({
      ...post,
      tags: Array.isArray(post.tags)
        ? post.tags
        : typeof post.tags === "string"
        ? post.tags.split(",").map((tag: string) => tag.trim())
        : [],
    })) as BlogPost[];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw new Error("Failed to fetch blog posts");
  }
}

/**
 * Server action to fetch a single blog post by ID
 */
export async function getAdminBlogPostById(
  id: string
): Promise<{ post?: BlogPost; error?: string }> {
  try {
    if (!supabaseAdmin) {
      throw new Error("Database client is not available");
    }

    const { data, error } = await supabaseAdmin
      .from("blog")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return { error: "Blog post not found" };
      }
      throw error;
    }

    return {
      post: {
        ...data,
        tags: Array.isArray(data.tags)
          ? data.tags
          : typeof data.tags === "string"
          ? data.tags.split(",").map((tag: string) => tag.trim())
          : [],
      } as BlogPost,
    };
  } catch (error: any) {
    console.error(`Error fetching blog post with ID ${id}:`, error);
    return { error: error.message || "Failed to fetch blog post" };
  }
}

/**
 * Server action to delete a blog post
 */
export async function deleteAdminBlogPost(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!supabaseAdmin) {
      throw new Error("Database client is not available");
    }

    const { error } = await supabaseAdmin.from("blog").delete().eq("id", id);

    if (error) throw error;

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting blog post:", error);
    return {
      success: false,
      error: error.message || "Failed to delete blog post",
    };
  }
}

/**
 * Server action to create a new blog post
 */
export async function createAdminBlogPost(
  blogData: Omit<BlogPost, "id" | "created_at">
): Promise<{ success: boolean; post?: BlogPost; error?: string }> {
  try {
    if (!supabaseAdmin) {
      throw new Error("Database client is not available");
    }

    const { data, error } = await supabaseAdmin
      .from("blog")
      .insert([blogData])
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      post: {
        ...data,
        tags: Array.isArray(data.tags)
          ? data.tags
          : typeof data.tags === "string"
          ? data.tags.split(",").map((tag: string) => tag.trim())
          : [],
      } as BlogPost,
    };
  } catch (error: any) {
    console.error("Error creating blog post:", error);
    return {
      success: false,
      error: error.message || "Failed to create blog post",
    };
  }
}

/**
 * Server action to update an existing blog post
 */
export async function updateAdminBlogPost(
  id: string,
  blogData: Partial<Omit<BlogPost, "id" | "created_at">>
): Promise<{ success: boolean; post?: BlogPost; error?: string }> {
  try {
    if (!supabaseAdmin) {
      throw new Error("Database client is not available");
    }

    const { data, error } = await supabaseAdmin
      .from("blog")
      .update(blogData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      post: {
        ...data,
        tags: Array.isArray(data.tags)
          ? data.tags
          : typeof data.tags === "string"
          ? data.tags.split(",").map((tag: string) => tag.trim())
          : [],
      } as BlogPost,
    };
  } catch (error: any) {
    console.error("Error updating blog post:", error);
    return {
      success: false,
      error: error.message || "Failed to update blog post",
    };
  }
}
