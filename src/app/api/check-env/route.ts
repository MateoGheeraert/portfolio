import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  return NextResponse.json({
    supabaseUrlSet: !!supabaseUrl,
    supabaseAnonKeySet: !!supabaseAnonKey,
    // Showing partial keys for security, but enough to debug
    supabaseUrlPartial: supabaseUrl
      ? `${supabaseUrl.substring(0, 15)}...`
      : null,
    supabaseAnonKeyPartial: supabaseAnonKey
      ? `${supabaseAnonKey.substring(0, 10)}...`
      : null,
    nodeEnv: process.env.NODE_ENV,
  });
}
