// src/app/api/debug/db-check/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Create Supabase client for server-side operations
async function createServerSupabaseClient() {
  const cookieStore = await cookies();
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        },
      },
    }
  );
}

// GET /api/debug/db-check - Check database structure and permissions
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    const results: any = {
      auth: {
        isAuthenticated: !authError && !!user,
        userId: user?.id || null,
        error: authError?.message || null,
      },
      tables: {},
      permissions: {},
    };

    if (!authError && user) {
      // Check if goal_progress table exists by trying to describe it
      try {
        const { data: goalProgressSchema, error: schemaError } = await supabase
          .from('goal_progress')
          .select('*')
          .limit(0);
        
        results.tables.goal_progress = {
          exists: !schemaError,
          error: schemaError?.message || null,
        };
      } catch (error) {
        results.tables.goal_progress = {
          exists: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }

      // Check if goals table exists
      try {
        const { data: goalsSchema, error: goalsSchemaError } = await supabase
          .from('goals')
          .select('*')
          .limit(0);
        
        results.tables.goals = {
          exists: !goalsSchemaError,
          error: goalsSchemaError?.message || null,
        };
      } catch (error) {
        results.tables.goals = {
          exists: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }

      // Check user's goals
      try {
        const { data: userGoals, error: goalsError } = await supabase
          .from('goals')
          .select('id, name, current_value, unit')
          .eq('user_id', user.id)
          .limit(5);
        
        results.userGoals = {
          count: userGoals?.length || 0,
          goals: userGoals || [],
          error: goalsError?.message || null,
        };
      } catch (error) {
        results.userGoals = {
          count: 0,
          goals: [],
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }

      // Check user's goal progress (if they have goals)
      if (results.userGoals.count > 0) {
        try {
          const firstGoalId = results.userGoals.goals[0].id;
          const { data: progressData, error: progressError } = await supabase
            .from('goal_progress')
            .select('*')
            .eq('goal_id', firstGoalId)
            .eq('user_id', user.id)
            .limit(5);
          
          results.goalProgress = {
            goalId: firstGoalId,
            count: progressData?.length || 0,
            entries: progressData || [],
            error: progressError?.message || null,
          };
        } catch (error) {
          results.goalProgress = {
            goalId: null,
            count: 0,
            entries: [],
            error: error instanceof Error ? error.message : 'Unknown error',
          };
        }
      }

      // Test permissions by attempting to query goal_progress
      try {
        const { data: permissionTest, error: permissionError } = await supabase
          .from('goal_progress')
          .select('id')
          .eq('user_id', user.id)
          .limit(1);
        
        results.permissions.goal_progress_select = {
          allowed: !permissionError,
          error: permissionError?.message || null,
        };
      } catch (error) {
        results.permissions.goal_progress_select = {
          allowed: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    }

    // Environment check
    results.environment = {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing',
      supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing',
    };

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('Debug check error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      }, 
      { status: 500 }
    );
  }
}