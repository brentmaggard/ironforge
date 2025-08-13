
import React from 'react';
import GoalCard from './components/GoalCard';
import GoalProgress from './components/GoalProgress';
import ArchivedGoals from './components/ArchivedGoals';

const GoalsPage = () => {
  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 bg-gray-50 min-h-screen">
      {/* Left Column */}
      <div className="w-full md:w-1/3">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold">Goals</h1>
            <p className="text-sm text-gray-500">Active goals & streaks: 5/5</p>
            <p className="text-xs text-gray-400 italic">Get premium for unlimited access</p>
          </div>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600">+ New goal</button>
        </div>
        <div className="space-y-4">
          {/* Active Goals List */}
          <GoalCard />
          <GoalCard />
          <GoalCard />
        </div>
        <div className="mt-8">
          <ArchivedGoals />
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full md:w-2/3">
        <GoalProgress />
      </div>
    </div>
  );
};

export default GoalsPage;
