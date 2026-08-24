"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  ExternalLink, FileText, FolderKanban, ImageIcon, LayoutDashboard,
  LogOut, PanelsTopLeft, TextQuote,
} from "lucide-react";
import { signOut, isAuthenticated } from "@/utils/auth";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/projects", label: "Projects", icon: FolderKanban },
  { href: "/admin/blog", label: "Blog posts", icon: FileText },
  { href: "/admin/about", label: "About content", icon: TextQuote },
  { href: "/admin/profile", label: "Profile media", icon: ImageIcon },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isAuthPage = pathname === "/admin/login";

  useEffect(() => {
    if (isAuthPage) {
      setLoading(false);
      return;
    }
    void isAuthenticated()
      .then((authenticated) => {
        if (!authenticated) {
          window.location.href = `/admin/login?redirect=${encodeURIComponent(pathname)}`;
          return;
        }
        setLoading(false);
      })
      .catch((authError: unknown) => {
        setError(authError instanceof Error ? authError.message : "Authentication failed");
        setLoading(false);
      });
  }, [pathname, isAuthPage]);

  const handleSignOut = useCallback(async () => {
    await signOut();
    router.push("/admin/login");
    router.refresh();
  }, [router]);

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center bg-muted/40 text-muted-foreground">Loading your workspace…</div>;
  }
  if (isAuthPage) return <>{children}</>;
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
        <div className="w-full max-w-md rounded-xl border bg-card p-6 shadow-sm">
          <h1 className="text-lg font-semibold">Authentication error</h1>
          <p className="mt-2 text-sm text-muted-foreground">{error}</p>
          <Button className="mt-5 w-full" onClick={() => router.push("/admin/login")}>Return to sign in</Button>
        </div>
      </div>
    );
  }

  return (
    <QueryProvider>
      <div className="min-h-screen bg-muted/35 text-foreground">
        <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur">
          <div className="flex h-16 items-center justify-between px-4 md:px-6">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <span className="rounded-lg bg-primary p-2 text-primary-foreground"><PanelsTopLeft className="h-4 w-4" /></span>
              <span>
                <span className="block text-sm font-semibold leading-none">Portfolio Studio</span>
                <span className="mt-1 block text-xs text-muted-foreground">Content administration</span>
              </span>
            </Link>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/en" target="_blank"><ExternalLink /><span className="hidden sm:inline">View portfolio</span></Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignOut}><LogOut /><span className="hidden sm:inline">Sign out</span></Button>
            </div>
          </div>
        </header>
        <div className="mx-auto flex max-w-[1500px]">
          <aside className="hidden min-h-[calc(100vh-4rem)] w-64 shrink-0 border-r bg-background p-4 md:block">
            <p className="mb-3 px-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Manage</p>
            <nav className="space-y-1">
              {navigation.map(({ href, label, icon: Icon }) => {
                const active = pathname === href || (href !== "/admin/dashboard" && pathname.startsWith(`${href}/`));
                return (
                  <Link key={href} href={href} className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    active ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}>
                    <Icon className="h-4 w-4" />{label}
                  </Link>
                );
              })}
            </nav>
          </aside>
          <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
            <div className="mb-5 flex gap-2 overflow-x-auto pb-1 md:hidden">
              {navigation.map(({ href, label, icon: Icon }) => (
                <Button key={href} variant={pathname === href || pathname.startsWith(`${href}/`) ? "default" : "outline"} size="sm" asChild>
                  <Link href={href}><Icon />{label}</Link>
                </Button>
              ))}
            </div>
            {children}
          </main>
        </div>
      </div>
    </QueryProvider>
  );
}
