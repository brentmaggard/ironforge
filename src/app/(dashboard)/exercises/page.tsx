"use client";

import IronForgeApp from "../ironforge-app";

export default function ExercisesPage() {
  return (
    <IronForgeApp
      activeTab="exercises"
      setActiveTab={() => {}}
      currentWorkout={null}
      setCurrentWorkout={() => {}}
      showProgramBuilder={false}
      setShowProgramBuilder={() => {}}
    />
  );
}