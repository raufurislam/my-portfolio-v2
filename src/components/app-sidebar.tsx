"use client";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import { NavUser } from "@/components/ui/nav-user";

type NavItem = {
  title: string;
  url: string;
};

type NavSection = {
  title: string;
  items: NavItem[];
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const { isSuperAdmin } = useAuth();

  // Build sections based on role. Only super admin gets dashboard links
  const sections: NavSection[] = isSuperAdmin
    ? [
        {
          title: "Overview",
          items: [{ title: "Dashboard", url: "/dashboard" }],
        },
        {
          title: "Add New",
          items: [
            { title: "Add Projects", url: "/dashboard/projects/add-project" },
            { title: "Add Blogs", url: "/dashboard/blogs/add-blog" },
          ],
        },
        {
          title: "Management",
          items: [
            { title: "Manage Projects", url: "/dashboard/projects" },
            { title: "Manage Blogs", url: "/dashboard/blogs" },
            { title: "Manage Users", url: "/dashboard/users" },
          ],
        },
      ]
    : [];

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link href="/" className="text-primary hover:text-primary/90">
          <span className="inline-flex items-center gap-2">
            <Image
              src="https://i.ibb.co.com/qYC6YkKw/logo-12.png"
              alt="GitHub"
              className="w-5 h-5"
              width={20}
              height={20}
            />
            <span className="hidden sm:inline text-base font-semibold text-foreground">
              Raufur Islam
            </span>
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {sections.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {section.items.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={isActive}>
                        <Link href={item.url}>{item.title}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      <SidebarRail />
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
