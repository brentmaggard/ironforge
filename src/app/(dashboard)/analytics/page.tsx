"use client";

import IronForgeApp from "../ironforge-app";

export default function AnalyticsPage() {
  return (
    <IronForgeApp
      activeTab="analytics"
      setActiveTab={() => {}}
      currentWorkout={null}
      setCurrentWorkout={() => {}}
      showProgramBuilder={false}
      setShowProgramBuilder={() => {}}
    />
  );
}