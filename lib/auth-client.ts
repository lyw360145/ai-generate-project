'use client'
import axios from 'axios';

export default class AuthClient {
  static async login(username: string, password: string): Promise<string> {
    // 这里实现客户端登录逻辑
    const response = await axios.post('/api/login', { username, password });
    const data = response.data;
    return data.token;
  }

  static async register(username: string, password: string): Promise<string> {
    const response = await axios.post('/api/register', { username, password });
    const data = response.data;
    return data.token;
  }
}