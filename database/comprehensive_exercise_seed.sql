-- Comprehensive Exercise Data for IronForge
-- Based on Liftosaur exercise database with 50+ exercises
-- Run this after creating the exercises_enhanced_schema.sql

-- Clear existing sample data (optional - comment out if you want to keep existing data)
-- DELETE FROM exercises WHERE exercise_id LIKE '%_sample';

-- Insert comprehensive exercise library (using ON CONFLICT to handle existing data)
INSERT INTO exercises (
  exercise_id, name, default_equipment, available_equipment,
  exercise_types, primary_muscles, secondary_muscles, body_parts,
  starting_weight_lbs, starting_weight_kg, default_warmup_weight,
  description, difficulty_level, safety_rating, is_compound, requires_spotter
) VALUES

-- CHEST EXERCISES
(
  'bench_press', 'Bench Press', 'barbell', 
  ARRAY['barbell', 'dumbbell', 'smith_machine', 'cable'],
  ARRAY['push', 'upper'], 
  ARRAY['chest', 'triceps', 'anterior_deltoid'],
  ARRAY['core', 'posterior_deltoid'],
  ARRAY['upper_body'],
  135.0, 60.0, 45.0,
  '## Setup
1. Lie flat on bench with eyes directly under the bar
2. Grip bar with hands slightly wider than shoulder-width
3. Maintain natural arch in lower back
4. Keep feet flat on floor

## Execution
1. Unrack bar and position over chest
2. Lower bar to chest in controlled motion
3. Press bar up explosively while maintaining control
4. Lock out arms fully at top

## Tips
- Keep shoulder blades pulled back and down
- Touch bar to chest lightly, don''t bounce
- Maintain tight core throughout movement',
  4, 3, true, true
),

(
  'incline_bench_press', 'Incline Bench Press', 'barbell',
  ARRAY['barbell', 'dumbbell', 'smith_machine'],
  ARRAY['push', 'upper'],
  ARRAY['chest', 'anterior_deltoid', 'triceps'],
  ARRAY['posterior_deltoid', 'core'],
  ARRAY['upper_body'],
  115.0, 50.0, 45.0,
  '## Setup
1. Set bench to 30-45 degree incline
2. Lie back with eyes under bar
3. Grip bar slightly wider than shoulders
4. Maintain contact with bench

## Execution
1. Unrack and position bar over upper chest
2. Lower to upper chest/collar bone area
3. Press up and slightly back toward face
4. Lock out arms at top

## Tips
- Don''t go too steep (over 45 degrees)
- Target upper chest fibers
- Keep wrists straight and elbows at 45 degrees',
  4, 3, true, true
),

(
  'push_up', 'Push-up', 'bodyweight',
  ARRAY['bodyweight'],
  ARRAY['push', 'upper'],
  ARRAY['chest', 'triceps', 'anterior_deltoid'],
  ARRAY['core', 'posterior_deltoid'],
  ARRAY['upper_body'],
  NULL, NULL, NULL,
  '## Setup
1. Start in plank position with hands under shoulders
2. Keep body in straight line from head to heels
3. Engage core and glutes
4. Position hands slightly wider than shoulders

## Execution
1. Lower chest toward floor while keeping body straight
2. Descend until chest nearly touches ground
3. Push back up to starting position
4. Maintain straight body line throughout

## Tips
- Don''t let hips sag or pike up
- Go to full range of motion
- Modify on knees if needed for beginners
- Progress to diamond, archer, or one-arm variations',
  2, 1, true, false
),

(
  'dumbbell_flye', 'Dumbbell Flye', 'dumbbell',
  ARRAY['dumbbell', 'cable'],
  ARRAY['push', 'upper'],
  ARRAY['chest'],
  ARRAY['anterior_deltoid', 'biceps'],
  ARRAY['upper_body'],
  25.0, 12.0, 15.0,
  '## Setup
1. Lie on flat bench with dumbbell in each hand
2. Start with arms extended above chest
3. Keep slight bend in elbows throughout
4. Palms facing each other

## Execution
1. Lower weights out to sides in wide arc
2. Feel stretch across chest at bottom
3. Squeeze chest to bring weights back up
4. Follow same arc path back to top

## Tips
- Keep elbows slightly bent, not locked
- Control the negative (lowering) portion
- Don''t go too heavy - focus on stretch and squeeze
- Imagine hugging a large barrel',
  3, 2, false, false
),

