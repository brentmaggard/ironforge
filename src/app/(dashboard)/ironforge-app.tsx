"use client";
import React from 'react';
import { Plus, Target, Clock, Timer } from 'lucide-react';

import PlateCalculator from './plate-calculator';
import ProgramBuilder from './program-builder';
import WorkoutHistory from './workout-history';
import ProgressCharts from './progress-charts';
import AnalyticsDashboard from './analytics-dashboard';
import Goals from './goals';
import Exercises from './exercises';

export type IronForgeAppProps = {
  activeTab: string;
  setActiveTab: (t: string) => void;
  currentWorkout: any | null;
  setCurrentWorkout: (w: any | null) => void;
  showProgramBuilder: boolean;
  setShowProgramBuilder: (v: boolean) => void;
};

const IronForgeApp: React.FC<IronForgeAppProps> = ({
  activeTab,
  setActiveTab,
  currentWorkout,
  setCurrentWorkout,
  showProgramBuilder,
  setShowProgramBuilder,
}) => {
  // Sample data - replace with real data later
  const workouts = [
    {
      id: 1,
      name: 'Push Day A',
      program: 'Push/Pull/Legs',
      exercises: [
        { name: 'Bench Press', sets: '3x5', weight: '185 lb', plates: '45/25/10' },
        { name: 'Overhead Press', sets: '3x8', weight: '115 lb', plates: '45/10/2.5' },
        { name: 'Incline Dumbbell Press', sets: '3x10', weight: '70 lb', plates: '' },
        { name: 'Lateral Raises', sets: '3x12', weight: '25 lb', plates: '' },
      ],
      duration: '45 min',
      lastPerformed: '2 days ago',
    },
    {
      id: 2,
      name: 'Pull Day A',
      program: 'Push/Pull/Legs',
      exercises: [
        { name: 'Deadlift', sets: '1x5', weight: '275 lb', plates: '45/45/10/2.5' },
        { name: 'Bent Row', sets: '3x8', weight: '155 lb', plates: '45/25/2.5' },
        { name: 'Pull-ups', sets: '3x8', weight: 'BW+25', plates: '' },
        { name: 'Face Pulls', sets: '3x15', weight: '50 lb', plates: '' },
      ],
      duration: '50 min',
      lastPerformed: '4 days ago',
    },
  ];

  const programs = [
    { id: 1, name: 'Starting Strength', type: 'Beginner', weeks: 12, active: true },
    { id: 2, name: '5/3/1 BBB', type: 'Intermediate', weeks: 16, active: false },
    { id: 3, name: 'Push/Pull/Legs', type: 'Intermediate', weeks: 8, active: false },
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
          <div className="text-xs text-gray-500 text-center">
            +{workout.exercises.length - 3} more exercises
          </div>
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

  const ActiveWorkoutInterface = ({ workout, onEnd }: { workout: any; onEnd: () => void }) => (
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
              {Array.from({ length: parseInt(exercise.sets.split('x')[0]) }, (_, setIdx) => (
                <div key={setIdx} className="flex items-center space-x-3 bg-white p-3 rounded border">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                    {setIdx + 1}
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-500 block">Weight</label>
                      <input type="number" className="w-full border border-gray-300 rounded px-2 py-1 text-sm" placeholder={exercise.weight.split(' ')[0]} />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block">Reps</label>
                      <input type="number" className="w-full border border-gray-300 rounded px-2 py-1 text-sm" placeholder={exercise.sets.split('x')[1]} />
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

  const MainContent = () => {
    if (currentWorkout) {
      return <ActiveWorkoutInterface workout={currentWorkout} onEnd={() => setCurrentWorkout(null)} />;
    }

    switch (activeTab) {
      case 'workouts':
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
              {workouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} onStart={setCurrentWorkout} />
              ))}
            </div>
          </div>
        );

      case 'programs':
        return (
          <div className="space-y-6">
            {showProgramBuilder ? (
              <ProgramBuilder />
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Programs</h2>
                  <button onClick={() => setShowProgramBuilder(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2">
                    <Plus size={16} />
                    <span>New Program</span>
                  </button>
                </div>
                <div className="grid gap-4">
                  {programs.map((program) => (
                    <div key={program.id} className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                            <span>{program.name}</span>
                            {program.active && (
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>
                            )}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {program.type} • {program.weeks} weeks
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
              </>
            )}
          </div>
        );

      case 'progress':
        return <ProgressCharts />;
      case 'history':
        return <WorkoutHistory />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'goals':
        return <Goals />;
      case 'exercises':
        return <Exercises />;
      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Equipment</h3>
                <p className="text-sm text-gray-600 mb-3">Configure your available plates and equipment</p>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Configure Equipment</button>
              </div>
              <hr />
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Units</h3>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="units" defaultChecked className="text-blue-600" />
                    <span className="text-sm">Pounds (lb)</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="radio" name="units" className="text-blue-600" />
                    <span className="text-sm">Kilograms (kg)</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );
      case 'calculator':
        return <PlateCalculator />;
      default:
        return <div>Tab not implemented</div>;
    }
  };

  // Shell owns grid; this file only renders the content body
  return (
    <div className="w-full">
      <MainContent />
    </div>
  );
};

export default IronForgeApp;