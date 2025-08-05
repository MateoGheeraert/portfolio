"use client";

import { useState } from "react";
import Link from "next/link";
import { Project } from "@/dal/projects";
import { fetchAdminProjects, deleteAdminProject } from "./actions";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

export default function AdminProjectsPage() {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  // Use TanStack Query to fetch projects
  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["admin-projects"],
    queryFn: async () => {
      const data = await fetchAdminProjects();
      return data;
    },
  });

  // Delete project mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteAdminProject(id),
    onSuccess: () => {
      // Invalidate and refetch projects list after deletion
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      setDeleteId(null);
    },
    onError: (error) => {
      console.error("Error deleting project:", error);
    },
  });

  // Delete a project
  const handleDeleteProject = async (id: string) => {
    if (deleteMutation.isPending) return;
    deleteMutation.mutate(id);
  };

  if (isLoading) {
    return <div className='py-4'>Loading projects...</div>;
  }

  return (
    <div>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold'>Projects</h1>
        <Link
          href='/admin/projects/new'
          className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
        >
          Add New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className='text-center py-10 bg-gray-50 rounded-lg'>
          <p className='text-gray-500'>No projects found.</p>
          <p className='mt-2'>
            <Link
              href='/admin/projects/new'
              className='text-blue-600 hover:text-blue-500'
            >
              Create your first project
            </Link>
          </p>
        </div>
      ) : (
        <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg'>
          <table className='min-w-full divide-y divide-gray-300'>
            <thead className='bg-gray-50'>
              <tr>
                <th
                  scope='col'
                  className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6'
                >
                  Title
                </th>
                <th
                  scope='col'
                  className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                >
                  Tech Stack
                </th>
                <th
                  scope='col'
                  className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                >
                  Created At
                </th>
                <th scope='col' className='relative py-3.5 pl-3 pr-4 sm:pr-6'>
                  <span className='sr-only'>Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-200 bg-white'>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                    {project.title}
                  </td>
                  <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                    {project.techstack.slice(0, 3).join(", ")}
                    {project.techstack.length > 3 && "..."}
                  </td>
                  <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                    {new Date(project.created_at).toLocaleDateString()}
                  </td>
                  <td className='relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6'>
                    <div className='flex justify-end gap-2'>
                      <Link
                        href={`/admin/projects/edit/${project.id}`}
                        className='text-blue-600 hover:text-blue-900'
                      >
                        Edit
                      </Link>
                      {deleteId === project.id ? (
                        <div className='flex gap-2 items-center'>
                          <button
                            onClick={() => handleDeleteProject(project.id)}
                            disabled={deleteMutation.isPending}
                            className='text-red-600 hover:text-red-900 disabled:opacity-50'
                          >
                            {deleteMutation.isPending
                              ? "Deleting..."
                              : "Confirm"}
                          </button>
                          <button
                            onClick={() => setDeleteId(null)}
                            className='text-gray-600 hover:text-gray-900'
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteId(project.id)}
                          className='text-red-600 hover:text-red-900'
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
