import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/utils/auth";

// WARNING: This is for development purposes only
// In production, this should be removed or protected
export async function POST(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json(
      { error: "This endpoint is only available in development mode" },
      { status: 403 }
    );
  }

  try {
    // Create a test admin user with email admin@example.com and password admin123
    const { data, error } = await supabase.auth.admin.createUser({
      email: "admin@example.com",
      password: "admin123",
      email_confirm: true,
    });

    if (error) {
      return NextResponse.json(
        {
          status: "error",
          message: "Failed to create test admin",
          error: error.message,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      status: "success",
      message: "Test admin created successfully",
      userId: data.user.id,
    });
  } catch (err: any) {
    console.error("Create test admin error:", err);

    return NextResponse.json(
      {
        status: "error",
        message: "Error creating test admin",
        error: err.message,
      },
      { status: 500 }
    );
  }
}
