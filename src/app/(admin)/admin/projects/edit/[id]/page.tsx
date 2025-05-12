"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";
import { supabaseAdmin } from "@/dal/db";
import { Project } from "@/dal/projects";

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProject() {
      if (!params.id) {
        setError("No project ID provided");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabaseAdmin
          .from("projects")
          .select("*")
          .eq("id", params.id)
          .single();

        if (error) throw error;

        // Format project data
        const formattedProject = {
          ...data,
          techstack: Array.isArray(data.techstack)
            ? data.techstack
            : typeof data.techstack === "string"
            ? data.techstack.split(",").map((tech: string) => tech.trim())
            : [],
        };

        setProject(formattedProject as Project);
      } catch (error: any) {
        console.error("Error fetching project:", error);
        setError(error.message || "Failed to fetch project");
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [params.id]);

  if (loading) {
    return <div className='py-4'>Loading project...</div>;
  }

  if (error) {
    return (
      <div className='py-4 px-4 bg-red-50 text-red-800 rounded-md'>
        <h2 className='text-lg font-medium'>Error</h2>
        <p>{error}</p>
        <button
          onClick={() => router.push("/admin/projects")}
          className='mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          Back to Projects
        </button>
      </div>
    );
  }

  if (!project) {
    return (
      <div className='py-4 px-4 bg-yellow-50 text-yellow-800 rounded-md'>
        <h2 className='text-lg font-medium'>Project Not Found</h2>
        <p>The requested project could not be found.</p>
        <button
          onClick={() => router.push("/admin/projects")}
          className='mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          Back to Projects
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Edit Project</h1>
      <ProjectForm project={project} mode='edit' />
    </div>
  );
}
