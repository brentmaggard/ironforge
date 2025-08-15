// src/types/exercises.ts
import { z } from 'zod';

// Core exercise schema
export const ExerciseSchema = z.object({
  id: z.string().uuid(),
  exercise_id: z.string().min(1, 'Exercise ID is required'),
  name: z.string().min(1, 'Exercise name is required'),
  
  // Equipment and setup
  default_equipment: z.string().optional(),
  available_equipment: z.array(z.string()).default([]),
  
  // Categorization
  exercise_types: z.array(z.string()).default([]),
  primary_muscles: z.array(z.string()).default([]),
  secondary_muscles: z.array(z.string()).default([]),
  body_parts: z.array(z.string()).default([]),
  
  // Weights and progression
  starting_weight_lbs: z.number().optional(),
  starting_weight_kg: z.number().optional(),
  default_warmup_weight: z.number().optional(),
  
  // Content
  description: z.string().optional(),
  instructions: z.string().optional(),
  tips: z.string().optional(),
  video_url: z.string().url().optional(),
  
  // Images
  image_url_small: z.string().url().optional(),
  image_url_large: z.string().url().optional(),
  has_custom_image: z.boolean().default(false),
  
  // Metadata
  difficulty_level: z.number().min(1).max(5).optional(),
  safety_rating: z.number().min(1).max(5).optional(),
  is_compound: z.boolean().default(true),
  is_unilateral: z.boolean().default(false),
  requires_spotter: z.boolean().default(false),
  is_active: z.boolean().default(true),
  
  // Timestamps
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export const CreateExerciseSchema = ExerciseSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

export const UpdateExerciseSchema = CreateExerciseSchema.partial();

export type Exercise = z.infer<typeof ExerciseSchema>;
export type CreateExercise = z.infer<typeof CreateExerciseSchema>;
export type UpdateExercise = z.infer<typeof UpdateExerciseSchema>;

// Exercise category schema
export const ExerciseCategorySchema = z.object({
  id: z.string().uuid(),
  category_id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i).default('#3b82f6'),
  icon: z.string().optional(),
  sort_order: z.number().default(0),
  is_active: z.boolean().default(true),
  created_at: z.string().optional(),
});

export type ExerciseCategory = z.infer<typeof ExerciseCategorySchema>;

// Exercise equipment schema
export const ExerciseEquipmentSchema = z.object({
  id: z.string().uuid(),
  equipment_id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  is_active: z.boolean().default(true),
  created_at: z.string().optional(),
});

export type ExerciseEquipment = z.infer<typeof ExerciseEquipmentSchema>;

// Exercise filter and search types
export interface ExerciseFilters {
  search?: string;
  categories?: string[];
  equipment?: string[];
  muscles?: string[];
  bodyParts?: string[];
  difficultyMin?: number;
  difficultyMax?: number;
  isCompound?: boolean;
  requiresSpotter?: boolean;
}

export interface ExerciseSort {
  field: 'name' | 'difficulty_level' | 'created_at';
  direction: 'asc' | 'desc';
}

// API response types
export interface ExercisesResponse {
  exercises: Exercise[];
  total: number;
  categories: ExerciseCategory[];
  equipment: ExerciseEquipment[];
}

export interface ExerciseResponse {
  exercise: Exercise;
}

// Exercise constants for UI
export const DIFFICULTY_LEVELS = [
  { value: 1, label: 'Beginner', color: '#22c55e' },
  { value: 2, label: 'Easy', color: '#84cc16' },
  { value: 3, label: 'Intermediate', color: '#eab308' },
  { value: 4, label: 'Advanced', color: '#f97316' },
  { value: 5, label: 'Expert', color: '#ef4444' },
] as const;

export const SAFETY_RATINGS = [
  { value: 1, label: 'Very Safe', color: '#22c55e' },
  { value: 2, label: 'Safe', color: '#84cc16' },
  { value: 3, label: 'Moderate', color: '#eab308' },
  { value: 4, label: 'Requires Caution', color: '#f97316' },
  { value: 5, label: 'Requires Spotter', color: '#ef4444' },
] as const;

export const BODY_PARTS = [
  'upper_body',
  'lower_body', 
  'core',
  'full_body'
] as const;

export const COMMON_MUSCLES = [
  // Upper body
  'chest', 'triceps', 'shoulders', 'anterior_deltoid', 'posterior_deltoid',
  'lats', 'rhomboids', 'rear_delts', 'biceps', 'forearms',
  
  // Lower body  
  'quadriceps', 'hamstrings', 'glutes', 'calves', 'tibialis',
  
  // Core
  'abs', 'obliques', 'lower_back', 'erector_spinae',
] as const;

// Helper functions
export function getDifficultyLevel(level?: number) {
  return DIFFICULTY_LEVELS.find(d => d.value === level) || DIFFICULTY_LEVELS[0];
}

export function getSafetyRating(rating?: number) {
  return SAFETY_RATINGS.find(s => s.value === rating) || SAFETY_RATINGS[0];
}

export function formatMuscleGroups(muscles: string[]): string {
  return muscles.map(muscle => 
    muscle.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  ).join(', ');
}