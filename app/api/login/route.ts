import { NextResponse } from 'next/server';
import Auth from '@/lib/auth';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();
        const token = await Auth.authenticate(username, password);
        // 构造一个带有 JSON body 的响应
        const res = NextResponse.json(
            {
                message: '登录成功',
                data: {
                    token: token
                }
            },
            {
                status: "200",
                headers: {
                    // 这里可以额外加响应头
                },
            }
        )
        // 设置 cookie
        res.cookies.set('token', token, {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60,
            secure: process.env.NODE_ENV === 'production',
        });


        return res;
    } catch (error) {
        return NextResponse.json(
            { error: 'Invalid credentials' },
            { status: 401 }
        );
    }
}