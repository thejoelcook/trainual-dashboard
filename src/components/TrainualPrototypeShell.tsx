"use client";

import { startTransition, useCallback, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import DashboardContent from "./DashboardContent";
import Footer from "./Footer";
import type { ViewId } from "./types";

export default function TrainualPrototypeShell() {
  const [currentView, setCurrentView] = useState<ViewId>("home");

  const navigateToView = useCallback((view: ViewId) => {
    startTransition(() => {
      setCurrentView(view);
    });
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      <Sidebar
        currentView={currentView}
        onNavigate={navigateToView}
      />

      <div className="relative flex min-w-0 flex-1 flex-col">
        <Header />

        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto bg-surface pb-[220px]">
            <DashboardContent
              currentView={currentView}
              onNavigate={navigateToView}
            />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
