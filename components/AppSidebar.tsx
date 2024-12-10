"use client";

import React from "react";
import {
  Calendar,
  Home,
  Inbox,
  LogOut,
  PanelLeft,
  Search,
  Settings,
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
import { useClerk, useUser } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const AppSidebar = () => {
  const { user } = useUser();

  const items = [
    {
      title: "Home",
      url: "/user/dashboard",
      icon: Home,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
    },
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Profile",
      url: `/user/profile/${user?.id}`,
      icon: Settings,
    },
  ];

  const { signOut } = useClerk();
  const { toggleSidebar, state } = useSidebar();

  const pathname = usePathname();

  //   if (!user) return <div>User not found</div>;

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

                <PanelLeft className="size-5 " />
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem
                    key={item.title}
                    className={cn(
                      "rounded-lg",
                      isActive && "bg-primary-500 text-light-800 "
                    )}
                  >
                    <SidebarMenuButton asChild>
                      {user ? (
                        <a href={item.url}>
                          <item.icon />
                          <span className="ml-2">{item.title}</span>
                        </a>
                      ) : (
                        <div className="flex items-center">
                          <item.icon />
                          <span className="ml-2">{item.title}</span>
                        </div>
                      )}
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
