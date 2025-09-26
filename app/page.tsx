"use client";


import { Button } from "@nextui-org/react";
import useGsapReveal from "@/hooks/useGsapReveal";
import { motion } from "framer-motion";
import Link from "next/link";
import { School, Building2, Users, Newspaper, Handshake, Briefcase, Camera, Calendar, MessageCircle, Terminal } from "lucide-react";
import { useState, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface NewsItem {
  id: string;
  title: string;
  slug: string;
  coverUrl?: string;
  publishedAt?: string;
  createdAt: string;
  author?: { name?: string };
}

interface CampusImage {
  id: string;
  url: string;
  title: string;
}

export default function Home() {
  const titleRef = useGsapReveal<HTMLHeadingElement>();
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);
  const [newsError, setNewsError] = useState(false);
  const [campusImages, setCampusImages] = useState<CampusImage[]>([]);
  const [campusLoading, setCampusLoading] = useState(true);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        setNewsLoading(true);
        setNewsError(false);
        const response = await fetch("/api/news?limit=3");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        setLatestNews(result.data || []);
      } catch (error) {
        console.error("Failed to fetch latest news:", error);
        setNewsError(true);
      } finally {
        setNewsLoading(false);
      }
    };

    const fetchCampusImages = async () => {
      try {
        setCampusLoading(true);
        // 获取不同类别的校园图片，每类取1-2张
        const [buildingsRes, workshopsRes, facilitiesRes] = await Promise.all([
          fetch("/api/campus?category=buildings&limit=2"),
          fetch("/api/campus?category=workshops&limit=2"), 
          fetch("/api/campus?category=facilities&limit=2")
        ]);

        const [buildings, workshops, facilities] = await Promise.all([
          buildingsRes.json(),
          workshopsRes.json(),
          facilitiesRes.json()
        ]);

        // 合并并取前6张图片
        const allImages = [
          ...(buildings.data || []),
          ...(workshops.data || []),
          ...(facilities.data || [])
        ].slice(0, 6);

        setCampusImages(allImages);
      } catch (error) {
        console.error("Failed to fetch campus images:", error);
      } finally {
        setCampusLoading(false);
      }
    };

    fetchLatestNews();
    fetchCampusImages();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("zh-CN", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8">
      {/* 英雄区 */}
      <section className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary/10 via-accent/10 to-transparent p-8 sm:p-12 shadow-xl"
        >
          {/* 动态背景装饰 */}
          <div className="absolute -top-20 -right-20 size-80 rounded-full bg-primary/10 blur-3xl animate-pulse" />
          <div className="absolute -bottom-16 -left-16 size-72 rounded-full bg-accent/10 blur-3xl animate-pulse" />
          <div className="absolute top-1/2 right-1/4 size-32 rounded-full bg-primary/5 blur-2xl" />
          
          <div className="flex items-start justify-between gap-6 relative">
            <div className="flex-1">
              <motion.h1 
                ref={titleRef} 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              >
                定边县职业教育中心
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-4 text-base text-muted-foreground max-w-2xl leading-relaxed"
              >
                始建于1983年10月，国家级重点中等职业学校，占地300亩，现有42个教学班，学生2240名，教职工182人。
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-8 flex flex-wrap items-center gap-4"
              >
                <Button 
                  as={Link} 
                  href="/about" 
                  color="primary"
                  size="lg"
                  className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  startContent={<School className="size-5" />}
                >
                  了解学校
                </Button>
                <Button 
                  as={Link} 
                  href="/news" 
                  variant="bordered"
                  size="lg"
                  className="border-2 hover:bg-primary/5 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  startContent={<Newspaper className="size-5" />}
                >
                  查看新闻
                </Button>
                <Button 
                  as={Link} 
                  href="/campus" 
                  variant="light"
                  size="lg"
                  className="hover:bg-accent/10 transition-all duration-300"
                  startContent={<Camera className="size-5" />}
                >
                  校园看点
                </Button>
              </motion.div>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="size-32 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-2xl">
                  <School className="size-16 text-primary" />
                </div>
                <div className="absolute -top-2 -right-2 size-8 rounded-full bg-accent animate-bounce">
                  <div className="size-full rounded-full bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">新</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* 要点数据 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <StatCard icon={<Building2 className="size-5" />} label="占地面积" value="300亩" />
          <StatCard icon={<School className="size-5" />} label="教学班" value="42个" />
          <StatCard icon={<Users className="size-5" />} label="在校生" value="2240名" />
          <StatCard icon={<Users className="size-5" />} label="教职工" value="182人" />
        </div>
      </section>

      {/* 新闻预览 */}
      <section className="max-w-6xl mx-auto mt-8">
        <Alert>
          <Terminal />
          <AlertTitle>提示</AlertTitle>
          <AlertDescription>
            本站使用 shadcn/ui 组件库。你可以通过 CLI 添加更多组件。
          </AlertDescription>
        </Alert>
      </section>

      
      <section className="max-w-6xl mx-auto mt-12">
        <SectionHeader title="新闻资讯" subtitle="最新动态与公告" actionHref="/news" actionText="全部新闻" />
        
        {newsLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-xl p-4 shadow-sm animate-pulse">
                <div className="h-3 bg-gray-200 rounded mb-2 w-20"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded mb-3 w-3/4"></div>
                <div className="h-8 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        ) : newsError ? (
          <div className="text-center py-8 mt-4">
            <p className="text-muted-foreground mb-4">加载新闻时出现错误</p>
            <Button 
              color="primary" 
              variant="bordered" 
              onPress={() => window.location.reload()}
            >
              重新加载
            </Button>
          </div>
        ) : latestNews.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            {latestNews.map((item, i) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.2 }
                }}
                className="group relative overflow-hidden border rounded-2xl p-6 shadow-lg bg-gradient-to-br from-background to-accent/5 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* 悬停背景效果 */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* 日期标签 */}
                <div className="relative flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <div className="p-1.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                    <Calendar className="size-3" />
                  </div>
                  <span className="font-medium">
                    {formatDate(item.publishedAt || item.createdAt)}
                  </span>
                </div>
                
                {/* 标题 */}
                <Link 
                  href={`/news/${item.slug}`} 
                  className="relative block"
                >
                  <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors duration-300 mb-4">
                    {item.title}
                  </h3>
                </Link>
                
                {/* 底部按钮 */}
                <div className="relative flex items-center justify-between">
                  <Button 
                    as={Link} 
                    href={`/news/${item.slug}`} 
                    size="sm" 
                    variant="flat"
                    color="primary"
                    className="bg-primary/10 hover:bg-primary/20 transition-all duration-300"
                    startContent={<Newspaper className="size-4" />}
                  >
                    查看详情
                  </Button>
                  
                  {/* 箭头图标 */}
                  <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <svg className="size-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
                
                {/* 装饰性元素 */}
                <div className="absolute top-4 right-4 size-2 rounded-full bg-accent opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500" />
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 mt-4">
            <p className="text-muted-foreground mb-4">暂无新闻内容</p>
            <Button as={Link} href="/news" color="primary" variant="bordered">
              查看所有新闻
            </Button>
          </div>
        )}
      </section>

      {/* 校园看点 */}
      <section className="max-w-6xl mx-auto mt-12">
        <SectionHeader title="校园看点" subtitle="校园风光与实训设施" actionHref="/campus" actionText="更多看点" />
        
        {campusLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-[16/9] border rounded-xl animate-pulse bg-gray-200"></div>
            ))}
          </div>
        ) : campusImages.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
            {campusImages.map((image, i) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.2 }
                }}
                className="group cursor-pointer"
              >
                <Link href="/campus" className="block">
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-background to-accent/20 hover:shadow-2xl transition-all duration-500">
                    {/* 图片 */}
                    <img
                      src={image.url}
                      alt={image.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                    
                    {/* 占位符背景 */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <div className="text-center">
                        <div className="p-4 rounded-full bg-white/20 backdrop-blur-sm mb-3">
                          <Camera className="size-8 text-white" />
                        </div>
                        <p className="text-white font-medium">{image.title}</p>
                      </div>
                    </div>
                    
                    {/* 渐变遮罩 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                    
                    {/* 悬停效果 */}
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
                    
                    {/* 内容区域 */}
                    <div className="absolute inset-0 flex flex-col justify-end p-6">
                      <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-1">
                          {image.title}
                        </h3>
                        <div className="flex items-center gap-2 text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Camera className="size-4" />
                          <span>查看更多校园风光</span>
                          <svg className="size-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    {/* 装饰性边框 */}
                    <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/20 rounded-2xl transition-colors duration-300" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
            {[
              { title: "教学楼", desc: "现代化教学设施" },
              { title: "实训中心", desc: "专业技能培训" },
              { title: "校园设施", desc: "完善的生活配套" },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group cursor-pointer"
              >
                <Link href="/campus" className="block">
                  <div className="aspect-[16/9] border rounded-xl flex items-center justify-center text-sm text-muted-foreground shadow-sm bg-gradient-to-br from-background to-accent/20 hover:shadow-md transition-shadow">
                    <div className="text-center">
                      <Camera className="size-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="font-medium">{item.title}</p>
                      <p className="text-xs mt-1">{item.desc}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* 合作与就业 */}
      <section className="max-w-6xl mx-auto mt-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-4">
            合作与就业
          </h2>
          <p className="text-muted-foreground text-base max-w-2xl mx-auto">
            深化校企合作，拓宽就业渠道，为学生提供更多发展机会
          </p>
          <div className="mt-4 h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full mx-auto" />
        </motion.div>
        
        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5 }}
            whileHover={{ 
              y: -5,
              transition: { duration: 0.2 }
            }}
            className="group relative overflow-hidden border rounded-3xl p-8 shadow-lg bg-gradient-to-br from-background via-background to-primary/5 hover:shadow-2xl transition-all duration-500"
          >
            {/* 背景装饰 */}
            <div className="absolute -top-10 -right-10 size-32 rounded-full bg-primary/10 blur-2xl group-hover:bg-primary/20 transition-colors duration-500" />
            
            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                  <Handshake className="size-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">联合办学</h3>
              </div>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                与榆林师范、榆林工校、陕西省艺术学校等院校深度合作，共享优质教育资源，提升办学水平。
              </p>
              
              <div className="flex items-center justify-between">
                <Button 
                  as={Link} 
                  href="/cooperation" 
                  color="primary"
                  variant="flat"
                  className="bg-primary/10 hover:bg-primary/20 transition-all duration-300"
                  endContent={<svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>}
                >
                  查看合作项目
                </Button>
                
                <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <div className="flex items-center gap-1 text-sm text-primary">
                    <span>了解更多</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 底部装饰线 */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-700" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ 
              y: -5,
              transition: { duration: 0.2 }
            }}
            className="group relative overflow-hidden border rounded-3xl p-8 shadow-lg bg-gradient-to-br from-background via-background to-accent/5 hover:shadow-2xl transition-all duration-500"
          >
            {/* 背景装饰 */}
            <div className="absolute -top-10 -right-10 size-32 rounded-full bg-accent/10 blur-2xl group-hover:bg-accent/20 transition-colors duration-500" />
            
            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-accent/10 group-hover:bg-accent/20 transition-colors duration-300">
                  <Briefcase className="size-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold">就业服务</h3>
              </div>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                向靖江等地输送优秀学员，重点专业沿海就业形势良好，为学生搭建广阔就业平台。
              </p>
              
              <div className="flex items-center justify-between">
                <Button 
                  as={Link} 
                  href="/jobs" 
                  color="secondary"
                  variant="flat"
                  className="bg-accent/10 hover:bg-accent/20 transition-all duration-300"
                  endContent={<svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>}
                >
                  查看就业信息
                </Button>
                
                <div className="opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <div className="flex items-center gap-1 text-sm text-accent">
                    <span>了解更多</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 底部装饰线 */}
            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-accent to-primary group-hover:w-full transition-all duration-700" />
          </motion.div>
        </div>
      </section>

      {/* 社交媒体 */}
      <section className="max-w-6xl mx-auto mt-16 mb-16">
        <SectionHeader title="关注我们" subtitle="关注微信公众号，获取最新学校资讯" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 mt-8"
        >
          <motion.div
            whileHover={{ 
              scale: 1.05,
              y: -2,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="group inline-flex items-center gap-3 border-2 rounded-2xl px-6 py-4 text-sm hover:bg-accent/10 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-lg">
              <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                <MessageCircle className="size-5" />
              </div>
              <div className="text-center">
                <span className="font-medium group-hover:text-primary transition-colors duration-300 block">微信公众号</span>
                <span className="text-xs text-muted-foreground">定边县实验中学</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
        

      </section>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        scale: 1.05, 
        y: -5,
        transition: { duration: 0.2 }
      }}
      className="group relative overflow-hidden border rounded-2xl p-6 shadow-lg bg-gradient-to-br from-background via-background to-accent/5 hover:shadow-xl transition-all duration-300 cursor-pointer"
    >
      {/* 悬停背景效果 */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* 装饰性圆点 */}
      <div className="absolute top-4 right-4 size-2 rounded-full bg-primary/20 group-hover:bg-primary/40 transition-colors duration-300" />
      
      <div className="relative">
        <div className="text-muted-foreground text-sm flex items-center gap-3 mb-3">
          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
            {icon}
          </div>
          <span className="font-medium">{label}</span>
        </div>
        <div className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
          {value}
        </div>
      </div>
      
      {/* 底部装饰线 */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-500" />
    </motion.div>
  );
}

