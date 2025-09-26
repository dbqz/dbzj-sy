import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 通过slug获取单个新闻
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const news = await prisma.news.findUnique({
            where: { slug },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });

        if (!news) {
            return NextResponse.json(
                { error: "新闻不存在" },
                { status: 404 }
            );
        }

        // 只返回已发布的新闻，除非是通过管理后台访问
        if (!news.publishedAt) {
            // 检查是否是管理后台请求（通过查询参数或headers）
            const includeUnpublished = request.nextUrl.searchParams.get("includeUnpublished") === "true";
            if (!includeUnpublished) {
                return NextResponse.json(
                    { error: "新闻不存在" },
                    { status: 404 }
                );
            }
        }

        return NextResponse.json({
            data: news
        });
    } catch (error) {
        console.error("获取新闻失败:", error);
        return NextResponse.json(
            { error: "服务器内部错误" },
            { status: 500 }
        );
    }
}