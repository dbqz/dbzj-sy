import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import * as jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const includeUnpublished = searchParams.get("includeUnpublished") === "true";
    const skip = (page - 1) * limit;

    const where: Prisma.NewsWhereInput = {};
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" as const } },
        { content: { contains: search, mode: "insensitive" as const } },
      ];
    }

    // 如果不包含未发布的新闻，只显示已发布的
    if (!includeUnpublished) {
      where.publishedAt = { not: null };
    }

    const [news, total] = await Promise.all([
      prisma.news.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
        select: {
          id: true,
          title: true,
          slug: true,
          coverUrl: true,
          publishedAt: true,
          createdAt: true,
          author: {
            select: { name: true },
          },
        },
      }),
      prisma.news.count({ where }),
    ]);

    return NextResponse.json({
      data: news,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("News API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // 验证管理员身份
    const token = request.cookies.get('auth-token')?.value;
    if (!token) {
      return NextResponse.json(
        { error: "未登录" },
        { status: 401 }
      );
    }

    let userId: string | undefined;
    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'your-secret-key'
      ) as JwtPayload & { userId?: string };
      userId = decoded?.userId;
    } catch {
      return NextResponse.json(
        { error: "登录已过期" },
        { status: 401 }
      );
    }
    if (!userId) {
      return NextResponse.json(
        { error: "未授权" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, slug, content, coverUrl, publishedAt } = body;

    // 验证必填字段
    if (!title || !content) {
      return NextResponse.json(
        { error: "标题和内容不能为空" },
        { status: 400 }
      );
    }

    // 生成唯一的 slug
    let finalSlug = slug;
    if (!finalSlug) {
      finalSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9\u4e00-\u9fa5]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '') || `news-${Date.now()}`;
    }

    // 检查 slug 是否已存在
    const existingNews = await prisma.news.findUnique({
      where: { slug: finalSlug }
    });

    if (existingNews) {
      finalSlug = `${finalSlug}-${Date.now()}`;
    }

    const news = await prisma.news.create({
      data: {
        title,
        slug: finalSlug,
        content,
        coverUrl: coverUrl || null,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
        authorId: userId,
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
      data: news,
    });
  } catch (error) {
    console.error("创建新闻失败:", error);
    return NextResponse.json(
      { error: "服务器内部错误" },
      { status: 500 }
    );
  }
}
