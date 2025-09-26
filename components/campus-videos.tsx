"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardBody, CardHeader, /* Spinner, */ Button } from "@nextui-org/react";
import { Play, RefreshCw, Clock } from "lucide-react";
import Image from "next/image";

interface VideoAsset {
  id: string;
  url: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
  duration?: string;
}

interface CampusVideosProps {
  onVideoClick: (video: VideoAsset) => void;
}

export default function CampusVideos({ onVideoClick }: CampusVideosProps) {
  const [videos, setVideos] = useState<VideoAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchVideos = async () => {
    try {
      setLoading(true);
      setError(false);
      
      const response = await fetch("/api/campus?type=video");
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setVideos(result.data || []);
    } catch (error) {
      console.error("Failed to fetch campus videos:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="w-full aspect-video bg-gray-200 rounded-lg"></div>
            </CardHeader>
            <CardBody className="pt-0">
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </CardBody>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground mb-4">加载校园视频时出现错误</p>
        <Button 
          color="primary" 
          variant="bordered" 
          startContent={<RefreshCw className="size-4" />}
          onPress={fetchVideos}
        >
          重新加载
        </Button>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <Play className="size-16 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">暂无校园视频内容</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video, index) => (
        <motion.div
          key={video.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="cursor-pointer group"
          onClick={() => onVideoClick(video)}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="relative w-full aspect-video rounded-lg overflow-hidden">
                {video.thumbnailUrl ? (
                  <Image
                    src={video.thumbnailUrl}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ) : null}
                
                {/* 占位符 */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-center">
                    <Play className="size-16 mx-auto mb-2 text-primary" />
                    {video.duration && (
                      <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                        <Clock className="size-3" />
                        <span>{video.duration}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Play className="size-12 text-white" />
                </div>
                
                {/* 时长标签 */}
                {video.duration && (
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                )}
              </div>
            </CardHeader>
            <CardBody className="pt-0">
              <h3 className="font-semibold mb-1 line-clamp-1">{video.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {video.description || "暂无描述"}
              </p>
            </CardBody>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}