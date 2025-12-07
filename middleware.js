import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function middleware(request) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // Refresh session if expired - required for Server Components
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Define protected routes and required roles
  const protectedRoutes = {
    // Admin routes - require admin or super_admin
    "/admin": ["admin", "super_admin", "moderator"],
    "/admin/users": ["admin", "super_admin"],
    "/admin/vendors": ["admin", "super_admin", "moderator"],
    "/admin/products": ["admin", "super_admin", "moderator"],
    "/admin/orders": ["admin", "super_admin", "moderator"],
    "/admin/agents": ["admin", "super_admin"],
    "/admin/finances": ["super_admin"],
    "/admin/settings": ["admin", "super_admin"],
    "/admin/reports": ["admin", "super_admin", "moderator"],

    // Vendor routes - require vendor role
    "/sell": ["vendor"],

    // Cart and orders - require authentication
    "/cart": ["user", "admin", "super_admin", "moderator", "vendor", "agent"],
    "/orders": ["user", "admin", "super_admin", "moderator", "vendor", "agent"],
    "/favorites": [
      "user",
      "admin",
      "super_admin",
      "moderator",
      "vendor",
      "agent",
    ],
  };

  // Check if current path requires authentication
  const requiresAuth = Object.keys(protectedRoutes).some((route) => {
    return pathname.startsWith(route) || pathname === route;
  });

  if (requiresAuth) {
    if (!user) {
      // Redirect to login if no user
      const redirectUrl = new URL("/auth/login", request.url);
      redirectUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Get user profile to check roles
    try {
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("role, is_active")
        .eq("id", user.id)
        .single();

      if (error || !profile) {
        console.error("Error fetching user profile:", error);
        const redirectUrl = new URL("/auth/login", request.url);
        return NextResponse.redirect(redirectUrl);
      }

      // Check if user is active
      if (!profile.is_active) {
        const redirectUrl = new URL("/auth/banned", request.url);
        return NextResponse.redirect(redirectUrl);
      }

      // Check role-based access
      const matchingRoute = Object.keys(protectedRoutes)
        .filter((route) => pathname.startsWith(route))
        .sort((a, b) => b.length - a.length)[0];
      const requiredRoles = matchingRoute
        ? protectedRoutes[matchingRoute]
        : null;

      if (requiredRoles && !requiredRoles.includes(profile.role)) {
        // Redirect to unauthorized page
        const redirectUrl = new URL("/auth/unauthorized", request.url);
        return NextResponse.redirect(redirectUrl);
      }
    } catch (error) {
      console.error("Middleware error:", error);
      const redirectUrl = new URL("/auth/login", request.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // API routes protection
  if (pathname.startsWith("/api/")) {
    if (!user) {
      return new NextResponse(
        JSON.stringify({ error: "Authentication required" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }

    // Add user info to headers for API routes
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", user.id);
    requestHeaders.set("x-user-email", user.email || "");

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files with extensions
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.).*)",
  ],
};
