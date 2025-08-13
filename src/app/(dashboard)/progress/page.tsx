"use client";

import IronForgeApp from "../ironforge-app";

export default function ProgressPage() {
  return (
    <IronForgeApp
      activeTab="progress"
      setActiveTab={() => {}}
      currentWorkout={null}
      setCurrentWorkout={() => {}}
      showProgramBuilder={false}
      setShowProgramBuilder={() => {}}
    />
  );
}