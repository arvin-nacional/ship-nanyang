"use client";

import React from "react";
import {
  Home,
  LogOut,
  MapPinHouse,
  Package,
  PackagePlus,
  PanelLeft,
  Settings,
  LucideIcon,
  Users,
  Boxes,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useClerk } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

// Define the type for links
type SidebarLink = {
  title: string;
  url: string;
  icon: LucideIcon;
};

interface SidebarProps {
  userType: string;
}

const AppSidebar = ({ userType }: SidebarProps) => {
  const { signOut } = useClerk();
  const { toggleSidebar, state } = useSidebar();
  const pathname = usePathname();

  // Define links for admin, user, and loading state
  const adminLinks: SidebarLink[] = [
    { title: "Dashboard", url: "/admin/dashboard", icon: Home },
    { title: "Shipping Carts", url: "/admin/shipping-carts", icon: Package },
    { title: "Packages", url: "/admin/packages", icon: Boxes },
    { title: "Users", url: "/admin/users", icon: Users },
  ];

  const userLinks: SidebarLink[] = [
    { title: "Shipping Carts", url: "/user/dashboard", icon: Home },
    { title: "Add Package", url: "/user/add-package", icon: PackagePlus },
    { title: "Packages", url: "/user/packages", icon: Package },
    { title: "Receiver Address", url: "/user/address", icon: MapPinHouse },
    { title: "Profile", url: "/user/profile", icon: Settings },
  ];

  // Determine links to show based on user type
  const linksToShow = userType === "admin" ? adminLinks : userLinks;

  return (
    <Sidebar
      collapsible="icon"
      style={{ height: "100vh" }}
      className="bg-light-800 shadow-lg border-none"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              onClick={() => toggleSidebar()}
              className="group hover:bg-light-700"
            >
              <div className="flex flex-row items-center justify-between w-full">
                {state === "expanded" ? (
                  <Image
                    src="/assets/icons/logo-primary.png"
                    height={50}
                    width={120}
                    alt="sidebar logo"
                  />
                ) : (
                  <Image
                    src="/assets/icons/logo-secondary.png"
                    height={50}
                    width={50}
                    alt="sidebar logo"
                  />
                )}
                <PanelLeft className="size-5" />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {linksToShow.map((item) => {
                const isActive = pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem
                    key={item.title}
                    className={cn(
                      "rounded-lg",
                      isActive && "bg-primary-500 text-light-800"
                    )}
                  >
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span className="ml-2">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Button onClick={() => signOut()} className="justify-start">
                <LogOut className="mr-2 size-6" />
                <span className="paragraph-bold">Sign out</span>
              </Button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
