import { createClient } from "@/lib/supabase/client";

export const supabase = createClient();

export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    return data.session;
  } catch (error) {
    console.error("Sign in error:", error);
    throw error;
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    console.error("Sign out error:", error);
    throw error;
  }
}

export async function getSession() {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) {
      console.error("Error getting session:", error.message);
      throw error;
    }

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
