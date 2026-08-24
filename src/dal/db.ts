import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Check if public environment variables are defined
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error("Missing environment variable: NEXT_PUBLIC_SUPABASE_URL");
}

// Create a custom fetch function that disables caching
const customFetch = (url: RequestInfo | URL, init?: RequestInit) => {
  return fetch(url, {
    ...init,
    cache: "no-store", // This tells Next.js to never cache this request
  });
};

// Server-side public client for read operations.
export const supabase = createClient<any>(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  {
    global: {
      fetch: customFetch,
    },
  }
);

// Admin client should only be used server-side
// This section will only run on the server
let supabaseAdmin: SupabaseClient<any> | null = null;

if (typeof window === "undefined") {
  // Server-side only code
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing environment variable: SUPABASE_SERVICE_ROLE_KEY");
  }

  supabaseAdmin = createClient<any>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      global: {
        fetch: customFetch,
      },
    }
  );
}

export { supabaseAdmin };
