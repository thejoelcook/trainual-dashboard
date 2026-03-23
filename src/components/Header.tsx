import Image from "next/image";
import { SearchIcon, WhatsNewIcon, HelpCenterIcon, NotificationIcon, PlusIcon } from "./Icons";

type HeaderProps = {
  isLiveLearnHidden?: boolean;
  onToggleLiveLearn?: () => void;
};

export default function Header({ isLiveLearnHidden = false, onToggleLiveLearn }: HeaderProps) {
  return (
    <header className="h-[60px] min-h-[60px] bg-white flex items-center px-0 border-b border-gray-100">
      <div className="flex-1 flex items-center pl-10 pr-0">
        <div className="relative w-[580px]">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder=""
            className="w-full h-[38px] pl-10 pr-4 rounded-lg border border-gray-200 bg-white text-sm focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="flex items-center gap-0 pr-[60px]">
        <button className="w-8 h-10 flex items-center justify-center text-foreground hover:opacity-70">
          <WhatsNewIcon />
        </button>

        <button className="w-8 h-10 flex items-center justify-center ml-2 text-foreground hover:opacity-70">
          <HelpCenterIcon />
        </button>

        <button className="w-10 h-10 flex items-center justify-center ml-2 text-foreground hover:opacity-70">
          <NotificationIcon />
        </button>

        <button className="w-9 h-9 rounded-full bg-primary flex items-center justify-center ml-2 hover:bg-primary/90">
          <PlusIcon />
        </button>

        <button
          onClick={onToggleLiveLearn}
          className={`flex items-center justify-center ml-2 hover:opacity-80 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] overflow-hidden ${
            isLiveLearnHidden
              ? 'w-9 h-9 opacity-100 scale-100'
              : 'w-0 h-9 opacity-0 scale-75'
          }`}
          aria-label="Show LiveLearn"
        >
          <Image src="/assets/top-nav/ai.svg" alt="AI" width={36} height={36} className="flex-shrink-0" />
        </button>

        <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center ml-2 text-xs font-semibold text-foreground">
          JC
        </div>
      </div>
    </header>
  );
}
