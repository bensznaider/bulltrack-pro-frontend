"use client";
import BullCard from "./BullCard";
import BullCardSkeleton from "@/features/dashboard/BullCardSkeleton";
import { useBullsContext } from "@/features/dashboard/BullsContext";
import {
  CloudSync,
  ArrowDownToLine,
  ChevronDown,
  Info,
  Search,
  Grid2x2,
  List,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useMemo, useEffect } from "react";

function getTimeElapsedText(createdAt: string | undefined): string {
  if (!createdAt) return "Datos actualizados";

  const createdDate = new Date(createdAt);
  const now = new Date();
  const diffMs = now.getTime() - createdDate.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffSeconds < 60) return "Datos actualizados hace unos segundos";
  if (diffMinutes < 60) return `Datos actualizados hace ${diffMinutes} min`;
  if (diffHours < 24)
    return `Datos actualizados hace ${diffHours} ${diffHours === 1 ? "hora" : "horas"}`;
  return `Datos actualizados hace ${diffDays} ${diffDays === 1 ? "día" : "días"}`;
}

export default function DashboardPage() {
  const {
    bulls,
    total,
    loading,
    page,
    totalPages,
    limit,
    filters,
    goToPage,
    updateFilters,
    toggleBullFavorite,
    togglingFavorites,
    showFavoritesOnly,
  } = useBullsContext();

  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter bulls by favorites if favorites-only mode is enabled
  const displayedBulls = useMemo(() => {
    if (showFavoritesOnly) {
      return bulls.filter(bull => bull.isFavorite);
    }
    return bulls;
  }, [bulls, showFavoritesOnly]);

  const handleLimitChange = (newLimit: number) => {
    updateFilters({ ...filters, limit: newLimit, page: 1 });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // Sets a timer to avoid making API calls for every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      updateFilters({ ...filters, search: searchQuery || undefined, page: 1 });
    }, 200);

    return () => clearTimeout(timer);
    // filters and updateFilters are context values that change frequently and should not
    // be in the dependency array as they would trigger the effect on every render.
    // Only searchQuery should trigger the debounced search to avoid excessive API calls.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const lastUpdateText = useMemo(() => {
    if (bulls.length === 0) return "Datos actualizados";
    const mostRecentBull = bulls.reduce((prev, current) => {
      const prevDate = new Date(prev.createdAt || 0).getTime();
      const currentDate = new Date(current.createdAt || 0).getTime();
      return currentDate > prevDate ? current : prev;
    });
    return getTimeElapsedText(mostRecentBull.createdAt);
  }, [bulls]);

  return (
    <div className="h-full">
      <p className="text-[14px] text-[#2D2D2D] font-normal flex items-center mb-2">
        <CloudSync className="inline-block mr-2" size={16} />
        {lastUpdateText}
      </p>
      <div className="flex justify-between items-center">
        <h1 className="text-[32px] text-[#2D2D2D] font-semibold">
          Resultados de la clasificación
        </h1>
        <button
          className="flex items-center gap-2 bg-[#1C2620] text-white text-[12px] px-[12px] py-[8px] rounded-[8px] cursor-pointer"
          onClick={() => {}}
        >
          Exportar <ArrowDownToLine size={12} />
        </button>
      </div>
      <p className="text-[14px] text-[#2D2D2D] mb-6">
        Los resultados están ordenados por Bulltrack Score que reflejan tus
        objetivos de producción
      </p>
      {/* Accordion */}
      <div className="bg-[#F1F1F1] rounded-[8px] border-[0px] mb-4">
        <h2 id="accordion-card-heading-1">
          <button
            type="button"
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-body hover:text-heading hover:bg-neutral-secondary-medium gap-3 [&[aria-expanded='true']]:rounded-b-none [&[aria-expanded='true']]:shadow-none transition-all cursor-pointer"
            aria-expanded={isAccordionOpen}
            aria-controls="accordion-card-body-1"
          >
            <span className="flex">
              <Info className="inline-block mr-2" size={24} />
              <p className="font-bold text-[16px]">Criterios del ranking</p>
            </span>
            <ChevronDown
              size={20}
              className={`shrink-0 transition-transform ${
                isAccordionOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </h2>
        {isAccordionOpen && (
          <div
            id="accordion-card-body-1"
            className="border-default rounded-b-[8px] bg-white"
            aria-labelledby="accordion-card-heading-1"
          >
            <p className="p-4 md:p-5 mb-2 text-body">
              El ranking se determina tomando cinco criterios: crecimiento,
              facilidad de parto, reproducción, moderación y carcasa.
            </p>
          </div>
        )}
      </div>
      {/* Search bar */}
      <div className="w-full bg-[#F1F1F1] rounded-[8px] border-[0px] mb-4 p-[16px] flex items-center justify-between">
        <div className="flex gap-4 w-[60%]">
          <div className="relative w-[70%]">
            <input
              type="text"
              placeholder="Busca por caravana o nombre"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full p-[12px] pr-[40px] rounded-[8px] border border-gray-300 bg-white font-normal text-[16px] text-[#2D2D2D] placeholder:text-gray-400"
            />
            <Search
              size={18}
              className="absolute right-[12px] top-1/2 transform -translate-y-1/2 text-[#2D2D2D] pointer-events-none"
            />
          </div>
          <div className="flex gap-1 items-center text-[#2D2D2D] text-[20px]">
            <p className="font-bold">{showFavoritesOnly ? displayedBulls.length : total ?? 0}</p>
            <p className="font-normal"> resultados</p>
          </div>
        </div>
        {/* Pagination and Limit Select */}
        <div className="flex items-center gap-4">
          <select
            value={limit}
            onChange={(e) => handleLimitChange(Number(e.target.value))}
            className="px-[12px] py-[8px] bg-white border border-gray-300 rounded-[8px] text-[14px] text-[#2D2D2D] font-medium cursor-pointer hover:border-gray-400 font-inherit"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={50}>50</option>
          </select>
          <div className="flex items-center">
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className="p-[8px] bg-[#F1F1F1] rounded-[8px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#E6E6E6]"
            >
              <ChevronLeft size={18} color="#2D2D2D" />
            </button>
            <span className="text-[14px] text-[#2D2D2D] font-medium mx-[12px] text-center">
              {page}
            </span>
            <button
              onClick={() => goToPage(page + 1)}
              disabled={page >= totalPages}
              className="p-[8px] bg-[#F1F1F1] rounded-[8px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#E6E6E6]"
            >
              <ChevronRight size={18} color="#2D2D2D" />
            </button>
          </div>
        </div>
        <div>
          <button
            className="px-[24px] py-[8px] bg-[#1C2620] rounded-l-[8px] cursor-pointer"
            onClick={() => {}}
          >
            <List color="white" />
          </button>
          <button
            className="px-[24px] py-[8px] bg-[#E6E6E6] rounded-r-[8px] cursor-pointer"
            onClick={() => {}}
          >
            <Grid2x2 color="#2D2D2D" />
          </button>
        </div>
      </div>
      {/* Bulls list */}
      <div className="flex flex-col gap-3 mb-4">
        {loading ? (
          <>
            <BullCardSkeleton />
            <BullCardSkeleton />
            <BullCardSkeleton />
            <BullCardSkeleton />
            <BullCardSkeleton />
          </>
        ) : (
          displayedBulls.map((bull) => (
            <BullCard
              key={bull.id}
              bull={bull}
              onToggleFavorite={toggleBullFavorite}
              isTogglingFavorite={togglingFavorites.has(bull.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
