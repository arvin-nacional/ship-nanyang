import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isUserRoute = createRouteMatcher("/user/(.*)");
const isAdminRoute = createRouteMatcher("/admin/(.*)");

export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = await auth();
  const userRole =
    (sessionClaims?.metadata as { userType: "user" | "admin" })?.userType ||
    "user";

  if (isUserRoute(req)) {
    if (userRole !== "user") {
      const url = new URL("/admin/dashboard", req.url);
      return NextResponse.redirect(url);
    }
  }

  if (isAdminRoute(req)) {
    if (userRole !== "admin") {
      const url = new URL("/user/dashboard", req.url);
      return NextResponse.redirect(url);
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
