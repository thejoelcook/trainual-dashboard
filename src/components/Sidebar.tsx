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
  MarketplacesIcon,
  ReportsIcon,
  AccountIcon,
  ChevronDownIcon,
} from "./Icons";

type SidebarIcon = ComponentType<{ active?: boolean; className?: string }>;

type NavItem = {
  label: string;
  icon: SidebarIcon;
  active: boolean;
  children?: readonly string[];
};

const navItems: readonly NavItem[] = [
  { label: "Home", icon: HomeIcon, active: true },
  {
    label: "Content",
    icon: ContentIcon,
    active: false,
    children: ["All content", "Training paths"],
  },
  { label: "Software & tools", icon: SoftwareIcon, active: false },
  {
    label: "People",
    icon: PeopleIcon,
    active: false,
    children: ["Directory", "Org charts"],
  },
  { label: "Groups", icon: GroupsIcon, active: false },
  {
    label: "Marketplaces",
    icon: MarketplacesIcon,
    active: false,
    children: ["Courses & templates", "Integrations", "Preferred partners"],
  },
  {
    label: "Reports",
    icon: ReportsIcon,
    active: false,
    children: ["Content report", "People report", "Latest activity"],
  },
  {
    label: "Account",
    icon: AccountIcon,
    active: false,
    children: ["Manage users", "Settings"],
  },
] as const;

export default function Sidebar() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <aside className="w-[240px] min-w-[240px] h-full bg-white flex flex-col border-r border-gray-100 shadow-[0_0_10px_0_rgba(0,0,0,0.10)]">
      {/* Logo */}
      <div className="px-4 pt-4 pb-4">
        <div className="px-1 py-1">
          <Image src="/assets/trainual-logo.svg" alt="Trainual" width={118} height={32} priority />
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-2 px-3 pt-2 pb-4 flex-1">
        {navItems.map((item) => {
          const isOpen = openSection === item.label;
          const children = item.children ?? [];
          const hasChildren = children.length > 0;

          return (
            <div key={item.label} className="flex flex-col">
              <button
                type="button"
                onClick={() => setOpenSection(isOpen ? null : item.label)}
                className={`group flex items-center h-[46px] px-1 rounded-full text-left transition-colors ${
                  item.active
                    ? "bg-primary-light text-primary"
                    : "text-foreground hover:bg-primary-light hover:text-primary"
                }`}
              >
                <div className="w-10 h-10 flex items-center justify-center">
                  <item.icon active={item.active} />
                </div>
                <span
                  className={`text-base flex-1 ${
                    item.active
                      ? "font-medium text-primary"
                      : "font-normal text-foreground transition-colors group-hover:text-primary"
                  }`}
                >
                  {item.label}
                </span>
                {hasChildren && (
                  <div
                    className={`w-7 h-6 flex items-center justify-center text-foreground transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <ChevronDownIcon />
                  </div>
                )}
              </button>

              {hasChildren && isOpen && (
                <div className="flex flex-col gap-3 pt-4 pb-3">
                  {children.map((child) => (
                    <button
                      key={child}
                      type="button"
                      className="w-full h-[42px] rounded-full px-[56px] text-left text-[14px] font-normal text-foreground transition-colors hover:bg-primary-light hover:text-primary"
                    >
                      {child}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
