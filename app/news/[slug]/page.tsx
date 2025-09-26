"use client";

import { motion } from "framer-motion";
import useGsapReveal from "@/hooks/useGsapReveal";
import { Button, Spinner } from "@nextui-org/react";
import { useState, useEffect, use } from "react";
import Link from "next/link";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

interface NewsDetail {
  id: string;
  title: string;
  slug: string;
  content: string;
  coverUrl?: string;
  publishedAt?: string;
  createdAt: string;
  author?: { name?: string };
}

export default function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const h1Ref = useGsapReveal<HTMLHeadingElement>();
  const [news, setNews] = useState<NewsDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await fetch(`/api/news/by-slug/${resolvedParams.slug}`);
        if (response.status === 404) {
          setError(true);
          return;
        }
        const result = await response.json();
        setNews(result.data);
      } catch (error) {
        console.error("Failed to fetch news detail:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [resolvedParams.slug]);

  if (loading) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-center py-12">
          <Spinner size="lg" color="primary" />
        </div>
      </main>
    );
  }

  if (error || !news) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: news.title,
          text: news.title,
          url: window.location.href,
        });
      } catch (error) {
        console.log("分享取消");
      }
    } else {
      // 降级到复制链接
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      {/* 返回按钮 */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6"
      >
        <Button
          as={Link}
          href="/news"
          variant="bordered"
          size="sm"
          startContent={<ArrowLeft className="size-4" />}
        >
          返回新闻列表
        </Button>
      </motion.div>

      {/* 文章头部 */}
      <motion.header
        ref={h1Ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8"
      >
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
          {news.title}
        </h1>
        
        <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="size-4" />
            {formatDate(news.publishedAt || news.createdAt)}
          </div>
          {news.author?.name && (
            <div className="flex items-center gap-2">
              <User className="size-4" />
              {news.author.name}
            </div>
          )}
          <Button
            size="sm"
            variant="light"
            startContent={<Share2 className="size-4" />}
            onPress={handleShare}
          >
            分享
          </Button>
        </div>

        {news.coverUrl && (
          <div className="relative aspect-video rounded-xl overflow-hidden mb-6">
            <Image
              src={news.coverUrl}
              alt={news.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
      </motion.header>

      {/* 文章内容 */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="prose prose-lg max-w-none"
      >
        <div
          className="text-foreground leading-relaxed"
          dangerouslySetInnerHTML={{ __html: news.content }}
        />
      </motion.article>

      {/* 文章底部 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="mt-12 pt-8 border-t border-border"
      >
        <div className="flex items-center justify-between">
          <Button
            as={Link}
            href="/news"
            variant="bordered"
            startContent={<ArrowLeft className="size-4" />}
          >
            返回新闻列表
          </Button>
          
          <Button
            color="primary"
            variant="flat"
            startContent={<Share2 className="size-4" />}
            onPress={handleShare}
          >
            分享文章
          </Button>
        </div>
      </motion.div>
    </main>
  );
}