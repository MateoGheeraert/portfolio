import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales } from "./i18n/config";

export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;

  // Check if the pathname starts with one of the supported locales
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // If pathname doesn't have a supported locale, redirect to the default locale
  const locale = defaultLocale;

  // e.g. incoming request is /products
  // The new URL is /en/products
  return NextResponse.redirect(
    new URL(
      `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
      request.url
    )
  );
}

export const config = {
  matcher: [
    // Skip all internal paths (_next/)
    "/((?!_next|api|favicon.ico).*)",
  ],
};
