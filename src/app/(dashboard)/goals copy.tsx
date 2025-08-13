"use client";
import React, { useState } from "react";
import {
  Plus,
  GripVertical,
} from "lucide-react";
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

// Sample goals data
const goalsData = [
  {
    id: 1,
    name: "Bench Press",
    current: 285,
    target: 315,
    progress: 0.74, // 74%
    startDate: "2023-12-18",
    endDate: null,
    progressData: [
      { date: "2023-12-17", weight: 215 },
      { date: "2024-04-16", weight: 270 },
      { date: "2024-08-15", weight: 280 },
      { date: "2024-12-14", weight: 295 },
      { date: "2025-04-14", weight: 305 },
    ],
  },
  {
    id: 2,
    name: "Overhead Press",
    current: 175,
    target: 200,
    progress: 0.87,
    startDate: "2024-01-20",
    endDate: null,
    progressData: [
      { date: "2024-02-01", weight: 140 },
      { date: "2024-04-01", weight: 160 },
      { date: "2024-06-01", weight: 170 },
      { date: "2024-08-01", weight: 175 },
    ],
  },
  {
    id: 3,
    name: "Squat",
    current: 395,
    target: 400,
    progress: 0.99,
    startDate: "2023-10-01",
    endDate: null,
    progressData: [
      { date: "2023-11-15", weight: 315 },
      { date: "2024-02-15", weight: 350 },
      { date: "2024-05-15", weight: 380 },
      { date: "2024-08-15", weight: 395 },
    ],
  },
];

// Example archived goal (optional)
const archivedGoals = [
  {
    id: 4,
    name: "Pendlay Row",
    current: 225,
    target: 225,
    progress: 1.0,
    startDate: "2024-03-01",
    endDate: "2025-07-21",
  },
];

const Goals: React.FC = () => {
  // Maintain goals in state so we can reorder them
  const [goals, setGoals] = useState(goalsData);
  const [selectedId, setSelectedId] = useState(goals[0].id);
  const [draggedId, setDraggedId] = useState<number | null>(null);

  const selectedGoal = goals.find((g) => g.id === selectedId)!;

  // Drag event handlers
  const handleDragStart = (id: number) => {
    setDraggedId(id);
  };

  const handleDrop = (id: number) => {
    if (draggedId === null || draggedId === id) {
      return;
    }
    const draggedIndex = goals.findIndex((g) => g.id === draggedId);
    const dropIndex = goals.findIndex((g) => g.id === id);
    const updated = [...goals];
    const [removed] = updated.splice(draggedIndex, 1);
    updated.splice(dropIndex, 0, removed);
    setGoals(updated);
    setDraggedId(null);
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Goals</h1>
          <p className="text-sm text-gray-600">
            Active goals &amp; streaks: {goals.length}/{goals.length}{" "}
            <span className="italic ml-1">
              (Get premium for unlimited access)
            </span>
          </p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
          <Plus size={16} /> <span>New goal</span>
        </button>
      </div>

      {/* Main two-column layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left column: Active goals list */}
        <div className="space-y-4">
          {goals.map((goal) => (
            <div
              key={goal.id}
              onClick={() => setSelectedId(goal.id)}
              className={`flex items-center justify-between p-4 rounded-lg border ${
                goal.id === selectedId
                  ? "bg-blue-50 border-blue-200"
                  : "bg-white border-gray-200 hover:bg-gray-50"
              } cursor-pointer`}
            >
              {/* Circular progress indicator */}
              <div className="relative w-12 h-12 flex-shrink-0">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: `conic-gradient(#3b82f6 0 ${
                      goal.progress * 100
                    }%, #e5e7eb ${goal.progress * 100}% 100%)`,
                  }}
                />
                <div className="relative w-full h-full flex items-center justify-center text-xs font-semibold">
                  {Math.round(goal.progress * 100)}%
                </div>
              </div>

              {/* Goal info */}
              <div className="flex-1 ml-3">
                <div className="font-medium text-gray-900">{goal.name}</div>
                <div className="text-xs text-gray-600">
                  {goal.current}/{goal.target}
                </div>
                {goal.endDate && (
                  <div className="text-xs text-gray-400">
                    Completed {new Date(goal.endDate).toLocaleDateString()}
                  </div>
                )}
              </div>

              {/* Drag handle (only this part is draggable) */}
              <div
                className="text-gray-400 cursor-move"
                draggable
                onDragStart={() => handleDragStart(goal.id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(goal.id)}
              >
                <GripVertical size={16} />
              </div>
            </div>
          ))}

          {/* Archived goals section */}
          {archivedGoals.length > 0 && (
            <>
              <hr className="my-4 border-gray-200" />
              <h3 className="text-sm font-medium text-gray-500">
                Archived goals
              </h3>
              {archivedGoals.map((goal) => (
                <div
                  key={goal.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-100 border border-gray-200"
                >
                  {/* Simple filled circle for completed */}
                  <div className="relative w-12 h-12 flex-shrink-0">
                    <div
                      className="absolute inset-0 rounded-full bg-green-600"
                      style={{ opacity: 0.2 }}
                    />
                    <div className="relative w-full h-full flex items-center justify-center text-xs font-semibold">
                      100%
                    </div>
                  </div>

                  <div className="flex-1 ml-3">
                    <div className="font-medium text-gray-900">
                      {goal.name}
                    </div>
                    <div className="text-xs text-gray-600">
                      {goal.current}/{goal.target}
                    </div>
                    {goal.endDate && (
                      <div className="text-xs text-gray-400">
                        Completed {new Date(goal.endDate).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                  <div className="text-gray-400">
                    <GripVertical size={16} />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Right column: Selected goal details and chart */}
        <div className="space-y-4">
          {/* Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={selectedGoal.progressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) =>
                      new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "2-digit",
                      })
                    }
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    labelFormatter={(value) =>
                      new Date(value).toLocaleDateString()
                    }
                    formatter={(value) => [`${value} lb`, "Weight"]}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Details and actions */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
            <div className="flex items-baseline justify-between">
              <h3 className="text-xl font-semibold">{selectedGoal.name}</h3>
              <span className="ml-2 inline-flex items-center text-xs font-medium bg-green-100 text-green-800 rounded-full px-2 py-0.5">
                PR
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Start</p>
                <p className="text-gray-900">
                  {new Date(selectedGoal.startDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-gray-500">Finish</p>
                <p className="text-gray-900">
                  {selectedGoal.endDate
                    ? new Date(selectedGoal.endDate).toLocaleDateString()
                    : "--"}
                </p>
              </div>
            </div>

            <div className="flex space-x-2">
              <button className="flex-1 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                Edit
              </button>
              <button className="flex-1 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                Archive
              </button>
              <button className="flex-1 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                Copy
              </button>
              <button className="flex-1 py-2 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Goals;