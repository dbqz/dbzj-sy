import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppProviders from "./providers";
import LayoutWrapper from "@/components/layout-wrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "定边职教",
  description: "定边县职业教育中心始建于1983年，是国家级重点中等职业学校，占地300亩，现有42个教学班，学生2240名，教职工182人。提供数控机床、电子电工、机械加工等12个专业。",
  keywords: "定边职教中心,职业教育,技能培训,数控机床,电子电工,机械加工,职业学校",
  authors: [{ name: "定边县职业教育中心" }],
  creator: "定边县职业教育中心",
  publisher: "定边县职业教育中心",
  robots: "index, follow",
  openGraph: {
    title: "定边县职业教育中心",
    description: "国家级重点中等职业学校，培养高素质技能人才",
    url: "https://dbzj.qzwb.asia",
    siteName: "定边县职业教育中心",
    locale: "zh_CN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "定边县职业教育中心",
    description: "国家级重点中等职业学校，培养高素质技能人才",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      { rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#2563eb" },
    ],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        <AppProviders>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </AppProviders>
      </body>
    </html>
  );
}
