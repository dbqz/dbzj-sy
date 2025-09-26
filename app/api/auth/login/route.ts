import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json();

        // 验证输入
        if (!email || !password) {
            return NextResponse.json(
                { error: "邮箱和密码不能为空" },
                { status: 400 }
            );
        }

        // 查找管理员用户
        const admin = await prisma.adminUser.findUnique({
            where: { email },
        });

        if (!admin) {
            return NextResponse.json(
                { error: "邮箱或密码错误" },
                { status: 401 }
            );
        }

        // 验证密码
        const isValidPassword = await bcrypt.compare(password, admin.passwordHash);

        if (!isValidPassword) {
            return NextResponse.json(
                { error: "邮箱或密码错误" },
                { status: 401 }
            );
        }

        // 生成 JWT token
        const token = jwt.sign(
            {
                userId: admin.id,
                email: admin.email,
                name: admin.name
            },
            process.env.JWT_SECRET || "your-secret-key",
            { expiresIn: "24h" }
        );

        // 记录登录日志
        await prisma.auditLog.create({
            data: {
                actorId: admin.id,
                action: "LOGIN",
                target: "ADMIN_PANEL",
            },
        });

        // 返回成功响应
        const response = NextResponse.json({
            success: true,
            message: "登录成功",
            user: {
                id: admin.id,
                email: admin.email,
                name: admin.name,
            },
        });

        // 设置 HTTP-only cookie
        response.cookies.set("auth-token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60, // 24 hours
        });

        return response;

    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { error: "服务器内部错误" },
            { status: 500 }
        );
    }
}