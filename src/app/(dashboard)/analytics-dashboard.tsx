"use client";
import React from 'react';
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

const AnalyticsDashboard = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
    
    {/* Key Metrics */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Activity className="text-blue-600" size={24} />
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">{stats.totalWorkouts}</div>
            <div className="text-sm text-gray-600">Total Workouts</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <Weight className="text-green-600" size={24} />
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">{stats.totalVolume.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Total Volume (lb)</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
            <Clock className="text-orange-600" size={24} />
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">{stats.avgDuration}</div>
            <div className="text-sm text-gray-600">Avg Duration (min)</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <Zap className="text-purple-600" size={24} />
          </div>
          <div>
            <div className="text-3xl font-bold text-gray-900">{stats.thisWeekWorkouts}</div>
            <div className="text-sm text-gray-600">This Week</div>
          </div>
        </div>
      </div>
    </div>

    {/* Weekly Volume Chart */}
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Volume Trend</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart data={[
            { week: 'Week 1', volume: 28500 },
            { week: 'Week 2', volume: 31200 },
            { week: 'Week 3', volume: 29800 },
            { week: 'Week 4', volume: 32700 },
            { week: 'Week 5', volume: 33900 },
            { week: 'Week 6', volume: 31100 }
          ]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value) => [`${value.toLocaleString()} lb`, 'Volume']} />
            <Bar dataKey="volume" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Body Weight Tracking */}
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Body Weight</h3>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          Add Entry
        </button>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart data={[
            { date: '2024-12-01', weight: 180 },
            { date: '2024-12-08', weight: 181 },
            { date: '2024-12-15', weight: 182 },
            { date: '2024-12-22', weight: 183 },
            { date: '2024-12-29', weight: 184 },
            { date: '2025-01-05', weight: 185 },
            { date: '2025-01-12', weight: 186 }
          ]}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              domain={['dataMin - 2', 'dataMax + 2']}
            />
            <Tooltip
              labelFormatter={(value) => new Date(value).toLocaleDateString()}
              formatter={(value) => [`${value} lb`, 'Body Weight']}
            />
            <Line
              type="monotone"
              dataKey="weight"
              stroke="#10B981"
              strokeWidth={3}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 5 }}
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>

    {/* Personal Records */}
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
        <Award className="text-yellow-500" size={20} />
        <span>Personal Records</span>
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { exercise: 'Bench Press', weight: '195 lb', date: '2025-01-12' },
          { exercise: 'Squat', weight: '205 lb', date: '2025-01-10' },
          { exercise: 'Deadlift', weight: '295 lb', date: '2025-01-08' },
          { exercise: 'Overhead Press', weight: '125 lb', date: '2025-01-05' },
          { exercise: 'Bent Row', weight: '165 lb', date: '2025-01-03' },
          { exercise: 'Pull-ups', weight: 'BW+35 lb', date: '2025-01-01' }
        ].map((pr, idx) => (
          <div key={idx} className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">{pr.exercise}</div>
                <div className="text-2xl font-bold text-yellow-700">{pr.weight}</div>
                <div className="text-sm text-gray-600">{pr.date}</div>
              </div>
              <div className="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center">
                <Award className="text-yellow-600" size={20} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AnalyticsDashboard;
