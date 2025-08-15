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
  TrendingUp,
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
import { EditGoalForm } from "@/components/goals/EditGoalForm";
import { useGoals } from "@/hooks/useGoals";
import { useGoalProgress, formatProgressForChart } from "@/hooks/useGoalProgress";
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
    isReordering,
  } = useGoals(includeArchived);

  // Separate query to check if there are any archived goals (for button visibility)
  const { goals: allGoals } = useGoals(true);

  // Set first goal as selected if none selected and goals exist
  React.useEffect(() => {
    if (goals.length > 0 && !selectedGoalId) {
      setSelectedGoalId(goals[0].id);
    }
  }, [goals, selectedGoalId]);

  const selectedGoal = goals.find((g) => g.id === selectedGoalId);
  const activeGoals = goals.filter((g) => !g.is_archived);
  const archivedGoals = goals.filter((g) => g.is_archived);
  
  // Check if there are any archived goals in the complete list (for button visibility)
  const hasArchivedGoals = allGoals?.filter((g) => g.is_archived).length > 0;

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

  const handleCopyGoal = (goal: Goal) => {
    const copiedGoal: CreateGoal = {
      name: `${goal.name} (Copy)`,
      description: goal.description,
      color: goal.color,
      goal_type: goal.goal_type,
      exercise_id: goal.exercise_id,
      exercise_name: goal.exercise_name,
      target_value: goal.target_value,
      current_value: 0, // Reset progress for copied goal
      unit: goal.unit,
      start_date: new Date().toISOString().split('T')[0], // Set to today
      target_date: goal.target_date,
      is_archived: false, // New goal should be active
      display_order: 0, // Will be set by the API
    };

    createGoal(copiedGoal, {
      onSuccess: (newGoal) => {
        // Select the newly copied goal
        setSelectedGoalId(newGoal.goal.id);
      },
    });
  };

  // Drag and drop state
  const [draggedGoalId, setDraggedGoalId] = useState<string | null>(null);
  const [dragOverGoalId, setDragOverGoalId] = useState<string | null>(null);

  // Drag and drop handlers
  const handleDragStart = (goalId: string, e: React.DragEvent) => {
    setDraggedGoalId(goalId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', goalId);
  };

  const handleDragOver = (goalId: string, e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverGoalId(goalId);
  };

  const handleDragLeave = () => {
    setDragOverGoalId(null);
  };

  const handleDrop = (targetGoalId: string, e: React.DragEvent) => {
    e.preventDefault();
    setDragOverGoalId(null);
    
    if (!draggedGoalId || draggedGoalId === targetGoalId) {
      setDraggedGoalId(null);
      return;
    }

    // Get current active goals in their display order
    const currentGoals = [...activeGoals];
    const draggedIndex = currentGoals.findIndex(g => g.id === draggedGoalId);
    const targetIndex = currentGoals.findIndex(g => g.id === targetGoalId);

    if (draggedIndex === -1 || targetIndex === -1) {
      setDraggedGoalId(null);
      return;
    }

    // Reorder the goals array
    const draggedGoal = currentGoals[draggedIndex];
    currentGoals.splice(draggedIndex, 1);
    currentGoals.splice(targetIndex, 0, draggedGoal);

    // Extract the new order of goal IDs
    const newOrderIds = currentGoals.map(g => g.id);
    
    // Call the reorder API
    reorderGoals(newOrderIds);
    setDraggedGoalId(null);
  };

  const handleDragEnd = () => {
    setDraggedGoalId(null);
    setDragOverGoalId(null);
  };

  // Generate mock progress data for charts (fallback when no real data)
  const generateMockProgressData = (goal: Goal) => {
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
        formattedValue: `${Math.round(progress * 100) / 100} ${goal.unit}`,
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
          {hasArchivedGoals && (
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
          <div className={cn(
            "space-y-4",
            isReordering && "pointer-events-none opacity-75"
          )}>
            {/* Active Goals */}
            {activeGoals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                isSelected={goal.id === selectedGoalId}
                onSelect={() => setSelectedGoalId(goal.id)}
                onArchive={() => handleArchiveGoal(goal.id)}
                onDelete={() => handleDeleteGoal(goal.id)}
                onDragStart={(e) => handleDragStart(goal.id, e)}
                onDragOver={(e) => handleDragOver(goal.id, e)}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(goal.id, e)}
                onDragEnd={handleDragEnd}
                isDragging={draggedGoalId === goal.id}
                isDragOver={dragOverGoalId === goal.id}
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
                    // Archived goals don't support reordering
                    onDragStart={() => {}}
                    onDragOver={() => {}}
                    onDragLeave={() => {}}
                    onDrop={() => {}}
                    onDragEnd={() => {}}
                    isDragging={false}
                    isDragOver={false}
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
            <SelectedGoalDisplay 
              goal={selectedGoal}
              onUpdate={(data) => updateGoal({ id: selectedGoal.id, data })}
              onArchive={() => handleArchiveGoal(selectedGoal.id)}
              onDelete={() => handleDeleteGoal(selectedGoal.id)}
              onCopy={handleCopyGoal}
              isUpdating={isUpdating}
              isArchiving={isArchiving}
              isDeleting={isDeleting}
              isCopying={isCreating}
              generateMockProgressData={generateMockProgressData}
            />
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
  onDragStart?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDragLeave?: () => void;
  onDrop?: (e: React.DragEvent) => void;
  onDragEnd?: () => void;
  isDragging?: boolean;
  isDragOver?: boolean;
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
  onDragOver,
  onDragLeave,
  onDrop,
  onDragEnd,
  isDragging = false,
  isDragOver = false,
  isArchived = false,
  isArchiving = false,
  isDeleting = false,
}: GoalCardProps) {
  const progress = calculateProgress(goal.current_value, goal.target_value);

  return (
    <div
      onClick={onSelect}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={cn(
        "flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all duration-200",
        isSelected
          ? "bg-blue-50 border-blue-200"
          : isArchived
          ? "bg-gray-50 border-gray-200 hover:bg-gray-100"
          : "bg-white border-gray-200 hover:bg-gray-50",
        isDragging && "opacity-50 scale-95",
        isDragOver && "bg-blue-100 border-blue-300 border-dashed"
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
        className={cn(
          "text-gray-400 transition-colors p-1 -m-1",
          isArchived 
            ? "cursor-default opacity-50" 
            : "cursor-move hover:text-gray-600",
          isDragging && "text-blue-500"
        )}
        draggable={!isArchived}
        onDragStart={!isArchived ? onDragStart : undefined}
        onDragEnd={!isArchived ? onDragEnd : undefined}
        onClick={(e) => e.stopPropagation()} // Prevent goal selection when clicking drag handle
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
  onCopy: () => void;
  isUpdating?: boolean;
  isArchiving?: boolean;
  isDeleting?: boolean;
  isCopying?: boolean;
}

function GoalDetails({
  goal,
  onUpdate,
  onArchive,
  onDelete,
  onCopy,
  isUpdating = false,
  isArchiving = false,
  isDeleting = false,
  isCopying = false,
}: GoalDetailsProps) {
  const progress = calculateProgress(goal.current_value, goal.target_value);
  const [showProgressForm, setShowProgressForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [progressValue, setProgressValue] = useState(goal.current_value.toString());
  const [progressNotes, setProgressNotes] = useState('');
  
  // Use the goal progress hook specifically for this goal
  const { addProgress, isAdding } = useGoalProgress(goal.id, 30);

  const handleAddProgress = (e: React.FormEvent) => {
    e.preventDefault();
    const value = parseFloat(progressValue);
    
    if (isNaN(value) || value < 0) {
      alert('Please enter a valid progress value');
      return;
    }

    addProgress({
      value,
      notes: progressNotes.trim() || undefined,
      recorded_at: new Date().toISOString(),
    }, {
      onSuccess: () => {
        setShowProgressForm(false);
        setProgressValue(value.toString());
        setProgressNotes('');
      },
    });
  };

  const handleEditGoal = (data: UpdateGoal) => {
    onUpdate(data);
    setShowEditForm(false);
  };

  return (
    <>
      {showEditForm ? (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <EditGoalForm
            goal={goal}
            onSubmit={handleEditGoal}
            onClose={() => setShowEditForm(false)}
            isLoading={isUpdating}
          />
        </div>
      ) : (
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

      {/* Progress Entry Form */}
      {showProgressForm && (
        <div className="border-t pt-4">
          <h4 className="text-sm font-medium mb-3">Add Progress Entry</h4>
          <form onSubmit={handleAddProgress} className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Current Value ({goal.unit})
              </label>
              <input
                type="number"
                step="0.01"
                value={progressValue}
                onChange={(e) => setProgressValue(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder={`Enter value in ${goal.unit}`}
                disabled={isAdding}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Notes (optional)
              </label>
              <textarea
                value={progressNotes}
                onChange={(e) => setProgressNotes(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={2}
                placeholder="Add any notes about this progress..."
                disabled={isAdding}
              />
            </div>
            <div className="flex space-x-2">
              <Button 
                type="submit" 
                size="sm" 
                disabled={isAdding}
                className="flex-1"
              >
                {isAdding ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Add Progress
                  </>
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={() => setShowProgressForm(false)}
                disabled={isAdding}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="flex space-x-2 pt-4 border-t">
        {!showProgressForm && (
          <Button 
            variant="default" 
            size="sm" 
            onClick={() => setShowProgressForm(true)}
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Add Progress
          </Button>
        )}
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowEditForm(true)}
          disabled={isUpdating}
        >
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
        <Button 
          variant="outline" 
          size="sm"
          onClick={onCopy}
          disabled={isCopying}
        >
          {isCopying ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Copy className="w-4 h-4 mr-2" />
          )}
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
      )}
    </>
  );
}

// Selected Goal Display Component (handles progress hooks safely)
interface SelectedGoalDisplayProps {
  goal: Goal;
  onUpdate: (data: UpdateGoal) => void;
  onArchive: () => void;
  onDelete: () => void;
  onCopy: (goal: Goal) => void;
  isUpdating: boolean;
  isArchiving: boolean;
  isDeleting: boolean;
  isCopying: boolean;
  generateMockProgressData: (goal: Goal) => any[];
}

function SelectedGoalDisplay({
  goal,
  onUpdate,
  onArchive,
  onDelete,
  onCopy,
  isUpdating,
  isArchiving,
  isDeleting,
  isCopying,
  generateMockProgressData,
}: SelectedGoalDisplayProps) {
  // This hook can be called safely here since this component only renders when goal exists
  const { 
    progress: goalProgressData, 
    isLoading: isLoadingProgress,
    isError: isProgressError
  } = useGoalProgress(goal.id, 30);

  // Generate progress data for charts (real data or fallback)
  const getProgressChartData = (goal: Goal) => {
    if (goalProgressData && goalProgressData.length > 0) {
      // Use real progress data
      return formatProgressForChart(goalProgressData, goal.unit);
    }
    
    // Fallback to mock data if no real progress data exists
    return generateMockProgressData(goal);
  };

  return (
    <div className="space-y-4">
      {/* Progress Chart */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{goal.name}</h3>
          <p className="text-sm text-gray-600">
            Progress Over Time
            {goalProgressData.length > 0 && (
              <span className="ml-2 text-green-600">
                ({goalProgressData.length} entries)
              </span>
            )}
          </p>
        </div>
        
        {isLoadingProgress ? (
          <div className="h-80 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="text-sm text-gray-600">Loading progress data...</span>
            </div>
          </div>
        ) : isProgressError ? (
          <div className="h-80 flex items-center justify-center">
            <div className="text-center">
              <AlertCircle className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Unable to load progress data</p>
            </div>
          </div>
        ) : (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsLineChart data={getProgressChartData(goal)}>
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
                  formatter={(value, name, props) => [
                    props.payload?.formattedValue || `${value} ${goal.unit}`,
                    "Value"
                  ]}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={goal.color || "#3b82f6"}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  name={goal.unit}
                />
              </RechartsLineChart>
            </ResponsiveContainer>
          </div>
        )}
        
        {goalProgressData.length === 0 && !isLoadingProgress && !isProgressError && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              No progress data yet. Add your first progress entry below!
            </p>
          </div>
        )}
      </div>

      {/* Goal Details */}
      <GoalDetails
        goal={goal}
        onUpdate={onUpdate}
        onArchive={onArchive}
        onDelete={onDelete}
        onCopy={() => onCopy(goal)}
        isUpdating={isUpdating}
        isArchiving={isArchiving}
        isDeleting={isDeleting}
        isCopying={isCopying}
      />
    </div>
  );
}

export default Goals;