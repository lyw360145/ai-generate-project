import { NextResponse } from 'next/server';
import Auth from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    const token = await Auth.authenticate(username, password);
    return NextResponse.json({ token });
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid credentials' },
      { status: 401 }
    );
  }
}