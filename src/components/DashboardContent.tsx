import Image from "next/image";
import { InfoIcon, BarChartIcon, PieChartIcon, SearchSmallIcon, ChevronDownSmallIcon } from "./Icons";

function FilterPill({ label, value }: { label: string; value: string }) {
  return (
    <button className="flex items-center gap-0 h-8 px-3 rounded-full border border-gray-200 bg-white text-sm hover:border-gray-300">
      <span className="text-foreground font-normal">{label}:</span>
      <span className="text-primary font-normal ml-0">{value}</span>
      <ChevronDownSmallIcon className="ml-1 text-foreground" />
    </button>
  );
}

function InsightCard({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="flex-1 min-w-0 bg-white rounded-lg border border-gray-200 p-6 flex flex-col">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="text-base font-medium text-foreground">{title}</h4>
          <p className="text-sm text-gray-400 mt-0">{subtitle}</p>
        </div>
        <button className="text-gray-300 hover:text-gray-500">
          <InfoIcon />
        </button>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center">
        <Image src="/assets/no-data.svg" alt="No data" width={34} height={34} />
        <p className="text-sm text-foreground mt-2">No data yet.</p>
      </div>
    </div>
  );
}

export default function DashboardContent() {
  return (
    <div className="max-w-[1280px] mx-auto px-10 py-10">
      {/* Page header */}
      <div className="flex items-center mb-12">
        <h1 className="text-[29px] font-semibold text-foreground leading-tight">Home</h1>
        <div className="ml-auto">
          <div className="flex h-11 bg-white rounded-full shadow-sm border border-gray-100 overflow-hidden">
            <button className="px-5 h-full rounded-full bg-primary text-white text-sm font-normal">
              Dashboard
            </button>
            <button className="px-7 h-full rounded-full text-foreground text-sm font-normal hover:bg-gray-50">
              Training
            </button>
          </div>
        </div>
      </div>

      {/* Insights Section */}
      <div className="bg-white rounded-lg p-6 mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-4">Insights</h3>
        <div className="flex gap-2 mb-4">
          <FilterPill label="View" value="Entire company" />
          <FilterPill label="Date" value="Last 4 weeks" />
        </div>
        <div className="flex gap-4">
          <InsightCard title="Active users" subtitle="Last 4 weeks" />
          <InsightCard title="Searches made" subtitle="Last 4 weeks" />
          <InsightCard title="Time spent vs. saved" subtitle="Last 4 weeks" />
        </div>
      </div>

      {/* Bottom two columns */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        {/* Completions */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Completions</h3>
            <div className="flex items-center gap-2">
              <button className="text-primary hover:text-primary/80">
                <BarChartIcon />
              </button>
              <button className="text-gray-400 hover:text-gray-600">
                <PieChartIcon />
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <FilterPill label="View" value="Entire company" />
            <FilterPill label="Sort" value="Name" />
            <button className="ml-auto text-gray-400 hover:text-gray-600">
              <SearchSmallIcon />
            </button>
          </div>
          {/* User row */}
          <div className="flex items-center py-3 border-b border-gray-100">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary mr-3">
              JC
            </div>
            <span className="text-sm text-foreground flex-1">Joel Cook</span>
            <span className="text-sm text-foreground mr-1">0%</span>
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none" className="text-gray-400">
              <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          {/* Spacer to match height */}
          <div className="flex-1 min-h-[200px]" />
          <p className="text-sm text-gray mt-4">Showing 1-1 of 1</p>
        </div>

        {/* Content you own */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Content you own</h3>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <FilterPill label="Sort" value="Recent" />
            <FilterPill label="Status" value="Published" />
            <button className="ml-auto text-gray-400 hover:text-gray-600">
              <SearchSmallIcon />
            </button>
          </div>
          {/* Empty state */}
          <div className="flex flex-col items-center justify-center py-16">
            <Image src="/assets/no_content.svg" alt="No content" width={230} height={137} />
            <p className="text-base text-foreground mt-4">There&apos;s no content yet</p>
            <button className="mt-4 flex items-center gap-1 px-5 h-10 rounded-full bg-primary text-white text-sm font-normal hover:bg-primary/90">
              Create
              <ChevronDownSmallIcon className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
