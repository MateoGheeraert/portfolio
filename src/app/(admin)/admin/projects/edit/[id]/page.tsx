"use client";

import { useParams, useRouter } from "next/navigation";
import ProjectForm from "@/components/admin/ProjectForm";
import { Project } from "@/dal/projects";
import { getAdminProjectById } from "../../actions";
import { useQuery } from "@tanstack/react-query";

export default function EditProjectPage() {
  const params = useParams();
  const router = useRouter();

  // Use TanStack Query to fetch the project data
  const {
    data,
    isLoading,
    error: queryError,
  } = useQuery({
    queryKey: ["admin-project", params.id],
    queryFn: async () => {
      if (!params.id || typeof params.id !== "string") {
        throw new Error("No project ID provided");
      }

      const result = await getAdminProjectById(params.id);

      if (result.error) {
        throw new Error(result.error);
      }

      if (!result.project) {
        throw new Error("Project not found");
      }

      return result.project;
    },
    retry: false,
    enabled: !!params.id && typeof params.id === "string",
  });

  if (isLoading) {
    return <div className='py-4'>Loading project...</div>;
  }

  if (queryError) {
    return (
      <div className='py-4 px-4 bg-red-50 text-red-800 rounded-md'>
        <h2 className='text-lg font-medium'>Error</h2>
        <p>
          {queryError instanceof Error
            ? queryError.message
            : "Failed to fetch project"}
        </p>
        <button
          onClick={() => router.push("/admin/projects")}
          className='mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          Back to Projects
        </button>
      </div>
    );
  }

  if (!data) {
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
      <ProjectForm project={data} mode='edit' />
    </div>
  );
}
