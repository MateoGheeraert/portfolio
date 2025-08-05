"use client";

import ProjectForm from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-6'>Add New Project</h1>
      <ProjectForm mode='create' />
    </div>
  );
}
