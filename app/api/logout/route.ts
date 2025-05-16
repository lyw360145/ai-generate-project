import { NextResponse } from 'next/server';

export async function POST() {
  // 清除用户认证token
  const response = NextResponse.json({ success: true });
  response.cookies.delete('token');
  return response;
}