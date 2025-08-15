// src/app/api/exercises/route.ts
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

// GET /api/exercises - Fetch exercises with filtering and search
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
    const search = searchParams.get('search') || '';
    const categories = searchParams.get('categories')?.split(',').filter(Boolean) || [];
    const equipment = searchParams.get('equipment')?.split(',').filter(Boolean) || [];
    const muscles = searchParams.get('muscles')?.split(',').filter(Boolean) || [];
    const bodyParts = searchParams.get('bodyParts')?.split(',').filter(Boolean) || [];
    const difficultyMin = parseInt(searchParams.get('difficultyMin') || '1');
    const difficultyMax = parseInt(searchParams.get('difficultyMax') || '5');
    const isCompound = searchParams.get('isCompound');
    const requiresSpotter = searchParams.get('requiresSpotter');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const sortBy = searchParams.get('sortBy') || 'name';
    const sortDirection = searchParams.get('sortDirection') || 'asc';

    // Build query
    let query = supabase
      .from('exercises')
      .select('*')
      .eq('is_active', true);

    // Apply search filter
    if (search) {
      query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%,exercise_id.ilike.%${search}%`);
    }

    // Apply category filters
    if (categories.length > 0) {
      query = query.overlaps('exercise_types', categories);
    }

    // Apply equipment filters  
    if (equipment.length > 0) {
      query = query.overlaps('available_equipment', equipment);
    }

    // Apply muscle filters
    if (muscles.length > 0) {
      query = query.or(`primary_muscles.ov.{${muscles.join(',')}},secondary_muscles.ov.{${muscles.join(',')}}`);
    }

    // Apply body parts filters
    if (bodyParts.length > 0) {
      query = query.overlaps('body_parts', bodyParts);
    }

    // Apply difficulty filter
    if (difficultyMin > 1 || difficultyMax < 5) {
      query = query
        .gte('difficulty_level', difficultyMin)
        .lte('difficulty_level', difficultyMax);
    }

    // Apply compound filter
    if (isCompound !== null) {
      query = query.eq('is_compound', isCompound === 'true');
    }

    // Apply spotter filter
    if (requiresSpotter !== null) {
      query = query.eq('requires_spotter', requiresSpotter === 'true');
    }

    // Apply sorting
    const validSortFields = ['name', 'difficulty_level', 'created_at'];
    const sortField = validSortFields.includes(sortBy) ? sortBy : 'name';
    query = query.order(sortField, { ascending: sortDirection === 'asc' });

    // Apply pagination
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    query = query.range(from, to);

    const { data: exercises, error, count } = await query;

    if (error) {
      console.error('Error fetching exercises:', error);
      return NextResponse.json({ error: 'Failed to fetch exercises' }, { status: 500 });
    }

    // Fetch categories and equipment for filters
    const [categoriesResult, equipmentResult] = await Promise.all([
      supabase
        .from('exercise_categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order'),
      supabase
        .from('exercise_equipment')
        .select('*')
        .eq('is_active', true)
        .order('name')
    ]);

    return NextResponse.json({
      exercises: exercises || [],
      total: count || 0,
      page,
      limit,
      totalPages: Math.ceil((count || 0) / limit),
      categories: categoriesResult.data || [],
      equipment: equipmentResult.data || [],
    });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/exercises - Create a new exercise (admin only)
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // For now, allow any authenticated user to create exercises
    // Later this could be restricted to admins
    
    // Parse request body
    const body = await request.json();
    
    // Insert the new exercise
    const { data: exercise, error } = await supabase
      .from('exercises')
      .insert(body)
      .select()
      .single();

    if (error) {
      console.error('Error creating exercise:', error);
      return NextResponse.json({ error: 'Failed to create exercise' }, { status: 500 });
    }

    return NextResponse.json({ exercise }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}