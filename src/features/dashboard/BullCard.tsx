import Image from "next/image";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { Bull } from "@/lib/api";
import { Heart, Eye } from "lucide-react";
import { Loader } from "@/components/Loader";

function formatBullScore(score?: number) {
  if (score === undefined || score === null || Number.isNaN(score)) return null;

  // Accept either 0..1 or 0..100
  const normalized = score <= 1 ? score : score / 100;

  const clamped = Math.max(0, Math.min(1, normalized));
  return {
    value: Number(clamped.toFixed(2)),
    percent: Math.round(clamped * 100),
  };
}

function chipStyles(kind: "origen" | "uso") {
  const base =
    "capitalize border-[1.5px] border-solid rounded-[8px] text-[10px] px-[10px] py-[5px] w-max leading-none";
  if (kind === "origen")
    return `${base} bg-[#ECF8EF] border-[#36E27B] text-[#2FBF67]`;
  return `${base} bg-[#EDEFFF] border-[#8A96F4] text-[#6F7EF0]`;
}

// Randomly assigns a hardcoded bull image (bull1, bull2, or bull3) for demo/dev purposes.
function getRandomBullImage(): string {
  const bullImages = [
    '/assets/bull1.png',
    '/assets/bull2.png',
    '/assets/bull3.png'
  ];
  return bullImages[Math.floor(Math.random() * bullImages.length)];
}

export default function BullCard({
  bull,
  onToggleFavorite,
  onView,
  isTogglingFavorite = false,
}: {
  bull: Bull;
  onToggleFavorite?: (bullId: Bull["id"]) => void;
  onView?: (bullId: Bull["id"]) => void;
  isTogglingFavorite?: boolean;
}) {
  const score = formatBullScore(bull.bullScore);
  const subtitle =
    bull.caracteristicaDestacada ?? "Top 1% de facilidad de parto";

  return (
    <div className="w-full bg-white rounded-[24px] p-[24px] flex items-center justify-between shadow-[0_1px_0_rgba(0,0,0,0.04)]">
      {/* Left: checkbox + caravana */}
      <div className="flex items-center gap-4 min-w-[120px]">
        <input type="checkbox" className="h-5 w-5 rounded-md border-gray-300" />
        <div className="text-[28px] font-semibold text-[#2B2B2B]">
          #{bull.caravana}
        </div>
      </div>

      {/* Middle: main info */}
      <div className="flex items-center gap-4 flex-1">
        <div className="h-[72px] w-[83px] rounded-[10px] overflow-hidden bg-gray-100">
          <Image
            src={getRandomBullImage()}
            alt="Bull picture"
            width={83}
            height={72}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="min-w-[280px] text-[#2D2D2D]">
          <div className="text-[24px] font-semibold leading-tight">
            {bull.nombre || `Toro #${bull.caravana}`}
          </div>

          <div className="text-[16px] font-normal mt-1 flex items-center gap-2">
            <span className="capitalize">{bull.raza}</span>
            <span className="opacity-60">·</span>
            <span>{bull.edadMeses} meses</span>
          </div>

          <div className="mt-2 flex items-center gap-2">
            <span className={chipStyles("origen")}>{bull.origen}</span>
            <span className={chipStyles("uso")}>Para {bull.uso}</span>
          </div>
        </div>

        {/* Middle: divider */}
        <div className="h-[84px] w-px bg-[#E5E7EB] mx-2" />

        {/* Middle: score area */}
        <div className="flex-1 flex items-center gap-6">
          <div className="min-w-[320px]">
            <div className="flex justify-between items-center">
              <div className="text-[14px] font-medium text-[#6B7280]">
                BULL SCORE
              </div>

              <div className="text-[24px] font-semibold text-[#1E1E1E] tabular-nums leading-none">
                {score ? score.value.toFixed(2) : "—"}
              </div>
            </div>
            <div className="mt-1 h-[6px] w-full rounded-full bg-[#E5E7EB] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#2CE06C]"
                style={{ width: `${score?.percent ?? 0}%` }}
              />
            </div>
            <div className="mt-2 text-[12px] text-[#6B7280] leading-none">
              {subtitle}
            </div>
          </div>

          {/* Radar chart (5 metrics) */}
          <div className="h-[88px] w-[88px] rounded-full bg-[#F3F4F6] border border-[#E5E7EB]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                data={[
                  { metric: "C", value: bull.crecimiento ?? 0 },
                  { metric: "F", value: bull.facilidadParto ?? 0 },
                  { metric: "R", value: bull.reproduccion ?? 0 },
                  { metric: "M", value: bull.moderacion ?? 0 },
                  { metric: "Ca", value: bull.carcasa ?? 0 },
                ]}
                outerRadius="95%"
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              >
                <PolarGrid radialLines={false} />

                <PolarAngleAxis
                  dataKey="metric"
                  tick={false}
                  axisLine={false}
                />
                <Radar
                  dataKey="value"
                  stroke="#3ED97C"
                  fill="#CCF0DA80"
                  strokeWidth={1}
                  fillOpacity={1}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Middle/Right sections divider */}
      <div className="h-[84px] w-px bg-[#E5E7EB] mx-2" />

      {/* Right: action buttons */}
      <div className="flex flex-col items-center gap-2 ml-6">
        <button
          type="button"
          onClick={() => onView?.(bull.id)}
          className="h-[40px] w-[40px] rounded-[12px] bg-[#111827] text-white flex items-center justify-center cursor-pointer"
          aria-label="View"
          title="View"
        >
          <Eye size={18} />
        </button>

        <button
          type="button"
          onClick={() => onToggleFavorite?.(bull.id)}
          className="h-[40px] w-[40px] rounded-[12px] bg-[#111827] text-white flex items-center justify-center cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          aria-label="Favorite"
          title="Favorite"
          disabled={isTogglingFavorite}
        >
          {isTogglingFavorite ? (
            <Loader />
          ) : (
            <Heart
              size={18}
              className={bull.isFavorite ? "fill-white" : "fill-none"}
            />
          )}
        </button>
      </div>
    </div>
  );
}
