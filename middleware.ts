import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Match routes under "/user/*" and "/admin/*"
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

  // Protect user routes (e.g., /user/*)
  if (isUserRoute(req)) {
    if (userRole !== "user") {
      console.log(
        `Non-user (${userRole}) attempting to access user route. Redirecting to /admin/dashboard.`
      );
      const adminDashboardUrl = new URL("/admin/dashboard", req.url);
      return NextResponse.redirect(adminDashboardUrl);
    }

    // Redirect unverified users to /create-account
    if (!isVerified) {
      console.log("User not verified. Redirecting to /create-account.");
      const createAccountUrl = new URL("/create-account", req.url);
      return NextResponse.redirect(createAccountUrl);
    }

    console.log("Verified user. Access granted.");
    return NextResponse.next();
  }

  // Protect admin routes (e.g., /admin/*)
  if (isAdminRoute(req)) {
    if (userRole !== "admin") {
      console.log(
        `Non-admin (${userRole}) attempting to access admin route. Redirecting to /user/dashboard.`
      );
      const userDashboardUrl = new URL("/user/dashboard", req.url);
      return NextResponse.redirect(userDashboardUrl);
    }

    console.log("Admin access granted.");
    return NextResponse.next();
  }

  // Allow free access to all other routes
  console.log("Free access granted.");
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Middleware applies only to /user/* and /admin/* routes
    "/user/(.*)",
    "/admin/(.*)",
  ],
};
