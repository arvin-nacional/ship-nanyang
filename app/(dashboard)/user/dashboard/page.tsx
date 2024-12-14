import RightSidebar from "@/components/RightSidebar";
import { isUserVerified } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import { redirect } from "next/navigation";

const page = async () => {
  const { userId } = await auth();

  const verificationResult = userId
    ? await isUserVerified({ clerkId: userId })
    : null;

  if (verificationResult?.verified === false) {
    redirect("/create-account");
  }

  return (
    <div className="p-6 w-full" style={{ height: "100vh" }}>
      page
    </div>
  );
};

export default page;
