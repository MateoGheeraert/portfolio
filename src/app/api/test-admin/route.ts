import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/auth";

export async function GET(request: NextRequest) {
  try {
    // Check if admin@example.com exists (don't disclose real emails)
    const { data, error } = await supabase.auth.admin.listUsers();

    if (error) {
      return NextResponse.json(
        {
          status: "error",
          message: "Could not check admin accounts",
          error: error.message,
        },
        { status: 500 }
      );
    }

    // Check if any users exist
    const hasUsers = data?.users && data.users.length > 0;

    return NextResponse.json({
      status: "success",
      hasAdmins: hasUsers,
      userCount: data?.users?.length || 0,
    });
  } catch (err: any) {
    console.error("Admin test error:", err);

    return NextResponse.json(
      {
        status: "error",
        message: "Error testing admin accounts",
        error: err.message,
      },
      { status: 500 }
    );
  }
}
