import { supabaseAdmin } from "./db";
import { Locale } from "@/i18n/config";

export interface Project {
  id: string;
  title_dutch: string;
  title_english: string;
  title_french: string;
  content_dutch: string;
  content_english: string;
  content_french: string;
  techstack: string[];
  image_url?: string | null;
  github_url?: string | null;
  demo_url?: string | null;
  created_at: string;
}

export interface LocalizedProject {
  id: string;
  title: string;
  content: string;
  description: string; // Generated from first lines of content
  techstack: string[];
  image_url?: string | null;
  github_url?: string | null;
  demo_url?: string | null;
  created_at: string;
}

/**
 * Helper function to localize a project based on the given locale
 */
function localizeProject(project: Project, locale: Locale): LocalizedProject {
  const getLocalizedField = (fieldPrefix: string): string => {
    const fieldName = `${fieldPrefix}_${locale === "en" ? "english" : locale === "nl" ? "dutch" : "french"}`;
    return (project as any)[fieldName] || "";
  };

  const title = getLocalizedField("title");
  const content = getLocalizedField("content");

  // For projects, use the full content as description (unlike blogs which truncate)
  const description = content
    .replace(/<[^>]*>/g, "") // Remove HTML tags
    .trim();

  return {
    id: project.id,
    title,
    content,
    description,
    techstack: project.techstack,
    image_url: project.image_url,
    github_url: project.github_url,
    demo_url: project.demo_url,
    created_at: project.created_at,
  };
}

/**
 * Fetches all projects from the database and localizes them
 * @throws Error if not called from the server
 */
export async function getAllProjects(
  locale: Locale = "en"
): Promise<LocalizedProject[]> {
  if (!supabaseAdmin) {
    throw new Error("This function can only be called from the server");
  }

  const { data, error } = await supabaseAdmin
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    throw new Error(`Failed to fetch projects: ${error.message}`);
  }
  // Parse techstack string to array if needed and localize projects
  const localizedProjects = (data || []).map((project: any) => {
    const projectData: Project = {
      ...project,
      techstack: Array.isArray(project.techstack)
        ? project.techstack
        : typeof project.techstack === "string"
          ? project.techstack.split(",").map((tech: string) => tech.trim())
          : [],
    };
    return localizeProject(projectData, locale);
  });

  return localizedProjects;
}

/**
 * Fetches a single project by ID and localizes it
 * @throws Error if not called from the server
 */
export async function getProjectById(
  id: string,
  locale: Locale = "en"
): Promise<LocalizedProject | null> {
  if (!supabaseAdmin) {
    throw new Error("This function can only be called from the server");
  }

  const { data, error } = await supabaseAdmin
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    if (error.code === "PGRST116") {
      // PGRST116 is the error code for "no rows returned"
      return null;
    }

    console.error(`Error fetching project with ID ${id}:`, error);
    throw new Error(`Failed to fetch project: ${error.message}`);
  }
  // Parse techstack string to array if needed and localize the project
  const project: Project | null = data
    ? ({
        ...data,
        techstack: Array.isArray(data.techstack)
          ? data.techstack
          : typeof data.techstack === "string"
            ? data.techstack.split(",").map((tech: string) => tech.trim())
            : [],
      } as Project)
    : null;

  return project ? localizeProject(project, locale) : null;
}
