"use client";

import Link from "next/link";
import { ArrowLeft, FilePlus2 } from "lucide-react";
import BlogPostForm from "@/components/admin/BlogPostForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/button";

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader icon={FilePlus2} title="New blog post" description="Write, translate and enrich a story with images or documents." actions={<Button variant="outline" asChild><Link href="/admin/blog"><ArrowLeft />Back</Link></Button>} />
      <BlogPostForm mode='create' />
    </div>
  );
}
