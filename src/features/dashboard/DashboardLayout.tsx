"use client";

import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {

  return (
    <div className="flex h-screen flex-col bg-[#111714]">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-[32px] bg-[#F7F7F7] rounded-t-2xl">
          {children}
        </main>
      </div>
    </div>
  );
}
