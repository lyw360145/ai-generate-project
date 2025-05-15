import { NextResponse } from 'next/server';
import Auth from '@/lib/auth';

interface RegisterRequest {
  username: string;
  password: string;
}

export async function POST(request: Request) {
  try {
    const { username, password }: RegisterRequest = await request.json();

    // 验证用户名和密码
    if (!username || !password) {
      return NextResponse.json(
        { error: '用户名和密码不能为空' },
        { status: 400 }
      );
    }

    // 检查用户名是否已存在
    const userExists = await Auth.checkUserExists(username);
    if (userExists) {
      return NextResponse.json(
        { error: '用户名已存在' },
        { status: 409 }
      );
    }

    // 创建用户
    const user = await Auth.createUser(username, password);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: '注册失败' },
      { status: 500 }
    );
  }
}