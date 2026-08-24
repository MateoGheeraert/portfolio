"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Pencil } from "lucide-react";
import BlogPostForm from "@/components/admin/BlogPostForm";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminEmptyState, AdminLoading } from "@/components/admin/AdminState";
import { Button } from "@/components/ui/button";
import type { BlogPost } from "@/dal/blog";
import { getAdminBlogPostById } from "../../actions";

export default function EditBlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPost() {
      if (!params.id || typeof params.id !== "string") {
        setError("No blog post ID provided");
        setLoading(false);
        return;
      }

      try {
        const result = await getAdminBlogPostById(params.id);

        if (result.error) {
          throw new Error(result.error);
        }

        if (result.post) {
          setPost(result.post);
        } else {
          setError("Blog post not found");
        }
      } catch (error: any) {
        console.error("Error fetching blog post:", error);
        setError(error.message || "Failed to fetch blog post");
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [params.id]);

  if (loading) {
    return <AdminLoading label="Loading blog post…" />;
  }

  if (error) {
    return (
      <AdminEmptyState title="Could not load this post" description={error} action={<Button onClick={() => router.push("/admin/blog")}><ArrowLeft />Back to posts</Button>} />
    );
  }

  if (!post) {
    return (
      <AdminEmptyState title="Blog post not found" description="The requested blog post could not be found." action={<Button onClick={() => router.push("/admin/blog")}><ArrowLeft />Back to posts</Button>} />
    );
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader icon={Pencil} title="Edit blog post" description="Update the translations, content, images and attachments for this story." actions={<Button variant="outline" asChild><Link href="/admin/blog"><ArrowLeft />Back</Link></Button>} />
      <BlogPostForm post={post} mode='edit' />
    </div>
  );
}
