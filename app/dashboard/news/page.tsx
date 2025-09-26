"use client";

import { useState, useEffect } from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Edit, Trash2, Eye, Calendar, User } from "lucide-react";
import Link from "next/link";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { toast } from "sonner";

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  publishedAt?: string;
  createdAt: string;
  author?: { name?: string };
}

export default function NewsManagePage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await fetch('/api/news?includeUnpublished=true');
      if (response.ok) {
        const data = await response.json();
        setNews(data.data || []);
      }
    } catch (error) {
      console.error('获取新闻失败:', error);
    } finally {
      setLoading(false);
    }
  };
  const requestDelete = (id: string) => {
    setPendingDeleteId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!pendingDeleteId) return;
    try {
      const response = await fetch(`/api/news/${pendingDeleteId}`, { method: 'DELETE' });
      if (response.ok) {
        setNews(prev => prev.filter(item => item.id !== pendingDeleteId));
        toast.success('新闻删除成功');
      } else {
        const error = await response.json();
        toast.error(error.error || '删除失败');
      }
    } catch (error) {
      console.error('删除新闻失败:', error);
      toast.error('删除失败，请重试');
    } finally {
      setConfirmOpen(false);
      setPendingDeleteId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (publishedAt?: string) => {
    if (publishedAt) {
      return <Badge variant="default" className="bg-green-100 text-green-800">已发布</Badge>;
    }
    return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">草稿</Badge>;
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {/* 页面头部 */}
              <div className="px-4 lg:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">新闻管理</h1>
                    <p className="text-muted-foreground">
                      管理学校新闻和公告内容
                    </p>
                  </div>
                  <Button asChild>
                    <Link href="/dashboard/news/create">
                      <Plus className="size-4 mr-2" />
                      添加新闻
                    </Link>
                  </Button>
                </div>
              </div>

              {/* 统计卡片 */}
              <div className="px-4 lg:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        总新闻数
                      </CardTitle>
                      <Eye className="size-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{news.length}</div>
                      <p className="text-xs text-muted-foreground">
                        包含已发布和草稿
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        已发布
                      </CardTitle>
                      <Calendar className="size-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {news.filter(item => item.publishedAt).length}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        对外公开的新闻
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        草稿
                      </CardTitle>
                      <Edit className="size-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {news.filter(item => !item.publishedAt).length}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        待发布的新闻
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* 新闻列表 */}
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle>新闻列表</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {loading ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">加载中...</p>
                      </div>
                    ) : news.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground mb-4">暂无新闻内容</p>
                        <Button asChild>
                          <Link href="/dashboard/news/create">
                            <Plus className="size-4 mr-2" />
                            创建第一篇新闻
                          </Link>
                        </Button>
                      </div>
                    ) : (
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>标题</TableHead>
                            <TableHead>状态</TableHead>
                            <TableHead>作者</TableHead>
                            <TableHead>创建时间</TableHead>
                            <TableHead>发布时间</TableHead>
                            <TableHead className="text-right">操作</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {news.map((item) => (
                            <TableRow key={item.id}>
                              <TableCell className="font-medium">
                                <Link 
                                  href={`/news/${item.slug}`}
                                  className="hover:text-primary transition-colors"
                                  target="_blank"
                                >
                                  {item.title}
                                </Link>
                              </TableCell>
                              <TableCell>
                                {getStatusBadge(item.publishedAt)}
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                <div className="flex items-center gap-2">
                                  <User className="size-4" />
                                  {item.author?.name || '系统管理员'}
                                </div>
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {formatDate(item.createdAt)}
                              </TableCell>
                              <TableCell className="text-muted-foreground">
                                {item.publishedAt ? formatDate(item.publishedAt) : '-'}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <Button variant="ghost" size="sm" asChild>
                                    <Link href={`/news/${item.slug}`} target="_blank">
                                      <Eye className="size-4" />
                                    </Link>
                                  </Button>
                                  <Button variant="ghost" size="sm" asChild>
                                    <Link href={`/dashboard/news/edit/${item.id}`}>
                                      <Edit className="size-4" />
                                    </Link>
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-red-600 hover:text-red-700"
                                    onClick={() => requestDelete(item.id)}
                                  >
                                    <Trash2 className="size-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="确定要删除这篇新闻吗？"
        description="此操作不可恢复，将永久删除该条新闻。"
        confirmText="删除"
        cancelText="取消"
        onConfirm={handleConfirmDelete}
      />
    </SidebarProvider>
  );
}