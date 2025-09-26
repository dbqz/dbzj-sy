"use client";

import { usePathname } from "next/navigation";
import SiteNavbar from "@/components/site-navbar";
import SiteFooter from "@/components/site-footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // 只有管理面板不显示导航栏和页脚
  const hideNavAndFooter = pathname.startsWith("/dashboard");

  if (hideNavAndFooter) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteNavbar />
      <main className="flex-1">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}