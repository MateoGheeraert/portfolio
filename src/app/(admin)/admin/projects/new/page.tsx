"use client";

import Link from "next/link";
import { ArrowLeft, FolderPlus } from "lucide-react";
import ProjectForm from "@/components/admin/ProjectForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/button";

export default function NewProjectPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader icon={FolderPlus} title="New project" description="Add a multilingual project, technologies, links and media." actions={<Button variant="outline" asChild><Link href="/admin/projects"><ArrowLeft />Back</Link></Button>} />
      <ProjectForm mode='create' />
    </div>
  );
}
