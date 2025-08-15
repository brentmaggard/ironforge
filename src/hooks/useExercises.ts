// src/hooks/useExercises.ts
import { useQuery } from '@tanstack/react-query';
import { ExerciseFilters, ExercisesResponse, ExerciseSort } from '@/types/exercises';

interface UseExercisesOptions extends ExerciseFilters {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

export function useExercises(options: UseExercisesOptions = {}) {
  const {
    search = '',
    categories = [],
    equipment = [],
    muscles = [],
    bodyParts = [],
    difficultyMin = 1,
    difficultyMax = 5,
    isCompound,
    requiresSpotter,
    page = 1,
    limit = 50,
    sortBy = 'name',
    sortDirection = 'asc'
  } = options;

  return useQuery<ExercisesResponse>({
    queryKey: ['exercises', {
      search,
      categories: categories.join(','),
      equipment: equipment.join(','),
      muscles: muscles.join(','),
      bodyParts: bodyParts.join(','),
      difficultyMin,
      difficultyMax,
      isCompound,
      requiresSpotter,
      page,
      limit,
      sortBy,
      sortDirection
    }],
    queryFn: async () => {
      const params = new URLSearchParams();
      
      if (search) params.append('search', search);
      if (categories.length > 0) params.append('categories', categories.join(','));
      if (equipment.length > 0) params.append('equipment', equipment.join(','));
      if (muscles.length > 0) params.append('muscles', muscles.join(','));
      if (bodyParts.length > 0) params.append('bodyParts', bodyParts.join(','));
      if (difficultyMin > 1) params.append('difficultyMin', difficultyMin.toString());
      if (difficultyMax < 5) params.append('difficultyMax', difficultyMax.toString());
      if (isCompound !== undefined) params.append('isCompound', isCompound.toString());
      if (requiresSpotter !== undefined) params.append('requiresSpotter', requiresSpotter.toString());
      params.append('page', page.toString());
      params.append('limit', limit.toString());
      params.append('sortBy', sortBy);
      params.append('sortDirection', sortDirection);

      const response = await fetch(`/api/exercises?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch exercises: ${response.statusText}`);
      }
      
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
}