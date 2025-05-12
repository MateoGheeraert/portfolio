import { supabaseAdmin } from "./db";

export interface Project {
  id: string;
  title: string;
  description: string;
  techstack: string[];
  image_url?: string;
  github_url?: string;
  demo_url?: string;
  created_at: string;
}

/**
 * Fetches all projects from the database
 */
export async function getAllProjects(): Promise<Project[]> {
  const { data, error } = await supabaseAdmin
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    throw new Error(`Failed to fetch projects: ${error.message}`);
  }

  // Parse techstack string to array if needed
  return (data || []).map((project: any) => ({
    ...project,
    techstack: Array.isArray(project.techstack)
      ? project.techstack
      : typeof project.techstack === "string"
      ? project.techstack.split(",").map((tech: string) => tech.trim())
      : [],
  }));
}

/**
 * Fetches a single project by ID
 */
export async function getProjectById(id: string): Promise<Project | null> {
  const { data, error } = await supabaseAdmin
    .from("Projects")
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

  // Parse techstack string to array if needed
  return data
    ? {
        ...data,
        techstack: Array.isArray(data.techstack)
          ? data.techstack
          : typeof data.techstack === "string"
          ? data.techstack.split(",").map((tech: string) => tech.trim())
          : [],
      }
    : null;
}
