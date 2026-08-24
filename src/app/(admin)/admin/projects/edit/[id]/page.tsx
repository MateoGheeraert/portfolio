"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";
import ProjectForm from "@/components/admin/ProjectForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminEmptyState, AdminLoading } from "@/components/admin/AdminState";
import { Button } from "@/components/ui/button";
import type { Project } from "@/dal/projects";
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
    return <AdminLoading label="Loading project…" />;
  }

  if (queryError) {
    return (
      <AdminEmptyState title="Could not load this project" description={queryError instanceof Error ? queryError.message : "Failed to fetch project"} action={<Button onClick={() => router.push("/admin/projects")}><ArrowLeft />Back to projects</Button>} />
    );
  }

  if (!data) {
    return (
      <AdminEmptyState title="Project not found" description="The requested project could not be found." action={<Button onClick={() => router.push("/admin/projects")}><ArrowLeft />Back to projects</Button>} />
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader icon={Pencil} title="Edit project" description="Update the translations, technologies, links and media for this project." actions={<Button variant="outline" asChild><Link href="/admin/projects"><ArrowLeft />Back</Link></Button>} />
      <ProjectForm project={data} mode='edit' />
    </div>
  );
}
