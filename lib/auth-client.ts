'use client'

export default class AuthClient {
  static async login(username: string, password: string): Promise<string> {
    // 这里实现客户端登录逻辑
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('登录失败');
    }

    const data = await response.json();
    return data.token;
  }

  static async register(username: string, password: string): Promise<string> {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('注册失败');
    }

    const data = await response.json();
    return data.token;
  }
}