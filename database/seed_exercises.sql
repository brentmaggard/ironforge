-- Seed Exercise Data for IronForge
-- Based on Liftosaur exercise database structure

-- Insert sample exercises based on Liftosaur data
INSERT INTO exercises (
  exercise_id, name, default_equipment, available_equipment,
  exercise_types, primary_muscles, secondary_muscles, body_parts,
  starting_weight_lbs, starting_weight_kg, default_warmup_weight,
  description, difficulty_level, safety_rating, is_compound, requires_spotter
) VALUES

-- Compound Upper Body Exercises
(
  'bench_press', 'Bench Press', 'barbell', 
  ARRAY['barbell', 'dumbbell', 'smith_machine'],
  ARRAY['push', 'upper'], 
  ARRAY['chest', 'triceps', 'anterior_deltoid'],
  ARRAY['core', 'posterior_deltoid'],
  ARRAY['upper_body'],
  135.0, 60.0, 45.0,
  '## Setup
1. Lie flat on the bench with your eyes directly under the barbell
2. Grip the bar with hands slightly wider than shoulder-width
3. Keep your feet flat on the floor and maintain a slight arch in your back

## Execution
1. Unrack the bar and position it over your chest
2. Lower the bar in a controlled motion to your chest
3. Press the bar up explosively while maintaining control
4. Lock out your arms at the top

## Tips
- Keep your shoulder blades pulled back and down
- Maintain tension throughout the entire movement
- Control the negative portion of the lift',
  3, 4, true, true
),

(
  'squat', 'Squat', 'barbell',
  ARRAY['barbell', 'dumbbell', 'bodyweight', 'smith_machine'],
  ARRAY['push', 'lower', 'quad'],
  ARRAY['quadriceps', 'glutes', 'hamstrings'],
  ARRAY['core', 'erector_spinae', 'calves'],
  ARRAY['lower_body'],
  135.0, 60.0, 45.0,
  '## Setup
1. Position the bar on your upper traps (high bar) or rear delts (low bar)
2. Stand with feet shoulder-width apart, toes slightly pointed out
3. Engage your core and maintain a neutral spine

## Execution
1. Initiate the movement by pushing your hips back
2. Bend at the hips and knees simultaneously
3. Descend until your hip crease is below your knee cap
4. Drive through your heels to return to starting position

## Tips
- Keep your knees tracking over your toes
- Maintain chest up and core tight throughout
- Focus on hip hinge movement pattern',
  3, 3, true, false
),

(
  'deadlift', 'Deadlift', 'barbell',
  ARRAY['barbell', 'dumbbell', 'kettlebell'],
  ARRAY['pull', 'lower', 'posterior'],
  ARRAY['hamstrings', 'glutes', 'erector_spinae', 'traps'],
  ARRAY['lats', 'rhomboids', 'core', 'forearms'],
  ARRAY['full_body'],
  135.0, 60.0, 95.0,
  '## Setup
1. Stand with feet hip-width apart, bar over mid-foot
2. Bend at hips and knees to grip the bar
3. Keep your back neutral and chest up
4. Engage lats by pulling shoulder blades down

## Execution
1. Drive through your heels to lift the bar
2. Extend hips and knees simultaneously
3. Keep the bar close to your body throughout
4. Stand tall with shoulders back at the top
5. Reverse the movement to lower the bar

## Tips
- Maintain neutral spine throughout entire movement
- The bar should travel in a straight line
- Engage your core before each rep',
  4, 3, true, false
),

-- Upper Body Isolation
(
  'dumbbell_curl', 'Dumbbell Bicep Curl', 'dumbbell',
  ARRAY['dumbbell', 'barbell', 'cable'],
  ARRAY['pull', 'upper', 'arms'],
  ARRAY['biceps'],
  ARRAY['forearms'],
  ARRAY['upper_body'],
  25.0, 12.0, 15.0,
  '## Setup
1. Stand tall with a dumbbell in each hand
2. Keep arms at your sides with palms facing forward
3. Maintain a slight bend in your knees

## Execution
1. Curl the weights up by flexing your biceps
2. Keep your upper arms stationary
3. Squeeze at the top of the movement
4. Lower the weights in a controlled manner

## Tips
- Avoid swinging or using momentum
- Keep your core engaged throughout
- Focus on the mind-muscle connection',
  1, 1, false, false
),

