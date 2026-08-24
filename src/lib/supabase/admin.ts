import "server-only";

import { createClient } from "@/lib/supabase/server";

export async function requireAdminUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error("You must be signed in to manage portfolio content");
  }

  const allowedEmails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);

  if (
    allowedEmails.length > 0 &&
    (!user.email || !allowedEmails.includes(user.email.toLowerCase()))
  ) {
    throw new Error("This account is not allowed to access the admin area");
  }

  return user;
}
