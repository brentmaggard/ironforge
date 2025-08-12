"use client";
import React from 'react';
import {
  Calendar,
  Clock,
  Weight,
  Filter,
  Download
} from 'lucide-react';

// Sample workout history data (moved from workout-history-progress.tsx)
const workoutHistory = [
  {
    id: 1,
    date: '2025-01-10',
    name: 'Push Day A',
    program: 'Push/Pull/Legs',
    duration: '52 min',
    exercises: [
      { name: 'Bench Press', sets: 3, reps: [5, 5, 4], weight: 185, rpe: [7, 8, 9] },
      { name: 'Overhead Press', sets: 3, reps: [8, 7, 6], weight: 115, rpe: [7, 8, 8] },
      { name: 'Incline DB Press', sets: 3, reps: [10, 9, 8], weight: 70, rpe: [7, 8, 9] },
      { name: 'Lateral Raises', sets: 3, reps: [12, 12, 10], weight: 25, rpe: [6, 7, 8] }
    ],
    volume: 12450, // total volume in lbs
    notes: 'Felt strong today, might increase bench next session'
  },
  {
    id: 2,
    date: '2025-01-08',
    name: 'Pull Day A',
    program: 'Push/Pull/Legs',
    duration: '48 min',
    exercises: [
      { name: 'Deadlift', sets: 1, reps: [5], weight: 275, rpe: [8] },
      { name: 'Bent Row', sets: 3, reps: [8, 8, 7], weight: 155, rpe: [7, 8, 8] },
      { name: 'Pull-ups', sets: 3, reps: [8, 7, 6], weight: 'BW+25', rpe: [7, 8, 9] },
      { name: 'Face Pulls', sets: 3, reps: [15, 15, 12], weight: 50, rpe: [6, 7, 7] }
    ],
    volume: 8925,
    notes: 'Deadlift felt heavy today'
  },
  {
    id: 3,
    date: '2025-01-06',
    name: 'Leg Day A',
    program: 'Push/Pull/Legs',
    duration: '58 min',
    exercises: [
      { name: 'Squat', sets: 3, reps: [5, 5, 5], weight: 185, rpe: [7, 7, 8] },
      { name: 'Romanian Deadlift', sets: 3, reps: [8, 8, 7], weight: 135, rpe: [7, 8, 8] },
      { name: 'Bulgarian Split Squat', sets: 3, reps: [10, 9, 8], weight: 35, rpe: [8, 8, 9] },
      { name: 'Calf Raises', sets: 3, reps: [20, 18, 15], weight: 135, rpe: [7, 8, 9] }
    ],
    volume: 11340,
    notes: 'Legs feeling strong, good depth on squats'
  }
];

// Stats calculation (moved from workout-history-progress.tsx)
const getStats = () => {
  const totalWorkouts = workoutHistory.length;
  const totalVolume = workoutHistory.reduce((sum, w) => sum + w.volume, 0);
  const avgDuration = workoutHistory.reduce((sum, w) => sum + parseInt(w.duration), 0) / totalWorkouts;
  const thisWeekWorkouts = workoutHistory.filter(w => {
    const workoutDate = new Date(w.date);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return workoutDate >= weekAgo;
  }).length;

  return {
    totalWorkouts,
    totalVolume: Math.round(totalVolume),
    avgDuration: Math.round(avgDuration),
    thisWeekWorkouts
  };
};

const stats = getStats();

const WorkoutHistory = () => (
  <div className="space-y-6">
    {/* Filter Controls */}
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
      <h2 className="text-2xl font-bold text-gray-900">Workout History</h2>
      <div className="flex items-center space-x-3">
        <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter size={16} />
          <span>Filter</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Download size={16} />
          <span>Export</span>
        </button>
      </div>
    </div>

    {/* Workout List */}
    <div className="space-y-4">
      {workoutHistory.map(workout => (
        <div key={workout.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
          {/* Workout Header */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{workout.name}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                <div className="flex items-center space-x-1">
                  <Calendar size={14} />
                  <span>{new Date(workout.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock size={14} />
                  <span>{workout.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Weight size={14} />
                  <span>{workout.volume.toLocaleString()} lb total</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View Details
              </button>
              <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                Repeat
              </button>
            </div>
          </div>

          {/* Exercise Summary */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {workout.exercises.map((exercise, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-3">
                <div className="font-medium text-gray-900 text-sm mb-1">{exercise.name}</div>
                <div className="text-xs text-gray-600 space-y-1">
                  <div>{exercise.sets} sets</div>
                  <div>Reps: {exercise.reps.join(', ')}</div>
                  <div>Weight: {exercise.weight} lb</div>
                  {exercise.rpe && (
                    <div>RPE: {exercise.rpe.join(', ')}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Notes */}
          {workout.notes && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-3 mt-4">
              <p className="text-sm text-blue-700">{workout.notes}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default WorkoutHistory;
