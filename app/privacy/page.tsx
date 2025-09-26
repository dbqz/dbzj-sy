"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Shield, Eye, Lock, UserCheck } from "lucide-react";
import { Button } from "@nextui-org/react";

export default function PrivacyPage() {
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
          <Shield className="size-8 text-primary" />
          <h1 className="text-4xl font-bold">隐私政策</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          定边县职业教育中心网站隐私保护政策
        </p>
        <div className="mt-4 h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full mx-auto" />
      </motion.div>

      {/* 内容 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="prose prose-lg max-w-none"
      >
        <div className="space-y-8">
          <section className="border rounded-2xl p-6 bg-gradient-to-br from-background to-accent/5">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="size-6 text-primary" />
              <h2 className="text-2xl font-semibold">信息收集</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              我们可能收集您在访问我们网站时提供的个人信息，包括但不限于姓名、联系方式、邮箱地址等。这些信息仅用于改善我们的服务质量和与您的沟通。
            </p>
          </section>

          <section className="border rounded-2xl p-6 bg-gradient-to-br from-background to-accent/5">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="size-6 text-primary" />
              <h2 className="text-2xl font-semibold">信息保护</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              我们采用适当的技术和管理措施来保护您的个人信息安全，防止信息的丢失、滥用、未经授权的访问或披露。我们不会向第三方出售、交易或转让您的个人信息。
            </p>
          </section>

          <section className="border rounded-2xl p-6 bg-gradient-to-br from-background to-accent/5">
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="size-6 text-primary" />
              <h2 className="text-2xl font-semibold">信息使用</h2>
            </div>
            <div className="text-muted-foreground leading-relaxed space-y-3">
              <p>我们收集的信息可能用于以下目的：</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>提供和改善我们的教育服务</li>
                <li>回应您的询问和请求</li>
                <li>发送重要通知和更新</li>
                <li>进行统计分析以改善网站功能</li>
              </ul>
            </div>
          </section>

          <section className="border rounded-2xl p-6 bg-gradient-to-br from-background to-accent/5">
            <h2 className="text-2xl font-semibold mb-4">Cookie 使用</h2>
            <p className="text-muted-foreground leading-relaxed">
              我们的网站可能使用 Cookie 来改善用户体验。您可以选择接受或拒绝 Cookie，但这可能会影响网站的某些功能。
            </p>
          </section>

          <section className="border rounded-2xl p-6 bg-gradient-to-br from-background to-accent/5">
            <h2 className="text-2xl font-semibold mb-4">政策更新</h2>
            <p className="text-muted-foreground leading-relaxed">
              我们可能会不时更新此隐私政策。任何更改将在此页面上发布，重大更改将通过适当方式通知用户。
            </p>
          </section>

          <section className="border rounded-2xl p-6 bg-gradient-to-br from-primary/5 to-accent/5">
            <h2 className="text-2xl font-semibold mb-4">联系我们</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              如果您对我们的隐私政策有任何疑问或建议，请通过以下方式联系我们：
            </p>
            <div className="space-y-2 text-muted-foreground">
              <p>📧 邮箱：admin@dbzj.edu.cn</p>
              <p>📞 电话：0912-4212345</p>
              <p>📍 地址：陕西省榆林市定边县职业教育中心</p>
            </div>
          </section>
        </div>

        <div className="text-center mt-12 pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground">
            最后更新时间：2025年1月
          </p>
        </div>
      </motion.div>
    </div>
  );
}