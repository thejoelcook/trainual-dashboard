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

const navItems = [
  { label: "Home", icon: HomeIcon, active: true, hasChevron: false },
  { label: "Content", icon: ContentIcon, active: false, hasChevron: true },
  { label: "Software & tools", icon: SoftwareIcon, active: false, hasChevron: false },
  { label: "People", icon: PeopleIcon, active: false, hasChevron: true },
  { label: "Groups", icon: GroupsIcon, active: false, hasChevron: false },
  { label: "Marketplaces", icon: MarketplacesIcon, active: false, hasChevron: true },
  { label: "Reports", icon: ReportsIcon, active: false, hasChevron: true },
  { label: "Account", icon: AccountIcon, active: false, hasChevron: true },
];

export default function Sidebar() {
  return (
    <aside className="w-[240px] min-w-[240px] h-full bg-white flex flex-col border-r border-gray-100">
      {/* Logo */}
      <div className="px-4 pt-4 pb-4">
        <div className="px-1 py-1">
          <Image src="/assets/trainual-logo.svg" alt="Trainual" width={118} height={32} priority />
        </div>
      </div>

      {/* Nav items */}
      <nav className="flex flex-col gap-4 px-3 pt-2 pb-4 flex-1">
        {navItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`group flex items-center h-[46px] px-1 rounded-full transition-colors ${
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
            {item.hasChevron && (
              <div className="w-7 h-6 flex items-center justify-center">
                <ChevronDownIcon />
              </div>
            )}
          </a>
        ))}
      </nav>
    </aside>
  );
}
