// src/components/goals/GoalsPage.tsx
'use client';

import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  GripVertical, 
  MoreVertical, 
  Archive, 
  Edit2, 
  Trash2,
  Target,
  Calendar,
  TrendingUp,
  X
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useGoals, useExercises, calculateGoalProgress } from '@/hooks/useGoals';
import { Goal, CreateGoal, GOAL_TYPE_OPTIONS, UNIT_OPTIONS, GOAL_COLORS } from '@/types/goals';
import { formatGoalValue } from '@/types/goals';
import { CreateGoalForm } from './CreateGoalForm';
import { cn } from '@/lib/utils';

export default function GoalsPage() {
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showArchived, setShowArchived] = useState(false);

  const { 
    goals, 
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
    isReordering
  } = useGoals(showArchived);

  // Filter active and archived goals
  const activeGoals = goals.filter(goal => !goal.is_archived);
  const archivedGoals = goals.filter(goal => goal.is_archived);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    if (sourceIndex === destinationIndex) return;

    // Reorder the goals array
    const reorderedGoals = Array.from(activeGoals);
    const [removed] = reorderedGoals.splice(sourceIndex, 1);
    reorderedGoals.splice(destinationIndex, 0, removed);

    // Get the new order of goal IDs
    const goalIds = reorderedGoals.map(goal => goal.id);
    reorderGoals(goalIds);
  };

  const handleCreateGoal = (goalData: CreateGoal) => {
    createGoal(goalData, {
      onSuccess: () => {
        setShowCreateForm(false);
      },
    });
  };

  const handleGoalAction = (goal: Goal, action: 'edit' | 'archive' | 'unarchive' | 'delete') => {
    switch (action) {
      case 'archive':
        archiveGoal(goal.id);
        if (selectedGoal?.id === goal.id) {
          setSelectedGoal(null);
        }
        break;
      case 'unarchive':
        unarchiveGoal(goal.id);
        break;
      case 'delete':
        if (confirm('Are you sure you want to delete this goal? This action cannot be undone.')) {
          deleteGoal(goal.id);
          if (selectedGoal?.id === goal.id) {
            setSelectedGoal(null);
          }
        }
        break;
      case 'edit':
        // TODO: Implement edit functionality
        console.log('Edit goal:', goal);
        break;
    }
  };

  const handleProgressUpdate = (goal: Goal, newValue: number) => {
    updateGoal({ 
      id: goal.id, 
      data: { current_value: newValue } 
    });
  };

  // Dummy progress data for the chart (replace with real data later)
  const getProgressChartData = (goal: Goal) => {
    const startDate = new Date(goal.start_date || goal.created_at || Date.now());
    const endDate = new Date(goal.target_date || Date.now());
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const progressPerDay = goal.target_value / Math.max(days, 1);
    
    return Array.from({ length: Math.min(days, 30) }, (_, i) => ({
      date: new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000).toLocaleDateString(),
      value: Math.min(progressPerDay * i, goal.current_value),
      target: progressPerDay * i,
    }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading goals...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-2">Failed to load goals</p>
          <p className="text-gray-600 text-sm">{error?.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex">
      {/* Goals List */}
      <div className={cn(
        "flex flex-col transition-all duration-300",
        showCreateForm ? "w-0 opacity-0 overflow-hidden" : "w-1/2 opacity-100"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Goals</h1>
            <p className="text-gray-600 mt-1">Track your fitness objectives</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowArchived(!showArchived)}
            >
              {showArchived ? 'Hide Archived' : 'Show Archived'}
            </Button>
            <Button onClick={() => setShowCreateForm(true)} disabled={isCreating}>
              <Plus className="w-4 h-4 mr-2" />
              New Goal
            </Button>
          </div>
        </div>

        {/* Active Goals */}
        {activeGoals.length > 0 && (
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Active Goals</h2>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="active-goals">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-3"
                  >
                    {activeGoals.map((goal, index) => (
                      <Draggable key={goal.id} draggableId={goal.id} index={index}>
                        {(provided, snapshot) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className={cn(
                              "cursor-pointer transition-all duration-200 hover:shadow-md",
                              selectedGoal?.id === goal.id && "ring-2 ring-blue-500",
                              snapshot.isDragging && "shadow-lg rotate-2"
                            )}
                            onClick={() => setSelectedGoal(goal)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center gap-3">
                                <div
                                  {...provided.dragHandleProps}
                                  className="text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <GripVertical className="w-4 h-4" />
                                </div>
                                
                                <div 
                                  className="w-3 h-3 rounded-full flex-shrink-0"
                                  style={{ backgroundColor: goal.color }}
                                />
                                
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <h3 className="font-medium text-gray-900 truncate">
                                      {goal.name}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm text-gray-600">
                                        {formatGoalValue(goal.current_value, goal.unit)} / {formatGoalValue(goal.target_value, goal.unit)}
                                      </span>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                          <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                                            <MoreVertical className="w-3 h-3" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuItem onClick={() => handleGoalAction(goal, 'edit')}>
                                            <Edit2 className="w-4 h-4 mr-2" />
                                            Edit
                                          </DropdownMenuItem>
                                          <DropdownMenuItem onClick={() => handleGoalAction(goal, 'archive')}>
                                            <Archive className="w-4 h-4 mr-2" />
                                            Archive
                                          </DropdownMenuItem>
                                          <DropdownMenuItem 
                                            onClick={() => handleGoalAction(goal, 'delete')}
                                            className="text-red-600"
                                          >
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            Delete
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </div>
                                  </div>
                                  
                                  <div className="mt-2">
                                    <Progress 
                                      value={calculateGoalProgress(goal.current_value, goal.target_value)} 
                                      className="h-2"
                                    />
                                  </div>
                                  
                                  <div className="flex items-center justify-between mt-2">
                                    <Badge variant="secondary">
                                      {GOAL_TYPE_OPTIONS.find(opt => opt.value === goal.goal_type)?.label}
                                    </Badge>
                                    <span className="text-xs text-gray-500">
                                      {Math.round(calculateGoalProgress(goal.current_value, goal.target_value))}%
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
        )}

        {/* Archived Goals */}
        {showArchived && archivedGoals.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-3">Archived Goals</h2>
            <div className="space-y-3">
              {archivedGoals.map((goal) => (
                <Card
                  key={goal.id}
                  className="opacity-60 cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => setSelectedGoal(goal)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: goal.color }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900 truncate">
                            {goal.name}
                          </h3>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                                <MoreVertical className="w-3 h-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleGoalAction(goal, 'unarchive')}>
                                <Archive className="w-4 h-4 mr-2" />
                                Restore
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleGoalAction(goal, 'delete')}
                                className="text-red-600"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <div className="mt-1">
                          <Progress 
                            value={calculateGoalProgress(goal.current_value, goal.target_value)} 
                            className="h-2"
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {activeGoals.length === 0 && !showArchived && (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <Target className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No goals yet</h3>
            <p className="text-gray-600 mb-4">Create your first fitness goal to start tracking progress</p>
            <Button onClick={() => setShowCreateForm(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Goal
            </Button>
          </div>
        )}
      </div>

      {/* Create Goal Form */}
      {showCreateForm && (
        <div className="w-full bg-white">
          <CreateGoalForm
            onSubmit={handleCreateGoal}
            onClose={() => setShowCreateForm(false)}
            isLoading={isCreating}
          />
        </div>
      )}

      {/* Goal Details */}
      {!showCreateForm && (
        <div className="w-1/2 pl-6">
          {selectedGoal ? (
            <div>
              {/* Goal Header */}
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: selectedGoal.color }}
                  />
                  <h2 className="text-xl font-bold text-gray-900">{selectedGoal.name}</h2>
                  <Badge variant="secondary">
                    {GOAL_TYPE_OPTIONS.find(opt => opt.value === selectedGoal.goal_type)?.label}
                  </Badge>
                </div>
                {selectedGoal.description && (
                  <p className="text-gray-600">{selectedGoal.description}</p>
                )}
              </div>

              {/* Progress Overview */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Progress Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-gray-700">Current Progress</span>
                        <span className="text-sm text-gray-600">
                          {Math.round(calculateGoalProgress(selectedGoal.current_value, selectedGoal.target_value))}%
                        </span>
                      </div>
                      <Progress 
                        value={calculateGoalProgress(selectedGoal.current_value, selectedGoal.target_value)} 
                        className="h-3"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">
                          {formatGoalValue(selectedGoal.current_value, selectedGoal.unit)}
                        </p>
                        <p className="text-sm text-gray-600">Current</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">
                          {formatGoalValue(selectedGoal.target_value, selectedGoal.unit)}
                        </p>
                        <p className="text-sm text-gray-600">Target</p>
                      </div>
                    </div>

                    {/* Quick Update Current Value */}
                    <div className="flex items-center gap-2 pt-4 border-t">
                      <span className="text-sm font-medium">Update progress:</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleProgressUpdate(selectedGoal, selectedGoal.current_value + 5)}
                      >
                        +5
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleProgressUpdate(selectedGoal, selectedGoal.current_value + 10)}
                      >
                        +10
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleProgressUpdate(selectedGoal, selectedGoal.current_value + 25)}
                      >
                        +25
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Goal Details */}
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Goal Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedGoal.exercise_name && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Exercise:</span>
                        <span className="font-medium">{selectedGoal.exercise_name}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Start Date:</span>
                      <span className="font-medium">
                        {selectedGoal.start_date 
                          ? new Date(selectedGoal.start_date).toLocaleDateString()
                          : 'Not set'
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Target Date:</span>
                      <span className="font-medium">
                        {selectedGoal.target_date 
                          ? new Date(selectedGoal.target_date).toLocaleDateString()
                          : 'Not set'
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Created:</span>
                      <span className="font-medium">
                        {new Date(selectedGoal.created_at || Date.now()).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Progress Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Progress Chart</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={getProgressChartData(selectedGoal)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke={selectedGoal.color} 
                          strokeWidth={3}
                          name="Current"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="target" 
                          stroke="#e5e7eb" 
                          strokeDasharray="5 5"
                          name="Target Pace"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <Target className="w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a goal</h3>
              <p className="text-gray-600">Choose a goal from the list to view details and progress</p>
            </div>
          )}
        </div>
      )}

      {/* Loading Overlay for Reordering */}
      {isReordering && (
        <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 shadow-lg">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-sm text-gray-600">Reordering goals...</p>
          </div>
        </div>
      )}
    </div>
  );
}