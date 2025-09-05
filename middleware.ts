import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isUserRoute = createRouteMatcher("/user/(.*)");
const isAdminRoute = createRouteMatcher("/admin/(.*)");

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = await auth();

  // Debug logging
  // console.log("=== MIDDLEWARE DEBUG ===");
  // console.log("URL:", req.url);
  // console.log("Session claims:", JSON.stringify(sessionClaims, null, 2));
  // console.log("UserType from claims:", sessionClaims?.userType);

  // const isVerified = sessionClaims?.verified || false;

  // Check if it's a user route
  if (isUserRoute(req)) {
    console.log(" User route detected");
    if (!sessionClaims) {
      // Redirect unauthenticated users trying to access user routes
      const homeUrl = new URL("/", req.url);
      return NextResponse.redirect(homeUrl);
    }

    const userRole = sessionClaims.userType || "user";
    console.log("User role for user route:", userRole);

    if (userRole !== "user") {
      console.log(" Redirecting non-user to admin dashboard");
      const adminDashboardUrl = new URL("/admin/dashboard", req.url);
      return NextResponse.redirect(adminDashboardUrl);
    }

    // if (!isVerified) {
    //   const createAccountUrl = new URL("/create-account", req.url);
    //   return NextResponse.redirect(createAccountUrl);
    // }
  }

  // Check if it's an admin route
  if (isAdminRoute(req)) {
    console.log(" Admin route detected");
    if (!sessionClaims) {
      console.log(" No session claims, redirecting to home");
      // Redirect unauthenticated users trying to access admin routes
      const homeUrl = new URL("/", req.url);
      return NextResponse.redirect(homeUrl);
    }

    const userRole = sessionClaims.userType || "user";
    console.log("User role for admin route:", userRole);

    if (userRole !== "admin") {
      console.log(" User role is not admin, redirecting to user dashboard");
      console.log("Expected: 'admin', Got:", userRole);
      const userDashboardUrl = new URL("/user/dashboard", req.url);
      return NextResponse.redirect(userDashboardUrl);
    }

    console.log(" Admin access granted");
  }

  console.log(" Allowing access to route");
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
