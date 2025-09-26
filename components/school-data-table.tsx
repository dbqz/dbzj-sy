"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash2 } from "lucide-react";

interface SchoolDataItem {
  id: number;
  title: string;
  type: string;
  status: string;
  count: string;
  lastUpdate: string;
  author: string;
}

interface SchoolDataTableProps {
  data: SchoolDataItem[];
}

export function SchoolDataTable({ data }: SchoolDataTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "正常":
        return <Badge variant="default" className="bg-green-100 text-green-800">正常</Badge>;
      case "警告":
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">警告</Badge>;
      case "错误":
        return <Badge variant="destructive">错误</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    const typeColors: Record<string, string> = {
      "内容管理": "bg-blue-100 text-blue-800",
      "媒体管理": "bg-purple-100 text-purple-800",
      "用户管理": "bg-green-100 text-green-800",
      "教学管理": "bg-orange-100 text-orange-800",
      "就业服务": "bg-indigo-100 text-indigo-800",
      "合作管理": "bg-pink-100 text-pink-800",
      "数据分析": "bg-gray-100 text-gray-800",
      "系统管理": "bg-red-100 text-red-800",
      "安全管理": "bg-yellow-100 text-yellow-800",
    };

    return (
      <Badge variant="outline" className={typeColors[type] || "bg-gray-100 text-gray-800"}>
        {type}
      </Badge>
    );
  };

  return (
    <div className="px-4 lg:px-6">
      <div className="rounded-lg border bg-card">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">系统管理概览</h3>
              <p className="text-sm text-muted-foreground">
                管理学校网站的各个模块和功能
              </p>
            </div>
            <Button size="sm">
              <Eye className="size-4 mr-2" />
              查看全部
            </Button>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>模块名称</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>数量</TableHead>
                <TableHead>最后更新</TableHead>
                <TableHead>操作人</TableHead>
                <TableHead className="text-right">操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.title}</TableCell>
                  <TableCell>{getTypeBadge(item.type)}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                  <TableCell className="font-mono">{item.count}</TableCell>
                  <TableCell className="text-muted-foreground">{item.lastUpdate}</TableCell>
                  <TableCell className="text-muted-foreground">{item.author}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="size-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="size-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}