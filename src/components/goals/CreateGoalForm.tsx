// src/components/goals/CreateGoalForm.tsx
'use client';

import React, { useState } from 'react';
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
import { X, Target } from 'lucide-react';
import { CreateGoal, CreateGoalSchema, GOAL_TYPE_OPTIONS, UNIT_OPTIONS, GOAL_COLORS } from '@/types/goals';
import { useExercises } from '@/hooks/useGoals';
import { cn } from '@/lib/utils';

interface CreateGoalFormProps {
  onSubmit: (data: CreateGoal) => void;
  onClose: () => void;
  isLoading?: boolean;
}

export function CreateGoalForm({ onSubmit, onClose, isLoading = false }: CreateGoalFormProps) {
  const [selectedColor, setSelectedColor] = useState(GOAL_COLORS[4]); // blue-500 default
  const { exercises, isLoading: exercisesLoading } = useExercises();

  const form = useForm<CreateGoal>({
    resolver: zodResolver(CreateGoalSchema),
    defaultValues: {
      name: '',
      description: '',
      color: selectedColor,
      goal_type: 'strength',
      exercise_name: undefined,
      exercise_id: undefined,
      target_value: 0,
      current_value: 0,
      unit: 'lbs',
      start_date: new Date().toISOString().split('T')[0],
      target_date: '',
      is_archived: false,
      display_order: 0,
    },
  });

  const watchedGoalType = form.watch('goal_type');
  const watchedExerciseName = form.watch('exercise_name');

  const handleSubmit = (data: CreateGoal) => {
    onSubmit({
      ...data,
      color: selectedColor,
    });
  };

  const handleGoalTypeSelect = (goalType: string) => {
    form.setValue('goal_type', goalType as CreateGoal['goal_type']);
    
    // Auto-suggest units based on goal type
    switch (goalType) {
      case 'strength':
        form.setValue('unit', 'lbs');
        break;
      case 'endurance':
        form.setValue('unit', 'minutes');
        break;
      case 'weight_loss':
      case 'weight_gain':
        form.setValue('unit', 'lbs');
        break;
      case 'consistency':
        form.setValue('unit', 'sessions');
        break;
      default:
        break;
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <Target className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Create New Goal</h2>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="p-2 h-8 w-8"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Form */}
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex-1 flex flex-col">
        <div className="flex-1 space-y-6 overflow-y-auto">
          {/* Goal Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Goal Name *
            </Label>
            <Input
              id="name"
              placeholder="e.g., Bench Press 225lbs"
              {...form.register('name')}
              className={form.formState.errors.name ? 'border-red-500' : ''}
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-600">{form.formState.errors.name.message}</p>
            )}
          </div>

          {/* Goal Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Add details about your goal..."
              {...form.register('description')}
              rows={3}
            />
          </div>

          {/* Goal Type Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Goal Type *</Label>
            <div className="grid grid-cols-2 gap-2">
              {GOAL_TYPE_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleGoalTypeSelect(option.value)}
                  className={cn(
                    "flex items-center gap-2 p-3 rounded-lg border-2 transition-all",
                    watchedGoalType === option.value
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-200 hover:border-gray-300"
                  )}
                >
                  <span className="text-lg">{option.icon}</span>
                  <span className="font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Exercise Selection (for strength goals) */}
          {watchedGoalType === 'strength' && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Exercise (Optional)</Label>
              <Select
                value={watchedExerciseName || 'none'}
                onValueChange={(value) => {
                  if (value === 'none' || value === 'loading') {
                    form.setValue('exercise_name', '');
                    form.setValue('exercise_id', undefined);
                  } else {
                    const exercise = exercises?.exercises.find(ex => ex.name === value);
                    form.setValue('exercise_name', value);
                    form.setValue('exercise_id', exercise?.id);
                  }
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an exercise" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No specific exercise</SelectItem>
                  {exercisesLoading ? (
                    <SelectItem value="loading" disabled>Loading exercises...</SelectItem>
                  ) : (
                    exercises?.exercises.map((exercise) => (
                      <SelectItem key={exercise.id} value={exercise.name}>
                        {exercise.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Target and Current Values */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="target_value" className="text-sm font-medium">
                Target Value *
              </Label>
              <Input
                id="target_value"
                type="number"
                step="0.01"
                placeholder="0"
                {...form.register('target_value', { valueAsNumber: true })}
                className={form.formState.errors.target_value ? 'border-red-500' : ''}
              />
              {form.formState.errors.target_value && (
                <p className="text-sm text-red-600">{form.formState.errors.target_value.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="current_value" className="text-sm font-medium">
                Current Value
              </Label>
              <Input
                id="current_value"
                type="number"
                step="0.01"
                placeholder="0"
                {...form.register('current_value', { valueAsNumber: true })}
                className={form.formState.errors.current_value ? 'border-red-500' : ''}
              />
              {form.formState.errors.current_value && (
                <p className="text-sm text-red-600">{form.formState.errors.current_value.message}</p>
              )}
            </div>
          </div>

          {/* Unit Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Unit *</Label>
            <Select
              value={form.watch('unit') || 'lbs'}
              onValueChange={(value) => form.setValue('unit', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {UNIT_OPTIONS.map((unit) => (
                  <SelectItem key={unit.value} value={unit.value}>
                    {unit.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Color Selection */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Color</Label>
            <div className="flex gap-2 flex-wrap">
              {GOAL_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    "w-8 h-8 rounded-full border-2 transition-all",
                    selectedColor === color
                      ? "border-gray-900 scale-110"
                      : "border-gray-300 hover:border-gray-400"
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_date" className="text-sm font-medium">
                Start Date
              </Label>
              <Input
                id="start_date"
                type="date"
                {...form.register('start_date')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="target_date" className="text-sm font-medium">
                Target Date
              </Label>
              <Input
                id="target_date"
                type="date"
                {...form.register('target_date')}
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200 mt-6">
          <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Creating...
              </div>
            ) : (
              <>
                <Target className="w-4 h-4 mr-2" />
                Create Goal
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}