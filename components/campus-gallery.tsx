"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Card, CardBody, CardHeader, Button } from "@nextui-org/react";
import { Camera, Play, RefreshCw } from "lucide-react";
import Image from "next/image";

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

interface CampusGalleryProps {
  category: string;
  onItemClick: (item: MediaAsset) => void;
}

export default function CampusGallery({ category, onItemClick }: CampusGalleryProps) {
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchMediaAssets = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      
      const params = new URLSearchParams();
      if (category !== "all") {
        params.append("category", category);
      }
      params.append("type", "image");

      const response = await fetch(`/api/campus?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setMediaAssets(result.data || []);
    } catch (error) {
      console.error("Failed to fetch campus media:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchMediaAssets();
  }, [fetchMediaAssets]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="w-full aspect-[4/3] bg-gray-200 rounded-lg"></div>
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
        <p className="text-muted-foreground mb-4">加载校园媒体时出现错误</p>
        <Button 
          color="primary" 
          variant="bordered" 
          startContent={<RefreshCw className="size-4" />}
          onPress={fetchMediaAssets}
        >
          重新加载
        </Button>
      </div>
    );
  }

  if (mediaAssets.length === 0) {
    return (
      <div className="text-center py-12">
        <Camera className="size-16 mx-auto mb-4 text-muted-foreground" />
        <p className="text-muted-foreground">暂无{getCategoryName(category)}内容</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mediaAssets.map((asset, index) => (
        <motion.div
          key={asset.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="cursor-pointer group"
          onClick={() => onItemClick(asset)}
        >
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                {asset.url ? (
                  <Image
                    src={asset.url}
                    alt={asset.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      // 图片加载失败时显示占位符
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                ) : null}
                
                {/* 占位符 - 当图片不存在或加载失败时显示 */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <div className="text-center">
                    <Camera className="size-12 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">{asset.title}</p>
                  </div>
                </div>
                
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  {asset.type === "video" ? (
                    <Play className="size-8 text-white" />
                  ) : (
                    <Camera className="size-8 text-white" />
                  )}
                </div>
              </div>
            </CardHeader>
            <CardBody className="pt-0">
              <h3 className="font-semibold mb-1 line-clamp-1">{asset.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {asset.description || "暂无描述"}
              </p>
            </CardBody>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}

function getCategoryName(category: string): string {
  const categoryNames: Record<string, string> = {
    buildings: "校园建筑",
    workshops: "实训车间",
    activities: "校园活动",
    facilities: "校园设施",
    all: "校园",
  };
  return categoryNames[category] || "校园";
}