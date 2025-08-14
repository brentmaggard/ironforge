"use client";

import React, { useState } from "react";
import {
  Plus,
  GripVertical,
  Target,
  Loader2,
  AlertCircle,
  Archive,
  Edit,
  Copy,
  Trash2,
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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CreateGoalForm } from "@/components/goals/CreateGoalForm";
import { useGoals } from "@/hooks/useGoals";
import { Goal, CreateGoal, UpdateGoal, calculateProgress, formatGoalValue } from "@/types/goals";
import { cn } from "@/lib/utils";

const Goals: React.FC = () => {
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [includeArchived, setIncludeArchived] = useState(false);

  const {
    goals,
    total,
    isLoading,
    isError,
    error,
    createGoal,
    updateGoal,
    deleteGoal,
    archiveGoal,
    unarchiveGoal,
    reorderGoals,
    isCreating,
    isUpdating,
    isDeleting,
    isArchiving,
  } = useGoals(includeArchived);

  // Set first goal as selected if none selected and goals exist
  React.useEffect(() => {
    if (goals.length > 0 && !selectedGoalId) {
      setSelectedGoalId(goals[0].id);
    }
  }, [goals, selectedGoalId]);

  const selectedGoal = goals.find((g) => g.id === selectedGoalId);
  const activeGoals = goals.filter((g) => !g.is_archived);
  const archivedGoals = goals.filter((g) => g.is_archived);

  // Handle goal creation
  const handleCreateGoal = (goalData: CreateGoal) => {
    createGoal(goalData, {
      onSuccess: () => {
        setShowCreateForm(false);
      },
    });
  };

  // Handle goal actions
  const handleArchiveGoal = (goalId: string) => {
    archiveGoal(goalId);
  };

  const handleDeleteGoal = (goalId: string) => {
    if (confirm('Are you sure you want to delete this goal? This action cannot be undone.')) {
      deleteGoal(goalId);
      if (selectedGoalId === goalId) {
        setSelectedGoalId(goals[0]?.id || null);
      }
    }
  };

  // Drag and drop handlers
  const handleDragStart = (goalId: string) => {
    // Store dragged goal ID
  };

  const handleDrop = (targetGoalId: string) => {
    // Implement reordering logic
    const goalIds = goals.map(g => g.id);
    reorderGoals(goalIds);
  };

  // Generate mock progress data for charts
  const generateProgressData = (goal: Goal) => {
    const startDate = new Date(goal.start_date || new Date());
    const today = new Date();
    const daysDiff = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    
    const data = [];
    for (let i = 0; i <= Math.min(daysDiff, 30); i += 7) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const progress = (i / Math.max(daysDiff, 1)) * goal.current_value;
      data.push({
        date: date.toISOString().split('T')[0],
        value: Math.round(progress * 100) / 100,
      });
    }
    
    return data;
  };

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900">Failed to load goals</h3>
          <p className="text-gray-600">{error?.message || 'Something went wrong'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Goals</h1>
          <p className="text-sm text-gray-600">
            {isLoading ? 'Loading...' : `Active goals: ${activeGoals.length}${total > activeGoals.length ? ` • Archived: ${archivedGoals.length}` : ''}`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {archivedGoals.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIncludeArchived(!includeArchived)}
            >
              {includeArchived ? 'Hide Archived' : 'Show Archived'}
            </Button>
          )}
          <Button
            onClick={() => setShowCreateForm(true)}
            disabled={isCreating}
          >
            {isCreating ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Plus className="w-4 h-4 mr-2" />
            )}
            New Goal
          </Button>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex items-center space-x-2">
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Loading goals...</span>
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && goals.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
          <Target className="w-16 h-16 text-gray-400" />
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900">No goals yet</h3>
            <p className="text-gray-600 mb-4">Create your first goal to start tracking your progress</p>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Goal
            </Button>
          </div>
        </div>
      )}

      {/* Main Layout */}
      {!isLoading && goals.length > 0 && !showCreateForm && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left column: Goals list */}
          <div className="space-y-4">
            {/* Active Goals */}
            {activeGoals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                isSelected={goal.id === selectedGoalId}
                onSelect={() => setSelectedGoalId(goal.id)}
                onArchive={() => handleArchiveGoal(goal.id)}
                onDelete={() => handleDeleteGoal(goal.id)}
                onDragStart={() => handleDragStart(goal.id)}
                onDrop={() => handleDrop(goal.id)}
                isArchiving={isArchiving}
                isDeleting={isDeleting}
              />
            ))}

            {/* Archived Goals */}
            {includeArchived && archivedGoals.length > 0 && (
              <>
                <hr className="my-4 border-gray-200" />
                <h3 className="text-sm font-medium text-gray-500">
                  Archived Goals ({archivedGoals.length})
                </h3>
                {archivedGoals.map((goal) => (
                  <GoalCard
                    key={goal.id}
                    goal={goal}
                    isSelected={goal.id === selectedGoalId}
                    onSelect={() => setSelectedGoalId(goal.id)}
                    onArchive={() => unarchiveGoal(goal.id)}
                    onDelete={() => handleDeleteGoal(goal.id)}
                    isArchived
                    isArchiving={isArchiving}
                    isDeleting={isDeleting}
                  />
                ))}
              </>
            )}
          </div>

          {/* Right column: Selected goal details */}
          {selectedGoal && (
            <div className="space-y-4">
              {/* Progress Chart */}
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">{selectedGoal.name}</h3>
                  <p className="text-sm text-gray-600">Progress Over Time</p>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={generateProgressData(selectedGoal)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) =>
                          new Date(value).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })
                        }
                      />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip
                        labelFormatter={(value) =>
                          new Date(value).toLocaleDateString()
                        }
                        formatter={(value) => [
                          `${value} ${selectedGoal.unit}`,
                          "Value"
                        ]}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke={selectedGoal.color || "#3b82f6"}
                        strokeWidth={2}
                        dot={{ r: 4 }}
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Goal Details */}
              <GoalDetails
                goal={selectedGoal}
                onUpdate={(data) => updateGoal({ id: selectedGoal.id, data })}
                onArchive={() => handleArchiveGoal(selectedGoal.id)}
                onDelete={() => handleDeleteGoal(selectedGoal.id)}
                isUpdating={isUpdating}
                isArchiving={isArchiving}
                isDeleting={isDeleting}
              />
            </div>
          )}
        </div>
      )}

      {/* Create Goal Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-gray-500 bg-opacity-75"
            onClick={() => setShowCreateForm(false)}
          />
          <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-lg shadow-xl flex flex-col">
            <div className="flex-1 overflow-y-auto p-6">
              <CreateGoalForm
                onSubmit={handleCreateGoal}
                onClose={() => setShowCreateForm(false)}
                isLoading={isCreating}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Goal Card Component
interface GoalCardProps {
  goal: Goal;
  isSelected: boolean;
  onSelect: () => void;
  onArchive: () => void;
  onDelete: () => void;
  onDragStart?: () => void;
  onDrop?: () => void;
  isArchived?: boolean;
  isArchiving?: boolean;
  isDeleting?: boolean;
}

function GoalCard({
  goal,
  isSelected,
  onSelect,
  onArchive,
  onDelete,
  onDragStart,
  onDrop,
  isArchived = false,
  isArchiving = false,
  isDeleting = false,
}: GoalCardProps) {
  const progress = calculateProgress(goal.current_value, goal.target_value);

  return (
    <div
      onClick={onSelect}
      className={cn(
        "flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors",
        isSelected
          ? "bg-blue-50 border-blue-200"
          : isArchived
          ? "bg-gray-50 border-gray-200 hover:bg-gray-100"
          : "bg-white border-gray-200 hover:bg-gray-50"
      )}
    >
      {/* Progress Circle */}
      <div className="relative w-12 h-12 flex-shrink-0">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: isArchived
              ? `conic-gradient(#10b981 0 100%, #e5e7eb 100% 100%)`
              : `conic-gradient(${goal.color || '#3b82f6'} 0 ${progress}%, #e5e7eb ${progress}% 100%)`,
          }}
        />
        <div className="relative w-full h-full flex items-center justify-center text-xs font-semibold">
          {Math.round(progress)}%
        </div>
      </div>

      {/* Goal Info */}
      <div className="flex-1 ml-3">
        <div className="flex items-center gap-2">
          <div className="font-medium text-gray-900">{goal.name}</div>
          {isArchived && <Badge variant="secondary">Archived</Badge>}
        </div>
        <div className="text-xs text-gray-600">
          {formatGoalValue(goal.current_value, goal.unit)} / {formatGoalValue(goal.target_value, goal.unit)}
        </div>
        {goal.target_date && (
          <div className="text-xs text-gray-400">
            Target: {new Date(goal.target_date).toLocaleDateString()}
          </div>
        )}
      </div>

      {/* Drag Handle */}
      <div
        className="text-gray-400 cursor-move"
        draggable
        onDragStart={onDragStart}
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
      >
        <GripVertical className="w-4 h-4" />
      </div>
    </div>
  );
}

