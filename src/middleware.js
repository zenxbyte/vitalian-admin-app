import { NextResponse } from "next/server";
import { COOKIES } from "./constants/cookie_constants";
import { NAVIGATION_ROUTES } from "./navigation/navigationRoutes";

export default async function middleware(request) {
  const isLoggedIn = request.cookies.get(COOKIES.IS_LOGGEDIN)?.value;
  const { pathname } = request.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = ["/login", "/"];
  
  // Protected path prefixes
  const protectedPathPrefixes = [
    NAVIGATION_ROUTES.dashboard.base,
    NAVIGATION_ROUTES.item.base,
    NAVIGATION_ROUTES.orders.base,
    NAVIGATION_ROUTES.products.base,
    NAVIGATION_ROUTES.users.base
  ];

  // If user is logged in and tries to access public paths, redirect to dashboard
  if (isLoggedIn && publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL(NAVIGATION_ROUTES.dashboard.base, request.url));
  }

  // Check if current path starts with any protected prefix
  const isProtectedPath = protectedPathPrefixes.some(prefix => 
    pathname.startsWith(prefix)
  );

  // If user is not logged in and trying to access a protected path
  if (!isLoggedIn && isProtectedPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|image|favicon.ico).*)",
  ],
};
