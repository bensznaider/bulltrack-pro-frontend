import { NextRequest, NextResponse } from 'next/server';
import { signupUser } from '@/lib/api';

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();

  try {
    const data = await signupUser(email, password);
    
    // Set cookie on server side
    const res = NextResponse.json({ success: true, access_token: data.access_token });
    res.cookies.set('access_token', data.access_token, {
      path: '/',
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return res;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Signup failed';
    return NextResponse.json(
      { error: message },
      { status: 401 }
    );
  }
}
