// src/app/api/exercises/route.ts
import { NextRequest, NextResponse } from 'next/server';
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

// GET /api/exercises - Fetch all exercises
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    
    // Check authentication
    const { user, error: authError } = await getAuthenticatedUser(supabase);
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get query parameters
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const category = searchParams.get('category');

    // Build query
    let query = supabase
      .from('exercises')
      .select('*')
      .order('name', { ascending: true });

    // Apply filters
    if (search) {
      query = query.ilike('name', `%${search}%`);
    }
    
    if (category) {
      query = query.eq('category', category);
    }

    const { data: exercises, error } = await query;

    if (error) {
      console.error('Error fetching exercises:', error);
      return NextResponse.json({ error: 'Failed to fetch exercises' }, { status: 500 });
    }

    return NextResponse.json({
      exercises: exercises || [],
      total: exercises?.length || 0,
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}