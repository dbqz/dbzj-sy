"use client"

import * as React from "react"
import {
  IconSchool,
  IconNews,
  IconLogout
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "系统管理员",
    email: "admin@dbzj.edu.cn",
    avatar: "/avatars/admin.jpg",
  },
  navMain: [
    {
      title: "新闻管理",
      url: "/dashboard/news",
      icon: IconNews,
    },
  ],
  navClouds: [],
  navSecondary: [],
  documents: [],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/admin/login';
    } catch (error) {
      console.error('退出登录失败:', error);
    }
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard">
                <IconSchool className="!size-5" />
                <span className="text-base font-semibold">定边职教中心</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
        <div className="p-2">
          <SidebarMenuButton
            onClick={handleLogout}
            className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <IconLogout className="size-4" />
            <span>退出登录</span>
          </SidebarMenuButton>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
