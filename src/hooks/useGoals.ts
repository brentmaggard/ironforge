// src/hooks/useGoals.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner'; // or your preferred toast library
import { Goal, CreateGoal, UpdateGoal, GoalsResponse, GoalResponse } from '@/types/goals';

// API functions
async function fetchGoals(includeArchived = false): Promise<GoalsResponse> {
  const params = new URLSearchParams();
  if (includeArchived) {
    params.set('includeArchived', 'true');
  }
  
  const response = await fetch(`/api/goals?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch goals');
  }
  return response.json();
}

async function createGoal(goalData: CreateGoal): Promise<GoalResponse> {
  const response = await fetch('/api/goals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(goalData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create goal');
  }
  return response.json();
}

async function updateGoal(id: string, goalData: UpdateGoal): Promise<GoalResponse> {
  const response = await fetch(`/api/goals/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(goalData),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to update goal');
  }
  return response.json();
}

async function deleteGoal(id: string): Promise<{ success: boolean }> {
  const response = await fetch(`/api/goals/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to delete goal');
  }
  return response.json();
}

async function reorderGoals(goalIds: string[]): Promise<{ success: boolean }> {
  const response = await fetch('/api/goals', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'reorder', goalIds }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to reorder goals');
  }
  return response.json();
}

// Main hook
export function useGoals(includeArchived = false) {
  const queryClient = useQueryClient();
  const queryKey = ['goals', includeArchived];

  // Query for fetching goals
  const query = useQuery({
    queryKey,
    queryFn: () => fetchGoals(includeArchived),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });

  // Mutation for creating goals
  const createMutation = useMutation({
    mutationFn: createGoal,
    onSuccess: (data) => {
      queryClient.setQueryData<GoalsResponse>(queryKey, (old) => {
        if (!old) return { goals: [data.goal], total: 1 };
        return {
          goals: [...old.goals, data.goal],
          total: old.total + 1,
        };
      });
      toast.success('Goal created successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create goal');
    },
  });

  // Mutation for updating goals
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateGoal }) => updateGoal(id, data),
    onSuccess: (data) => {
      queryClient.setQueryData<GoalsResponse>(queryKey, (old) => {
        if (!old) return old;
        return {
          ...old,
          goals: old.goals.map(goal => 
            goal.id === data.goal.id ? data.goal : goal
          ),
        };
      });
      toast.success('Goal updated successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update goal');
    },
  });

  // Mutation for deleting goals
  const deleteMutation = useMutation({
    mutationFn: deleteGoal,
    onSuccess: (_, goalId) => {
      queryClient.setQueryData<GoalsResponse>(queryKey, (old) => {
        if (!old) return old;
        return {
          goals: old.goals.filter(goal => goal.id !== goalId),
          total: old.total - 1,
        };
      });
      toast.success('Goal deleted successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete goal');
    },
  });

  // Mutation for reordering goals
  const reorderMutation = useMutation({
    mutationFn: reorderGoals,
    onMutate: async (goalIds) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey });

      // Snapshot the previous value
      const previousGoals = queryClient.getQueryData<GoalsResponse>(queryKey);

      // Optimistically update to the new value
      if (previousGoals) {
        const reorderedGoals = goalIds.map(id => 
          previousGoals.goals.find(goal => goal.id === id)
        ).filter(Boolean) as Goal[];
        
        queryClient.setQueryData<GoalsResponse>(queryKey, {
          ...previousGoals,
          goals: reorderedGoals,
        });
      }

      return { previousGoals };
    },
    onError: (error, _, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousGoals) {
        queryClient.setQueryData(queryKey, context.previousGoals);
      }
      toast.error(error.message || 'Failed to reorder goals');
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey });
    },
  });

  // Mutation for archiving goals
  const archiveMutation = useMutation({
    mutationFn: (id: string) => updateGoal(id, { is_archived: true }),
    onSuccess: (data) => {
      // Update current query cache
      queryClient.setQueryData<GoalsResponse>(queryKey, (old) => {
        if (!old) return old;
        if (includeArchived) {
          return {
            ...old,
            goals: old.goals.map(goal => 
              goal.id === data.goal.id ? data.goal : goal
            ),
          };
        } else {
          // Remove from active goals if we're not including archived
          return {
            goals: old.goals.filter(goal => goal.id !== data.goal.id),
            total: old.total - 1,
          };
        }
      });

      // Also update the other query cache (includeArchived: true)
      const archivedQueryKey = ['goals', true];
      queryClient.setQueryData<GoalsResponse>(archivedQueryKey, (old) => {
        if (!old) return old;
        // Add to archived goals or update if already exists
        const existingIndex = old.goals.findIndex(goal => goal.id === data.goal.id);
        if (existingIndex >= 0) {
          return {
            ...old,
            goals: old.goals.map(goal => 
              goal.id === data.goal.id ? data.goal : goal
            ),
          };
        } else {
          return {
            goals: [...old.goals, data.goal],
            total: old.total + 1,
          };
        }
      });

      // Invalidate both queries to ensure fresh data
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      
      toast.success('Goal archived successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to archive goal');
    },
  });

  // Mutation for unarchiving goals
  const unarchiveMutation = useMutation({
    mutationFn: (id: string) => updateGoal(id, { is_archived: false }),
    onSuccess: (data) => {
      // Update current query cache
      queryClient.setQueryData<GoalsResponse>(queryKey, (old) => {
        if (!old) return old;
        if (includeArchived) {
          return {
            ...old,
            goals: old.goals.map(goal => 
              goal.id === data.goal.id ? data.goal : goal
            ),
          };
        } else {
          // Add to active goals if we're not including archived
          return {
            goals: [...old.goals, data.goal],
            total: old.total + 1,
          };
        }
      });

      // Also update the active goals cache (includeArchived: false)
      const activeQueryKey = ['goals', false];
      queryClient.setQueryData<GoalsResponse>(activeQueryKey, (old) => {
        if (!old) return old;
        // Add to active goals or update if already exists
        const existingIndex = old.goals.findIndex(goal => goal.id === data.goal.id);
        if (existingIndex >= 0) {
          return {
            ...old,
            goals: old.goals.map(goal => 
              goal.id === data.goal.id ? data.goal : goal
            ),
          };
        } else {
          return {
            goals: [...old.goals, data.goal],
            total: old.total + 1,
          };
        }
      });

      // Invalidate both queries to ensure fresh data
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      
      toast.success('Goal restored successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to restore goal');
    },
  });

  return {
    // Data
    goals: query.data?.goals || [],
    total: query.data?.total || 0,
    
    // Query state
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    
    // Actions
    createGoal: createMutation.mutate,
    updateGoal: updateMutation.mutate,
    deleteGoal: deleteMutation.mutate,
    archiveGoal: archiveMutation.mutate,
    unarchiveGoal: unarchiveMutation.mutate,
    reorderGoals: reorderMutation.mutate,
    
    // Mutation states
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isArchiving: archiveMutation.isPending,
    isUnarchiving: unarchiveMutation.isPending,
    isReordering: reorderMutation.isPending,
    
    // Refetch function
    refetch: query.refetch,
  };
}

// Hook for fetching exercises (for goal creation form)
export function useExercises() {
  return useQuery({
    queryKey: ['exercises'],
    queryFn: async (): Promise<{ exercises: any[] }> => {
      const response = await fetch('/api/exercises');
      if (!response.ok) {
        throw new Error('Failed to fetch exercises');
      }
      return response.json();
    },
    staleTime: 10 * 60 * 1000, // 10 minutes - exercises don't change often
  });
}

// Helper function to calculate progress percentage
export function calculateGoalProgress(current: number, target: number): number {
  if (target <= 0) return 0;
  return Math.min((current / target) * 100, 100);
}