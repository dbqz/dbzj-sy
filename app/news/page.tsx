"use client";

import { motion } from "framer-motion";
import useGsapReveal from "@/hooks/useGsapReveal";
import { Button, Input, Spinner } from "@nextui-org/react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Calendar, User, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  coverUrl?: string;
  publishedAt?: string;
  createdAt: string;
  author?: { name?: string };
}

interface NewsResponse {
  data: NewsItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function NewsPage() {
  const h1Ref = useGsapReveal<HTMLHeadingElement>();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  const fetchNews = async (page = 1, searchTerm = "") => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        ...(searchTerm && { search: searchTerm }),
      });

      const response = await fetch(`/api/news?${params}`);
      const result: NewsResponse = await response.json();

      setNews(result.data);
      setPagination(result.pagination);
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(currentPage, search);
  }, [currentPage, search]);

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <motion.h1
        ref={h1Ref}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-3xl font-bold mb-2"
      >
        新闻资讯
      </motion.h1>
      <p className="text-muted-foreground mb-8">了解学校最新动态与重要公告</p>

      {/* 搜索栏 */}
      <div className="mb-8">
        <Input
          placeholder="搜索新闻标题或内容..."
          value={search}
          onValueChange={handleSearch}
          startContent={<Search className="size-4 text-muted-foreground" />}
          className="max-w-md"
          variant="bordered"
        />
      </div>

      {/* 新闻列表 */}
      {loading ? (
        <div className="flex justify-center py-12">
          <Spinner size="lg" color="primary" />
        </div>
      ) : news.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">暂无新闻内容</p>
        </div>
      ) : (
        <div className="space-y-6">
          {news.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="border rounded-xl p-6 hover:shadow-md transition-shadow bg-gradient-to-r from-background to-accent/5"
            >
              <div className="flex gap-6">
                {item.coverUrl && (
                  <div className="flex-shrink-0">
                    <Image
                      src={item.coverUrl}
                      alt={item.title}
                      width={200}
                      height={120}
                      className="rounded-lg object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h2 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                    <Link href={`/news/${item.slug}`}>{item.title}</Link>
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="size-4" />
                      {formatDate(item.publishedAt || item.createdAt)}
                    </div>
                    {item.author?.name && (
                      <div className="flex items-center gap-1">
                        <User className="size-4" />
                        {item.author.name}
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <Button
                      as={Link}
                      href={`/news/${item.slug}`}
                      size="sm"
                      color="primary"
                      variant="flat"
                    >
                      阅读全文
                    </Button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      )}

      {/* 分页 */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          <Button
            isDisabled={currentPage === 1}
            onPress={() => setCurrentPage(currentPage - 1)}
            variant="bordered"
            size="sm"
            startContent={<ChevronLeft className="size-4" />}
          >
            上一页
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <Button
                  key={pageNum}
                  onPress={() => setCurrentPage(pageNum)}
                  color={currentPage === pageNum ? "primary" : "default"}
                  variant={currentPage === pageNum ? "solid" : "bordered"}
                  size="sm"
                  className="min-w-10"
                >
                  {pageNum}
                </Button>
              );
            })}
          </div>

          <Button
            isDisabled={currentPage === pagination.totalPages}
            onPress={() => setCurrentPage(currentPage + 1)}
            variant="bordered"
            size="sm"
            endContent={<ChevronRight className="size-4" />}
          >
            下一页
          </Button>
        </div>
      )}

      {/* 统计信息 */}
      <div className="text-center text-sm text-muted-foreground mt-8">
        共 {pagination.total} 条新闻，第 {currentPage} 页，共 {pagination.totalPages} 页
      </div>
    </main>
  );
}


