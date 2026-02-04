"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MapPin, ChevronDown, Menu } from "lucide-react";

export default function Header({ onMenuClick }: { onMenuClick?: () => void }) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [userEmail] = useState<string | null>(() =>
    typeof window !== "undefined" ? localStorage.getItem("userEmail") : null,
  );

  function logout() {
    document.cookie = "access_token=; Max-Age=0; path=/;";
    localStorage.removeItem("userEmail");
    router.replace("/login");
  }

  function handleAvatarClick() {
    setShowMenu(!showMenu);
  }

  return (
    <header className="h-[8vh] p-4 md:p-6 text-white ">
      <div className="flex h-full items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            className="md:hidden text-white cursor-pointer hover:opacity-80 transition-opacity"
            onClick={onMenuClick}
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl md:text-2xl font-semibold flex items-center flex-shrink-0">
            <p className="bg-[#36E27B] rounded-full w-8 md:w-10 h-8 md:h-10 inline-flex items-center justify-center mr-2 text-black text-sm md:text-base flex-shrink-0">
              B
            </p>
            <span className="hidden sm:inline">Bulltrack</span>
          </h1>
        </div>
        <div className="flex items-center gap-2 md:gap-4 flex-wrap justify-end">
          {" "}
          <div className="hidden sm:flex items-center gap-2 cursor-pointer bg-[#152B1E] h-fit text-[#36E27B] border-[#36E27B] border px-3 md:px-4 py-2 rounded-[12px] text-sm md:text-base">
            <MapPin size={14} />
            <p className="text-[12px] md:text-[14px]">La soledad</p>
            <ChevronDown size={14} />
          </div>
          <div className="relative">
            <button
              className="rounded-full h-8 md:h-10 w-8 md:w-10 border relative overflow-hidden cursor-pointer hover:opacity-80 transition-opacity flex-shrink-0"
              onClick={handleAvatarClick}
            >
              <Image
                src="/assets/default-avatar.png"
                alt="User Avatar"
                width={40}
                height={40}
                className="w-full h-full object-cover"
              />
            </button>
            {/* Logout dropdown */}
            {showMenu && (
              <div className="absolute top-12 right-0 bg-white rounded-lg shadow-lg p-1 z-50">
                {userEmail && (
                  <div className="text-sm text-gray-700 mb-2 p-2">
                    {userEmail}
                  </div>
                )}
                <button
                  onClick={logout}
                  className="w-full p-2 text-center text-sm text-gray-700 hover:bg-gray-100 rounded transition-colors cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
