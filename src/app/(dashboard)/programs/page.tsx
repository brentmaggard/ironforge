"use client";

import IronForgeApp from "../ironforge-app";

export default function ProgramsPage() {
  return (
    <IronForgeApp
      activeTab="programs"
      setActiveTab={() => {}}
      currentWorkout={null}
      setCurrentWorkout={() => {}}
      showProgramBuilder={false}
      setShowProgramBuilder={() => {}}
    />
  );
}