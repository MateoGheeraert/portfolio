"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarDays, FileText, Pencil, Plus, Tags, Trash2, X } from "lucide-react";
import type { BlogPost } from "@/dal/blog";
import { fetchAdminBlogPosts, deleteAdminBlogPost } from "./actions";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminEmptyState, AdminLoading } from "@/components/admin/AdminState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    void fetchAdminBlogPosts()
      .then(setPosts)
      .catch((error) => console.error("Error fetching blog posts:", error))
      .finally(() => setLoading(false));
  }, []);

  async function handleDeletePost(id: string) {
    if (isDeleting) return;
    setIsDeleting(true);
    const result = await deleteAdminBlogPost(id);
    if (result.success) {
      setPosts((current) => current.filter((post) => post.id !== id));
      setDeleteId(null);
    }
    setIsDeleting(false);
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        icon={FileText}
        title="Blog posts"
        description="Create and maintain multilingual stories, images and attachments."
        actions={<Button asChild><Link href="/admin/blog/new"><Plus />New post</Link></Button>}
      />
      {loading ? (
        <AdminLoading label="Loading blog posts…" />
      ) : posts.length === 0 ? (
        <AdminEmptyState
          icon={FileText}
          title="No blog posts yet"
          description="Create your first article and publish it in all three languages."
          action={<Button asChild><Link href="/admin/blog/new"><Plus />Create a post</Link></Button>}
        />
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardContent className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center">
                <div className="min-w-0 flex-1">
                  <h2 className="truncate font-semibold">{post.title_english || "Untitled post"}</h2>
                  <p className="mt-1 truncate text-xs text-muted-foreground">NL: {post.title_dutch || "—"} · FR: {post.title_french || "—"}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />{new Date(post.created_at).toLocaleDateString()}</span>
                    {post.tags?.slice(0, 4).map((tag) => <Badge key={tag} variant="outline"><Tags className="mr-1 h-3 w-3" />{tag}</Badge>)}
                  </div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Button variant="outline" size="sm" asChild><Link href={`/admin/blog/edit/${post.id}`}><Pencil />Edit</Link></Button>
                  {deleteId === post.id ? (
                    <>
                      <Button variant="destructive" size="sm" disabled={isDeleting} onClick={() => handleDeletePost(post.id)}><Trash2 />{isDeleting ? "Deleting…" : "Confirm"}</Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteId(null)} aria-label="Cancel deletion"><X /></Button>
                    </>
                  ) : (
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => setDeleteId(post.id)} aria-label={`Delete ${post.title_english}`}><Trash2 /></Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