function SectionHeader({ title, subtitle, actionHref, actionText }: { title: string; subtitle?: string; actionHref?: string; actionText?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5 }}
      className="flex items-end justify-between gap-4 mb-6"
    >
      <div className="flex-1">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
          {title}
        </h2>
        {subtitle && (
          <p className="text-muted-foreground mt-2 text-base leading-relaxed max-w-2xl">
            {subtitle}
          </p>
        )}
        {/* 装饰线 */}
        <div className="mt-4 h-1 w-20 bg-gradient-to-r from-primary to-accent rounded-full" />
      </div>
      {actionHref && actionText && (
        <Button 
          as={Link} 
          href={actionHref} 
          variant="bordered"
          className="border-2 hover:bg-primary/5 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
          endContent={<svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>}
        >
          {actionText}
        </Button>
      )}
    </motion.div>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        y: -2,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
    >
      <Link 
        href={href} 
        aria-label={label} 
        className="group inline-flex items-center gap-3 border-2 rounded-2xl px-6 py-4 text-sm hover:bg-accent/10 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-lg"
      >
        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
          {children}
        </div>
        <span className="font-medium group-hover:text-primary transition-colors duration-300">{label}</span>
        <svg className="size-4 opacity-0 group-hover:opacity-100 transform translate-x-1 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </Link>
    </motion.div>
  );
}
