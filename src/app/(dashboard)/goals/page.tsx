"use client";

import IronForgeApp from "../ironforge-app";

export default function GoalsPage() {
  return (
    <IronForgeApp
      activeTab="goals"
      setActiveTab={() => {}}
      currentWorkout={null}
      setCurrentWorkout={() => {}}
      showProgramBuilder={false}
      setShowProgramBuilder={() => {}}
    />
  );
}