import { createClient, Session } from "@supabase/supabase-js";

// Initialize Supabase client with environment variables
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://jolplygxwuqfuecnomta.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpvbHBseWd4d3VxZnVlY25vbXRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNzMyMTEsImV4cCI6MjA2MjY0OTIxMX0.iOSxCHoDGzZtJQ7xrNMjfqGhfNCq14XJzYJU05T_esA";

// Create the Supabase client with specific storage key for cookies
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    storageKey: "supabase-auth-token",
  },
});

// Cache the session to avoid repeated checks
let cachedSession: Session | null = null;

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    // Store the session in cache
    cachedSession = data.session;

    // Ensure cookies are properly set
    document.cookie = `supabase-auth-token=true; path=/; max-age=${
      60 * 60 * 24 * 7
    }; SameSite=Lax`;

    return data.session;
  } catch (error) {
    console.error("Sign in error:", error);
    throw error;
  }
}

export async function signUp(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    return data;
  } catch (error) {
    console.error("Sign up error:", error);
    throw error;
  }
}

export async function signOut() {
  try {
    // Clear the cookie
    document.cookie =
      "supabase-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    cachedSession = null;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error("Sign out error:", error);
    throw error;
  }
}

export async function getSession() {
  try {
    // Return cached session if available
    if (cachedSession) return cachedSession;

    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error("Error getting session:", error.message);
      throw error;
    }

    cachedSession = data.session;
    return data.session;
  } catch (error) {
    console.error("Session retrieval error:", error);
    throw error;
  }
}

// Function to check if user is authenticated (without throwing errors)
export async function isAuthenticated() {
  try {
    const session = await getSession();
    return !!session;
  } catch (error) {
    return false;
  }
}