// Goal Details Component
interface GoalDetailsProps {
  goal: Goal;
  onUpdate: (data: UpdateGoal) => void;
  onArchive: () => void;
  onDelete: () => void;
  isUpdating?: boolean;
  isArchiving?: boolean;
  isDeleting?: boolean;
}

function GoalDetails({
  goal,
  onUpdate,
  onArchive,
  onDelete,
  isUpdating = false,
  isArchiving = false,
  isDeleting = false,
}: GoalDetailsProps) {
  const progress = calculateProgress(goal.current_value, goal.target_value);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-4">
      <div className="flex items-baseline justify-between">
        <h3 className="text-xl font-semibold">{goal.name}</h3>
        <Badge 
          variant={progress === 100 ? "default" : "secondary"}
          style={{ backgroundColor: progress === 100 ? goal.color : undefined }}
        >
          {progress === 100 ? "Complete" : `${Math.round(progress)}% Complete`}
        </Badge>
      </div>

      {goal.description && (
        <p className="text-gray-600 text-sm">{goal.description}</p>
      )}

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Current Value</p>
          <p className="text-gray-900 font-medium">
            {formatGoalValue(goal.current_value, goal.unit)}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Target Value</p>
          <p className="text-gray-900 font-medium">
            {formatGoalValue(goal.target_value, goal.unit)}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Start Date</p>
          <p className="text-gray-900">
            {goal.start_date ? new Date(goal.start_date).toLocaleDateString() : "Not set"}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Target Date</p>
          <p className="text-gray-900">
            {goal.target_date ? new Date(goal.target_date).toLocaleDateString() : "Not set"}
          </p>
        </div>
      </div>

      <div className="flex space-x-2 pt-4 border-t">
        <Button variant="outline" size="sm" disabled={isUpdating}>
          <Edit className="w-4 h-4 mr-2" />
          Edit
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onArchive}
          disabled={isArchiving}
        >
          {isArchiving ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Archive className="w-4 h-4 mr-2" />
          )}
          {goal.is_archived ? "Restore" : "Archive"}
        </Button>
        <Button variant="outline" size="sm">
          <Copy className="w-4 h-4 mr-2" />
          Copy
        </Button>
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={onDelete}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4 mr-2" />
          )}
          Delete
        </Button>
      </div>
    </div>
  );
}

export default Goals;