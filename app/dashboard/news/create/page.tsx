"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { RichTextEditor } from "@/components/rich-text-editor";
import { ArrowLeft, Save, Eye, Upload } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";

export default function CreateNewsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmType, setConfirmType] = useState<"publish" | "removeImage" | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    coverUrl: "",
    publishedAt: null as string | null,
    isPublished: false,
  });

  const handleTitleChange = (title: string) => {
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\u4e00-\u9fa5]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    
    setFormData(prev => ({
      ...prev,
      title,
      slug: slug || `news-${Date.now()}`
    }));
  };

  const handleSubmit = async (isDraft = true) => {
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error('请填写标题和内容');
      return;
    }

    setLoading(true);
    try {
      const submitData = {
        ...formData,
        publishedAt: isDraft ? null : new Date().toISOString(),
      };

      const response = await fetch('/api/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        await response.json();
        toast.success(isDraft ? '草稿保存成功！' : '新闻发布成功！');
        router.push('/dashboard/news');
      } else {
        const error = await response.json();
        toast.error(error.error || '保存失败');
      }
    } catch (error) {
      console.error('保存新闻失败:', error);
      toast.error('保存失败，请重试');
    } finally {
      setLoading(false);
    }
  };
  const requestPublish = () => {
    setConfirmType("publish");
    setConfirmOpen(true);
  };

  const requestRemoveImage = () => {
    setConfirmType("removeImage");
    setConfirmOpen(true);
  };

  const handleConfirm = async () => {
    if (confirmType === "publish") {
      await handleSubmit(false);
    }
    if (confirmType === "removeImage") {
      setFormData(prev => ({ ...prev, coverUrl: '' }));
    }
    setConfirmOpen(false);
    setConfirmType(null);
  };

  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // 这里应该上传到文件服务器，现在先用占位符
        const imageUrl = URL.createObjectURL(file);
        setFormData(prev => ({ ...prev, coverUrl: imageUrl }));
        toast.info('图片上传功能需要配置文件存储服务');
      }
    };
    input.click();
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
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/dashboard/news">
                        <ArrowLeft className="size-4 mr-2" />
                        返回列表
                      </Link>
                    </Button>
                    <div>
                      <h1 className="text-2xl font-bold">创建新闻</h1>
                      <p className="text-muted-foreground">
                        编写和发布学校新闻内容
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handleSubmit(true)}
                      disabled={loading}
                    >
                      <Save className="size-4 mr-2" />
                      保存草稿
                    </Button>
                    <Button
                      onClick={requestPublish}
                      disabled={loading}
                    >
                      <Eye className="size-4 mr-2" />
                      发布新闻
                    </Button>
                  </div>
                </div>
              </div>

              {/* 编辑表单 */}
              <div className="px-4 lg:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* 主要内容 */}
                  <div className="lg:col-span-2 space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>基本信息</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="title">新闻标题 *</Label>
                          <Input
                            id="title"
                            placeholder="请输入新闻标题"
                            value={formData.title}
                            onChange={(e) => handleTitleChange(e.target.value)}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="slug">URL 别名</Label>
                          <Input
                            id="slug"
                            placeholder="自动生成或手动输入"
                            value={formData.slug}
                            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                          />
                          <p className="text-xs text-muted-foreground">
                            新闻的访问链接：/news/{formData.slug}
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>新闻内容</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <RichTextEditor
                          content={formData.content}
                          onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                          placeholder="开始编写新闻内容..."
                        />
                      </CardContent>
                    </Card>
                  </div>

                  {/* 侧边栏 */}
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>发布设置</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="publish-toggle">立即发布</Label>
                          <Switch
                            id="publish-toggle"
                            checked={formData.isPublished}
                            onCheckedChange={(checked) => 
                              setFormData(prev => ({ ...prev, isPublished: checked }))
                            }
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {formData.isPublished ? '新闻将立即发布到网站' : '新闻将保存为草稿'}
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>封面图片</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {formData.coverUrl ? (
                          <div className="space-y-2">
                            <img
                              src={formData.coverUrl}
                              alt="封面预览"
                              className="w-full h-32 object-cover rounded-lg border"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={requestRemoveImage}
                            >
                              移除图片
                            </Button>
                          </div>
                        ) : (
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                            <Upload className="size-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-600 mb-2">点击上传封面图片</p>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleImageUpload}
                            >
                              选择图片
                            </Button>
                          </div>
                        )}
                        
                        <div className="space-y-2">
                          <Label htmlFor="cover-url">或输入图片URL</Label>
                          <Input
                            id="cover-url"
                            placeholder="https://example.com/image.jpg"
                            value={formData.coverUrl}
                            onChange={(e) => setFormData(prev => ({ ...prev, coverUrl: e.target.value }))}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>预览</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <h3 className="font-medium text-sm">标题预览</h3>
                          <p className="text-sm text-muted-foreground">
                            {formData.title || '请输入新闻标题'}
                          </p>
                        </div>
                        <div className="space-y-2 mt-4">
                          <h3 className="font-medium text-sm">内容长度</h3>
                          <p className="text-sm text-muted-foreground">
                            {formData.content.replace(/<[^>]*>/g, '').length} 字符
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title={confirmType === 'publish' ? '确认发布这条新闻？' : '确认移除封面图片？'}
        description={
          confirmType === 'publish'
            ? '发布后新闻将对外可见。'
            : '移除后可以重新上传或填写图片 URL。'
        }
        confirmText={confirmType === 'publish' ? '发布' : '移除'}
        cancelText="取消"
        onConfirm={handleConfirm}
      />
    </SidebarProvider>
  );
}