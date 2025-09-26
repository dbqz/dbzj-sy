"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Map, ExternalLink, Home, Newspaper, Camera, Handshake, Briefcase, School, Users, Settings } from "lucide-react";
import { Button } from "@nextui-org/react";

export default function SitemapPage() {
  const siteStructure = [
    {
      title: "主要页面",
      icon: Home,
      links: [
        { href: "/", label: "首页", desc: "网站主页，展示学校概况和最新动态" },
        { href: "/about", label: "学校介绍", desc: "学校历史、师资力量、办学成果" },
        { href: "/news", label: "新闻资讯", desc: "学校新闻、公告通知" },
        { href: "/campus", label: "校园看点", desc: "校园风光、实训设施展示" },
      ]
    },
    {
      title: "教育服务",
      icon: School,
      links: [
        { href: "/cooperation", label: "联合办学", desc: "合作院校、联合培养项目" },
        { href: "/jobs", label: "就业服务", desc: "就业指导、招聘信息" },
        { href: "/majors", label: "专业设置", desc: "各专业介绍和课程安排" },
        { href: "/enrollment", label: "招生信息", desc: "招生简章、报名指南" },
      ]
    },
    {
      title: "管理系统",
      icon: Settings,
      links: [
        { href: "/admin/login", label: "后台登录", desc: "管理员登录入口" },
        { href: "/admin/dashboard", label: "管理面板", desc: "内容管理、数据统计" },
      ]
    },
    {
      title: "法律信息",
      icon: Users,
      links: [
        { href: "/privacy", label: "隐私政策", desc: "个人信息保护政策" },
        { href: "/terms", label: "使用条款", desc: "网站使用条款和服务协议" },
        { href: "/sitemap", label: "网站地图", desc: "网站结构导航" },
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* 返回按钮 */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <Button
          as={Link}
          href="/"
          variant="bordered"
          size="sm"
          startContent={<ArrowLeft className="size-4" />}
        >
          返回首页
        </Button>
      </motion.div>

      {/* 页面标题 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Map className="size-8 text-primary" />
          <h1 className="text-4xl font-bold">网站地图</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          定边县职业教育中心网站结构导航
        </p>
        <div className="mt-4 h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full mx-auto" />
      </motion.div>

      {/* 网站结构 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {siteStructure.map((section, index) => {
          const Icon = section.icon;
          return (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border rounded-2xl p-6 bg-gradient-to-br from-background to-accent/5 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon className="size-6 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">{section.title}</h2>
              </div>
              
              <div className="space-y-3">
                {section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group block p-3 rounded-lg hover:bg-accent/10 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium group-hover:text-primary transition-colors">
                            {link.label}
                          </span>
                          <ExternalLink className="size-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {link.desc}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 统计信息 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="text-2xl font-bold text-primary mb-1">15+</div>
          <div className="text-sm text-muted-foreground">页面总数</div>
        </div>
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="text-2xl font-bold text-primary mb-1">4</div>
          <div className="text-sm text-muted-foreground">主要模块</div>
        </div>
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="text-2xl font-bold text-primary mb-1">12+</div>
          <div className="text-sm text-muted-foreground">专业介绍</div>
        </div>
        <div className="text-center p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10">
          <div className="text-2xl font-bold text-primary mb-1">100%</div>
          <div className="text-sm text-muted-foreground">响应式设计</div>
        </div>
      </motion.div>

      {/* 联系信息 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-12 text-center border rounded-2xl p-8 bg-gradient-to-br from-primary/5 to-accent/5"
      >
        <h3 className="text-xl font-semibold mb-4">需要帮助？</h3>
        <p className="text-muted-foreground mb-6">
          如果您在网站导航中遇到问题，或者需要其他帮助，请随时联系我们。
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            as={Link}
            href="mailto:admin@dbzj.edu.cn"
            color="primary"
            variant="flat"
          >
            发送邮件
          </Button>
          <Button
            as={Link}
            href="tel:0912-4212345"
            variant="bordered"
          >
            电话联系
          </Button>
        </div>
      </motion.div>

      <div className="text-center mt-8 pt-8 border-t border-border/50">
        <p className="text-sm text-muted-foreground">
          网站地图最后更新：2025年1月
        </p>
      </div>
    </div>
  );
}