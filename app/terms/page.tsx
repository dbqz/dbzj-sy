"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, FileText, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@nextui-org/react";

export default function TermsPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
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
                    <FileText className="size-8 text-primary" />
                    <h1 className="text-4xl font-bold">使用条款</h1>
                </div>
                <p className="text-muted-foreground text-lg">
                    定边县职业教育中心网站使用条款和服务协议
                </p>
                <div className="mt-4 h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full mx-auto" />
            </motion.div>

            {/* 内容 */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-8"
            >
                <section className="border rounded-2xl p-6 bg-gradient-to-br from-background to-accent/5">
                    <h2 className="text-2xl font-semibold mb-4">接受条款</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        通过访问和使用定边县职业教育中心网站，您同意遵守本使用条款。如果您不同意这些条款，请不要使用本网站。
                    </p>
                </section>

                <section className="border rounded-2xl p-6 bg-gradient-to-br from-background to-accent/5">
                    <div className="flex items-center gap-3 mb-4">
                        <CheckCircle className="size-6 text-green-500" />
                        <h2 className="text-2xl font-semibold">允许的使用</h2>
                    </div>
                    <div className="text-muted-foreground leading-relaxed space-y-3">
                        <p>您可以：</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>浏览网站内容以获取教育信息</li>
                            <li>下载公开的教育资料</li>
                            <li>通过官方渠道联系学校</li>
                            <li>分享网站链接到社交媒体</li>
                        </ul>
                    </div>
                </section>

                <section className="border rounded-2xl p-6 bg-gradient-to-br from-background to-red-50/50">
                    <div className="flex items-center gap-3 mb-4">
                        <XCircle className="size-6 text-red-500" />
                        <h2 className="text-2xl font-semibold">禁止的使用</h2>
                    </div>
                    <div className="text-muted-foreground leading-relaxed space-y-3">
                        <p>您不得：</p>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>未经授权复制、修改或分发网站内容</li>
                            <li>使用自动化工具抓取网站数据</li>
                            <li>发布虚假、误导性或有害信息</li>
                            <li>干扰网站的正常运行</li>
                            <li>侵犯他人的知识产权</li>
                        </ul>
                    </div>
                </section>

                <section className="border rounded-2xl p-6 bg-gradient-to-br from-background to-accent/5">
                    <h2 className="text-2xl font-semibold mb-4">知识产权</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        本网站的所有内容，包括但不限于文字、图片、视频、标志等，均受版权法保护。未经明确授权，不得用于商业目的。
                    </p>
                </section>

                <section className="border rounded-2xl p-6 bg-gradient-to-br from-background to-accent/5">
                    <div className="flex items-center gap-3 mb-4">
                        <AlertTriangle className="size-6 text-amber-500" />
                        <h2 className="text-2xl font-semibold">免责声明</h2>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                        本网站提供的信息仅供参考。我们努力确保信息的准确性，但不对信息的完整性、准确性或时效性承担责任。使用本网站信息的风险由用户自行承担。
                    </p>
                </section>

                <section className="border rounded-2xl p-6 bg-gradient-to-br from-background to-accent/5">
                    <h2 className="text-2xl font-semibold mb-4">服务变更</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        我们保留随时修改、暂停或终止网站服务的权利，恕不另行通知。我们也可能随时更新这些使用条款。
                    </p>
                </section>

                <section className="border rounded-2xl p-6 bg-gradient-to-br from-background to-accent/5">
                    <h2 className="text-2xl font-semibold mb-4">适用法律</h2>
                    <p className="text-muted-foreground leading-relaxed">
                        本使用条款受中华人民共和国法律管辖。任何争议将通过友好协商解决，协商不成的，提交有管辖权的人民法院解决。
                    </p>
                </section>

                <section className="border rounded-2xl p-6 bg-gradient-to-br from-primary/5 to-accent/5">
                    <h2 className="text-2xl font-semibold mb-4">联系信息</h2>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        如果您对这些使用条款有任何疑问，请联系我们：
                    </p>
                    <div className="space-y-2 text-muted-foreground">
                        <p>📧 邮箱：admin@dbzj.edu.cn</p>
                        <p>📞 电话：0912-4212345</p>
                        <p>📍 地址：陕西省榆林市定边县职业教育中心</p>
                    </div>
                </section>

                <div className="text-center mt-12 pt-8 border-t border-border/50">
                    <p className="text-sm text-muted-foreground">
                        最后更新时间：2025年1月 · 生效日期：2025年1月1日
                    </p>
                </div>
            </motion.div>
        </div>
    );
}