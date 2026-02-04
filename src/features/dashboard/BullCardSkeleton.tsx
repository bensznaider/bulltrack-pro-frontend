export default function BullCardSkeleton() {
  return (
    <div className="w-full bg-white rounded-[24px] p-4 md:p-6 lg:p-[24px] shadow-[0_1px_0_rgba(0,0,0,0.04)]">
      {/* Desktop Layout (lg+) */}
      <div className="hidden lg:flex lg:items-center lg:justify-between lg:gap-0">
        {/* Left: checkbox + caravana */}
        <div className="flex items-center gap-4 flex-shrink-0">
          <div className="h-5 w-5 rounded-md bg-gray-200 animate-pulse flex-shrink-0" />
          <div className="h-8 w-20 bg-gray-200 rounded-md animate-pulse" />
        </div>

        {/* Middle: image + name/info + divider + score + chart */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div className="h-[72px] w-[83px] rounded-[10px] bg-gray-200 animate-pulse flex-shrink-0" />

          <div className="min-w-0 flex-1 flex-grow">
            <div className="h-6 w-40 bg-gray-200 rounded-md animate-pulse mb-2" />
            <div className="h-4 w-48 bg-gray-200 rounded-md animate-pulse mb-2" />
            <div className="flex items-center gap-2">
              <div className="h-6 w-24 bg-gray-200 rounded-md animate-pulse" />
              <div className="h-6 w-24 bg-gray-200 rounded-md animate-pulse" />
            </div>
          </div>

          {/* Divider */}
          <div className="h-[84px] w-px bg-[#E5E7EB] mx-2 flex-shrink-0" />

          {/* Score area + chart */}
          <div className="flex flex-row items-center gap-6 flex-grow">
            <div className="min-w-[220px] flex-grow">
              <div className="flex justify-between items-center gap-2">
                <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse" />
                <div className="h-8 w-16 bg-gray-200 rounded-md animate-pulse" />
              </div>
              <div className="mt-1 h-[6px] w-full rounded-full bg-[#E5E7EB]" />
              <div className="mt-2 h-3 w-32 bg-gray-200 rounded-md animate-pulse" />
            </div>

            {/* Radar chart */}
            <div className="h-[88px] w-[88px] rounded-full bg-[#F3F4F6] border border-[#E5E7EB] animate-pulse flex-shrink-0" />
          </div>
        </div>

        {/* Divider */}
        <div className="h-[84px] w-px bg-[#E5E7EB] mx-2 flex-shrink-0" />

        {/* Right: action buttons */}
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          <div className="h-[40px] w-[40px] rounded-[12px] bg-gray-200 animate-pulse" />
          <div className="h-[40px] w-[40px] rounded-[12px] bg-gray-200 animate-pulse" />
        </div>
      </div>

      {/* Mobile/Tablet Layout (below lg) */}
      <div className="lg:hidden flex flex-col gap-4">
        {/* Top: checkbox + caravana + buttons */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0 flex-1">
            <div className="h-5 w-5 rounded-md bg-gray-200 animate-pulse flex-shrink-0" />
            <div className="h-8 w-20 bg-gray-200 rounded-md animate-pulse" />
          </div>
          {/* Mobile action buttons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="h-10 w-10 rounded-[12px] bg-gray-200 animate-pulse" />
            <div className="h-10 w-10 rounded-[12px] bg-gray-200 animate-pulse" />
          </div>
        </div>

        {/* Middle: main info */}
        <div className="flex items-start gap-3 md:gap-4">
          <div className="h-16 md:h-[72px] w-20 md:w-[83px] rounded-[10px] bg-gray-200 animate-pulse flex-shrink-0" />

          <div className="min-w-0 flex-1">
            <div className="h-6 w-40 bg-gray-200 rounded-md animate-pulse mb-2" />
            <div className="h-4 w-48 bg-gray-200 rounded-md animate-pulse mb-2" />
            <div className="flex items-center gap-2 flex-wrap">
              <div className="h-6 w-24 bg-gray-200 rounded-md animate-pulse" />
              <div className="h-6 w-24 bg-gray-200 rounded-md animate-pulse" />
            </div>
          </div>
        </div>

        {/* Bottom: score + chart */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          <div className="w-full sm:flex-1">
            <div className="flex justify-between items-center gap-2">
              <div className="h-4 w-24 bg-gray-200 rounded-md animate-pulse" />
              <div className="h-8 w-16 bg-gray-200 rounded-md animate-pulse" />
            </div>
            <div className="mt-1 h-[6px] w-full rounded-full bg-[#E5E7EB]" />
            <div className="mt-2 h-3 w-32 bg-gray-200 rounded-md animate-pulse" />
          </div>

          {/* Radar chart - hidden on very small mobile */}
          <div className="hidden sm:block h-20 w-20 md:h-[88px] md:w-[88px] rounded-full bg-[#F3F4F6] border border-[#E5E7EB] animate-pulse flex-shrink-0" />
        </div>
      </div>
    </div>
  );
}
