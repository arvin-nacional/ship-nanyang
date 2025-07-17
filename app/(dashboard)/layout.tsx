import AppSidebar from "@/components/AppSidebar";
import RightSidebar from "@/components/RightSidebar";
import MessengerBtn from "@/components/shared/MessengerBtn";

import Topbar from "@/components/shared/navbar/Topbar";
import Logo from "@/components/ui/logo";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
          <div className="flex items-center justify-between p-4 sm:hidden bg-primary-500">
            <Logo />
            <SidebarTrigger />
          </div>
          <Topbar userName={userName} userType={userType} />

          <div className="flex flex-row ">
            {children}
            {/* {userType !== "admin" ? <RightSidebar /> : null} */}
          </div>
          <MessengerBtn />
        </main>
      </SidebarProvider>
    </div>
  );
};

export default Layout;
