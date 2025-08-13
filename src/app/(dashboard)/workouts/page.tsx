"use client";
import React from "react";
import { Plus, Target, Clock, Timer } from "lucide-react";

export default function WorkoutsPage() {
  const [currentWorkout, setCurrentWorkout] = React.useState<any | null>(null);

  const workouts = [
    {
      id: 1,
      name: "Push Day A",
      program: "Push/Pull/Legs",
      exercises: [
        { name: "Bench Press", sets: "3x5", weight: "185 lb", plates: "45/25/10" },
        { name: "Overhead Press", sets: "3x8", weight: "115 lb", plates: "45/10/2.5" },
        { name: "Incline Dumbbell Press", sets: "3x10", weight: "70 lb", plates: "" },
        { name: "Lateral Raises", sets: "3x12", weight: "25 lb", plates: "" },
      ],
      duration: "45 min",
      lastPerformed: "2 days ago",
    },
    {
      id: 2,
      name: "Pull Day A",
      program: "Push/Pull/Legs",
      exercises: [
        { name: "Deadlift", sets: "1x5", weight: "275 lb", plates: "45/45/10/2.5" },
        { name: "Bent Row", sets: "3x8", weight: "155 lb", plates: "45/25/2.5" },
        { name: "Pull-ups", sets: "3x8", weight: "BW+25", plates: "" },
        { name: "Face Pulls", sets: "3x15", weight: "50 lb", plates: "" },
      ],
      duration: "50 min",
      lastPerformed: "4 days ago",
    },
  ];

  const WorkoutCard = ({ workout, onStart }: { workout: any; onStart: (w: any) => void }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{workout.name}</h3>
          <p className="text-sm text-gray-600">{workout.program}</p>
        </div>
        <button
          onClick={() => onStart(workout)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
        >
          <Target size={16} />
          <span>Start</span>
        </button>
      </div>

      <div className="space-y-2 mb-4">
        {workout.exercises.slice(0, 3).map((exercise: any, idx: number) => (
          <div key={idx} className="flex justify-between items-center text-sm">
            <span className="text-gray-700">{exercise.name}</span>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">{exercise.sets}</span>
              {exercise.plates && <span className="text-xs text-blue-600 font-mono">{exercise.plates}</span>}
              <span className="font-medium text-gray-900">{exercise.weight}</span>
            </div>
          </div>
        ))}
        {workout.exercises.length > 3 && (
          <div className="text-xs text-gray-500 text-center">+{workout.exercises.length - 3} more exercises</div>
        )}
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <Clock size={14} />
          <span>{workout.duration}</span>
        </div>
        <span>Last: {workout.lastPerformed}</span>
      </div>
    </div>
  );

  const ActiveWorkout = ({ workout, onEnd }: { workout: any; onEnd: () => void }) => (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">{workout.name}</h2>
          <p className="text-blue-100 text-sm">{workout.program}</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <Timer size={16} />
            <span className="text-sm">23:45</span>
          </div>
          <button onClick={onEnd} className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm font-medium">
            End
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {workout.exercises.map((exercise: any, idx: number) => (
          <div key={idx} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">{exercise.name}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                {exercise.plates && <span className="font-mono text-blue-600">{exercise.plates}</span>}
                <span className="font-medium">{exercise.weight}</span>
              </div>
            </div>
            <div className="space-y-2">
              {Array.from({ length: parseInt(exercise.sets.split("x")[0]) }, (_, setIdx) => (
                <div key={setIdx} className="flex items-center space-x-3 bg-white p-3 rounded border">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                    {setIdx + 1}
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-500 block">Weight</label>
                      <input type="number" className="w-full border border-gray-300 rounded px-2 py-1 text-sm" placeholder={exercise.weight.split(" ")[0]} />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block">Reps</label>
                      <input type="number" className="w-full border border-gray-300 rounded px-2 py-1 text-sm" placeholder={exercise.sets.split("x")[1]} />
                    </div>
                  </div>
                  <button className="w-8 h-8 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center">
                    <span className="text-green-600 text-lg">✓</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex space-x-3">
          <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium">Previous Exercise</button>
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">Next Exercise</button>
        </div>
      </div>
    </div>
  );

  if (currentWorkout) return <ActiveWorkout workout={currentWorkout} onEnd={() => setCurrentWorkout(null)} />;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Today's Workouts</h2>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2">
          <Plus size={16} />
          <span>New Workout</span>
        </button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {workouts.map((w) => (
          <WorkoutCard key={w.id} workout={w} onStart={setCurrentWorkout} />
        ))}
      </div>
    </div>
  );
}