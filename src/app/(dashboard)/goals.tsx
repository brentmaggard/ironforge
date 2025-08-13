"use client";
import React, { useState } from "react";
import {
  Plus,
  GripVertical,
  ArrowRight,
  X,
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
  const [goals, setGoals] = useState(goalsData);
  const [selectedId, setSelectedId] = useState(goals[0].id);
  const [draggedId, setDraggedId] = useState<number | null>(null);

  // New goal form state
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("#EC4899");
  const goalTypeOptions = [
    "Reps",
    "Volume",
    "Sets",
    "Number of workouts",
    "PR",
    "Estimated 1RM",
    "Time PR",
    "Rep goal",
    "Body measurements",
  ];
  const [goalType, setGoalType] = useState(goalTypeOptions[0]);
  const [exerciseOption, setExerciseOption] = useState<"all" | "select">("all");
  const [goalValue, setGoalValue] = useState("");
  const today = new Date().toISOString().slice(0, 16);
  const [startDate, setStartDate] = useState(today);
  const [finishDate, setFinishDate] = useState("");

  const selectedGoal = goals.find((g) => g.id === selectedId)!;

  // Drag handlers
  const handleDragStart = (id: number) => setDraggedId(id);
  const handleDrop = (id: number) => {
    if (draggedId === null || draggedId === id) return;
    const draggedIndex = goals.findIndex((g) => g.id === draggedId);
    const dropIndex = goals.findIndex((g) => g.id === id);
    const updated = [...goals];
    const [removed] = updated.splice(draggedIndex, 1);
    updated.splice(dropIndex, 0, removed);
    setGoals(updated);
    setDraggedId(null);
  };

  return (
    <div className="relative flex flex-col space-y-6">
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
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          <Plus size={16} /> <span>New goal</span>
        </button>
      </div>

      {/* Main two-column layout */}
      {!showForm && (
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
      )}

      {/* Slide‑in new goal form */}
      {showForm && (
        <>
          {/* translucent overlay */}
          <div
            className="fixed inset-0 z-40 bg-gray-400 bg-opacity-40"
            onClick={() => setShowForm(false)}
          />
          <div
            className={`fixed inset-y-0 right-0 z-50 w-full md:w-full bg-white border-l border-gray-200 shadow-lg transform transition-transform duration-300 ${
              showForm ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <div className="p-6 space-y-6">
              <div className="p-6 space-y-6 relative">
              {/* Close button */}
                <button
                  onClick={() => setShowForm(false)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100"
                  title="Close"
                >
                  <X size={16} />
                </button>

                <h2 className="text-2xl font-bold mb-4">New goal</h2>
                {/* ...rest of your form fields... */}
              </div>
              <h2 className="text-2xl font-bold mb-4">New goal</h2>

              {/* Name */}
              <div>
                <label className="block text-sm mb-1">Name</label>
                <input
                  type="text"
                  placeholder="Title"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none resize-none"
                />
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm mb-1">Color</label>
                <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3 text-sm">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-8 h-8 rounded cursor-pointer border border-gray-300"
                  />
                  Pick color
                </div>
              </div>

              {/* Goal type chips */}
              <div>
                <label className="block text-sm mb-1">Goal type</label>
                <div className="flex flex-wrap gap-2">
                  {goalTypeOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setGoalType(opt)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        goalType === opt
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Exercises selection */}
              <div>
                <label className="block text-sm mb-1">Exercises</label>
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span
                      className={`w-4 h-4 rounded-full border ${
                        exerciseOption === "all"
                          ? "border-blue-600 bg-blue-600"
                          : "border-gray-400 bg-white"
                      }`}
                      onClick={() => setExerciseOption("all")}
                    />
                    <span>All exercises</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <span
                      className={`w-4 h-4 rounded-full border ${
                        exerciseOption === "select"
                          ? "border-blue-600 bg-blue-600"
                          : "border-gray-400 bg-white"
                      }`}
                      onClick={() => setExerciseOption("select")}
                    />
                    <span>Select exercises</span>
                  </label>
                </div>
              </div>

              {/* Goal value */}
              <div>
                <label className="block text-sm mb-1">What is your goal?</label>
                <input
                  type="text"
                  placeholder="Goal"
                  value={goalValue}
                  onChange={(e) => setGoalValue(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm placeholder-gray-400 focus:outline-none"
                />
              </div>

              {/* Date selection */}
              <div>
                <label className="block text-sm mb-1">Date</label>
                <div className="grid grid-cols-1 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 mb-1">Start</p>
                    <input
                      type="datetime-local"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none"
                    />
                  </div>
                  <div>
                    <p className="text-gray-500 mb-1">Finish</p>
                    <input
                      type="datetime-local"
                      value={finishDate}
                      onChange={(e) => setFinishDate(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none"
                      placeholder="Tap to select date"
                    />
                  </div>
                </div>
              </div>

              {/* Create goal button */}
              <div className="flex justify-end">
                <button
                  className="flex items-center space-x-2 border border-red-600 text-red-600 hover:bg-red-50 px-4 py-2 rounded-lg"
                  onClick={() => {
                    // TODO: implement saving the new goal logic
                    setShowForm(false);
                  }}
                >
                  <span>Create goal</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Goals;