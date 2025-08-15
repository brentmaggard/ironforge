-- Enhanced Exercise Database Schema for IronForge
-- Based on Liftosaur exercise data structure

-- Drop existing exercises table and recreate with enhanced structure
DROP TABLE IF EXISTS exercises CASCADE;

-- Create enhanced exercises table
CREATE TABLE exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Core identification
  exercise_id VARCHAR(100) UNIQUE NOT NULL, -- "benchPress", "squat" 
  name VARCHAR(200) NOT NULL,               -- "Bench Press", "Squat"
  
  -- Equipment and setup
  default_equipment VARCHAR(50),            -- "barbell", "dumbbell", "bodyweight"
  available_equipment TEXT[],               -- ["barbell", "dumbbell", "smith_machine"]
  
  -- Exercise categorization
  exercise_types TEXT[],                    -- ["upper", "push"], ["lower", "quad"]
  primary_muscles TEXT[],                   -- ["chest", "triceps", "anterior_deltoid"]
  secondary_muscles TEXT[],                 -- ["core", "posterior_deltoid"]
  body_parts TEXT[],                        -- ["upper_body"], ["lower_body"]
  
  -- Default weights and progression
  starting_weight_lbs DECIMAL(6,2),        -- 135.00
  starting_weight_kg DECIMAL(6,2),         -- 60.00
  default_warmup_weight DECIMAL(6,2),      -- 45.00
  
  -- Instructions and media
  description TEXT,                         -- Detailed exercise description (markdown)
  instructions TEXT,                        -- Step-by-step instructions
  tips TEXT,                               -- Pro tips and common mistakes
  video_url VARCHAR(500),                  -- YouTube video URL or ID
  
  -- Images
  image_url_small VARCHAR(500),            -- Small preview image
  image_url_large VARCHAR(500),            -- Large detailed image
  has_custom_image BOOLEAN DEFAULT FALSE,  -- User uploaded custom image
  
  -- Difficulty and safety
  difficulty_level INTEGER CHECK (difficulty_level BETWEEN 1 AND 5), -- 1=beginner, 5=expert
  safety_rating INTEGER CHECK (safety_rating BETWEEN 1 AND 5),       -- 1=very safe, 5=requires spotter
  
  -- Exercise metadata
  is_compound BOOLEAN DEFAULT TRUE,         -- Compound vs isolation exercise
  is_unilateral BOOLEAN DEFAULT FALSE,      -- Single limb exercise
  requires_spotter BOOLEAN DEFAULT FALSE,   -- Needs spotting for safety
  
  -- System fields
  is_active BOOLEAN DEFAULT TRUE,           -- Can be disabled without deletion
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_exercises_exercise_id ON exercises(exercise_id);
CREATE INDEX idx_exercises_name ON exercises(name);
CREATE INDEX idx_exercises_equipment ON exercises USING GIN(available_equipment);
CREATE INDEX idx_exercises_types ON exercises USING GIN(exercise_types);
CREATE INDEX idx_exercises_muscles ON exercises USING GIN(primary_muscles);
CREATE INDEX idx_exercises_body_parts ON exercises USING GIN(body_parts);
CREATE INDEX idx_exercises_difficulty ON exercises(difficulty_level);
CREATE INDEX idx_exercises_compound ON exercises(is_compound);
CREATE INDEX idx_exercises_active ON exercises(is_active);

-- Update trigger for updated_at
CREATE TRIGGER update_exercises_updated_at
  BEFORE UPDATE ON exercises
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read exercises
CREATE POLICY "All users can view exercises" ON exercises
  FOR SELECT USING (auth.role() = 'authenticated');

-- Only admins can modify exercises (for now - could be expanded later)
CREATE POLICY "Only admins can modify exercises" ON exercises
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Create exercise categories reference table
CREATE TABLE exercise_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id VARCHAR(50) UNIQUE NOT NULL,  -- "push", "pull", "legs", "core"
  name VARCHAR(100) NOT NULL,               -- "Push", "Pull", "Legs", "Core"
  description TEXT,
  color VARCHAR(7) DEFAULT '#3b82f6',       -- Hex color for UI
  icon VARCHAR(50),                         -- Icon identifier
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert basic exercise categories
INSERT INTO exercise_categories (category_id, name, description, color, sort_order) VALUES
  ('push', 'Push', 'Pushing movements (chest, shoulders, triceps)', '#ef4444', 1),
  ('pull', 'Pull', 'Pulling movements (back, biceps)', '#3b82f6', 2),
  ('legs', 'Legs', 'Lower body exercises (quads, hamstrings, glutes)', '#22c55e', 3),
  ('core', 'Core', 'Core and abdominal exercises', '#f97316', 4),
  ('cardio', 'Cardio', 'Cardiovascular exercises', '#ec4899', 5),
  ('flexibility', 'Flexibility', 'Stretching and mobility exercises', '#8b5cf6', 6);

-- Enable RLS for categories
ALTER TABLE exercise_categories ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read categories
CREATE POLICY "All users can view exercise categories" ON exercise_categories
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create equipment reference table  
CREATE TABLE exercise_equipment (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  equipment_id VARCHAR(50) UNIQUE NOT NULL,  -- "barbell", "dumbbell", "bodyweight"
  name VARCHAR(100) NOT NULL,                -- "Barbell", "Dumbbell", "Bodyweight"
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert basic equipment types
INSERT INTO exercise_equipment (equipment_id, name, description) VALUES
  ('barbell', 'Barbell', 'Standard Olympic barbell exercises'),
  ('dumbbell', 'Dumbbell', 'Dumbbell exercises'),
  ('bodyweight', 'Bodyweight', 'No equipment required'),
  ('cable', 'Cable Machine', 'Cable machine exercises'),
  ('machine', 'Machine', 'Weight machine exercises'),
  ('kettlebell', 'Kettlebell', 'Kettlebell exercises'),
  ('resistance_band', 'Resistance Band', 'Band resistance exercises'),
  ('smith_machine', 'Smith Machine', 'Smith machine guided barbell'),
  ('pullup_bar', 'Pull-up Bar', 'Pull-up and hanging exercises'),
  ('bench', 'Bench', 'Bench-based exercises');

-- Enable RLS for equipment
ALTER TABLE exercise_equipment ENABLE ROW LEVEL SECURITY;

-- Allow all authenticated users to read equipment
CREATE POLICY "All users can view exercise equipment" ON exercise_equipment
  FOR SELECT USING (auth.role() = 'authenticated');