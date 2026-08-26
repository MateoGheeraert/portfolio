import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales, type Locale } from "./i18n/config";

const PUBLIC_FILE = /\.(.*)$/;
const LOCALE_COOKIE = "NEXT_LOCALE";
const ONE_YEAR = 60 * 60 * 24 * 365;

function isSupportedLocale(locale: string | undefined): locale is Locale {
  return locales.includes(locale as Locale);
}

function getPathLocale(pathname: string): Locale | undefined {
  const locale = pathname.split("/")[1]?.toLowerCase();
  return isSupportedLocale(locale) ? locale : undefined;
}

function getBrowserLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return defaultLocale;

  const preferences = acceptLanguage
    .split(",")
    .map((preference, index) => {
      const [languageTag, ...parameters] = preference.trim().toLowerCase().split(";");
      const qualityParameter = parameters.find((parameter) =>
        parameter.trim().startsWith("q="),
      );
      const parsedQuality = qualityParameter
        ? Number.parseFloat(qualityParameter.split("=")[1])
        : 1;

      return {
        languageTag,
        quality: Number.isFinite(parsedQuality) ? parsedQuality : 0,
        index,
      };
    })
    .filter(({ languageTag, quality }) => languageTag !== "*" && quality > 0)
    .sort((a, b) => b.quality - a.quality || a.index - b.index);

  for (const { languageTag } of preferences) {
    const baseLanguage = languageTag.split("-")[0];
    if (isSupportedLocale(languageTag)) return languageTag;
    if (isSupportedLocale(baseLanguage)) return baseLanguage;
  }

  return defaultLocale;
}

function rememberLocale(response: NextResponse, locale: Locale) {
  response.cookies.set(LOCALE_COOKIE, locale, {
    httpOnly: true,
    maxAge: ONE_YEAR,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/register") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    const isLoginPage = pathname === "/admin/login";
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll: () => request.cookies.getAll(),
          setAll: (cookiesToSet) => {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            );
            response = NextResponse.next({ request });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        },
      },
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user && !isLoginPage) {
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      if (pathname !== "/admin") url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }

    if (user && (pathname === "/admin" || isLoginPage)) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    return response;
  }

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return response;
  }

  const pathLocale = getPathLocale(pathname);

  if (!pathLocale) {
    const savedLocale = request.cookies.get(LOCALE_COOKIE)?.value;
    const locale = isSupportedLocale(savedLocale)
      ? savedLocale
      : getBrowserLocale(request.headers.get("accept-language"));
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;

    return rememberLocale(NextResponse.redirect(url), locale);
  }

  if (request.cookies.get(LOCALE_COOKIE)?.value !== pathLocale) {
    return rememberLocale(response, pathLocale);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
