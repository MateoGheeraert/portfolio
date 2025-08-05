"use server";

import { getAllProjects, getProjectById, Project } from "@/dal/projects";

/**
 * Server action to fetch all projects
 */
export async function fetchProjects(): Promise<Project[]> {
  try {
    return await getAllProjects();
  } catch (error) {
    console.error("Error in fetchProjects action:", error);
    throw new Error("Failed to fetch projects");
  }
}

/**
 * Server action to fetch a single project by ID
 */
export async function fetchProjectById(id: string): Promise<Project | null> {
  if (!id) {
    throw new Error("Project ID is required");
  }

  try {
    return await getProjectById(id);
  } catch (error) {
    console.error(`Error in fetchProjectById action for ID ${id}:`, error);
    throw new Error("Failed to fetch project");
  }
}
