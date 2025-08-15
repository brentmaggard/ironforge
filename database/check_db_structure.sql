-- Check if goal_progress table exists and view its structure
-- Run these queries in your Supabase SQL editor

-- 1. Check if goal_progress table exists
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'goal_progress';

-- 2. View goal_progress table structure
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default,
    character_maximum_length
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name = 'goal_progress'
ORDER BY ordinal_position;

-- 3. Check indexes on goal_progress table
SELECT 
    indexname,
    indexdef
FROM pg_indexes 
WHERE tablename = 'goal_progress'
AND schemaname = 'public';

-- 4. Check RLS policies on goal_progress table
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE tablename = 'goal_progress';

-- 5. Check if RLS is enabled on goal_progress table
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename = 'goal_progress'
AND schemaname = 'public';

-- 6. Check foreign key constraints
SELECT 
    tc.constraint_name,
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM 
    information_schema.table_constraints AS tc 
    JOIN information_schema.key_column_usage AS kcu
      ON tc.constraint_name = kcu.constraint_name
      AND tc.table_schema = kcu.table_schema
    JOIN information_schema.constraint_column_usage AS ccu
      ON ccu.constraint_name = tc.constraint_name
      AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY' 
AND tc.table_name='goal_progress';

-- 7. Check if goals table exists (prerequisite)
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name = 'goals';

-- 8. Test basic insert permissions (this will show if RLS is working)
-- Note: This will only work if you're logged in as a user
SELECT current_user, session_user;

-- 9. Check for any existing goal_progress data
SELECT COUNT(*) as total_progress_entries FROM goal_progress;

-- 10. Check goals table for context
SELECT 
    id,
    name,
    user_id,
    current_value,
    target_value,
    unit,
    created_at
FROM goals 
ORDER BY created_at DESC 
LIMIT 5;