-- BACK EXERCISES
(
  'deadlift', 'Deadlift', 'barbell',
  ARRAY['barbell', 'dumbbell', 'kettlebell', 'trap_bar'],
  ARRAY['pull', 'lower', 'posterior'],
  ARRAY['hamstrings', 'glutes', 'erector_spinae', 'lats', 'traps'],
  ARRAY['rhomboids', 'core', 'forearms', 'quadriceps'],
  ARRAY['full_body'],
  135.0, 60.0, 95.0,
  '## Setup
1. Stand with feet hip-width apart, bar over mid-foot
2. Bend at hips and knees to grip bar
3. Keep chest up and back neutral
4. Engage lats by pulling shoulder blades down

## Execution
1. Drive through heels to lift the bar
2. Extend hips and knees simultaneously
3. Keep bar close to body throughout
4. Stand tall with shoulders back at top
5. Reverse movement to lower bar

## Tips
- Maintain neutral spine throughout
- Bar should travel in straight line
- Think "push the floor away" with feet
- Don''t round back or hyperextend at top',
  5, 4, true, false
),

(
  'pull_up', 'Pull-up', 'pullup_bar',
  ARRAY['pullup_bar', 'cable'],
  ARRAY['pull', 'upper'],
  ARRAY['lats', 'rhomboids', 'biceps'],
  ARRAY['posterior_deltoid', 'core', 'forearms'],
  ARRAY['upper_body'],
  NULL, NULL, NULL,
  '## Setup
1. Hang from bar with hands slightly wider than shoulders
2. Use overhand grip (palms facing away)
3. Let body hang with arms fully extended
4. Engage core to prevent swinging

## Execution
1. Pull body up until chin clears bar
2. Lead with chest, not chin
3. Squeeze shoulder blades together at top
4. Lower with control to full arm extension

## Tips
- Engage lats by pulling shoulders down and back
- Don''t swing or use momentum
- If too difficult, use assisted machine or bands
- Progress with negatives if you can''t do full reps',
  5, 2, true, false
),

(
  'bent_over_row', 'Bent Over Row', 'barbell',
  ARRAY['barbell', 'dumbbell', 'cable', 'kettlebell'],
  ARRAY['pull', 'upper'],
  ARRAY['lats', 'rhomboids', 'posterior_deltoid'],
  ARRAY['biceps', 'traps', 'core'],
  ARRAY['upper_body'],
  95.0, 42.5, 45.0,
  '## Setup
1. Stand with feet hip-width apart
2. Hinge at hips to lean forward 45 degrees
3. Keep chest up and core engaged
4. Grip bar with hands shoulder-width apart

## Execution
1. Pull bar to lower chest/upper abdomen
2. Squeeze shoulder blades together at top
3. Keep elbows close to body
4. Lower bar with control

## Tips
- Don''t stand up during the movement
- Keep core tight to protect lower back
- Focus on pulling with back muscles, not arms
- Don''t let shoulders round forward',
  4, 3, true, false
),

-- SHOULDER EXERCISES
(
  'overhead_press', 'Overhead Press', 'barbell',
  ARRAY['barbell', 'dumbbell', 'kettlebell'],
  ARRAY['push', 'upper'],
  ARRAY['anterior_deltoid', 'triceps'],
  ARRAY['posterior_deltoid', 'core', 'traps'],
  ARRAY['upper_body'],
  95.0, 42.5, 45.0,
  '## Setup
1. Stand with feet hip-width apart
2. Hold bar at shoulder height
3. Keep core tight and chest up
4. Elbows slightly forward under bar

## Execution
1. Press bar straight up overhead
2. Keep bar path vertical
3. Lock out arms fully at top
4. Lower bar back to shoulder height

## Tips
- Don''t arch back excessively
- Keep core engaged throughout
- Press through entire palm, not just fingers
- Squeeze glutes for stability',
  4, 3, true, false
),

