import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const type = searchParams.get("type"); // image or video
    const limit = parseInt(searchParams.get("limit") || "10");

    const where: { category?: string; type?: string } = {};
    
    if (category) {
      where.category = category;
    }
    
    if (type) {
      where.type = type;
    }

    const mediaAssets = await prisma.mediaAsset.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      select: {
        id: true,
        url: true,
        type: true,
        title: true,
        description: true,
        category: true,
        thumbnailUrl: true,
        duration: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      data: mediaAssets,
      total: mediaAssets.length,
    });
  } catch (error) {
    console.error("Campus media API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch campus media" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, type, title, description, category, thumbnailUrl, duration } = body;

    if (!url || !type || !title) {
      return NextResponse.json(
        { error: "Missing required fields: url, type, title" },
        { status: 400 }
      );
    }

    const mediaAsset = await prisma.mediaAsset.create({
      data: {
        url,
        type,
        title,
        description,
        category,
        thumbnailUrl,
        duration,
      },
    });

    return NextResponse.json({ data: mediaAsset }, { status: 201 });
  } catch (error) {
    console.error("Campus media creation error:", error);
    return NextResponse.json(
      { error: "Failed to create media asset" },
      { status: 500 }
    );
  }
}