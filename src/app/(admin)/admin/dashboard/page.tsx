import Link from "next/link";
import { ArrowRight, FileText, FolderKanban, ImageIcon, Plus, TextQuote } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const sections = [
  { title: "Projects", description: "Publish and maintain your portfolio work.", href: "/admin/projects", icon: FolderKanban },
  { title: "Blog posts", description: "Write multilingual articles and attach media.", href: "/admin/blog", icon: FileText },
  { title: "About content", description: "Update your story in English, Dutch and French.", href: "/admin/about", icon: TextQuote },
  { title: "Profile media", description: "Change the portraits used across the public site.", href: "/admin/profile", icon: ImageIcon },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <AdminPageHeader
        icon={FolderKanban}
        title="Welcome back"
        description="Manage every part of your portfolio from one focused workspace."
        actions={
          <Button asChild><Link href="/admin/projects/new"><Plus />New project</Link></Button>
        }
      />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {sections.map(({ title, description, href, icon: Icon }) => (
          <Card key={href} className="group transition-shadow hover:shadow-md">
            <CardHeader>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent />
            <CardFooter>
              <Button variant="ghost" className="-ml-3" asChild>
                <Link href={href}>Manage <ArrowRight className="transition-transform group-hover:translate-x-1" /></Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Card className="border-primary/20 bg-primary/[0.03]">
        <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold">Ready to share something new?</h2>
            <p className="mt-1 text-sm text-muted-foreground">Create a project or publish a blog post with files and images.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild><Link href="/admin/blog/new"><FileText />New post</Link></Button>
            <Button asChild><Link href="/admin/projects/new"><FolderKanban />New project</Link></Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