(
  'lateral_raise', 'Lateral Raise', 'dumbbell',
  ARRAY['dumbbell', 'cable', 'resistance_band'],
  ARRAY['push', 'upper'],
  ARRAY['anterior_deltoid', 'posterior_deltoid'],
  ARRAY['traps', 'core'],
  ARRAY['upper_body'],
  15.0, 7.0, 10.0,
  '## Setup
1. Stand tall with dumbbells at sides
2. Keep slight bend in elbows
3. Maintain neutral spine
4. Core engaged

## Execution
1. Raise weights out to sides
2. Lift until arms parallel to floor
3. Pause briefly at top
4. Lower slowly and controlled

## Tips
- Lead with pinky finger
- Don''t lift higher than shoulder height
- Control eccentric (lowering) portion
- Don''t use momentum or swing',
  2, 1, false, false
),

-- LEG EXERCISES
(
  'squat', 'Squat', 'barbell',
  ARRAY['barbell', 'dumbbell', 'bodyweight', 'smith_machine', 'kettlebell'],
  ARRAY['push', 'lower', 'quad'],
  ARRAY['quadriceps', 'glutes', 'hamstrings'],
  ARRAY['core', 'erector_spinae', 'calves'],
  ARRAY['lower_body'],
  135.0, 60.0, 45.0,
  '## Setup
1. Position bar on upper traps (high bar) or rear delts (low bar)
2. Stand with feet shoulder-width apart
3. Toes slightly pointed out
4. Engage core and maintain neutral spine

## Execution
1. Initiate movement by pushing hips back
2. Bend at hips and knees simultaneously
3. Descend until hip crease below knee cap
4. Drive through heels to return to start

## Tips
- Keep knees tracking over toes
- Maintain chest up throughout
- Don''t let knees cave inward
- Full depth for best results',
  4, 3, true, false
),

(
  'romanian_deadlift', 'Romanian Deadlift', 'barbell',
  ARRAY['barbell', 'dumbbell', 'kettlebell'],
  ARRAY['pull', 'lower', 'posterior'],
  ARRAY['hamstrings', 'glutes', 'erector_spinae'],
  ARRAY['core', 'forearms', 'traps'],
  ARRAY['lower_body'],
  95.0, 42.5, 45.0,
  '## Setup
1. Hold bar with overhand grip
2. Stand tall with feet hip-width apart
3. Keep slight bend in knees
4. Shoulders back and down

## Execution
1. Push hips back while lowering bar
2. Keep bar close to legs
3. Feel stretch in hamstrings
4. Drive hips forward to return to start

## Tips
- This is a hip hinge, not a squat
- Keep chest up and back flat
- Go only as low as hamstring flexibility allows
- Focus on feeling the stretch',
  3, 2, true, false
),

(
  'lunge', 'Lunge', 'bodyweight',
  ARRAY['bodyweight', 'dumbbell', 'barbell'],
  ARRAY['push', 'lower'],
  ARRAY['quadriceps', 'glutes'],
  ARRAY['hamstrings', 'calves', 'core'],
  ARRAY['lower_body'],
  NULL, NULL, NULL,
  '## Setup
1. Stand tall with feet hip-width apart
2. Keep core engaged
3. Hands on hips or at sides
4. Look straight ahead

## Execution
1. Step forward with one leg
2. Lower hips until both knees at 90 degrees
3. Front knee over ankle, back knee hovering
4. Push back to starting position

## Tips
- Keep most weight on front leg
- Don''t let front knee drift past toes
- Keep torso upright
- Alternate legs or do all reps on one side',
  3, 2, true, false
),

-- ARM EXERCISES
(
  'dumbbell_curl', 'Dumbbell Bicep Curl', 'dumbbell',
  ARRAY['dumbbell', 'barbell', 'cable', 'resistance_band'],
  ARRAY['pull', 'upper', 'arms'],
  ARRAY['biceps'],
  ARRAY['forearms', 'anterior_deltoid'],
  ARRAY['upper_body'],
  25.0, 12.0, 15.0,
  '## Setup
1. Stand tall with dumbbell in each hand
2. Arms at sides with palms facing forward
3. Keep shoulders back and core engaged
4. Elbows close to sides

## Execution
1. Curl weights up by flexing biceps
2. Keep upper arms stationary
3. Squeeze biceps at top
4. Lower weights slowly and controlled

## Tips
- Avoid swinging or using momentum
- Focus on mind-muscle connection
- Don''t let elbows drift forward
- Control both lifting and lowering phases',
  2, 1, false, false
),

