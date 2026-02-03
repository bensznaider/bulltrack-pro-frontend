'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();

  function logout() {
    document.cookie = 'access_token=; Max-Age=0; path=/;';
    router.replace('/login');
  }

  return (
    <div className="flex h-screen flex-col bg-[#111714]">
      <header className="h-[8vh] px-6 text-white ">
        <div className="flex h-full items-center justify-between">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <button 
            className="rounded border px-3 py-2 hover:bg-gray-100" 
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-[20%] text-white p-6">
          {/* Sidebar content */}
        </aside>
        <main className="flex-1 overflow-auto p-6 bg-[#F7F7F7] rounded-t-2xl">
          {children}
        </main>
      </div>
    </div>
  );
}