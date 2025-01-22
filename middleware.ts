import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isUserRoute = createRouteMatcher("/user/(.*)");
const isAdminRoute = createRouteMatcher("/admin/(.*)");

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = await auth();

  // Check if it's a user route
  if (isUserRoute(req)) {
    if (!sessionClaims) {
      // Redirect unauthenticated users trying to access user routes
      const homeUrl = new URL("/", req.url);
      return NextResponse.redirect(homeUrl);
    }

    const userRole = sessionClaims.userType || "user";

    if (userRole !== "user") {
      const adminDashboardUrl = new URL("/admin/dashboard", req.url);
      return NextResponse.redirect(adminDashboardUrl);
    }
  }

  // Check if it's an admin route
  if (isAdminRoute(req)) {
    if (!sessionClaims) {
      // Redirect unauthenticated users trying to access admin routes
      const homeUrl = new URL("/", req.url);
      return NextResponse.redirect(homeUrl);
    }

    const userRole = sessionClaims.userType || "user";

    if (userRole !== "admin") {
      const userDashboardUrl = new URL("/user/dashboard", req.url);
      return NextResponse.redirect(userDashboardUrl);
    }
  }

  // Allow free access to all other routes
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Middleware runs for all routes, but logic above ensures selective protection
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