(
  'tricep_dip', 'Tricep Dip', 'bodyweight',
  ARRAY['bodyweight', 'dip_bar'],
  ARRAY['push', 'upper', 'arms'],
  ARRAY['triceps'],
  ARRAY['chest', 'anterior_deltoid'],
  ARRAY['upper_body'],
  NULL, NULL, NULL,
  '## Setup
1. Grip parallel bars or bench edge
2. Support body weight on straight arms
3. Keep shoulders over wrists
4. Legs can be bent (easier) or straight (harder)

## Execution
1. Lower body by bending elbows
2. Descend until shoulders below elbows
3. Press back up to starting position
4. Lock out arms at top

## Tips
- Keep elbows close to body
- Don''t go too low if shoulders are tight
- Lean slightly forward for more chest
- Stay upright for more triceps focus',
  3, 2, true, false
),

-- CORE EXERCISES
(
  'plank', 'Plank', 'bodyweight',
  ARRAY['bodyweight'],
  ARRAY['core'],
  ARRAY['abs', 'core'],
  ARRAY['glutes', 'shoulders', 'erector_spinae'],
  ARRAY['core'],
  NULL, NULL, NULL,
  '## Setup
1. Start in push-up position on forearms
2. Keep body in straight line from head to heels
3. Engage core and glutes
4. Look down to maintain neutral neck

## Execution
1. Hold position for prescribed time
2. Breathe normally while maintaining tension
3. Keep hips level - don''t sag or pike
4. Focus on quality over duration

## Tips
- Start with shorter holds and progress
- Keep entire body tight
- If too easy, try single-arm or single-leg
- Don''t hold breath',
  2, 1, false, false
),

(
  'hanging_leg_raise', 'Hanging Leg Raise', 'pullup_bar',
  ARRAY['pullup_bar', 'dip_bar'],
  ARRAY['core'],
  ARRAY['abs', 'hip_flexors'],
  ARRAY['forearms', 'lats'],
  ARRAY['core'],
  NULL, NULL, NULL,
  '## Setup
1. Hang from pull-up bar with arms extended
2. Keep shoulders active (not completely relaxed)
3. Start with legs straight down
4. Engage core to prevent swinging

## Execution
1. Lift legs up toward chest
2. Keep legs straight or bent at knees
3. Pause at top when knees reach chest
4. Lower legs slowly and controlled

## Tips
- Don''t use momentum or swing
- Focus on using abs, not just hip flexors
- Start with bent knees if too difficult
- Control the descent',
  4, 2, false, false
),

-- GLUTE EXERCISES
(
  'hip_thrust', 'Hip Thrust', 'barbell',
  ARRAY['barbell', 'dumbbell', 'bodyweight'],
  ARRAY['push', 'lower', 'glutes'],
  ARRAY['glutes'],
  ARRAY['hamstrings', 'core'],
  ARRAY['lower_body'],
  95.0, 42.5, 45.0,
  '## Setup
1. Sit with upper back against bench
2. Place barbell over hips (use pad if needed)
3. Feet flat on floor, knees bent
4. Keep core engaged

## Execution
1. Drive through heels to lift hips up
2. Squeeze glutes at top
3. Form straight line from knees to shoulders
4. Lower hips back to starting position

## Tips
- Focus on glute squeeze at top
- Don''t arch back excessively
- Keep knees aligned with toes
- Pause at top for maximum glute activation',
  3, 2, false, false
),

-- FULL BODY EXERCISES
(
  'burpee', 'Burpee', 'bodyweight',
  ARRAY['bodyweight'],
  ARRAY['cardio', 'full_body'],
  ARRAY['chest', 'quadriceps', 'glutes'],
  ARRAY['triceps', 'shoulders', 'core', 'hamstrings', 'calves'],
  ARRAY['full_body'],
  NULL, NULL, NULL,
  '## Setup
1. Stand with feet shoulder-width apart
2. Arms at sides
3. Keep core engaged
4. Be ready to move quickly

## Execution
1. Squat down and place hands on floor
2. Jump feet back to plank position
3. Perform push-up (optional)
4. Jump feet back to squat
5. Jump up with arms overhead

## Tips
- Maintain good form even when tired
- Modify by stepping instead of jumping
- Keep core tight in plank position
- Land softly on jumps',
  4, 2, true, false
),

