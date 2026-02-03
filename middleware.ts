import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_PATHS = ['/login', '/signup'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get('access_token')?.value;
  const isAuthed = Boolean(token);

  // Root redirects depending on auth state
  if (pathname === '/') {
    return NextResponse.redirect(
      new URL(isAuthed ? '/dashboard' : '/login', request.url),
    );
  }

  // If authed, prevent visiting login/signup
  if (isAuthed && PUBLIC_PATHS.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If not authed, block dashboard
  if (!isAuthed && pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/login', '/signup', '/dashboard/:path*'],
};
