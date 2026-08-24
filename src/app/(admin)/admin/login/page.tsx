"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { LoaderCircle, LockKeyhole, LogIn, Mail, PanelsTopLeft } from "lucide-react";
import { signIn, isAuthenticated } from "@/utils/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authCheckComplete, setAuthCheckComplete] = useState(false);
  const searchParams = useSearchParams();
  const requestedRedirect = searchParams?.get("redirect");
  const redirectPath = requestedRedirect?.startsWith("/admin/")
    ? requestedRedirect
    : "/admin/dashboard";

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticated = await isAuthenticated();
        if (authenticated) {
          window.location.href = redirectPath;
        }
      } catch {
        // Ignore error, will allow login form to display
      } finally {
        setAuthCheckComplete(true);
      }
    };

    checkAuth();
  }, [redirectPath]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const session = await signIn(email, password);
      if (session) {
        console.log("Login successful, redirecting to:", redirectPath);
        // Force a hard navigation to clear any state/cache issues
        window.location.href = redirectPath;
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err: unknown) {
      console.error("Login error:", err);
      let errorMsg = err instanceof Error ? err.message : "Failed to sign in";

      if (err instanceof Error && err.name === "AuthApiError") {
        if (err.message.includes("Invalid login credentials")) {
          errorMsg = "Invalid email or password. Please try again.";
        } else if (err.message.includes("Database error")) {
          errorMsg = "Database connection error. Please try again later.";
        }
      }

      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Show loading until auth check is complete
  if (!authCheckComplete) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <div className="flex items-center gap-2 text-sm text-muted-foreground"><LoaderCircle className="h-4 w-4 animate-spin" />Checking authentication…</div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-muted/30 px-4 py-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.12),transparent_35%)]" />
      <div className="relative w-full max-w-md space-y-6">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg"><PanelsTopLeft className="h-6 w-6" /></div>
          <h1 className="text-2xl font-bold tracking-tight">Portfolio Studio</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to manage your portfolio content.</p>
        </div>
        <Card className="shadow-xl">
          <CardHeader><CardTitle>Welcome back</CardTitle><CardDescription>Use your administrator account to continue.</CardDescription></CardHeader>
          <CardContent>
          {error && (
            <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
          )}

          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  placeholder='you@example.com'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  placeholder='Enter your password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div>
              <Button
                type='submit'
                disabled={loading}
                className="w-full"
              >
                {loading ? <LoaderCircle className="animate-spin" /> : <LogIn />}{loading ? "Signing in…" : "Sign in"}
              </Button>
            </div>

          </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
