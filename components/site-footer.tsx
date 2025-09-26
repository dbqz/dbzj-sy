"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    School,
    MapPin,
    Phone,
    Mail,
    MessageCircle,
    Heart
} from "lucide-react";

export default function SiteFooter() {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { href: "/about", label: "学校介绍" },
        { href: "/news", label: "新闻资讯" },
        { href: "/campus", label: "校园看点" },
        { href: "/cooperation", label: "联合办学" },
        { href: "/jobs", label: "就业服务" },
    ];



    return (
        <footer className="bg-gray-50/50 dark:bg-gray-900/50 border-t border-gray-200/50 dark:border-gray-800/50">
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* 主要内容区域 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
                    {/* 学校信息 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="md:col-span-1"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                                <School className="size-5 text-gray-600 dark:text-gray-400" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                                    定边县职业教育中心
                                </h3>
                                <p className="text-xs text-gray-500">始建于1983年</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                            国家级重点中等职业学校，培养高素质技能人才。
                        </p>

                        {/* 联系信息 */}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-xs">
                                <MapPin className="size-3 text-gray-500" />
                                <span className="text-gray-600 dark:text-gray-400">陕西省榆林市定边县</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                                <Phone className="size-3 text-gray-500" />
                                <span className="text-gray-600 dark:text-gray-400">0912-4212345</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                                <Mail className="size-3 text-gray-500" />
                                <span className="text-gray-600 dark:text-gray-400">admin@dbzj.edu.cn</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* 快速导航 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="md:col-span-1"
                    >
                        <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">快速导航</h3>
                        <div className="space-y-1">
                            {quickLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="block text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors py-1"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </motion.div>

                    {/* 社交媒体 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 }}
                        className="md:col-span-1"
                    >
                        <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-gray-100">关注我们</h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">
                            关注微信公众号，获取最新学校动态
                        </p>

                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                                <MessageCircle className="size-4 text-gray-600 dark:text-gray-400" />
                                <div>
                                    <div className="text-xs font-medium text-gray-900 dark:text-gray-100">微信公众号</div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400">定边县实验中学</div>
                                </div>
                            </div>
                        </div>

                        {/* 特色标签 */}
                        <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800">
                            <Heart className="size-3 text-gray-500" />
                            <span className="text-xs text-gray-600 dark:text-gray-400">培养技能人才</span>
                        </div>
                    </motion.div>
                </div>

                {/* 底部版权区域 */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="pt-4 border-t border-gray-200 dark:border-gray-800"
                >
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* 版权信息 */}
                        <div className="text-center md:text-left">
                            <p className="text-xs text-gray-500">
                                © {currentYear} 定边县职业教育中心 · 版权所有
                            </p>
                        </div>

                        {/* 底部链接 */}
                        <div className="flex items-center gap-4">
                            {[
                                { href: "/privacy", label: "隐私政策" },
                                { href: "/terms", label: "使用条款" },
                                { href: "/sitemap", label: "网站地图" }
                            ].map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
}