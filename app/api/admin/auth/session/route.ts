import { NextResponse } from 'next/server';
import { getSession } from '@/lib/session';

export async function GET() {
  try {
    const session = await getSession();
    if (session.isLoggedIn) {
      return NextResponse.json({ isLoggedIn: true, username: session.username, userId: session.userId });
    }
    return NextResponse.json({ isLoggedIn: false });
  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json({ isLoggedIn: false });
  }
}
