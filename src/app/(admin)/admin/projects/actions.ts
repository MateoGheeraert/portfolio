"use server";

import { supabaseAdmin } from "@/dal/db";
import { Project } from "@/dal/projects";

/**
 * Server action to fetch all projects for admin
 */
export async function fetchAdminProjects(): Promise<Project[]> {
  try {
    if (!supabaseAdmin) {
      throw new Error("Database client is not available");
    }

    const { data, error } = await supabaseAdmin
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw error;

    // Format projects data
    return data.map((project) => ({
      ...project,
      techstack: Array.isArray(project.techstack)
        ? project.techstack
        : typeof project.techstack === "string"
        ? project.techstack.split(",").map((tech: string) => tech.trim())
        : [],
    })) as Project[];
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw new Error("Failed to fetch projects");
  }
}

/**
 * Server action to fetch a single project by ID
 */
export async function getAdminProjectById(
  id: string
): Promise<{ project?: Project; error?: string }> {
  try {
    if (!supabaseAdmin) {
      throw new Error("Database client is not available");
    }

    const { data, error } = await supabaseAdmin
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      if (error.code === "PGRST116") {
        return { error: "Project not found" };
      }
      throw error;
    }

    return {
      project: {
        ...data,
        techstack: Array.isArray(data.techstack)
          ? data.techstack
          : typeof data.techstack === "string"
          ? data.techstack.split(",").map((tech: string) => tech.trim())
          : [],
      } as Project,
    };
  } catch (error: any) {
    console.error(`Error fetching project with ID ${id}:`, error);
    return { error: error.message || "Failed to fetch project" };
  }
}

/**
 * Server action to delete a project
 */
export async function deleteAdminProject(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    if (!supabaseAdmin) {
      throw new Error("Database client is not available");
    }

    const { error } = await supabaseAdmin
      .from("projects")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return { success: true };
  } catch (error: any) {
    console.error("Error deleting project:", error);
    return {
      success: false,
      error: error.message || "Failed to delete project",
    };
  }
}

/**
 * Server action to create a new project
 */
export async function createAdminProject(
  projectData: Omit<Project, "id" | "created_at">
): Promise<{ success: boolean; project?: Project; error?: string }> {
  try {
    if (!supabaseAdmin) {
      throw new Error("Database client is not available");
    }

    const { data, error } = await supabaseAdmin
      .from("projects")
      .insert([projectData])
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      project: {
        ...data,
        techstack: Array.isArray(data.techstack)
          ? data.techstack
          : typeof data.techstack === "string"
          ? data.techstack.split(",").map((tech: string) => tech.trim())
          : [],
      } as Project,
    };
  } catch (error: any) {
    console.error("Error creating project:", error);
    return {
      success: false,
      error: error.message || "Failed to create project",
    };
  }
}

/**
 * Server action to update an existing project
 */
export async function updateAdminProject(
  id: string,
  projectData: Partial<Omit<Project, "id" | "created_at">>
): Promise<{ success: boolean; project?: Project; error?: string }> {
  try {
    if (!supabaseAdmin) {
      throw new Error("Database client is not available");
    }

    const { data, error } = await supabaseAdmin
      .from("projects")
      .update(projectData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    return {
      success: true,
      project: {
        ...data,
        techstack: Array.isArray(data.techstack)
          ? data.techstack
          : typeof data.techstack === "string"
          ? data.techstack.split(",").map((tech: string) => tech.trim())
          : [],
      } as Project,
    };
  } catch (error: any) {
    console.error("Error updating project:", error);
    return {
      success: false,
      error: error.message || "Failed to update project",
    };
  }
}
