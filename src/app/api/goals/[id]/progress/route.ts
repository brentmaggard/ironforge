// src/app/api/goals/[id]/progress/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { z } from 'zod';

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

// Schema for creating progress entries
const CreateProgressSchema = z.object({
  value: z.number().min(0),
  notes: z.string().optional(),
  recorded_at: z.string().optional(), // ISO date string
});

// GET /api/goals/[id]/progress - Fetch progress history for a goal
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: goalId } = await params;
    const supabase = await createServerSupabaseClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify the goal belongs to the user
    const { data: goal, error: goalError } = await supabase
      .from('goals')
      .select('id, user_id')
      .eq('id', goalId)
      .eq('user_id', user.id)
      .single();

    if (goalError || !goal) {
      return NextResponse.json({ error: 'Goal not found' }, { status: 404 });
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');
    const limit = parseInt(searchParams.get('limit') || '100');

    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Fetch progress history
    let query = supabase
      .from('goal_progress')
      .select('*')
      .eq('goal_id', goalId)
      .eq('user_id', user.id)
      .gte('recorded_at', startDate.toISOString())
      .lte('recorded_at', endDate.toISOString())
      .order('recorded_at', { ascending: true });

    if (limit > 0) {
      query = query.limit(limit);
    }

    const { data: progressHistory, error } = await query;

    if (error) {
      console.error('Error fetching goal progress:', error);
      return NextResponse.json({ error: 'Failed to fetch progress history' }, { status: 500 });
    }

    return NextResponse.json({
      progress: progressHistory || [],
      total: progressHistory?.length || 0,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/goals/[id]/progress - Add a progress entry
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: goalId } = await params;
    const supabase = await createServerSupabaseClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Verify the goal belongs to the user
    const { data: goal, error: goalError } = await supabase
      .from('goals')
      .select('id, user_id, current_value')
      .eq('id', goalId)
      .eq('user_id', user.id)
      .single();

    if (goalError || !goal) {
      return NextResponse.json({ error: 'Goal not found' }, { status: 404 });
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = CreateProgressSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json({
        error: 'Validation failed',
        details: validationResult.error.issues,
      }, { status: 400 });
    }

    const progressData = validationResult.data;

    // Insert the progress entry
    const { data: progressEntry, error: insertError } = await supabase
      .from('goal_progress')
      .insert({
        goal_id: goalId,
        user_id: user.id,
        value: progressData.value,
        notes: progressData.notes,
        recorded_at: progressData.recorded_at || new Date().toISOString(),
      })
      .select()
      .single();

    if (insertError) {
      console.error('Error creating progress entry:', insertError);
      return NextResponse.json({ error: 'Failed to create progress entry' }, { status: 500 });
    }

    // Update the goal's current_value to the latest progress value
    const { error: updateError } = await supabase
      .from('goals')
      .update({ current_value: progressData.value })
      .eq('id', goalId)
      .eq('user_id', user.id);

    if (updateError) {
      console.error('Error updating goal current_value:', updateError);
      // Don't fail the request if this update fails, just log it
    }

    return NextResponse.json({ progress: progressEntry }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}