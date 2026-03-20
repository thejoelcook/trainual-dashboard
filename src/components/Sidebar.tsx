"use client";

import type { ComponentType } from "react";
import { useState } from "react";
import Image from "next/image";
import {
  HomeIcon,
  ContentIcon,
  SoftwareIcon,
  PeopleIcon,
  GroupsIcon,
  TemplatesIcon,
  MarketplacesIcon,
  ReportsIcon,
  AccountIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "./Icons";
import type { ViewId } from "./types";

type SidebarIcon = ComponentType<{ active?: boolean; className?: string }>;

type NavChild = {
  label: string;
  view?: ViewId;
};

type NavItem = {
  label: string;
  icon: SidebarIcon;
  view?: ViewId;
  children?: readonly NavChild[];
};

type SidebarProps = {
  currentView: ViewId;
  onNavigate: (view: ViewId) => void;
};

const navItems: readonly NavItem[] = [
  { label: "Home", icon: HomeIcon, view: "home" },
  {
    label: "Content",
    icon: ContentIcon,
    view: "content",
    children: [
      { label: "All content", view: "content" },
      { label: "Training paths", view: "training-paths" },
    ],
  },
  { label: "Software & tools", icon: SoftwareIcon },
  {
    label: "People",
    icon: PeopleIcon,
    children: [{ label: "Directory" }, { label: "Org charts" }],
  },
  { label: "Groups", icon: GroupsIcon },
  { label: "Templates", icon: TemplatesIcon },
  {
    label: "Marketplaces",
    icon: MarketplacesIcon,
    children: [{ label: "Courses & templates" }, { label: "Integrations" }, { label: "Preferred partners" }],
  },
  {
    label: "Reports",
    icon: ReportsIcon,
    children: [{ label: "Content report" }, { label: "People report" }, { label: "Latest activity" }],
  },
  {
    label: "Account",
    icon: AccountIcon,
    view: "account",
    children: [{ label: "Manage users", view: "account" }, { label: "Settings", view: "account" }],
  },
] as const;

function isItemActive(item: NavItem, currentView: ViewId) {
  if (item.view === currentView) {
    return true;
  }

  return item.children?.some((child) => child.view === currentView) ?? false;
}

export default function Sidebar({
  currentView,
  onNavigate,
}: SidebarProps) {
  const [openSection, setOpenSection] = useState<string | null>("Content");
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside
      className={`relative h-full bg-white flex flex-col border-r border-gray-100 shadow-[0_0_10px_0_rgba(0,0,0,0.10)] transition-[width,min-width] duration-300 ${
        isCollapsed ? "w-[78px] min-w-[78px]" : "w-[240px] min-w-[240px]"
      }`}
    >
      <button
        type="button"
        aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        onClick={() => setIsCollapsed((current) => !current)}
        className="absolute top-[14px] right-0 z-10 flex h-8 w-8 translate-x-full items-center justify-center rounded-r-full border border-l-0 border-gray-100 bg-white text-foreground shadow-[4px_0_12px_rgba(0,0,0,0.08)] transition-colors hover:text-primary"
      >
        <ChevronRightIcon className={`scale-90 transition-transform ${isCollapsed ? "" : "rotate-180"}`} />
      </button>

      <div className={`pt-4 pb-4 ${isCollapsed ? "px-0" : "px-4"}`}>
        {isCollapsed ? (
          <div className="mx-auto flex h-12 w-full items-center justify-center">
            <Image src="/assets/t-logo.svg" alt="Trainual" width={37} height={32} priority />
          </div>
        ) : (
          <div className="px-1 py-1">
            <Image src="/assets/trainual-logo.svg" alt="Trainual" width={118} height={32} priority />
          </div>
        )}
      </div>

      <nav className={`flex flex-col gap-2 pt-2 pb-4 flex-1 ${isCollapsed ? "px-2" : "px-3"}`}>
        {navItems.map((item) => {
          const children = item.children ?? [];
          const active = isItemActive(item, currentView);
          const isOpen = openSection === item.label || children.some((child) => child.view === currentView);
          const hasChildren = children.length > 0;
          const activeButtonClasses = isCollapsed
            ? "mx-auto h-16 w-16 rounded-full border-2 border-primary bg-transparent text-primary"
            : "h-[46px] rounded-full bg-primary-light text-primary";
          const inactiveButtonClasses = isCollapsed
            ? "mx-auto h-16 w-16 rounded-full text-foreground hover:bg-primary-light hover:text-primary"
            : "h-[46px] rounded-full text-foreground hover:bg-primary-light hover:text-primary";

          const button = (
            <button
              type="button"
              onClick={() => {
                if (item.view) {
                  onNavigate(item.view);
                }

                if (hasChildren) {
                  setOpenSection((current) => (current === item.label ? null : item.label));
                }
              }}
              className={`group flex w-full items-center text-left transition-colors ${
                active ? activeButtonClasses : inactiveButtonClasses
              } ${isCollapsed ? "justify-center px-0" : "px-1"}`}
            >
              <div className={`flex items-center justify-center ${isCollapsed ? "h-16 w-16" : "w-10 h-10"}`}>
                <item.icon active={active} />
              </div>
              {!isCollapsed && (
                <span
                  className={`text-base flex-1 ${
                    active
                      ? "font-medium text-primary"
                      : "font-normal text-foreground transition-colors group-hover:text-primary"
                  }`}
                >
                  {item.label}
                </span>
              )}
              {!isCollapsed && hasChildren && (
                <div
                  className={`w-7 h-6 flex items-center justify-center text-foreground transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  <ChevronDownIcon />
                </div>
              )}
            </button>
          );

          return (
            <div key={item.label} className="flex flex-col">
              {button}

              {!isCollapsed && hasChildren && isOpen && (
                <div className="flex flex-col gap-3 pt-4 pb-3">
                  {children.map((child) => {
                    const childButton = (
                      <button
                        key={child.label}
                        type="button"
                        onClick={() => child.view && onNavigate(child.view)}
                        className={`w-full h-[42px] rounded-full px-[56px] text-left text-[14px] font-normal transition-colors ${
                          child.view === currentView
                            ? "bg-primary-light text-primary"
                            : "text-foreground hover:bg-primary-light hover:text-primary"
                        }`}
                      >
                        {child.label}
                      </button>
                    );

                    return childButton;
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
