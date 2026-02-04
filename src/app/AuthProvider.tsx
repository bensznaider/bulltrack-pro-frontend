'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const hasChecked = useRef(false);

  useEffect(() => {
    // Only check once per route change
    if (hasChecked.current) return;
    hasChecked.current = true;

    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('access_token='))
      ?.split('=')[1];

    const isAuthed = Boolean(token);
    const PUBLIC_PATHS = ['/login', '/signup'];

    // Root redirects depending on auth state
    if (pathname === '/') {
      router.replace(isAuthed ? '/dashboard' : '/login');
    }
    // If authed, prevent visiting login/signup
    else if (isAuthed && PUBLIC_PATHS.includes(pathname)) {
      router.replace('/dashboard');
    }
    // If not authed, block dashboard
    else if (!isAuthed && pathname.startsWith('/dashboard')) {
      router.replace('/login');
    }
  }, [pathname, router]);

  return <>{children}</>;
}
