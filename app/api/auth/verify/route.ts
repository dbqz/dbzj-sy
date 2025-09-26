import { NextRequest, NextResponse } from "next/server";
import * as jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get('auth-token')?.value;

        if (!token) {
            return NextResponse.json(
                { error: "未登录" },
                { status: 401 }
            );
        }

        // 验证 JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key') as jwt.JwtPayload & {
            userId: string;
            email: string;
            name: string;
        };

        return NextResponse.json({
            success: true,
            user: {
                id: decoded.userId,
                email: decoded.email,
                name: decoded.name,
            },
        });

    } catch {
        // token 无效
        const response = NextResponse.json(
            { error: "登录已过期" },
            { status: 401 }
        );

        // 清除无效的 cookie
        response.cookies.set('auth-token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 0,
        });

        return response;
    }
}