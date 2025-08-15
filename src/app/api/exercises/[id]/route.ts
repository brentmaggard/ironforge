// src/app/api/exercises/[id]/route.ts
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

// GET /api/exercises/[id] - Fetch single exercise
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createServerSupabaseClient();
    const resolvedParams = await params;
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch the exercise
    const { data: exercise, error } = await supabase
      .from('exercises')
      .select('*')
      .eq('id', resolvedParams.id)
      .eq('is_active', true)
      .single();

    if (error) {
      console.error('Error fetching exercise:', error);
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Exercise not found' }, { status: 404 });
      }
      return NextResponse.json({ error: 'Failed to fetch exercise' }, { status: 500 });
    }

    return NextResponse.json(exercise);
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}