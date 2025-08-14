// src/app/api/goals/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { UpdateGoalSchema } from '@/types/goals';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { getAuthenticatedUser } from '@/lib/auth/testing';

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

// GET /api/goals/[id] - Fetch a specific goal
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const supabase = await createServerSupabaseClient();
    
    // Check authentication
    const { user, error: authError } = await getAuthenticatedUser(supabase);
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: goal, error } = await supabase
      .from('goals')
      .select('*')
      .eq('id', id)
      .eq('user_id', user.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Goal not found' }, { status: 404 });
      }
      console.error('Error fetching goal:', error);
      return NextResponse.json({ error: 'Failed to fetch goal' }, { status: 500 });
    }

    return NextResponse.json({ goal });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PATCH /api/goals/[id] - Update a specific goal
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const supabase = await createServerSupabaseClient();
    
    // Check authentication
    const { user, error: authError } = await getAuthenticatedUser(supabase);
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Parse and validate request body
    const body = await request.json();
    const validationResult = UpdateGoalSchema.safeParse(body);
    
    if (!validationResult.success) {
      return NextResponse.json({
        error: 'Validation failed',
        details: validationResult.error.issues,
      }, { status: 400 });
    }

    const updateData = validationResult.data;

    // Update the goal
    const { data: goal, error } = await supabase
      .from('goals')
      .update(updateData)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Goal not found' }, { status: 404 });
      }
      console.error('Error updating goal:', error);
      return NextResponse.json({ error: 'Failed to update goal' }, { status: 500 });
    }

    return NextResponse.json({ goal });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// DELETE /api/goals/[id] - Delete a specific goal
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const supabase = await createServerSupabaseClient();
    
    // Check authentication
    const { user, error: authError } = await getAuthenticatedUser(supabase);
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Delete the goal
    const { error } = await supabase
      .from('goals')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting goal:', error);
      return NextResponse.json({ error: 'Failed to delete goal' }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}