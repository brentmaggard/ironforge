-- Goals table schema for IronForge
-- This file should be run in your Supabase instance

-- Create the goals table
CREATE TABLE IF NOT EXISTS goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  color VARCHAR(7) DEFAULT '#3b82f6', -- hex color code
  goal_type VARCHAR(20) NOT NULL CHECK (goal_type IN ('strength', 'endurance', 'weight_loss', 'weight_gain', 'consistency', 'custom')),
  exercise_id UUID, -- Optional reference to exercises table (if it exists)
  exercise_name VARCHAR(100), -- Optional exercise name for goals
  target_value DECIMAL(10,2) NOT NULL CHECK (target_value > 0),
  current_value DECIMAL(10,2) DEFAULT 0 CHECK (current_value >= 0),
  unit VARCHAR(20) NOT NULL,
  start_date DATE,
  target_date DATE,
  is_archived BOOLEAN DEFAULT FALSE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_goals_user_id ON goals(user_id);
CREATE INDEX idx_goals_user_archived ON goals(user_id, is_archived);
CREATE INDEX idx_goals_user_display_order ON goals(user_id, display_order);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
CREATE TRIGGER update_goals_updated_at
  BEFORE UPDATE ON goals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE goals ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can only see their own goals
CREATE POLICY "Users can view their own goals" ON goals
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own goals
CREATE POLICY "Users can insert their own goals" ON goals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own goals
CREATE POLICY "Users can update their own goals" ON goals
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own goals
CREATE POLICY "Users can delete their own goals" ON goals
  FOR DELETE USING (auth.uid() = user_id);

-- Optional: Create exercises table if it doesn't exist
-- This is a basic version - you can expand it later
CREATE TABLE IF NOT EXISTS exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL UNIQUE,
  category VARCHAR(50),
  muscle_groups TEXT[], -- Array of muscle group names
  instructions TEXT,
  equipment_needed TEXT[], -- Array of equipment names
  is_compound BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add some basic exercises
INSERT INTO exercises (name, category, muscle_groups, is_compound) VALUES
  ('Bench Press', 'chest', ARRAY['chest', 'triceps', 'shoulders'], true),
  ('Squat', 'legs', ARRAY['quadriceps', 'glutes', 'hamstrings'], true),
  ('Deadlift', 'back', ARRAY['hamstrings', 'glutes', 'erector_spinae', 'traps'], true),
  ('Overhead Press', 'shoulders', ARRAY['shoulders', 'triceps', 'core'], true),
  ('Pull-up', 'back', ARRAY['lats', 'rhomboids', 'biceps'], true),
  ('Barbell Row', 'back', ARRAY['lats', 'rhomboids', 'rear_delts'], true),
  ('Dumbbell Curl', 'arms', ARRAY['biceps'], false),
  ('Tricep Extension', 'arms', ARRAY['triceps'], false),
  ('Lateral Raise', 'shoulders', ARRAY['side_delts'], false),
  ('Calf Raise', 'legs', ARRAY['calves'], false)
ON CONFLICT (name) DO NOTHING;

-- Enable RLS for exercises table
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read exercises
CREATE POLICY "All users can view exercises" ON exercises
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create goal_progress table for tracking progress over time
CREATE TABLE IF NOT EXISTS goal_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  goal_id UUID NOT NULL REFERENCES goals(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  value DECIMAL(10,2) NOT NULL CHECK (value >= 0),
  notes TEXT,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_goal_progress_goal_id ON goal_progress(goal_id);
CREATE INDEX idx_goal_progress_user_id ON goal_progress(user_id);
CREATE INDEX idx_goal_progress_recorded_at ON goal_progress(recorded_at);
CREATE INDEX idx_goal_progress_goal_recorded ON goal_progress(goal_id, recorded_at);

-- Enable Row Level Security (RLS)
ALTER TABLE goal_progress ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for goal_progress
-- Users can only see their own goal progress
CREATE POLICY "Users can view their own goal progress" ON goal_progress
  FOR SELECT USING (auth.uid() = user_id);

-- Users can insert their own goal progress
CREATE POLICY "Users can insert their own goal progress" ON goal_progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can update their own goal progress
CREATE POLICY "Users can update their own goal progress" ON goal_progress
  FOR UPDATE USING (auth.uid() = user_id);

-- Users can delete their own goal progress
CREATE POLICY "Users can delete their own goal progress" ON goal_progress
  FOR DELETE USING (auth.uid() = user_id);

-- Sample goals data (optional - remove if you don't want sample data)
-- You can uncomment these if you want some sample goals for testing
/*
INSERT INTO goals (user_id, name, description, goal_type, target_value, current_value, unit, start_date, target_date) VALUES
  (auth.uid(), 'Bench Press 225lbs', 'Goal to bench press 225 pounds', 'strength', 225, 185, 'lbs', CURRENT_DATE, CURRENT_DATE + INTERVAL '6 months'),
  (auth.uid(), 'Run 5K in under 25 minutes', 'Improve cardiovascular endurance', 'endurance', 25, 30, 'minutes', CURRENT_DATE, CURRENT_DATE + INTERVAL '3 months'),
  (auth.uid(), 'Lose 20 pounds', 'Weight loss goal for better health', 'weight_loss', 20, 5, 'lbs', CURRENT_DATE, CURRENT_DATE + INTERVAL '4 months')
ON CONFLICT DO NOTHING;
*/