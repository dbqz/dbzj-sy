import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 获取单个新闻
export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const news = await prisma.news.findUnique({
            where: { id },
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

        return NextResponse.json(news);
    } catch (error) {
        console.error("获取新闻失败:", error);
        return NextResponse.json(
            { error: "服务器内部错误" },
            { status: 500 }
        );
    }
}

// 更新新闻
export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { title, slug, content, coverUrl, publishedAt } = body;

        // 验证必填字段
        if (!title || !content) {
            return NextResponse.json(
                { error: "标题和内容不能为空" },
                { status: 400 }
            );
        }

        // 检查 slug 是否已被其他新闻使用
        if (slug) {
            const existingNews = await prisma.news.findFirst({
                where: {
                    slug,
                    NOT: { id }
                }
            });

            if (existingNews) {
                return NextResponse.json(
                    { error: "URL 别名已被使用" },
                    { status: 400 }
                );
            }
        }

        const updatedNews = await prisma.news.update({
            where: { id },
            data: {
                title,
                slug,
                content,
                coverUrl: coverUrl || null,
                publishedAt: publishedAt ? new Date(publishedAt) : null,
                updatedAt: new Date(),
            },
            include: {
                author: {
                    select: {
                        name: true,
                        email: true,
                    },
                },
            },
        });

        return NextResponse.json({
            success: true,
            data: updatedNews,
        });
    } catch (error) {
        console.error("更新新闻失败:", error);
        return NextResponse.json(
            { error: "服务器内部错误" },
            { status: 500 }
        );
    }
}

// 删除新闻
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        // 检查新闻是否存在
        const news = await prisma.news.findUnique({
            where: { id }
        });

        if (!news) {
            return NextResponse.json(
                { error: "新闻不存在" },
                { status: 404 }
            );
        }

        await prisma.news.delete({
            where: { id }
        });

        return NextResponse.json({
            success: true,
            message: "新闻删除成功",
        });
    } catch (error) {
        console.error("删除新闻失败:", error);
        return NextResponse.json(
            { error: "服务器内部错误" },
            { status: 500 }
        );
    }
}