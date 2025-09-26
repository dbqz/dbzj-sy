"use client";

import Link from "next/link";
import ThemeToggle from "@/components/theme-toggle";

const links = [
  { href: "/news", label: "新闻资讯" },
  { href: "/about", label: "学校介绍" },
  { href: "/campus", label: "校园看点" },
  { href: "/cooperation", label: "联合办学" },
  { href: "/jobs", label: "就业服务" },
];

export default function SiteNavbar() {
  return (
    <header className="w-full border-b">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold">
          定边职教中心
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:underline">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/admin/login" className="text-sm underline">
            登录
          </Link>
        </div>
      </div>
    </header>
  );
}


