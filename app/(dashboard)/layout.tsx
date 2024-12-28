import AppSidebar from "@/components/AppSidebar";
import Topbar from "@/components/shared/navbar/Topbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { auth, currentUser } from "@clerk/nextjs/server";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const { sessionClaims } = await auth();
  const user = await currentUser();

  const userName = user?.firstName || "Guest";

  const userType = (sessionClaims?.userType as string) || "user";
  return (
    <div>
      <SidebarProvider className="w-full ">
        <AppSidebar userType={userType} />
        <main className="size-full">
          <Topbar userName={userName} userType={userType} />
          <div className="flex flex-row ">
            {children}
            {/* <RightSidebar /> */}
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
