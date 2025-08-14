# Database Setup for IronForge Goals System

## Prerequisites
- Supabase project set up (local or hosted)
- Database access (either through Supabase dashboard or psql)

## Setup Steps

### 1. Run the Database Migration

**Option A: Using Supabase Dashboard**
1. Open your Supabase project dashboard
2. Go to the SQL Editor
3. Copy and paste the contents of `/database/goals_schema.sql`
4. Click "Run" to execute the migration

**Option B: Using psql command line**
```bash
# If using local Supabase
psql -h localhost -p 5432 -U postgres -d postgres -f database/goals_schema.sql

# If using hosted Supabase (replace with your connection details)
psql -h db.<your-project-ref>.supabase.co -p 5432 -U postgres -d postgres -f database/goals_schema.sql
```

### 2. Verify Tables Were Created

Run this query in your SQL editor to verify the tables exist:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('goals', 'exercises');
```

### 3. Check Row Level Security

Verify RLS policies are active:

```sql
SELECT schemaname, tablename, rowsecurity, hasrls 
FROM pg_tables 
WHERE tablename IN ('goals', 'exercises');
```

### 4. Test the API Endpoints

Once the database is set up, you can test the goals system:

1. Start your Next.js development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/goals` in your browser

3. Try creating a new goal to test the complete workflow

## Troubleshooting

### Issue: "relation does not exist" error
- Make sure you're connected to the correct database
- Verify the migration script ran successfully
- Check that you have the necessary permissions

### Issue: Authentication errors
- Ensure your Supabase environment variables are set correctly
- Verify your Supabase project URL and keys are valid
- Check that Row Level Security policies are properly configured

### Issue: Form validation errors
- Check browser console for detailed error messages
- Verify the zod schemas in `/src/types/goals.ts` match your expectations
- Ensure all required fields are provided

## Environment Variables

Make sure these are set in your `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Next Steps

After the database is set up:

1. Test goal creation, editing, and deletion
2. Test the drag-and-drop reordering functionality
3. Test archiving and restoring goals
4. Verify progress calculations are working correctly
5. Test the responsive design on mobile devices

## Adding Sample Data

If you want to add sample goals for testing, you can run this SQL:

```sql
-- Replace 'your-user-id' with an actual user ID from your auth.users table
INSERT INTO goals (user_id, name, description, goal_type, target_value, current_value, unit, start_date, target_date) VALUES
  ('your-user-id', 'Bench Press 225lbs', 'Goal to bench press 225 pounds', 'strength', 225, 185, 'lbs', CURRENT_DATE, CURRENT_DATE + INTERVAL '6 months'),
  ('your-user-id', 'Run 5K in under 25 minutes', 'Improve cardiovascular endurance', 'endurance', 25, 30, 'minutes', CURRENT_DATE, CURRENT_DATE + INTERVAL '3 months'),
  ('your-user-id', 'Lose 20 pounds', 'Weight loss goal for better health', 'weight_loss', 20, 5, 'lbs', CURRENT_DATE, CURRENT_DATE + INTERVAL '4 months');
```