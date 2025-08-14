"use client";
import React from "react";
import { Plus } from "lucide-react";
import ProgramBuilder from "../program-builder";
import { Button } from "@/components/ui/button";

export default function ProgramsPage() {
  const [showProgramBuilder, setShowProgramBuilder] = React.useState(false);

  const programs = [
    { id: 1, name: "Starting Strength", type: "Beginner", weeks: 12, active: true },
    { id: 2, name: "5/3/1 BBB", type: "Intermediate", weeks: 16, active: false },
    { id: 3, name: "Push/Pull/Legs", type: "Intermediate", weeks: 8, active: false },
  ];

  if (showProgramBuilder) return <ProgramBuilder />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Programs</h2>
        <Button
          onClick={() => setShowProgramBuilder(true)}
        >
          <Plus size={16} />
          <span>New Program</span>
        </Button>
      </div>
      <div className="grid gap-4">
        {programs.map((p) => (
          <div key={p.id} className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                  <span>{p.name}</span>
                  {p.active && <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>}
                </h3>
                <p className="text-sm text-gray-600">
                  {p.type} • {p.weeks} weeks
                </p>
              </div>
              <div className="flex space-x-2">
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Edit</button>
                <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">Clone</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}