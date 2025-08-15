// src/hooks/useGoalProgress.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { GoalProgress, CreateGoalProgress, GoalProgressResponse, CreateGoalProgressResponse } from '@/types/goals';

// API functions
async function fetchGoalProgress(goalId: string, days = 30): Promise<GoalProgressResponse> {
  const params = new URLSearchParams();
  params.set('days', days.toString());
  
  const response = await fetch(`/api/goals/${goalId}/progress?${params.toString()}`);
  if (!response.ok) {
    throw new Error('Failed to fetch goal progress');
  }
  return response.json();
}

async function createGoalProgress(goalId: string, progressData: Omit<CreateGoalProgress, 'goal_id'>): Promise<CreateGoalProgressResponse> {
  const response = await fetch(`/api/goals/${goalId}/progress`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...progressData,
      goal_id: goalId,
    }),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to create progress entry');
  }
  return response.json();
}

// Hook for managing goal progress
export function useGoalProgress(goalId: string, days = 30) {
  const queryClient = useQueryClient();
  const queryKey = ['goalProgress', goalId, days];

  // Query for fetching goal progress
  const query = useQuery({
    queryKey,
    queryFn: () => fetchGoalProgress(goalId, days),
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: false,
    enabled: !!goalId && goalId !== 'placeholder', // Only run query if valid goalId is provided
  });

  // Mutation for creating progress entries
  const createMutation = useMutation({
    mutationFn: (progressData: Omit<CreateGoalProgress, 'goal_id'>) => {
      if (!goalId || goalId === 'placeholder') {
        throw new Error('No goal selected');
      }
      return createGoalProgress(goalId, progressData);
    },
    onSuccess: (data) => {
      // Optimistically update the progress list
      queryClient.setQueryData<GoalProgressResponse>(queryKey, (old) => {
        if (!old) return { progress: [data.progress], total: 1 };
        
        // Insert the new progress entry in chronological order
        const newProgress = [...old.progress, data.progress].sort(
          (a, b) => new Date(a.recorded_at).getTime() - new Date(b.recorded_at).getTime()
        );
        
        return {
          progress: newProgress,
          total: newProgress.length,
        };
      });

      // Invalidate the goals query to update current_value
      queryClient.invalidateQueries({ queryKey: ['goals'] });
      
      toast.success('Progress updated successfully!');
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update progress');
    },
  });

  return {
    // Data
    progress: query.data?.progress || [],
    total: query.data?.total || 0,
    
    // Query state
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    
    // Actions
    addProgress: createMutation.mutate,
    
    // Mutation states
    isAdding: createMutation.isPending,
    
    // Refetch function
    refetch: query.refetch,
  };
}

// Helper function to format progress data for charts
export function formatProgressForChart(progress: GoalProgress[], unit: string) {
  return progress.map(entry => ({
    date: new Date(entry.recorded_at).toISOString().split('T')[0],
    value: entry.value,
    formattedValue: `${entry.value} ${unit}`,
    notes: entry.notes,
  }));
}

// Helper function to get progress statistics
export function getProgressStats(progress: GoalProgress[]) {
  if (progress.length === 0) {
    return {
      totalEntries: 0,
      firstEntry: null,
      lastEntry: null,
      trend: 'neutral' as const,
      changePercent: 0,
    };
  }

  const sortedProgress = [...progress].sort(
    (a, b) => new Date(a.recorded_at).getTime() - new Date(b.recorded_at).getTime()
  );

  const firstEntry = sortedProgress[0];
  const lastEntry = sortedProgress[sortedProgress.length - 1];
  
  const changePercent = firstEntry.value > 0 
    ? ((lastEntry.value - firstEntry.value) / firstEntry.value) * 100 
    : 0;

  let trend: 'up' | 'down' | 'neutral' = 'neutral';
  if (changePercent > 1) trend = 'up';
  else if (changePercent < -1) trend = 'down';

  return {
    totalEntries: progress.length,
    firstEntry,
    lastEntry,
    trend,
    changePercent,
  };
}