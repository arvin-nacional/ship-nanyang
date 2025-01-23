import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isUserRoute = createRouteMatcher("/user/(.*)");
const isAdminRoute = createRouteMatcher("/admin/(.*)");

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = await auth();

  console.log("Session Claims:", sessionClaims);

  // Redirect unauthenticated users
  if (!sessionClaims) {
    console.log("User not authenticated. Redirecting to /signin.");
    const signinUrl = new URL("/signin", req.url);
    return NextResponse.redirect(signinUrl);
  }

  const userRole = sessionClaims.userType || "user";
  const isVerified = sessionClaims.verified || false;

  // Admin-specific routes
  if (isAdminRoute(req)) {
    if (userRole !== "admin") {
      console.log(
        `Non-admin (${userRole}) attempting to access admin route. Redirecting.`
      );
      const userDashboardUrl = new URL("/user/dashboard", req.url);
      return NextResponse.redirect(userDashboardUrl);
    }
    console.log("Admin access granted.");
    return NextResponse.next();
  }

  // User-specific routes
  if (isUserRoute(req)) {
    if (userRole !== "user") {
      console.log(
        `Non-user (${userRole}) attempting to access user route. Redirecting to admin.`
      );
      const adminDashboardUrl = new URL("/admin/dashboard", req.url);
      return NextResponse.redirect(adminDashboardUrl);
    }

    if (!isVerified) {
      console.log("User not verified. Redirecting to /create-account.");
      const createAccountUrl = new URL("/create-account", req.url);
      return NextResponse.redirect(createAccountUrl);
    }

    console.log("Verified user. Access granted.");
    return NextResponse.next();
  }

  // Allow all other routes
  console.log("Free access granted.");
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Middleware runs for all routes, selective protection is handled in logic above
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
