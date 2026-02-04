"use client";

import { useState } from "react";
import Header from "./layout/Header";
import Sidebar from "./layout/Sidebar";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen flex-col bg-[#111714]">
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - hidden on mobile, shown on tablet+ */}
        <div className="hidden md:flex md:w-[20%] md:flex-col md:overflow-y-auto">
          <Sidebar />
        </div>
        
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="absolute left-0 top-0 h-full w-64 bg-[#1a1f1d] rounded-r-2xl overflow-y-auto flex flex-col">
              <div className="flex justify-end p-4 border-b border-gray-700">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-white hover:text-gray-300 text-2xl font-light"
                  aria-label="Close sidebar"
                >
                  ✕
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <Sidebar />
              </div>
            </div>
          </div>
        )}
        
        <main className="flex-1 overflow-auto p-4 md:p-6 lg:p-[32px] bg-[#F7F7F7] rounded-t-2xl">
          {children}
        </main>
      </div>
    </div>
  );
}
