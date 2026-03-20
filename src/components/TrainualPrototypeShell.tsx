"use client";

import { startTransition, useCallback, useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import DashboardContent from "./DashboardContent";
import { LiveLearn } from "./LiveLearn";
import { TrainualUPopup } from "./TrainualUPopup";
import type { ViewId } from "./types";

export default function TrainualPrototypeShell() {
  const [currentView, setCurrentView] = useState<ViewId>("home");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isSidebarHovering, setIsSidebarHovering] = useState(false);
  const [showTrainingBarTooltip, setShowTrainingBarTooltip] = useState(false);

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
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(prev => !prev)}
        onHoverChange={setIsSidebarHovering}
      />

      <div className="relative flex min-w-0 flex-1 flex-col">
        <Header />

        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto bg-surface pb-[120px]">
            <DashboardContent
              currentView={currentView}
              onNavigate={navigateToView}
            />
          </div>
        </div>

        {/* Live Learn floating taskbar */}
        <LiveLearn isSidebarCollapsed={isSidebarCollapsed} isSidebarHovering={isSidebarHovering} showTrainingBarTooltip={showTrainingBarTooltip} onDismissTooltip={() => setShowTrainingBarTooltip(false)} />
      </div>

      {/* Trainual U welcome popup */}
      <TrainualUPopup onUseTrainingBar={() => setShowTrainingBarTooltip(true)} />
    </div>
  );
}
