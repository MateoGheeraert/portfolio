"use server";

import {
  getAllProjects,
  getProjectById,
  LocalizedProject,
} from "@/dal/projects";
import { Locale } from "@/i18n/config";

/**
 * Server action to fetch all projects
 */
export async function fetchProjects(
  locale: Locale = "en"
): Promise<LocalizedProject[]> {
  try {
    return await getAllProjects(locale);
  } catch (error) {
    console.error("Error in fetchProjects action:", error);
    throw new Error("Failed to fetch projects");
  }
}

/**
 * Server action to fetch a single project by ID
 */
export async function fetchProjectById(
  id: string,
  locale: Locale = "en"
): Promise<LocalizedProject | null> {
  if (!id) {
    throw new Error("Project ID is required");
  }
  try {
    return await getProjectById(id, locale);
  } catch (error) {
    console.error(`Error in fetchProjectById action for ID ${id}:`, error);
    throw new Error("Failed to fetch project");
  }
}
