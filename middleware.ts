import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    // 只对 /dashboard 路径进行保护
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        const token = request.cookies.get('auth-token')?.value;

        if (!token) {
            // 没有 token，重定向到登录页
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        // 简单检查 token 是否存在且不为空
        // 实际的 JWT 验证在 API 路由中进行
        if (!token || token.trim() === '') {
            const response = NextResponse.redirect(new URL('/admin/login', request.url));
            response.cookies.delete('auth-token');
            return response;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*']
};