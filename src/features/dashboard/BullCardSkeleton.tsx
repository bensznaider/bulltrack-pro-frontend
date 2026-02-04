export default function BullCardSkeleton() {
  return (
    <div className="w-full bg-white rounded-[24px] p-[24px] flex items-center justify-between shadow-[0_1px_0_rgba(0,0,0,0.04)]">
      {/* Left: checkbox + caravana */}
      <div className="flex items-center gap-4 min-w-[120px]">
        <div className="h-5 w-5 rounded-md bg-gray-200 animate-pulse" />
        <div className="h-8 w-20 bg-gray-200 rounded-md animate-pulse" />
      </div>

      {/* Middle: main info */}
      <div className="flex items-center gap-4 flex-1">
        <div className="h-[72px] w-[83px] rounded-[10px] bg-gray-200 animate-pulse" />

        <div className="min-w-[280px]">
          <div className="h-6 w-40 bg-gray-200 rounded-md animate-pulse mb-2" />
          <div className="h-4 w-48 bg-gray-200 rounded-md animate-pulse mb-2" />
          <div className="flex items-center gap-2">
            <div className="h-6 w-24 bg-gray-200 rounded-md animate-pulse" />
            <div className="h-6 w-24 bg-gray-200 rounded-md animate-pulse" />
          </div>
        </div>

        {/* Middle: divider */}
        <div className="h-[84px] w-px bg-[#E5E7EB] mx-2" />

        {/* Middle: score area */}
        <div className="flex-1 flex items-center gap-6">
          <div className="min-w-[320px]">
            <div className="flex justify-between items-center">
              <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse" />
              <div className="h-8 w-16 bg-gray-200 rounded-md animate-pulse" />
            </div>
            <div className="mt-1 h-[6px] w-full rounded-full bg-[#E5E7EB]" />
            <div className="mt-2 h-3 w-32 bg-gray-200 rounded-md animate-pulse" />
          </div>

          {/* Radar chart skeleton */}
          <div className="h-[88px] w-[88px] rounded-full bg-[#F3F4F6] border border-[#E5E7EB] animate-pulse" />
        </div>
      </div>

      {/* Middle/Right sections divider */}
      <div className="h-[84px] w-px bg-[#E5E7EB] mx-2" />

      {/* Right: action buttons */}
      <div className="flex flex-col items-center gap-2 ml-6">
        <div className="h-[40px] w-[40px] rounded-[12px] bg-gray-200 animate-pulse" />
        <div className="h-[40px] w-[40px] rounded-[12px] bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
}
