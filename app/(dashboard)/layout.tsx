import AppSidebar from "@/components/AppSidebar";
import Topbar from "@/components/shared/navbar/Topbar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SidebarProvider className="w-full ">
        <AppSidebar />
        <main className="size-full">
          <Topbar />
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