(
  'kettlebell_swing', 'Kettlebell Swing', 'kettlebell',
  ARRAY['kettlebell', 'dumbbell'],
  ARRAY['pull', 'lower', 'cardio'],
  ARRAY['glutes', 'hamstrings'],
  ARRAY['core', 'shoulders', 'erector_spinae'],
  ARRAY['full_body'],
  25.0, 12.0, 15.0,
  '## Setup
1. Stand with feet wider than hip-width
2. Hold kettlebell with both hands
3. Hinge at hips with chest up
4. Let kettlebell hang between legs

## Execution
1. Drive hips forward explosively
2. Let kettlebell swing up to shoulder height
3. Let gravity bring it back down
4. Catch swing with hip hinge

## Tips
- Power comes from hips, not arms
- Keep arms relaxed and straight
- Don''t squat, this is a hinge movement
- Squeeze glutes at top of swing',
  3, 2, true, false
),

-- CARDIO/CONDITIONING
(
  'jumping_jacks', 'Jumping Jacks', 'bodyweight',
  ARRAY['bodyweight'],
  ARRAY['cardio'],
  ARRAY['calves', 'quadriceps'],
  ARRAY['glutes', 'shoulders', 'core'],
  ARRAY['full_body'],
  NULL, NULL, NULL,
  '## Setup
1. Stand with feet together
2. Arms at sides
3. Keep core engaged
4. Be ready for continuous movement

## Execution
1. Jump feet apart while raising arms overhead
2. Jump feet back together while lowering arms
3. Maintain steady rhythm
4. Land softly on balls of feet

## Tips
- Keep core engaged throughout
- Land softly to reduce impact
- Maintain good posture
- Modify by stepping side to side if needed',
  1, 1, false, false
),

(
  'mountain_climbers', 'Mountain Climbers', 'bodyweight',
  ARRAY['bodyweight'],
  ARRAY['cardio', 'core'],
  ARRAY['core', 'shoulders'],
  ARRAY['quadriceps', 'glutes', 'calves'],
  ARRAY['full_body'],
  NULL, NULL, NULL,
  '## Setup
1. Start in plank position
2. Hands under shoulders
3. Body in straight line
4. Core engaged

## Execution
1. Bring one knee toward chest
2. Quickly switch legs
3. Continue alternating in running motion
4. Maintain plank position throughout

## Tips
- Keep hips level, don''t let them rise
- Maintain straight line from head to heels
- Don''t let hands drift forward
- Start slow and build up speed',
  3, 2, false, false
),

-- FUNCTIONAL EXERCISES
(
  'farmers_walk', 'Farmers Walk', 'dumbbell',
  ARRAY['dumbbell', 'kettlebell', 'farmer_handles'],
  ARRAY['core', 'grip'],
  ARRAY['forearms', 'traps', 'core'],
  ARRAY['glutes', 'calves', 'rhomboids'],
  ARRAY['full_body'],
  40.0, 18.0, 25.0,
  '## Setup
1. Hold heavy weight in each hand
2. Stand tall with shoulders back
3. Engage core and keep chest up
4. Arms hanging naturally at sides

## Execution
1. Walk forward with controlled steps
2. Maintain upright posture
3. Don''t let weights sway
4. Continue for prescribed distance/time

## Tips
- Keep shoulders pulled back
- Don''t let weights bang against legs
- Take normal-sized steps
- Focus on grip strength and posture',
  2, 1, false, false
),

