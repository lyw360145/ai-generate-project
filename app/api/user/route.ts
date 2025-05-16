import { NextResponse } from 'next/server';
import Auth from '@/lib/auth';

export async function GET(request: Request) {
  try {
    let token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      const cookies = request.headers.get('cookie');
      if (cookies) {
        const tokenCookie = cookies.split(';').find(c => c.trim().startsWith('token='));
        if (tokenCookie) {
          token = tokenCookie.split('=')[1];
        }
      }
    }
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    const user = await Auth.verifyToken(token);
    
  
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
    const  userInfo = await Auth.getUserById(user.userId);
    return NextResponse.json({ userInfo });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}