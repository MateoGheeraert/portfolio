import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "./i18n/config";

// Regex to match public file requests
const PUBLIC_FILE = /\.(.*)$/;

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Handle admin routes
  if (pathname.startsWith("/admin")) {
    // Skip authentication check for login and register pages
    if (pathname === "/admin/login" || pathname === "/admin/register") {
      return NextResponse.next();
    }

    // Check for Supabase auth cookie
    const hasSbCookie = request.cookies.has("supabase-auth-token");

    // If no auth cookie found, redirect to login
    if (!hasSbCookie) {
      const redirectUrl = new URL("/admin/login", request.url);
      if (pathname !== "/admin" && !pathname.includes("favicon")) {
        redirectUrl.searchParams.set("redirect", pathname);
      }
      return NextResponse.redirect(redirectUrl);
    }

    // If path is just /admin, redirect to /admin/dashboard
    if (pathname === "/admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    // Continue with admin requests
    return NextResponse.next();
  }

  // Skip Next.js internals and static files
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Check if pathname already includes a supported locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Redirect to default locale
  return NextResponse.redirect(
    new URL(`/${defaultLocale}${pathname}`, request.url)
  );
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
