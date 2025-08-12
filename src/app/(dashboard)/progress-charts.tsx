"use client";
import React, { useState } from 'react';
import {
  Calendar,
  TrendingUp,
  Clock,
  Weight,
  Target,
  Filter,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  LineChart,
  Activity,
  Award,
  Zap,
  Eye,
  Download,
  RefreshCw
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart as RechartsBarChart, Bar } from 'recharts';

// Sample progress data for charts (moved from workout-history-progress.tsx)
const progressData = {
  'Bench Press': [
    { date: '2024-12-01', weight: 175, volume: 2625, reps: 15 },
    { date: '2024-12-08', weight: 180, volume: 2700, reps: 15 },
    { date: '2024-12-15', weight: 180, volume: 2520, reps: 14 },
    { date: '2024-12-22', weight: 185, volume: 2775, reps: 15 },
    { date: '2024-12-29', weight: 185, volume: 2590, reps: 14 },
    { date: '2025-01-05', weight: 190, volume: 2850, reps: 15 },
    { date: '2025-01-12', weight: 190, volume: 2660, reps: 14 }
  ],
  'Squat': [
    { date: '2024-12-02', weight: 175, volume: 2625, reps: 15 },
    { date: '2024-12-09', weight: 180, volume: 2700, reps: 15 },
    { date: '2024-12-16', weight: 185, volume: 2775, reps: 15 },
    { date: '2024-12-23', weight: 185, volume: 2590, reps: 14 },
    { date: '2024-12-30', weight: 190, volume: 2850, reps: 15 },
    { date: '2025-01-06', weight: 190, volume: 2660, reps: 14 },
    { date: '2025-01-13', weight: 195, volume: 2925, reps: 15 }
  ],
  'Deadlift': [
    { date: '2024-12-03', weight: 255, volume: 1275, reps: 5 },
    { date: '2024-12-10', weight: 265, volume: 1325, reps: 5 },
    { date: '2024-12-17', weight: 270, volume: 1350, reps: 5 },
    { date: '2024-12-24', weight: 275, volume: 1375, reps: 5 },
    { date: '2024-12-31', weight: 280, volume: 1400, reps: 5 },
    { date: '2025-01-07', weight: 285, volume: 1425, reps: 5 },
    { date: '2025-01-14', weight: 290, volume: 1450, reps: 5 }
  ]
};

// Get available exercises for filter (moved from workout-history-progress.tsx)
const exercises = ['all', ...Object.keys(progressData)];

// Filter progress data based on selected exercise (moved from workout-history-progress.tsx)
const getChartData = (selectedExercise, chartType) => {
  if (selectedExercise === 'all') {
    // Combine all exercises for overview
    const dates = [...new Set(Object.values(progressData).flat().map(d => d.date))].sort();
    return dates.map(date => {
      const entry = { date };
      Object.entries(progressData).forEach(([exercise, data]) => {
        const dayData = data.find(d => d.date === date);
        if (dayData) {
          entry[exercise] = dayData[chartType];
        }
      });
      return entry;
    });
  }
  return progressData[selectedExercise] || [];
};

const ProgressCharts = () => {
  const [selectedExercise, setSelectedExercise] = useState('all');
  const [chartType, setChartType] = useState('weight'); // weight, volume, reps
  const chartData = getChartData(selectedExercise, chartType);

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <h2 className="text-2xl font-bold text-gray-900">Progress Tracking</h2>
        <div className="flex items-center space-x-3">
          <select
            value={selectedExercise}
            onChange={(e) => setSelectedExercise(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            {exercises.map(exercise => (
              <option key={exercise} value={exercise}>
                {exercise === 'all' ? 'All Exercises' : exercise}
              </option>
            ))}
          </select>
          <div className="flex bg-gray-100 rounded-lg p-1">
            {['weight', 'volume', 'reps'].map(type => (
              <button
                key={type}
                onClick={() => setChartType(type)}
                className={`px-3 py-1 rounded text-sm font-medium capitalize ${
                  chartType === type
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              {selectedExercise === 'all' ? (
                <RechartsLineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    formatter={(value, name) => [
                      `${value}${chartType === 'weight' ? ' lb' : chartType === 'volume' ? ' lb' : ''}`,
                      name
                    ]}
                  />
                  <Legend />
                  {exercises.slice(1).map((exercise, idx) => (
                    <Line
                      key={exercise}
                      type="monotone"
                      dataKey={exercise}
                      stroke={['#3B82F6', '#EF4444', '#10B981', '#F59E0B'][idx % 4]}
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      connectNulls={false}
                    />
                  ))}
                </RechartsLineChart>
              ) : (
                <RechartsLineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    labelFormatter={(value) => new Date(value).toLocaleDateString()}
                    formatter={(value) => [
                      `${value}${chartType === 'weight' ? ' lb' : chartType === 'volume' ? ' lb' : ''}`,
                      chartType.charAt(0).toUpperCase() + chartType.slice(1)
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey={chartType}
                    stroke="#3B82F6"
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 5 }}
                  />
                </RechartsLineChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    );
  };

export default ProgressCharts;
