"use client";

import IronForgeApp from "../ironforge-app";

export default function WorkoutsPage() {
  return (
    <IronForgeApp
      activeTab="workouts"
      setActiveTab={() => {}}
      currentWorkout={null}
      setCurrentWorkout={() => {}}
      showProgramBuilder={false}
      setShowProgramBuilder={() => {}}
    />
  );
}