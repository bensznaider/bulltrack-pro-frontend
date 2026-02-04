"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MapPin, ChevronDown, ArrowLeft, Check } from "lucide-react";
import { useBullsContext } from "./BullsContext";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const { filters, updateFilters, showFavoritesOnly, toggleFavoritesFilter } =
    useBullsContext();
  const [showMenu, setShowMenu] = useState(false);
  const [userEmail] = useState<string | null>(() =>
    typeof window !== "undefined" ? localStorage.getItem("userEmail") : null,
  );
  const [showPelajeDropdown, setShowPelajeDropdown] = useState(false);
  const [showOrdenDropdown, setShowOrdenDropdown] = useState(false);

  // Show check if favorites filter is enabled, regardless of results
  const hasOnlyFavorites = showFavoritesOnly;

  const handleOrigenChange = (origen: "propio" | "catalogo" | undefined) => {
    updateFilters({
      ...filters,
      origen: origen,
      page: 1,
    });
  };

  const handleUsoChange = (uso: "vaquillona" | "vaca" | undefined) => {
    updateFilters({
      ...filters,
      uso: uso,
      page: 1,
    });
  };

  const handlePelajeChange = (pelaje: "negro" | "colorado" | undefined) => {
    updateFilters({
      ...filters,
      pelaje: pelaje,
      page: 1,
    });
  };

  const handleSortChange = (sort: "score_desc" | "score_asc") => {
    updateFilters({
      ...filters,
      sort: sort,
      page: 1,
    });
  };

  const handleFavoritesFilter = () => {
    // Toggle client-side favorites filter
    // This works independently from API filters and only shows favorites from current results
    toggleFavoritesFilter();
  };

  function logout() {
    document.cookie = "access_token=; Max-Age=0; path=/;";
    localStorage.removeItem("userEmail");
    router.replace("/login");
  }

  function handleAvatarClick() {
    setShowMenu(!showMenu);
  }

  return (
    <div className="flex h-screen flex-col bg-[#111714]">
      <header className="h-[8vh] p-6 text-white ">
        <div className="flex h-full items-center justify-between">
          <h1 className="text-2xl font-semibold flex items-center">
            <p className="bg-[#36E27B] rounded-full w-10 h-10 inline-flex items-center justify-center mr-2 text-black">
              B
            </p>
            Bulltrack
          </h1>
          <div className="flex items-center gap-4">
            {" "}
            <div className="flex items-center gap-2 cursor-pointer bg-[#152B1E] h-fit text-[#36E27B] border-[#36E27B] border px-4 py-2 rounded-[12px]">
              <MapPin size={14} />
              <p className="text-[14px]">La soledad</p>
              <ChevronDown size={14} />
            </div>
            <div className="relative">
              <button
                className="rounded-full h-10 w-10 mt-2 border relative overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
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
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-[20%] text-white text-[14px] p-6 overflow-y-auto bg-[#1a1f1d]">
          <div className="mb-6">
            <h2 className="font-medium text-[14px] mb-4 text-white">
              FILTROS ACTIVOS
            </h2>

            <div className="mb-3">
              <h3 className="font-normal text-white mb-4">Origen</h3>
              <button
                onClick={() => handleOrigenChange(undefined)}
                className={`w-full text-left bg-[#152B1E] border rounded-[12px] px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-[#2f3f37] transition-colors ${
                  !filters.origen ? "border-[#36E27B]" : "border-[#36E27B]/30"
                }`}
              >
                <span className="text-white text-[14px]">Todos</span>
                {!filters.origen && (
                  <div className="w-5 h-5 rounded-[4px] border-2 border-[#36E27B] bg-[#36E27B] flex items-center justify-center">
                    <Check size={14} className="text-black" />
                  </div>
                )}
              </button>
            </div>

            <div className="mb-3">
              <button
                onClick={() => handleOrigenChange("propio")}
                className={`w-full text-left bg-[#152B1E] border rounded-[12px] px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-[#2f3f37] transition-colors ${
                  filters.origen === "propio"
                    ? "border-[#36E27B]"
                    : "border-[#36E27B]/30"
                }`}
              >
                <span className="text-white text-[14px]">Toros propios</span>
                {filters.origen === "propio" && (
                  <div className="w-5 h-5 rounded-[4px] border-2 border-[#36E27B] bg-[#36E27B] flex items-center justify-center">
                    <Check size={14} className="text-black" />
                  </div>
                )}
              </button>
            </div>

            <div className="mb-3">
              <button
                onClick={() => handleOrigenChange("catalogo")}
                className={`w-full text-left bg-[#152B1E] border rounded-[12px] px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-[#2f3f37] transition-colors ${
                  filters.origen === "catalogo"
                    ? "border-[#36E27B]"
                    : "border-[#36E27B]/30"
                }`}
              >
                <span className="text-white text-[14px]">Catálogo</span>
                {filters.origen === "catalogo" && (
                  <div className="w-5 h-5 rounded-[4px] border-2 border-[#36E27B] bg-[#36E27B] flex items-center justify-center">
                    <Check size={14} className="text-black" />
                  </div>
                )}
              </button>
            </div>

            <div className="mb-6">
              <button
                onClick={handleFavoritesFilter}
                className={`w-full text-left bg-[#152B1E] border rounded-[12px] px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-[#2f3f37] transition-colors ${
                  hasOnlyFavorites ? "border-[#36E27B]" : "border-[#36E27B]/30"
                }`}
              >
                <span className="text-white text-[14px]">Favoritos</span>
                {hasOnlyFavorites && (
                  <div className="w-5 h-5 rounded-[4px] border-2 border-[#36E27B] bg-[#36E27B] flex items-center justify-center">
                    <Check size={14} className="text-black" />
                  </div>
                )}
              </button>
            </div>
          </div>

          <div className="mb-6 border-t border-white/70">
            <h2 className="font-medium text-[14px] mb-4 text-white mt-6">
              FILTROS PRODUCTIVOS
            </h2>

            <div className="mb-4 flex justify-between items-center bg-[#152B1E] rounded-[8px] p-4">
              <div className="text-white text-[14px]">Para vaquillona</div>
              <button
                onClick={() =>
                  handleUsoChange(
                    filters.uso === "vaquillona" ? undefined : "vaquillona",
                  )
                }
                className={`rounded-full w-12 h-6 relative cursor-pointer transition-all flex items-center ${
                  filters.uso === "vaquillona"
                    ? "bg-[#36E27B] justify-end"
                    : "bg-black border border-[#36E27B] justify-start"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full m-0.5 ${
                    filters.uso === "vaquillona" ? "bg-black" : "bg-[#36E27B]"
                  }`}
                ></div>
              </button>
            </div>

            <div className="mb-6">
              <h3 className="font-normal text-white mb-4">Pelaje</h3>
              <div className="relative">
                <button
                  onClick={() => setShowPelajeDropdown(!showPelajeDropdown)}
                  className={`w-full text-left bg-[#152B1E] border rounded-[12px] px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-[#2f3f37] transition-colors ${
                    filters.pelaje ? "border-[#36E27B]" : "border-[#36E27B]/30"
                  }`}
                >
                  <span className="text-white text-[14px]">
                    {filters.pelaje === "negro"
                      ? "Negro"
                      : filters.pelaje === "colorado"
                        ? "Colorado"
                        : "Todos"}
                  </span>
                  <ChevronDown
                    size={16}
                    className={`text-[#36E27B] transition-transform ${
                      showPelajeDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {showPelajeDropdown && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-[#152B1E] border border-[#36E27B]/30 rounded-[12px] z-10">
                    <button
                      onClick={() => {
                        handlePelajeChange(undefined);
                        setShowPelajeDropdown(false);
                      }}
                      className="w-full text-left px-4 py-3 text-white text-[14px] hover:bg-[#2f3f37] transition-colors border-b border-[#36E27B]/20"
                    >
                      Todos
                    </button>
                    <button
                      onClick={() => {
                        handlePelajeChange("negro");
                        setShowPelajeDropdown(false);
                      }}
                      className="w-full text-left px-4 py-3 text-white text-[14px] hover:bg-[#2f3f37] transition-colors border-b border-[#36E27B]/20"
                    >
                      Negro
                    </button>
                    <button
                      onClick={() => {
                        handlePelajeChange("colorado");
                        setShowPelajeDropdown(false);
                      }}
                      className="w-full text-left px-4 py-3 text-white text-[14px] hover:bg-[#2f3f37] transition-colors"
                    >
                      Colorado
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="font-medium text-[14px] mb-4 text-white">
              ORDENAMIENTO
            </h2>
            <div className="relative">
              <button
                onClick={() => setShowOrdenDropdown(!showOrdenDropdown)}
                className="w-full text-left bg-[#152B1E] border border-[#36E27B]/30 rounded-[12px] px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-[#2f3f37] transition-colors"
              >
                <span className="text-white text-[14px]">
                  {filters.sort === "score_asc"
                    ? "Score peor a mejor"
                    : "Score mejor a peor"}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-[#36E27B] transition-transform ${
                    showOrdenDropdown ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showOrdenDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#152B1E] border border-[#36E27B]/30 rounded-[12px] z-10">
                  <button
                    onClick={() => {
                      handleSortChange("score_desc");
                      setShowOrdenDropdown(false);
                    }}
                    className="w-full text-left px-4 py-3 text-white text-[14px] hover:bg-[#2f3f37] transition-colors border-b border-[#36E27B]/20"
                  >
                    Score mejor a peor
                  </button>
                  <button
                    onClick={() => {
                      handleSortChange("score_asc");
                      setShowOrdenDropdown(false);
                    }}
                    className="w-full text-left px-4 py-3 text-white text-[14px] hover:bg-[#2f3f37] transition-colors"
                  >
                    Score peor a mejor
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="border-t border-white/70 pt-6">
            <div className="bg-[#152B1E] border border-[#36E27B]/30 rounded-[12px] px-4 py-3 mb-4">
              <p className="text-white text-[14px] font-semibold mb-1">
                Objetivo actual
              </p>
              <p className="text-white text-[14px] font-light mb-1">
                Maximizar la ganancia de peso (destete) manteniendo facilidad de
                parto.
              </p>
            </div>
            <button
              onClick={() => {}}
              className="w-full flex items-center justify-center gap-2 border-2 border-[#36E27B] text-[#36E27B] rounded-[12px] px-4 py-3 font-medium text-[14px] hover:bg-[#36E27B]/10 transition-colors cursor-pointer"
            >
              <ArrowLeft size={16} />
              Editar criterios
            </button>
          </div>
        </aside>
        <main className="flex-1 overflow-auto p-[32px] bg-[#F7F7F7] rounded-t-2xl">
          {children}
        </main>
      </div>
    </div>
  );
}
