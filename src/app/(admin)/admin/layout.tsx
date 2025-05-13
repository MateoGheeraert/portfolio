"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { signOut, isAuthenticated } from "@/utils/auth";
import { QueryProvider } from "@/components/providers/QueryProvider";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Skip auth check for login and register pages
  const isAuthPage =
    pathname === "/admin/login" || pathname === "/admin/register";

  // Check if the user is authenticated
  useEffect(() => {
    // No need to check auth for login/register pages
    if (isAuthPage) {
      setLoading(false);
      return;
    }

    const checkAuth = async () => {
      try {
        const authenticated = await isAuthenticated();

        if (!authenticated) {
          // Use window.location for a hard refresh to avoid Next.js caching issues
          window.location.href = `/admin/login?redirect=${encodeURIComponent(
            pathname
          )}`;
          return;
        }

        setLoading(false);
      } catch (err: any) {
        console.error("Authentication error:", err);
        setError(err.message || "Authentication failed");

        // On error, redirect to login
        window.location.href = "/admin/login";
      }
    };

    checkAuth();
  }, [pathname, isAuthPage]);

  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
      // Use hard navigation to clear state
      window.location.href = "/admin/login";
    } catch (error) {
      console.error("Sign out error:", error);
    }
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
        <p className='text-gray-500'>Loading...</p>
      </div>
    );
  }

  // Show error state if auth failed
  if (error && !isAuthPage) {
    return (
      <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
        <div className='bg-white p-8 rounded-lg shadow-md max-w-md w-full'>
          <h2 className='text-xl font-semibold text-red-600 mb-4'>
            Authentication Error
          </h2>
          <p className='text-gray-700 mb-4'>{error}</p>
          <button
            onClick={() => (window.location.href = "/admin/login")}
            className='w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700'
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  // Login and register pages don't need the admin layout
  if (isAuthPage) {
    return <>{children}</>;
  }

  // Admin layout with sidebar
  return (
    <QueryProvider>
      <div className='min-h-screen bg-gray-100'>
        <nav className='bg-white shadow-sm'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex justify-between h-16'>
              <div className='flex'>
                <div className='flex-shrink-0 flex items-center'>
                  <Link
                    href='/admin/dashboard'
                    className='text-xl font-bold text-gray-900'
                  >
                    Admin Panel
                  </Link>
                </div>
              </div>
              <div className='flex items-center'>
                <button
                  onClick={handleSignOut}
                  className='px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className='flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <div className='w-64 mr-8'>
            <div className='bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200'>
              <div className='px-4 py-5 sm:px-6'>
                <h3 className='text-lg font-medium text-gray-900'>
                  Navigation
                </h3>
              </div>
              <div className='px-4 py-5 sm:p-6'>
                <nav className='space-y-1'>
                  <Link
                    href='/admin/dashboard'
                    className={`block px-3 py-2 rounded-md ${
                      pathname === "/admin/dashboard"
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href='/admin/projects'
                    className={`block px-3 py-2 rounded-md ${
                      pathname === "/admin/projects" ||
                      pathname.startsWith("/admin/projects/")
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Projects
                  </Link>
                  <Link
                    href='/admin/blog'
                    className={`block px-3 py-2 rounded-md ${
                      pathname === "/admin/blog" ||
                      pathname.startsWith("/admin/blog/")
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Blog Posts
                  </Link>
                </nav>
              </div>
            </div>
          </div>
          <div className='flex-1'>
            <div className='bg-white overflow-hidden shadow rounded-lg'>
              <div className='px-4 py-5 sm:p-6'>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </QueryProvider>
  );
}
