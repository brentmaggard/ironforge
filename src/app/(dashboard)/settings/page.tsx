"use client";

import IronForgeApp from "../ironforge-app";

export default function SettingsPage() {
  return (
    <IronForgeApp
      activeTab="settings"
      setActiveTab={() => {}}
      currentWorkout={null}
      setCurrentWorkout={() => {}}
      showProgramBuilder={false}
      setShowProgramBuilder={() => {}}
    />
  );
}