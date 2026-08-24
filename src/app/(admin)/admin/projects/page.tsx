"use client";

import Link from "next/link";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarDays, Code2, FolderKanban, Pencil, Plus, Trash2, X } from "lucide-react";
import { fetchAdminProjects, deleteAdminProject } from "./actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminEmptyState, AdminLoading } from "@/components/admin/AdminState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminProjectsPage() {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const queryClient = useQueryClient();
  const { data: projects = [], isLoading } = useQuery({ queryKey: ["admin-projects"], queryFn: fetchAdminProjects });
  const deleteMutation = useMutation({
    mutationFn: deleteAdminProject,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      setDeleteId(null);
    },
  });

  return (
    <div className="space-y-6">
      <AdminPageHeader icon={FolderKanban} title="Projects" description="Showcase your work, technology choices and project media." actions={<Button asChild><Link href="/admin/projects/new"><Plus />New project</Link></Button>} />
      {isLoading ? <AdminLoading label="Loading projects…" /> : projects.length === 0 ? (
        <AdminEmptyState icon={FolderKanban} title="No projects yet" description="Add your first project and translate it for every visitor." action={<Button asChild><Link href="/admin/projects/new"><Plus />Create a project</Link></Button>} />
      ) : (
        <div className="space-y-3">
          {projects.map((project) => (
            <Card key={project.id}>
              <CardContent className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center">
                <div className="min-w-0 flex-1">
                  <h2 className="truncate font-semibold">{project.title_english || "Untitled project"}</h2>
                  <p className="mt-1 truncate text-xs text-muted-foreground">NL: {project.title_dutch || "—"} · FR: {project.title_french || "—"}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />{new Date(project.created_at).toLocaleDateString()}</span>
                    {project.techstack?.slice(0, 5).map((technology) => <Badge key={technology} variant="outline"><Code2 className="mr-1 h-3 w-3" />{technology}</Badge>)}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Button variant="outline" size="sm" asChild><Link href={`/admin/projects/edit/${project.id}`}><Pencil />Edit</Link></Button>
                  {deleteId === project.id ? <><Button variant="destructive" size="sm" disabled={deleteMutation.isPending} onClick={() => deleteMutation.mutate(project.id)}><Trash2 />{deleteMutation.isPending ? "Deleting…" : "Confirm"}</Button><Button variant="ghost" size="icon" onClick={() => setDeleteId(null)} aria-label="Cancel deletion"><X /></Button></> : <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => setDeleteId(project.id)} aria-label={`Delete ${project.title_english}`}><Trash2 /></Button>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
