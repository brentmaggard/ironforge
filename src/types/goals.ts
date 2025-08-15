// src/types/goals.ts
import { z } from 'zod';

export const GoalType = z.enum(['strength', 'endurance', 'weight_loss', 'weight_gain', 'consistency', 'custom']);
export type GoalType = z.infer<typeof GoalType>;

export const GoalSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  name: z.string().min(1, 'Goal name is required').max(100, 'Goal name must be less than 100 characters'),
  description: z.string().optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Invalid color format').default('#3b82f6'),
  goal_type: GoalType,
  exercise_id: z.string().uuid().optional(),
  exercise_name: z.string().optional(),
  target_value: z.number().positive('Target value must be positive'),
  current_value: z.number().min(0, 'Current value cannot be negative').default(0),
  unit: z.string().min(1, 'Unit is required'),
  start_date: z.string().optional(), // ISO date string
  target_date: z.string().optional(), // ISO date string
  is_archived: z.boolean().default(false),
  display_order: z.number().int().min(0).default(0),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export const CreateGoalSchema = GoalSchema.omit({
  id: true,
  user_id: true,
  created_at: true,
  updated_at: true,
});

export const UpdateGoalSchema = CreateGoalSchema.partial();

export const ReorderGoalsSchema = z.object({
  goalIds: z.array(z.string().uuid()).min(1, 'At least one goal ID is required'),
});

export type Goal = z.infer<typeof GoalSchema>;
export type CreateGoal = z.infer<typeof CreateGoalSchema>;
export type UpdateGoal = z.infer<typeof UpdateGoalSchema>;

// Exercise type for goal selection
export const ExerciseSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  category: z.string().optional(),
  muscle_groups: z.array(z.string()).optional(),
});

export type Exercise = z.infer<typeof ExerciseSchema>;

// Goal Progress types
export const GoalProgressSchema = z.object({
  id: z.string().uuid(),
  goal_id: z.string().uuid(),
  user_id: z.string().uuid(),
  value: z.number().min(0, 'Progress value cannot be negative'),
  notes: z.string().optional(),
  recorded_at: z.string(), // ISO date string
  created_at: z.string().optional(),
});

export const CreateGoalProgressSchema = GoalProgressSchema.omit({
  id: true,
  user_id: true,
  created_at: true,
});

export type GoalProgress = z.infer<typeof GoalProgressSchema>;
export type CreateGoalProgress = z.infer<typeof CreateGoalProgressSchema>;

// Goal type options for the UI
export const GOAL_TYPE_OPTIONS = [
  { value: 'strength' as const, label: 'Strength', icon: '💪' },
  { value: 'endurance' as const, label: 'Endurance', icon: '🏃' },
  { value: 'weight_loss' as const, label: 'Weight Loss', icon: '⬇️' },
  { value: 'weight_gain' as const, label: 'Weight Gain', icon: '⬆️' },
  { value: 'consistency' as const, label: 'Consistency', icon: '📅' },
  { value: 'custom' as const, label: 'Custom', icon: '🎯' },
] as const;

// Common units for different goal types
export const UNIT_OPTIONS = [
  { label: 'Pounds (lbs)', value: 'lbs' },
  { label: 'Kilograms (kg)', value: 'kg' },
  { label: 'Repetitions', value: 'reps' },
  { label: 'Minutes', value: 'minutes' },
  { label: 'Sessions', value: 'sessions' },
  { label: 'Days', value: 'days' },
  { label: 'Miles', value: 'miles' },
  { label: 'Kilometers', value: 'km' },
  { label: 'Percentage (%)', value: 'percent' },
] as const;

// Color options for goals
export const GOAL_COLORS = [
  '#ef4444', // red-500
  '#f97316', // orange-500
  '#eab308', // yellow-500
  '#22c55e', // green-500
  '#3b82f6', // blue-500
  '#6366f1', // indigo-500
  '#8b5cf6', // violet-500
  '#ec4899', // pink-500
  '#06b6d4', // cyan-500
  '#84cc16', // lime-500
] as const;

// API response types
export interface GoalsResponse {
  goals: Goal[];
  total: number;
}

export interface GoalResponse {
  goal: Goal;
}

export interface GoalProgressResponse {
  progress: GoalProgress[];
  total: number;
}

export interface CreateGoalProgressResponse {
  progress: GoalProgress;
}

// Helper function to calculate goal progress
export function calculateProgress(current: number, target: number): number {
  if (target <= 0) return 0;
  return Math.min((current / target) * 100, 100);
}

// Helper function to format goal values
export function formatGoalValue(value: number, unit: string): string {
  switch (unit) {
    case 'lbs':
    case 'kg':
      return `${value} ${unit}`;
    case 'reps':
      return `${value} reps`;
    case 'minutes':
      return `${value} min`;
    case 'sessions':
      return `${value} sessions`;
    case 'days':
      return `${value} days`;
    case 'miles':
      return `${value} mi`;
    case 'km':
      return `${value} km`;
    case 'percent':
      return `${value}%`;
    default:
      return `${value} ${unit}`;
  }
}