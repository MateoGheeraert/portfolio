import { supabaseAdmin } from "./db";

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  image_url?: string;
  tags?: string[];
  read_time?: number;
  created_at: string;
}

/**
 * Fetches all blog posts from the database
 */
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabaseAdmin
    .from("blog")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts:", error);
    throw new Error(`Failed to fetch blog posts: ${error.message}`);
  }

  // Parse tags string to array if needed
  return (data || []).map((post: any) => ({
    ...post,
    tags: Array.isArray(post.tags)
      ? post.tags
      : typeof post.tags === "string"
      ? post.tags.split(",").map((tag: string) => tag.trim())
      : [],
  }));
}

/**
 * Fetches a single blog post by ID
 */
export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  const { data, error } = await supabaseAdmin
    .from("blog")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // PGRST116 is the error code for "no rows returned"
      return null;
    }

    console.error(`Error fetching blog post with ID ${id}:`, error);
    throw new Error(`Failed to fetch blog post: ${error.message}`);
  }

  // Parse tags string to array if needed
  return data
    ? {
        ...data,
        tags: Array.isArray(data.tags)
          ? data.tags
          : typeof data.tags === "string"
          ? data.tags.split(",").map((tag: string) => tag.trim())
          : [],
      }
    : null;
}
