// src/app/api/goals/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { CreateGoalSchema, ReorderGoalsSchema } from '@/types/goals';
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

// GET /api/goals - Fetch all goals for the authenticated user
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const includeArchived = searchParams.get('includeArchived') === 'true';
    
    let query = supabase
      .from('goals')
      .select('*')
      .eq('user_id', user.id)
      .order('display_order', { ascending: true });

    if (!includeArchived) {
      query = query.eq('is_archived', false);
    }

    const { data: goals, error } = await query;

    if (error) {
      console.error('Error fetching goals:', error);
      return NextResponse.json({ error: 'Failed to fetch goals' }, { status: 500 });
    }

    return NextResponse.json({
      goals: goals || [],
      total: goals?.length || 0,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/goals - Create a new goal
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = CreateGoalSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json({
        error: 'Validation failed',
        details: validationResult.error.issues,
      }, { status: 400 });
    }

    const goalData = validationResult.data;

    // Get the next display order
    const { data: lastGoal } = await supabase
      .from('goals')
      .select('display_order')
      .eq('user_id', user.id)
      .eq('is_archived', false)
      .order('display_order', { ascending: false })
      .limit(1);

    const nextDisplayOrder = lastGoal && lastGoal.length > 0 
      ? lastGoal[0].display_order + 1 
      : 0;

    // Insert the new goal
    const { data: goal, error } = await supabase
      .from('goals')
      .insert({
        ...goalData,
        user_id: user.id,
        display_order: nextDisplayOrder,
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating goal:', error);
      return NextResponse.json({ error: 'Failed to create goal' }, { status: 500 });
    }

    return NextResponse.json({ goal }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/goals/reorder - Reorder goals
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse and validate request body
    const body = await request.json();
    
    // Check if this is a reorder request
    if (body.action === 'reorder') {
      const validationResult = ReorderGoalsSchema.safeParse(body);
      
      if (!validationResult.success) {
        return NextResponse.json({
          error: 'Validation failed',
          details: validationResult.error.issues,
        }, { status: 400 });
      }

      const { goalIds } = validationResult.data;

      // Update display_order for each goal
      const updatePromises = goalIds.map((goalId, index) =>
        supabase
          .from('goals')
          .update({ display_order: index })
          .eq('id', goalId)
          .eq('user_id', user.id)
      );

      const results = await Promise.all(updatePromises);
      
      // Check if any updates failed
      const failures = results.filter(result => result.error);
      if (failures.length > 0) {
        console.error('Some goal reorders failed:', failures);
        return NextResponse.json({ error: 'Failed to reorder some goals' }, { status: 500 });
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}