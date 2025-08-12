import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  Copy,
  Edit3,
  Save,
  Code,
  FormInput,
  ChevronDown,
  ChevronRight,
  Play,
  Settings,
  Target,
  TrendingUp,
  Calendar,
  Clock,
  Weight,
  RotateCcw,
  AlertCircle,
  CheckCircle,
  Eye,
  Download,
  Upload
} from 'lucide-react';

const ProgramBuilder = () => {
  const [activeMode, setActiveMode] = useState('simple'); // 'simple' or 'advanced'
  const [currentProgram, setCurrentProgram] = useState({
    name: 'My Custom Program',
    description: 'A customizable strength training program',
    weeks: [
      {
        id: 1,
        name: 'Week 1',
        days: [
          {
            id: 1,
            name: 'Day A - Upper Body',
            exercises: [
              {
                id: 1,
                name: 'Bench Press',
                sets: 3,
                reps: '5',
                weight: 'state.benchPress',
                progression: {
                  type: 'linear',
                  increment: '5lb',
                  deloadAfter: 3,
                  deloadPercent: 0.9
                },
                restTime: 180,
                script: `// Simple linear progression
if (completedReps >= reps) {
  state.benchPress = state.benchPress + 5lb
} else {
  state.failures = state.failures + 1
}

if (state.failures >= 3) {
  state.failures = 0
  state.benchPress = state.benchPress * 0.9
}`
              },
              {
                id: 2,
                name: 'Bent-Over Row',
                sets: 3,
                reps: '5',
                weight: 'state.bentRow',
                progression: {
                  type: 'linear',
                  increment: '5lb',
                  deloadAfter: 3,
                  deloadPercent: 0.9
                },
                restTime: 180,
                script: `// Linear progression with deload
if (completedReps >= reps) {
  state.bentRow = state.bentRow + 5lb
} else {
  state.failures = state.failures + 1
}

if (state.failures >= 3) {
  state.failures = 0
  state.bentRow = state.bentRow * 0.9
}`
              }
            ]
          },
          {
            id: 2,
            name: 'Day B - Lower Body',
            exercises: [
              {
                id: 3,
                name: 'Squat',
                sets: 3,
                reps: '5',
                weight: 'state.squat',
                progression: {
                  type: 'linear',
                  increment: '5lb',
                  deloadAfter: 3,
                  deloadPercent: 0.9
                },
                restTime: 240,
                script: `// Squat progression
if (completedReps >= reps) {
  state.squat = state.squat + 5lb
} else {
  state.failures = state.failures + 1
}

if (state.failures >= 3) {
  state.failures = 0
  state.squat = state.squat * 0.9
}`
              }
            ]
          }
        ]
      }
    ],
    state: {
      benchPress: '135lb',
      bentRow: '115lb',
      squat: '185lb',
      failures: 0
    }
  });

  const [selectedExercise, setSelectedExercise] = useState(null);
  const [expandedDays, setExpandedDays] = useState({});
  const [showPreview, setShowPreview] = useState(false);

  // Toggle day expansion
  const toggleDay = (dayId) => {
    setExpandedDays(prev => ({
      ...prev,
      [dayId]: !prev[dayId]
    }));
  };

  // Exercise editor component
  const ExerciseEditor = ({ exercise, onUpdate, onClose }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold">Edit Exercise: {exercise.name}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <span className="sr-only">Close</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          {/* Mode Toggle */}
          <div className="mb-6">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveMode('simple')}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors flex items-center justify-center space-x-2 ${
                  activeMode === 'simple'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <FormInput size={16} />
                <span>Simple Editor</span>
              </button>
              <button
                onClick={() => setActiveMode('advanced')}
                className={`flex-1 py-2 px-4 rounded-md font-medium transition-colors flex items-center justify-center space-x-2 ${
                  activeMode === 'advanced'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Code size={16} />
                <span>FlexCode Editor</span>
              </button>
            </div>
          </div>

          {activeMode === 'simple' ? (
            // Simple Form Editor
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Exercise Name
                  </label>
                  <input
                    type="text"
                    value={exercise.name}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="e.g., Bench Press"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rest Time (seconds)
                  </label>
                  <input
                    type="number"
                    value={exercise.restTime}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="180"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sets
                  </label>
                  <input
                    type="number"
                    value={exercise.sets}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reps
                  </label>
                  <input
                    type="text"
                    value={exercise.reps}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    placeholder="5 or 8-12"
                  />
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-4">Progression Settings</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Progression Type
                    </label>
                    <select
                      value={exercise.progression.type}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    >
                      <option value="linear">Linear Progression</option>
                      <option value="percentage">Percentage Based (5/3/1)</option>
                      <option value="wave">Wave Loading</option>
                      <option value="rpe">RPE Based</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weight Increment
                    </label>
                    <input
                      type="text"
                      value={exercise.progression.increment}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      placeholder="5lb or 2.5kg"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deload After (failures)
                    </label>
                    <input
                      type="number"
                      value={exercise.progression.deloadAfter}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      placeholder="3"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deload Percentage
                    </label>
                    <input
                      type="number"
                      value={exercise.progression.deloadPercent * 100}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      placeholder="90"
                      step="1"
                      min="50"
                      max="95"
                    />
                    <span className="text-xs text-gray-500 mt-1">Percentage of current weight</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Advanced FlexCode Editor
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="text-blue-600 mt-0.5" size={16} />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">FlexCode Scripting</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Use JavaScript-like syntax to define custom progression logic. Available variables:
                      <code className="bg-blue-100 px-1 rounded">completedReps</code>,
                      <code className="bg-blue-100 px-1 rounded">reps</code>,
                      <code className="bg-blue-100 px-1 rounded">state</code>
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  FlexCode Script
                </label>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <div className="bg-gray-800 text-gray-100 p-4 font-mono text-sm overflow-x-auto">
                    <pre className="whitespace-pre-wrap">{exercise.script}</pre>
                  </div>
                  <div className="bg-gray-50 p-3 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
                          <Play size={14} />
                          <span>Test Script</span>
                        </button>
                        <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
                          <Eye size={14} />
                          <span>Preview</span>
                        </button>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <CheckCircle size={14} className="text-green-500" />
                        <span>Syntax OK</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FlexCode Examples */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Common Patterns</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-3">
                    <h5 className="text-sm font-medium text-gray-900 mb-2">Linear Progression</h5>
                    <pre className="text-xs bg-gray-100 p-2 rounded font-mono overflow-x-auto">
{`if (completedReps >= reps) {
  state.weight += 5lb
} else {
  state.failures += 1
}

if (state.failures >= 3) {
  state.failures = 0
  state.weight *= 0.9
}`}
                    </pre>
                  </div>
                  <div className="border rounded-lg p-3">
                    <h5 className="text-sm font-medium text-gray-900 mb-2">5/3/1 Week</h5>
                    <pre className="text-xs bg-gray-100 p-2 rounded font-mono overflow-x-auto">
{`const week = (state.cycle - 1) % 4 + 1
const tm = state.trainingMax

if (week === 1) {
  sets = [
    tm * 0.65,
    tm * 0.75,
    tm * 0.85
  ]
}`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-6 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onUpdate(exercise);
                onClose();
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Save size={16} />
              <span>Save Exercise</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Program Preview Component
  const ProgramPreview = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold">Program Preview: {currentProgram.name}</h3>
          <button onClick={() => setShowPreview(false)} className="text-gray-400 hover:text-gray-600">
            <span className="sr-only">Close</span>
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {currentProgram.weeks[0].days.map(day => (
            <div key={day.id} className="border rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-4">{day.name}</h4>
              <div className="space-y-3">
                {day.exercises.map(exercise => (
                  <div key={exercise.id} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">{exercise.name}</h5>
                      <div className="text-sm text-gray-600">
                        {exercise.sets} × {exercise.reps} @ {exercise.weight}
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center space-x-4">
                      <span>Rest: {exercise.restTime}s</span>
                      <span>Progression: +{exercise.progression.increment}</span>
                      <span>Deload: {exercise.progression.deloadAfter} failures</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{currentProgram.name}</h1>
            <p className="text-gray-600 mt-1">{currentProgram.description}</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowPreview(true)}
              className="flex items-center space-x-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Eye size={16} />
              <span>Preview</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Upload size={16} />
              <span>Import</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download size={16} />
              <span>Export</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Save size={16} />
              <span>Save Program</span>
            </button>
          </div>
        </div>

        {/* Program Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="text-blue-600" size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{currentProgram.weeks.length}</div>
                <div className="text-sm text-gray-600">Weeks</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="text-green-600" size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {currentProgram.weeks[0].days.reduce((acc, day) => acc + day.exercises.length, 0)}
                </div>
                <div className="text-sm text-gray-600">Exercises</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="text-orange-600" size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {Math.round(currentProgram.weeks[0].days.reduce((acc, day) =>
                    acc + day.exercises.reduce((eAcc, ex) => eAcc + ex.restTime * ex.sets, 0), 0) / 60)}
                </div>
                <div className="text-sm text-gray-600">Min/Workout</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-purple-600" size={20} />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">{currentProgram.weeks[0].days.length}</div>
                <div className="text-sm text-gray-600">Days/Week</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Program Structure */}
      <div className="space-y-6">
        {currentProgram.weeks.map(week => (
          <div key={week.id} className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">{week.name}</h3>
            </div>

            <div className="p-4 space-y-4">
              {week.days.map(day => (
                <div key={day.id} className="border border-gray-200 rounded-lg">
                  <button
                    onClick={() => toggleDay(day.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      {expandedDays[day.id] ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                      <h4 className="font-medium text-gray-900">{day.name}</h4>
                      <span className="text-sm text-gray-500">
                        {day.exercises.length} exercises
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Copy size={16} />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-red-600">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </button>

                  {expandedDays[day.id] && (
                    <div className="border-t border-gray-200 p-4 bg-gray-50 space-y-3">
                      {day.exercises.map(exercise => (
                        <div key={exercise.id} className="bg-white rounded-lg p-4 border border-gray-200">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-4 mb-2">
                                <h5 className="font-medium text-gray-900">{exercise.name}</h5>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                  <Weight size={14} />
                                  <span>{exercise.sets} × {exercise.reps}</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                  <Clock className="text-orange-600" size={14} />
                                  <span>{exercise.restTime}s</span>
                                </div>
                                <div className="flex items-center space-x-2 text-sm text-gray-600">
                                  <TrendingUp size={14} />
                                  <span>+{exercise.progression.increment}</span>
                                </div>
                              </div>

                              {activeMode === 'advanced' && (
                                <div className="mt-2">
                                  <details className="group">
                                    <summary className="cursor-pointer text-xs text-blue-600 hover:text-blue-700">
                                      View FlexCode Script
                                    </summary>
                                    <pre className="text-xs bg-gray-100 p-2 mt-2 rounded font-mono overflow-x-auto max-h-32">
                                      {exercise.script}
                                    </pre>
                                  </details>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center space-x-2 ml-4">
                              <button
                                onClick={() => setSelectedExercise(exercise)}
                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                              >
                                <Edit3 size={16} />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg">
                                <Copy size={16} />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}

                      <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-gray-400 hover:text-gray-600 flex items-center justify-center space-x-2">
                        <Plus size={20} />
                        <span>Add Exercise</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}

              <button className="w-full border-2 border-dashed border-gray-300 rounded-lg p-4 text-gray-500 hover:border-gray-400 hover:text-gray-600 flex items-center justify-center space-x-2">
                <Plus size={20} />
                <span>Add Training Day</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      {selectedExercise && (
        <ExerciseEditor
          exercise={selectedExercise}
          onUpdate={(updatedExercise) => {
            // Update logic would go here
            console.log('Updated exercise:', updatedExercise);
          }}
          onClose={() => setSelectedExercise(null)}
        />
      )}

      {showPreview && <ProgramPreview />}
    </div>
  );
};

export default ProgramBuilder;