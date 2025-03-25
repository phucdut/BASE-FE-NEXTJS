import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

// Middleware next-intl
const nextIntlMiddleware = createMiddleware(routing);

// Combined middleware logic
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/vi/home", request.url));
  }

  // if (privatePaths.some((path) => pathname.startsWith(path)) && !sessionToken) {
  //   return NextResponse.redirect(new URL("/sign-in", request.url));
  // }
  // if (authPaths.some((path) => pathname.startsWith(path)) && sessionToken) {
  //   return NextResponse.redirect(new URL("/home", request.url));
  // }

  return nextIntlMiddleware(request);
}

export const config = {
  matcher: [
    "/",
    "/(en|vi)/:path*",
    // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, which are Next.js internals.
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Re-include any files in the api or trpc folders that might have an extension
    "/(api|trpc)(.*)",
    "/",
  ],
};
