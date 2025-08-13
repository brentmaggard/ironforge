"use client";

import IronForgeApp from "../ironforge-app";

export default function HistoryPage() {
  return (
    <IronForgeApp
      activeTab="history"
      setActiveTab={() => {}}
      currentWorkout={null}
      setCurrentWorkout={() => {}}
      showProgramBuilder={false}
      setShowProgramBuilder={() => {}}
    />
  );
}