(
  'lateral_raise', 'Lateral Raise', 'dumbbell',
  ARRAY['dumbbell', 'cable', 'resistance_band'],
  ARRAY['push', 'upper', 'shoulders'],
  ARRAY['anterior_deltoid', 'posterior_deltoid'],
  ARRAY['traps', 'core'],
  ARRAY['upper_body'],
  15.0, 7.0, 10.0,
  '## Setup
1. Stand tall with dumbbells at your sides
2. Keep a slight bend in your elbows
3. Maintain neutral spine and engage core

## Execution
1. Raise the weights out to your sides
2. Lift until your arms are parallel to the floor
3. Pause briefly at the top
4. Lower the weights slowly and controlled

## Tips
- Lead with your pinky finger
- Don''t lift higher than shoulder height
- Control the eccentric (lowering) portion',
  2, 1, false, false
),

-- Bodyweight Exercises
(
  'push_up', 'Push-up', 'bodyweight',
  ARRAY['bodyweight'],
  ARRAY['push', 'upper'],
  ARRAY['chest', 'triceps', 'anterior_deltoid'],
  ARRAY['core', 'posterior_deltoid'],
  ARRAY['upper_body'],
  NULL, NULL, NULL,
  '## Setup
1. Start in a plank position with hands under shoulders
2. Keep your body in a straight line from head to heels
3. Engage your core and glutes

## Execution
1. Lower your chest toward the floor
2. Keep your elbows close to your body
3. Push back up to starting position
4. Maintain straight body line throughout

## Tips
- Don''t let your hips sag or pike up
- Go to full range of motion
- If too difficult, modify on knees or incline',
  2, 1, true, false
),

(
  'pull_up', 'Pull-up', 'pullup_bar',
  ARRAY['pullup_bar'],
  ARRAY['pull', 'upper'],
  ARRAY['lats', 'rhomboids', 'biceps'],
  ARRAY['rear_delts', 'core', 'forearms'],
  ARRAY['upper_body'],
  NULL, NULL, NULL,
  '## Setup
1. Hang from the bar with hands slightly wider than shoulders
2. Use an overhand grip (palms facing away)
3. Let your body hang with arms fully extended

## Execution
1. Pull your body up until your chin clears the bar
2. Lead with your chest, not your chin
3. Lower yourself with control to full extension

## Tips
- Engage your lats by pulling shoulder blades down
- Don''t swing or use momentum
- If too difficult, use assisted pull-up machine or bands',
  4, 2, true, false
),

-- Core Exercises
(
  'plank', 'Plank', 'bodyweight',
  ARRAY['bodyweight'],
  ARRAY['core'],
  ARRAY['abs', 'core'],
  ARRAY['glutes', 'shoulders'],
  ARRAY['core'],
  NULL, NULL, NULL,
  '## Setup
1. Start in a push-up position on your forearms
2. Keep your body in a straight line
3. Engage your core and glutes

## Execution
1. Hold this position for the prescribed time
2. Breathe normally while maintaining tension
3. Keep your hips level - don''t let them sag or pike

## Tips
- Focus on quality over duration
- Keep your neck neutral
- If too easy, try single-arm or single-leg variations',
  2, 1, false, false
),

-- Lower Body Accessories
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
2. Keep your core engaged
3. If using weight, hold dumbbells at your sides

## Execution
1. Rise up onto your toes as high as possible
2. Squeeze your calves at the top
3. Lower slowly to starting position
4. Feel the stretch in your calves at the bottom

## Tips
- Control both the lifting and lowering phases
- Use full range of motion
- Can be done on a step for greater range',
  1, 1, false, false
);

-- Update exercises count
UPDATE exercises SET updated_at = NOW();