import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error(
    "Supabase connection check requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.",
  );
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

const { error, count } = await supabase
  .from("projects")
  .select("id", { count: "exact", head: true });

if (error) {
  console.error(`Supabase connection check failed: ${error.message}`);
  process.exit(1);
}

console.log(`Supabase connection succeeded; projects table is reachable (${count ?? 0} rows).`);
