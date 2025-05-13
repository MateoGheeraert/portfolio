import { createClient } from "@supabase/supabase-js";

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

// Create public client for client-side operations
export const supabase = createClient(
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
let supabaseAdmin: ReturnType<typeof createClient> | null = null;

if (typeof window === "undefined") {
  // Server-side only code
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing environment variable: SUPABASE_SERVICE_ROLE_KEY");
  }

  supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      global: {
        fetch: customFetch,
      },
    }
  );
}

export { supabaseAdmin };