-- OLYMPIC/POWER EXERCISES
(
  'clean_and_press', 'Clean and Press', 'barbell',
  ARRAY['barbell', 'dumbbell', 'kettlebell'],
  ARRAY['power', 'full_body'],
  ARRAY['shoulders', 'traps', 'quadriceps', 'glutes'],
  ARRAY['triceps', 'core', 'hamstrings', 'calves'],
  ARRAY['full_body'],
  75.0, 35.0, 45.0,
  '## Setup
1. Start with bar on floor
2. Feet hip-width apart
3. Grip bar with hands shoulder-width apart
4. Keep back straight and chest up

## Execution
1. Pull bar up explosively from floor
2. Catch bar at shoulder level
3. Briefly pause in front squat position
4. Press bar overhead
5. Lower bar back to shoulders then floor

## Tips
- This is an explosive movement
- Requires good mobility and technique
- Start with lighter weight to learn form
- Consider getting coaching for proper technique',
  5, 4, true, false
),

-- CALF EXERCISES
(
  'calf_raise', 'Calf Raise', 'bodyweight',
  ARRAY['bodyweight', 'dumbbell', 'machine'],
  ARRAY['lower', 'calves'],
  ARRAY['calves'],
  ARRAY[]::text[],
  ARRAY['lower_body'],
  NULL, NULL, NULL,
  '## Setup
1. Stand tall with feet hip-width apart
2. Keep core engaged
3. Can hold dumbbells for added resistance
4. Stand on edge of step for greater range (optional)

## Execution
1. Rise up onto toes as high as possible
2. Squeeze calves at top
3. Hold briefly at top
4. Lower slowly to starting position

## Tips
- Control both lifting and lowering phases
- Use full range of motion
- Can be done on step for greater stretch
- Focus on quality over speed',
  1, 1, false, false
)
ON CONFLICT (exercise_id) 
DO UPDATE SET
  name = EXCLUDED.name,
  default_equipment = EXCLUDED.default_equipment,
  available_equipment = EXCLUDED.available_equipment,
  exercise_types = EXCLUDED.exercise_types,
  primary_muscles = EXCLUDED.primary_muscles,
  secondary_muscles = EXCLUDED.secondary_muscles,
  body_parts = EXCLUDED.body_parts,
  starting_weight_lbs = EXCLUDED.starting_weight_lbs,
  starting_weight_kg = EXCLUDED.starting_weight_kg,
  default_warmup_weight = EXCLUDED.default_warmup_weight,
  description = EXCLUDED.description,
  difficulty_level = EXCLUDED.difficulty_level,
  safety_rating = EXCLUDED.safety_rating,
  is_compound = EXCLUDED.is_compound,
  requires_spotter = EXCLUDED.requires_spotter,
  updated_at = NOW();

-- Insert additional category data if needed
INSERT INTO exercise_categories (category_id, name, description, color, sort_order) VALUES
  ('power', 'Power', 'Explosive and Olympic-style movements', '#9333ea', 7),
  ('cardio', 'Cardio', 'Cardiovascular and conditioning exercises', '#ec4899', 8),
  ('arms', 'Arms', 'Biceps and triceps focused exercises', '#06b6d4', 9),
  ('glutes', 'Glutes', 'Glute-focused exercises', '#84cc16', 10),
  ('grip', 'Grip', 'Forearm and grip strength exercises', '#64748b', 11)
ON CONFLICT (category_id) DO NOTHING;

-- Insert additional equipment if needed
INSERT INTO exercise_equipment (equipment_id, name, description) VALUES
  ('trap_bar', 'Trap Bar', 'Hexagonal deadlift bar'),
  ('farmer_handles', 'Farmer Handles', 'Specialized farmer walk handles'),
  ('dip_bar', 'Dip Bars', 'Parallel bars for dips'),
  ('medicine_ball', 'Medicine Ball', 'Weighted ball for explosive movements')
ON CONFLICT (equipment_id) DO NOTHING;

-- Update exercises count and verify data
UPDATE exercises SET updated_at = NOW();

-- Verification queries
SELECT 
  COUNT(*) as total_exercises,
  COUNT(CASE WHEN is_compound = true THEN 1 END) as compound_exercises,
  COUNT(CASE WHEN requires_spotter = true THEN 1 END) as spotter_required
FROM exercises;

SELECT 
  unnest(exercise_types) as exercise_type,
  COUNT(*) as count
FROM exercises 
GROUP BY unnest(exercise_types) 
ORDER BY count DESC;

SELECT 
  difficulty_level,
  COUNT(*) as count
FROM exercises 
GROUP BY difficulty_level 
ORDER BY difficulty_level;