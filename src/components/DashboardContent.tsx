import type { ReactNode } from "react";
import Image from "next/image";
import {
  InfoIcon,
  BarChartIcon,
  PieChartIcon,
  SearchSmallIcon,
  ChevronDownSmallIcon,
  DragHandleIcon,
} from "./Icons";
import type { ViewId } from "./types";

type DashboardContentProps = {
  currentView: ViewId;
  onNavigate: (view: ViewId) => void;
};

function FilterPill({ label, value }: { label: string; value: string }) {
  return (
    <button className="flex items-center gap-1 h-8 px-3 rounded-full border border-gray-200 bg-white text-sm hover:border-gray-300">
      <span className="text-foreground font-normal">{label}:</span>
      <span className="text-primary font-normal">{value}</span>
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

function PageFrame({
  eyebrow,
  title,
  description,
  actions,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="max-w-[1280px] mx-auto px-10 py-10">
      <div className="mb-8 flex items-start gap-6">
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-semibold uppercase tracking-[0.22em] text-primary/80">{eyebrow}</p>
          <h1 className="mt-3 text-[29px] font-semibold leading-tight text-foreground">{title}</h1>
          <p className="mt-3 max-w-[760px] text-[15px] leading-7 text-gray">{description}</p>
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </div>
      {children}
    </div>
  );
}

function HomeView({
  onNavigate,
}: Omit<DashboardContentProps, "currentView">) {
  return (
    <div className="max-w-[1280px] mx-auto px-10 py-10">
      <div className="flex items-center mb-12">
        <h1 className="text-[29px] font-semibold text-foreground leading-tight">Home</h1>
        <div className="ml-auto">
          <div className="flex h-11 bg-white rounded-full shadow-sm border border-gray-100 overflow-hidden">
            <button className="px-5 h-full rounded-full bg-primary text-white text-sm font-normal">Dashboard</button>
            <button
              type="button"
              onClick={() => onNavigate("training-paths")}
              className="px-7 h-full rounded-full text-foreground text-sm font-normal hover:bg-gray-50"
            >
              Training
            </button>
          </div>
        </div>
      </div>

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

      <div className="grid grid-cols-2 gap-4 mt-4">
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
          <div className="flex items-center py-3 border-b border-gray-100">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary mr-3">
              JC
            </div>
            <span className="text-sm text-foreground flex-1">Joel Cook</span>
            <span className="text-sm text-foreground mr-1">0%</span>
            <svg width="8" height="12" viewBox="0 0 8 12" fill="none" className="text-gray-400">
              <path
                d="M1 1L6 6L1 11"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex-1 min-h-[200px]" />
          <p className="text-sm text-gray mt-4">Showing 1-1 of 1</p>
        </div>

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
          <div className="flex flex-col items-center justify-center py-16">
            <Image src="/assets/no_content.svg" alt="No content" width={230} height={137} />
            <p className="text-base text-foreground mt-4">There&apos;s no content yet</p>
            <button
              type="button"
              onClick={() => onNavigate("content")}
              className="mt-4 flex items-center gap-1 px-5 h-10 rounded-full bg-primary text-white text-sm font-normal hover:bg-primary/90"
            >
              Open Content
              <ChevronDownSmallIcon className="text-white -rotate-90" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentView() {
  return (
    <div className="max-w-[1280px] mx-auto px-10 py-10">
      {/* Top Navigation Tabs */}
      <div className="mb-6">
        <nav className="flex gap-6 border-b border-gray-200">
          <button className="pb-4 text-base font-medium text-primary border-b-2 border-primary">
            Content
          </button>
          <button className="pb-4 text-base font-normal text-gray hover:text-foreground">
            Requests
          </button>
          <button className="pb-4 text-base font-normal text-gray hover:text-foreground">
            Set training order
          </button>
          <div className="ml-auto">
            <button className="inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-white shadow-sm transition hover:bg-primary/90">
              Create
              <ChevronDownSmallIcon className="text-white -rotate-90" />
            </button>
          </div>
        </nav>
      </div>

      {/* Secondary Navigation */}
      <div className="mb-8">
        <div className="flex gap-6 mb-6">
          <button className="text-base font-medium text-foreground">
            All content
          </button>
          <button className="text-base font-normal text-gray hover:text-foreground">
            Company
          </button>
          <button className="text-base font-normal text-gray hover:text-foreground">
            Policies
          </button>
          <button className="text-base font-normal text-gray hover:text-foreground">
            Processes
          </button>
        </div>
      </div>

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-[29px] font-semibold leading-tight text-foreground">All content</h1>
        <p className="mt-3 text-[15px] leading-7 text-gray max-w-[760px]">
          Create and organize the documents in your account. Put them into groups for your people to consume.
        </p>
        <button className="mt-4 text-sm text-primary hover:text-primary/80 font-medium">
          View templates
        </button>
      </div>

      {/* Control Bar */}
      <div className="mb-6 flex items-center gap-3">
        <FilterPill label="View by" value="all content" />
        <FilterPill label="Sort" value="Training order" />
        <div className="ml-auto flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search content"
              className="h-11 w-[240px] rounded-full border border-gray-200 bg-white px-4 pl-10 text-sm text-foreground outline-none transition focus:border-primary"
            />
            <SearchSmallIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray" />
          </div>
          <button className="h-11 rounded-full border border-gray-200 bg-white px-5 text-sm font-medium text-foreground transition hover:border-primary/20 hover:text-primary">
            Filter
          </button>
        </div>
      </div>

      {/* Empty State */}
      <div className="rounded-[24px] border border-gray-200 bg-white p-12 shadow-sm">
        <div className="flex flex-col items-center justify-center text-center">
          <h4 className="text-lg font-semibold text-foreground">No content has been added</h4>
          <button className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-6 text-sm font-medium text-white shadow-sm transition hover:bg-primary/90">
            Create a new subject
          </button>
        </div>
      </div>
    </div>
  );
}

function TrainingPathsView() {
  return (
    <PageFrame
      eyebrow="Guided learning"
      title="Training paths"
      description="This mocked page is the core demo destination for explaining how a new admin sequences content into a path."
      actions={
        <div className="rounded-full border border-gray-200 bg-white px-4 py-3 text-sm text-gray shadow-sm">
          1 active path
        </div>
      }
    >
      <div className="grid grid-cols-[0.86fr_1.14fr] gap-4">
        <div className="rounded-[24px] border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary/80">Featured path</p>
              <h3 className="mt-3 text-xl font-semibold text-foreground">New manager onboarding</h3>
            </div>
            <div className="rounded-full bg-primary-light px-3 py-1 text-[12px] font-semibold text-primary">Draft</div>
          </div>
          <p className="mt-4 text-sm leading-7 text-gray">
            Sequence policies, playbooks, and shadowing steps into the order a learner should complete them.
          </p>
          <div className="mt-6 rounded-3xl bg-surface p-5">
            <div className="flex items-center justify-between text-sm text-gray">
              <span>Completion target</span>
              <span>14 days</span>
            </div>
            <div className="mt-3 h-3 overflow-hidden rounded-full bg-white">
              <div className="h-full w-[62%] rounded-full bg-primary" />
            </div>
          </div>
        </div>

        <div className="rounded-[24px] border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Path sequence</h3>
              <p className="mt-1 text-sm text-gray">Drag the modules into the right order for the learner journey.</p>
            </div>
            <button className="rounded-full border border-gray-200 px-4 py-2 text-sm text-foreground transition hover:border-primary/30 hover:text-primary">
              Save order
            </button>
          </div>
          <div className="mt-6 space-y-3">
            {[
              ["Welcome to Trainual", "Assigned first so every learner sees the overview"],
              ["Team handbook", "Core expectations and key policies"],
              ["Shadowing checklist", "Hands-on practice after the basics are complete"],
              ["Knowledge check", "Confirm readiness before full access"],
            ].map(([title, copy], index) => (
              <div
                key={title}
                className="flex items-center gap-4 rounded-2xl border border-gray-100 px-4 py-4 transition hover:border-primary/20"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-light text-sm font-semibold text-primary">
                  {index + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{title}</p>
                  <p className="mt-1 text-sm text-gray">{copy}</p>
                </div>
                <button className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray transition hover:border-primary/20 hover:text-primary">
                  <DragHandleIcon />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageFrame>
  );
}

function AccountView() {
  return (
    <PageFrame
      eyebrow="Workspace admin"
      title="Account"
      description="This mock page gives Trainual Live Learn a concrete destination for new-admin onboarding around users, roles, and permissions."
    >
      <div className="grid grid-cols-[1.1fr_0.9fr] gap-4">
        <div className="rounded-[24px] border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Manage users</h3>
              <p className="mt-1 text-sm text-gray">Control who has access and what role they hold.</p>
            </div>
            <button className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white transition hover:bg-primary/90">
              Invite user
            </button>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[
              ["Admins", "3"],
              ["Managers", "5"],
              ["Learners", "18"],
            ].map(([label, count]) => (
              <div key={label} className="rounded-2xl bg-surface px-4 py-5">
                <p className="text-sm text-gray">{label}</p>
                <p className="mt-2 text-2xl font-semibold text-foreground">{count}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="rounded-[24px] border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-foreground">Permission presets</h3>
            <div className="mt-4 space-y-3">
              {[
                "Admin can manage people, content, and reporting.",
                "Manager can assign paths and review progress.",
                "Learner can complete assigned training only.",
              ].map((preset) => (
                <div key={preset} className="rounded-2xl border border-gray-100 px-4 py-4 text-sm text-gray">
                  {preset}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[24px] border border-primary/12 bg-white p-6 shadow-sm">
            <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-primary/80">Onboarding tip</p>
            <p className="mt-3 text-sm leading-7 text-gray">
              For the demo, use this page to explain where a new admin adds teammates and checks role boundaries before rolling out training.
            </p>
          </div>
        </div>
      </div>
    </PageFrame>
  );
}

export default function DashboardContent(props: DashboardContentProps) {
  if (props.currentView === "content") {
    return <ContentView />;
  }

  if (props.currentView === "training-paths") {
    return <TrainingPathsView />;
  }

  if (props.currentView === "account") {
    return <AccountView />;
  }

  return <HomeView onNavigate={props.onNavigate} />;
}
