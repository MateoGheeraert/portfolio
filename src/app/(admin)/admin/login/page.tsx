"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { signIn, isAuthenticated } from "@/utils/auth";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [authCheckComplete, setAuthCheckComplete] = useState(false);
  const searchParams = useSearchParams();
  const redirectPath = searchParams?.get("redirect") || "/admin/dashboard";

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authenticated = await isAuthenticated();
        if (authenticated) {
          window.location.href = redirectPath;
        }
      } catch (error) {
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
    } catch (err: any) {
      console.error("Login error:", err);
      let errorMsg = err.message || "Failed to sign in";

      if (err.name === "AuthApiError") {
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
      <div className='min-h-screen bg-gray-50 flex flex-col justify-center items-center'>
        <p>Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
          Admin Login
        </h2>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
          {error && (
            <div className='bg-red-50 border-l-4 border-red-400 p-4 mb-6'>
              <div className='flex'>
                <div className='ml-3'>
                  <p className='text-sm text-red-700'>{error}</p>
                </div>
              </div>
            </div>
          )}

          <form className='space-y-6' onSubmit={handleLogin}>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email address
              </label>
              <div className='mt-1'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'
              >
                Password
              </label>
              <div className='mt-1'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm'
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                disabled={loading}
                className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>

            <div className='text-center mt-4'>
              <Link
                href='/admin/register'
                className='text-sm text-blue-600 hover:text-blue-500'
              >
                No account? Create admin account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
