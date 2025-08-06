import { supabaseAdmin } from "./db";
import { Locale } from "@/i18n/config";

export interface BlogPost {
  id: string;
  title_dutch: string;
  title_english: string;
  title_french: string;
  content_dutch: string;
  content_english: string;
  content_french: string;
  image_url?: string;
  tags?: string[];
  read_time?: number;
  created_at: string;
}

export interface LocalizedBlogPost {
  id: string;
  title: string;
  content: string;
  description: string; // Generated from first lines of content
  image_url?: string;
  tags?: string[];
  read_time?: number;
  created_at: string;
}

/**
 * Helper function to localize a blog post based on the given locale
 */
function localizeBlogPost(post: BlogPost, locale: Locale): LocalizedBlogPost {
  const getLocalizedField = (fieldPrefix: string): string => {
    const fieldName = `${fieldPrefix}_${locale === "en" ? "english" : locale === "nl" ? "dutch" : "french"}`;
    return (post as any)[fieldName] || "";
  };

  const title = getLocalizedField("title");
  const content = getLocalizedField("content");

  // Generate description from first few lines of content (max 150 characters)
  const description =
    content
      .replace(/<[^>]*>/g, "") // Remove HTML tags
      .split("\n")
      .slice(0, 3)
      .join(" ")
      .substring(0, 150)
      .trim() + (content.length > 150 ? "..." : "");

  return {
    id: post.id,
    title,
    content,
    description,
    image_url: post.image_url,
    tags: post.tags,
    read_time: post.read_time,
    created_at: post.created_at,
  };
}

/**
 * Fetches all blog posts from the database and localizes them
 * @throws Error if not called from the server
 */
export async function getAllBlogPosts(
  locale: Locale = "en"
): Promise<LocalizedBlogPost[]> {
  if (!supabaseAdmin) {
    throw new Error("This function can only be called from the server");
  }

  const { data, error } = await supabaseAdmin
    .from("blog")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching blog posts:", error);
    throw new Error(`Failed to fetch blog posts: ${error.message}`);
  }
  // Parse tags string to array if needed and localize posts
  const localizedPosts = (data || []).map((post: any) => {
    const blogPost: BlogPost = {
      ...post,
      tags: Array.isArray(post.tags)
        ? post.tags
        : typeof post.tags === "string"
          ? post.tags.split(",").map((tag: string) => tag.trim())
          : [],
    };
    return localizeBlogPost(blogPost, locale);
  });

  return localizedPosts;
}

/**
 * Fetches a single blog post by ID and localizes it
 * @throws Error if not called from the server
 */
export async function getBlogPostById(
  id: string,
  locale: Locale = "en"
): Promise<LocalizedBlogPost | null> {
  if (!supabaseAdmin) {
    throw new Error("This function can only be called from the server");
  }

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
  // Parse tags string to array if needed and localize the post
  const blogPost: BlogPost | null = data
    ? ({
        ...data,
        tags: Array.isArray(data.tags)
          ? data.tags
          : typeof data.tags === "string"
            ? data.tags.split(",").map((tag: string) => tag.trim())
            : [],
      } as BlogPost)
    : null;

  return blogPost ? localizeBlogPost(blogPost, locale) : null;
}
