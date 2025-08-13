import React, { useState } from 'react';
import {
  Home,
  Dumbbell,
  TrendingUp,
  Settings,
  User,
  Plus,
  Menu,
  X,
  Clock,
  Calendar,
  BarChart3,
  Target,
  Timer,
  Weight,
  Calculator,
  Edit3, Save, Code, FormInput, ChevronDown, ChevronRight, Play, RotateCcw, AlertCircle, CheckCircle, Eye, Download, Upload,
  Filter, ChevronLeft, LineChart, Activity, Award, Zap, RefreshCw
} from 'lucide-react';

import PlateCalculator from './plate-calculator'; // Import PlateCalculator
import ProgramBuilder from './program-builder'; // Import ProgramBuilder
import WorkoutHistory from './workout-history'; // Import WorkoutHistory
import ProgressCharts from './progress-charts'; // Import ProgressCharts
import AnalyticsDashboard from './analytics-dashboard'; // Import AnalyticsDashboard
import Goals from "./goals"; // Import Goals
import Exercises from './exercises'; // Import Exercises


const IronForgeApp = () => {
  const [activeTab, setActiveTab] = useState('workouts');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentWorkout, setCurrentWorkout] = useState(null);
  const [showProgramBuilder, setShowProgramBuilder] = useState(false); // Added state for ProgramBuilder

  // Sample data - in real app this would come from state/API
  const workouts = [
    {
      id: 1,
      name: "Push Day A",
      program: "Push/Pull/Legs",
      exercises: [
        { name: "Bench Press", sets: "3x5", weight: "185 lb", plates: "45/25/10" },
        { name: "Overhead Press", sets: "3x8", weight: "115 lb", plates: "45/10/2.5" },
        { name: "Incline Dumbbell Press", sets: "3x10", weight: "70 lb", plates: "" },
        { name: "Lateral Raises", sets: "3x12", weight: "25 lb", plates: "" }
      ],
      duration: "45 min",
      lastPerformed: "2 days ago"
    },
    {
      id: 2,
      name: "Pull Day A",
      program: "Push/Pull/Legs",
      exercises: [
        { name: "Deadlift", sets: "1x5", weight: "275 lb", plates: "45/45/10/2.5" },
        { name: "Bent Row", sets: "3x8", weight: "155 lb", plates: "45/25/2.5" },
        { name: "Pull-ups", sets: "3x8", weight: "BW+25", plates: "" },
        { name: "Face Pulls", sets: "3x15", weight: "50 lb", plates: "" }
      ],
      duration: "50 min",
      lastPerformed: "4 days ago"
    }
  ];

  const programs = [
    { id: 1, name: "Starting Strength", type: "Beginner", weeks: 12, active: true },
    { id: 2, name: "5/3/1 BBB", type: "Intermediate", weeks: 16, active: false },
    { id: 3, name: "Push/Pull/Legs", type: "Intermediate", weeks: 8, active: false }
  ];

  // Navigation component
  const Navigation = () => (
    <nav className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu size={24} />
        </button>
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <Dumbbell className="text-white" size={18} />
          </div>
          <h1 className="text-xl font-bold text-gray-900">IronForge</h1>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <button className="p-2 rounded-lg hover:bg-gray-100 relative">
          <Timer size={20} className="text-gray-600" />
        </button>
        <button className="p-2 rounded-lg hover:bg-gray-100">
          <User size={20} className="text-gray-600" />
        </button>
      </div>
    </nav>
  );

  // Sidebar component
  const Sidebar = () => (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <aside className={`
        fixed md:sticky top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 z-50 transform transition-transform
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-4 border-b border-gray-200 md:hidden">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        <nav className="p-4 space-y-2">
          {[
            { id: 'workouts', label: 'Workouts', icon: Dumbbell },
            { id: 'programs', label: 'Programs', icon: Calendar },
            { id: 'history', label: 'Workout History', icon: BarChart3 }, // Changed label and icon
            { id: 'progress', label: 'Progress Charts', icon: LineChart }, // Changed label and icon
            { id: 'analytics', label: 'Analytics Dashboard', icon: BarChart3 }, // Added Analytics Dashboard
            { id: 'calculator', label: 'Plate Calculator', icon: Calculator },
            { id: "goals", label: "Goals", icon: TrendingUp },  // Added Goals
            { id: "exercises", label: "Exercises", icon: Activity },  // Added Exercises
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                setActiveTab(id);
                setSidebarOpen(false);
              }}
              className={`
                w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors
                ${activeTab === id
                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                  : 'text-gray-700 hover:bg-gray-100'
                }
              `}
            >
              <Icon size={20} />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </nav>
      </aside>
    </>
  );

  // Workout Card Component
  const WorkoutCard = ({ workout, onStart }) => (
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
        {workout.exercises.slice(0, 3).map((exercise, idx) => (
          <div key={idx} className="flex justify-between items-center text-sm">
            <span className="text-gray-700">{exercise.name}</span>
            <div className="flex items-center space-x-2">
              <span className="text-gray-500">{exercise.sets}</span>
              {exercise.plates && (
                <span className="text-xs text-blue-600 font-mono">{exercise.plates}</span>
              )}
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

  // Active Workout Interface
  const ActiveWorkoutInterface = ({ workout, onEnd }) => (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
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
          <button
            onClick={onEnd}
            className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm font-medium"
          >
            End
          </button>
        </div>
      </div>

      {/* Exercise List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {workout.exercises.map((exercise, idx) => (
          <div key={idx} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900">{exercise.name}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                {exercise.plates && (
                  <span className="font-mono text-blue-600">{exercise.plates}</span>
                )}
                <span className="font-medium">{exercise.weight}</span>
              </div>
            </div>

            {/* Sets */}
            <div className="space-y-2">
              {Array.from({length: parseInt(exercise.sets.split('x')[0])}, (_, setIdx) => (
                <div key={setIdx} className="flex items-center space-x-3 bg-white p-3 rounded border">
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium">
                    {setIdx + 1}
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-gray-500 block">Weight</label>
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        placeholder={exercise.weight.split(' ')[0]}
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block">Reps</label>
                      <input
                        type="number"
                        className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                        placeholder={exercise.sets.split('x')[1]}
                      />
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

      {/* Bottom Action Bar */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex space-x-3">
          <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-medium">
            Previous Exercise
          </button>
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium">
            Next Exercise
          </button>
        </div>
      </div>
    </div>
  );

  // Main Content Area
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
              {workouts.map(workout => (
                <WorkoutCard
                  key={workout.id}
                  workout={workout}
                  onStart={setCurrentWorkout}
                />
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
                  <button
                    onClick={() => setShowProgramBuilder(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2"
                  >
                    <Plus size={16} />
                    <span>New Program</span>
                  </button>
                </div>

                <div className="grid gap-4">
                  {programs.map(program => (
                    <div key={program.id} className="bg-white rounded-lg border border-gray-200 p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                            <span>{program.name}</span>
                            {program.active && <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Active</span>}
                          </h3>
                          <p className="text-sm text-gray-600">{program.type} • {program.weeks} weeks</p>
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

      case 'analytics': // New case for Analytics Dashboard
        return <AnalyticsDashboard />;
      
      case "goals":
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

      case 'calculator': // New case for PlateCalculator
        return <PlateCalculator />;

      default:
        return <div>Tab not implemented</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
          <MainContent />
        </main>
      </div>
    </div>
  );
};

export default IronForgeApp;