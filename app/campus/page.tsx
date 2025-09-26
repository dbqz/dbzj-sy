"use client";

import { motion } from "framer-motion";
import useGsapReveal from "@/hooks/useGsapReveal";
import { Button, Card, CardBody, CardHeader, Tabs, Tab, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import Image from "next/image";
import { Building2, Wrench, GraduationCap, Users, Play, Camera, MapPin } from "lucide-react";
import CampusGallery from "@/components/campus-gallery";
import CampusVideos from "@/components/campus-videos";

interface MediaAsset {
  id: string;
  url: string;
  type: string;
  title: string;
  description?: string;
  category?: string;
  thumbnailUrl?: string;
  duration?: string;
}

export default function CampusPage() {
  const h1Ref = useGsapReveal<HTMLHeadingElement>();
  const [selectedTab, setSelectedTab] = useState("buildings");
  const [selectedMedia, setSelectedMedia] = useState<MediaAsset | null>(null);
  const { isOpen: isMediaOpen, onOpen: onMediaOpen, onClose: onMediaClose } = useDisclosure();

  const handleMediaClick = (media: MediaAsset) => {
    setSelectedMedia(media);
    onMediaOpen();
  };

  const handleVideoClick = (video: any) => {
    // 将 VideoAsset 转换为 MediaAsset 格式
    const mediaAsset: MediaAsset = {
      id: video.id,
      url: video.url,
      type: "video",
      title: video.title,
      description: video.description,
      thumbnailUrl: video.thumbnailUrl,
      duration: video.duration,
    };
    handleMediaClick(mediaAsset);
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      {/* 英雄区域 */}
      <motion.section
        ref={h1Ref}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative mb-16"
      >
        {/* 背景图片容器 */}
        <div className="relative h-[60vh] min-h-[400px] rounded-2xl overflow-hidden shadow-2xl">
          {/* 背景图片 */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-accent/20 to-primary/40">
            {/* 使用普通 img 标签避免 Next.js 图片域名限制 */}
            <img
              src="https://youke1.picui.cn/s1/2025/09/21/68d013d71378c.jpg"
              alt="定边职教中心校园全景"
              className="absolute inset-0 w-full h-full object-cover opacity-70"
              onError={(e) => {
                // 图片加载失败时隐藏
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>

          {/* 装饰性几何图形 */}
          <div className="absolute top-10 right-10 w-20 h-20 border-2 border-white/20 rounded-full"></div>
          <div className="absolute bottom-20 left-10 w-16 h-16 border-2 border-white/20 rotate-45"></div>
          <div className="absolute top-1/3 left-20 w-2 h-2 bg-white/40 rounded-full"></div>
          <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-white/30 rounded-full"></div>

          {/* 渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          {/* 内容 */}
          <div className="relative h-full flex items-center justify-center text-center px-4">
            <div className="max-w-4xl mx-auto text-white">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
              >
                校园看点
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-base md:text-lg leading-relaxed text-white/90 max-w-3xl mx-auto"
              >
                走进定边职教中心，感受300亩校园的魅力风光，体验现代化的实训设施，见证学生的成长足迹
              </motion.p>

              {/* 装饰元素 */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-8 flex items-center justify-center gap-2"
              >
                <div className="w-12 h-0.5 bg-white/60"></div>
                <MapPin className="size-6 text-white/80" />
                <div className="w-12 h-0.5 bg-white/60"></div>
              </motion.div>
            </div>
          </div>

          {/* 滚动提示 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center text-white/70">
              <span className="text-sm mb-2">探索更多</span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 校园概况 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mb-16"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardBody className="py-6">
              <Building2 className="size-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">主要建筑</h3>
              <p className="text-sm text-muted-foreground">教学楼、实验楼、办公楼、学生公寓</p>
            </CardBody>
          </Card>
          <Card className="text-center">
            <CardBody className="py-6">
              <Wrench className="size-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">实训车间</h3>
              <p className="text-sm text-muted-foreground">6个专业实训车间</p>
            </CardBody>
          </Card>
          <Card className="text-center">
            <CardBody className="py-6">
              <GraduationCap className="size-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">实验室</h3>
              <p className="text-sm text-muted-foreground">17个教学实验室</p>
            </CardBody>
          </Card>
          <Card className="text-center">
            <CardBody className="py-6">
              <MapPin className="size-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">校园面积</h3>
              <p className="text-sm text-muted-foreground">占地300亩</p>
            </CardBody>
          </Card>
        </div>
      </motion.section>

      {/* 校园图片展示 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="mb-16"
      >
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">校园风采</h2>

        <Tabs
          selectedKey={selectedTab}
          onSelectionChange={(key) => setSelectedTab(key as string)}
          className="w-full"
          classNames={{
            tabList: "grid w-full grid-cols-2 md:grid-cols-4",
          }}
        >
          <Tab key="buildings" title={
            <div className="flex items-center gap-2">
              <Building2 className="size-4" />
              <span>校园建筑</span>
            </div>
          } />
          <Tab key="workshops" title={
            <div className="flex items-center gap-2">
              <Wrench className="size-4" />
              <span>实训车间</span>
            </div>
          } />
          <Tab key="activities" title={
            <div className="flex items-center gap-2">
              <Users className="size-4" />
              <span>校园活动</span>
            </div>
          } />
          <Tab key="facilities" title={
            <div className="flex items-center gap-2">
              <GraduationCap className="size-4" />
              <span>校园设施</span>
            </div>
          } />
        </Tabs>

        <div className="mt-8">
          <CampusGallery category={selectedTab} onItemClick={handleMediaClick} />
        </div>
      </motion.section>

      {/* 校园视频 */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="mb-12"
      >
        <h2 className="text-xl md:text-2xl font-bold mb-6 text-center">校园视频</h2>
        <CampusVideos onVideoClick={handleVideoClick} />
      </motion.section>

      {/* 媒体查看模态框 */}
      <Modal
        isOpen={isMediaOpen}
        onClose={onMediaClose}
        size={selectedMedia?.type === "video" ? "5xl" : "4xl"}
        classNames={{
          body: "py-6",
          backdrop: "bg-black/50 backdrop-blur-sm",
        }}
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {selectedMedia?.title}
          </ModalHeader>
          <ModalBody>
            <div className={`relative w-full rounded-lg overflow-hidden mb-4 ${selectedMedia?.type === "video" ? "aspect-video" : "aspect-[4/3]"
              }`}>
              {selectedMedia?.url ? (
                selectedMedia.type === "video" ? (
                  <video
                    src={selectedMedia.url}
                    controls
                    className="w-full h-full object-cover"
                    poster={selectedMedia.thumbnailUrl}
                  >
                    您的浏览器不支持视频播放。
                  </video>
                ) : (
                  <Image
                    src={selectedMedia.url}
                    alt={selectedMedia.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                )
              ) : null}

              {/* 占位符 */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <div className="text-center">
                  {selectedMedia?.type === "video" ? (
                    <>
                      <Play className="size-20 mx-auto mb-4 text-primary" />
                      <p className="text-lg font-medium">{selectedMedia?.title}</p>
                      {selectedMedia?.duration && (
                        <p className="text-sm text-muted-foreground mt-2">时长: {selectedMedia.duration}</p>
                      )}
                    </>
                  ) : (
                    <>
                      <Camera className="size-16 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-lg font-medium">{selectedMedia?.title}</p>
                    </>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    {selectedMedia?.type === "video" ? "视频" : "图片"}占位 - 实际使用时请替换为真实媒体文件
                  </p>
                </div>
              </div>
            </div>
            <p className="text-muted-foreground">{selectedMedia?.description}</p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </main>
  );
}


