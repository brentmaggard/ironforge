// src/components/goals/EditGoalForm.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { X, Target, Save } from 'lucide-react';
import { Goal, UpdateGoal, CreateGoalSchema, GOAL_TYPE_OPTIONS, UNIT_OPTIONS, GOAL_COLORS } from '@/types/goals';
import { useExercises } from '@/hooks/useGoals';
import { cn } from '@/lib/utils';

interface EditGoalFormProps {
  goal: Goal;
  onSubmit: (data: UpdateGoal) => void;
  onClose: () => void;
  isLoading?: boolean;
}

export function EditGoalForm({ goal, onSubmit, onClose, isLoading = false }: EditGoalFormProps) {
  const [selectedColor, setSelectedColor] = useState(goal.color || GOAL_COLORS[4]);
  const { exercises, isLoading: exercisesLoading } = useExercises();

  const form = useForm<UpdateGoal>({
    resolver: zodResolver(CreateGoalSchema.partial()),
    defaultValues: {
      name: goal.name,
      description: goal.description || '',
      color: goal.color || GOAL_COLORS[4],
      goal_type: goal.goal_type,
      exercise_name: goal.exercise_name || undefined,
      exercise_id: goal.exercise_id || undefined,
      target_value: goal.target_value,
      current_value: goal.current_value,
      unit: goal.unit,
      start_date: goal.start_date || '',
      target_date: goal.target_date || '',
      is_archived: goal.is_archived,
    },
  });

  const { register, handleSubmit, watch, setValue, formState: { errors } } = form;
  
  const goalType = watch('goal_type');
  const exerciseName = watch('exercise_name');

  // Update color when selectedColor changes
  useEffect(() => {
    setValue('color', selectedColor);
  }, [selectedColor, setValue]);

  const handleFormSubmit = (data: UpdateGoal) => {
    onSubmit(data);
  };

  const handleExerciseSelect = (exerciseId: string) => {
    const selectedExercise = exercises?.find(ex => ex.id === exerciseId);
    if (selectedExercise) {
      setValue('exercise_id', exerciseId);
      setValue('exercise_name', selectedExercise.name);
    }
  };

  const handleExerciseNameChange = (name: string) => {
    setValue('exercise_name', name);
    // Clear exercise_id when manually typing
    setValue('exercise_id', undefined);
  };

  const shouldShowExerciseField = goalType === 'strength' || goalType === 'endurance';

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Target className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Edit Goal</h2>
            <p className="text-sm text-gray-600">Update your goal details</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          disabled={isLoading}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Goal Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Goal Name *</Label>
          <Input
            id="name"
            {...register('name')}
            placeholder="e.g., Bench Press 225lbs"
            disabled={isLoading}
          />
          {errors.name && (
            <p className="text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            {...register('description')}
            placeholder="Optional description of your goal..."
            rows={3}
            disabled={isLoading}
          />
        </div>

        {/* Goal Type and Color Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Goal Type */}
          <div className="space-y-2">
            <Label>Goal Type *</Label>
            <Select
              value={goalType || undefined}
              onValueChange={(value) => setValue('goal_type', value as any)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select goal type" />
              </SelectTrigger>
              <SelectContent>
                {GOAL_TYPE_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <span className="flex items-center">
                      <span className="mr-2">{option.icon}</span>
                      {option.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Color Selection */}
          <div className="space-y-2">
            <Label>Color</Label>
            <div className="flex flex-wrap gap-2">
              {GOAL_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={cn(
                    "w-8 h-8 rounded-full border-2 border-gray-200 transition-all",
                    selectedColor === color && "ring-2 ring-offset-2 ring-blue-500"
                  )}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  disabled={isLoading}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Exercise Field (conditional) */}
        {shouldShowExerciseField && (
          <div className="space-y-2">
            <Label htmlFor="exercise">Exercise</Label>
            {exercisesLoading ? (
              <div className="text-sm text-gray-500">Loading exercises...</div>
            ) : (
              <div className="space-y-2">
                <Select
                  value={exerciseName || undefined}
                  onValueChange={handleExerciseSelect}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an exercise" />
                  </SelectTrigger>
                  <SelectContent>
                    {exercises?.map((exercise) => (
                      <SelectItem key={exercise.id} value={exercise.id}>
                        {exercise.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="text-xs text-gray-500">Or enter a custom exercise:</div>
                <Input
                  {...register('exercise_name')}
                  placeholder="Custom exercise name"
                  onChange={(e) => handleExerciseNameChange(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            )}
          </div>
        )}

        {/* Target and Current Values Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Target Value */}
          <div className="space-y-2">
            <Label htmlFor="target_value">Target Value *</Label>
            <Input
              id="target_value"
              type="number"
              step="0.01"
              {...register('target_value', { valueAsNumber: true })}
              placeholder="0"
              disabled={isLoading}
            />
            {errors.target_value && (
              <p className="text-sm text-red-600">{errors.target_value.message}</p>
            )}
          </div>

          {/* Current Value */}
          <div className="space-y-2">
            <Label htmlFor="current_value">Current Value</Label>
            <Input
              id="current_value"
              type="number"
              step="0.01"
              {...register('current_value', { valueAsNumber: true })}
              placeholder="0"
              disabled={isLoading}
            />
          </div>

          {/* Unit */}
          <div className="space-y-2">
            <Label>Unit *</Label>
            <Select
              value={watch('unit') || undefined}
              onValueChange={(value) => setValue('unit', value)}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select unit" />
              </SelectTrigger>
              <SelectContent>
                {UNIT_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Date Fields Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Start Date */}
          <div className="space-y-2">
            <Label htmlFor="start_date">Start Date</Label>
            <Input
              id="start_date"
              type="date"
              {...register('start_date')}
              disabled={isLoading}
            />
          </div>

          {/* Target Date */}
          <div className="space-y-2">
            <Label htmlFor="target_date">Target Date</Label>
            <Input
              id="target_date"
              type="date"
              {...register('target_date')}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-3 pt-6 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Updating...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Update Goal
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}