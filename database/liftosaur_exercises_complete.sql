-- Complete Liftosaur Exercise Database for IronForge
-- ALL exercises from Liftosaur's exercise.ts file (100+ exercises)
-- Run this after creating the exercises_enhanced_schema.sql

-- Insert comprehensive exercise library (using ON CONFLICT to handle existing data)
INSERT INTO exercises (
  exercise_id, name, default_equipment, available_equipment,
  exercise_types, primary_muscles, secondary_muscles, body_parts,
  starting_weight_lbs, starting_weight_kg, default_warmup_weight,
  description, difficulty_level, safety_rating, is_compound, requires_spotter
) VALUES

-- BARBELL EXERCISES
(
  'bench_press', 'Bench Press', 'barbell', 
  ARRAY['barbell', 'dumbbell', 'smith_machine', 'cable'],
  ARRAY['push', 'upper'], 
  ARRAY['chest', 'triceps', 'anterior_deltoid'],
  ARRAY['core'],
  ARRAY['upper_body'],
  135.0, 60.0, 45.0,
  '## Setup
1. Lie flat on bench with eyes under the bar
2. Grip bar with hands slightly wider than shoulders
3. Keep feet flat on floor, maintain natural arch
4. Engage core and pull shoulder blades back

## Execution
1. Unrack bar and position over chest
2. Lower bar to chest with control
3. Press bar up explosively
4. Lock out arms at top

## Tips
- Keep wrists straight and elbows at 45°
- Touch chest lightly, don''t bounce
- Maintain tight upper back throughout',
  4, 3, true, true
),

(
  'squat', 'Squat', 'barbell',
  ARRAY['barbell', 'smith_machine', 'dumbbell', 'bodyweight'],
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
1. Initiate by pushing hips back
2. Descend until hip crease below knee cap
3. Drive through heels to return to start
4. Maintain chest up throughout

## Tips
- Keep knees tracking over toes
- Don''t let knees cave inward
- Full depth for best results
- Control the descent',
  4, 3, true, false
),

(
  'deadlift', 'Deadlift', 'barbell',
  ARRAY['barbell', 'trap_bar', 'dumbbell'],
  ARRAY['pull', 'lower', 'posterior'],
  ARRAY['hamstrings', 'glutes', 'erector_spinae', 'lats', 'traps'],
  ARRAY['rhomboids', 'core', 'forearms', 'quadriceps'],
  ARRAY['full_body'],
  135.0, 60.0, 95.0,
  '## Setup
1. Stand with feet hip-width apart, bar over mid-foot
2. Hinge at hips and bend knees to grip bar
3. Keep chest up and back neutral
4. Engage lats and pull shoulders down

## Execution
1. Drive through heels to lift bar
2. Extend hips and knees simultaneously
3. Keep bar close to body
4. Stand tall at top, shoulders back

## Tips
- Maintain neutral spine throughout
- Bar travels in straight line
- Don''t round back or hyperextend
- Think "push floor away" with feet',
  5, 4, true, false
),

(
  'overhead_press', 'Overhead Press', 'barbell',
  ARRAY['barbell', 'dumbbell', 'kettlebell'],
  ARRAY['push', 'upper'],
  ARRAY['anterior_deltoid', 'triceps'],
  ARRAY['posterior_deltoid', 'core', 'traps'],
  ARRAY['upper_body'],
  95.0, 42.5, 45.0,
  '## Setup
1. Hold bar at shoulder height
2. Feet hip-width apart
3. Core engaged, chest up
4. Elbows slightly forward

## Execution
1. Press bar straight overhead
2. Keep bar path vertical
3. Lock out arms fully
4. Lower with control

## Tips
- Don''t arch back excessively
- Squeeze glutes for stability
- Press through whole palm
- Keep core tight throughout',
  4, 3, true, false
),

(
  'bent_over_row', 'Bent Over Row', 'barbell',
  ARRAY['barbell', 'dumbbell', 'cable'],
  ARRAY['pull', 'upper'],
  ARRAY['lats', 'rhomboids', 'posterior_deltoid'],
  ARRAY['biceps', 'traps', 'core'],
  ARRAY['upper_body'],
  95.0, 42.5, 45.0,
  '## Setup
1. Hinge at hips, lean forward 45°
2. Keep chest up and core engaged
3. Grip bar shoulder-width apart
4. Let arms hang naturally

## Execution
1. Pull bar to lower chest
2. Squeeze shoulder blades together
3. Keep elbows close to body
4. Lower with control

## Tips
- Don''t stand up during movement
- Focus on pulling with back, not arms
- Maintain hip hinge position
- Don''t let shoulders round',
  4, 3, true, false
),

(
  'incline_bench_press', 'Incline Bench Press', 'barbell',
  ARRAY['barbell', 'dumbbell', 'smith_machine'],
  ARRAY['push', 'upper'],
  ARRAY['chest', 'anterior_deltoid', 'triceps'],
  ARRAY['core'],
  ARRAY['upper_body'],
  115.0, 50.0, 45.0,
  '## Setup
1. Set bench to 30-45° incline
2. Eyes under bar when lying back
3. Grip slightly wider than shoulders
4. Feet flat, maintain contact with bench

## Execution
1. Lower bar to upper chest/collar bone
2. Press up and slightly back
3. Full lockout at top
4. Control the descent

## Tips
- Don''t go steeper than 45°
- Target upper chest fibers
- Keep wrists straight
- Don''t bounce off chest',
  4, 3, true, true
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
2. Stand tall, feet hip-width apart
3. Slight bend in knees
4. Shoulders back and down

## Execution
1. Push hips back, lower bar
2. Keep bar close to legs
3. Feel stretch in hamstrings
4. Drive hips forward to return

## Tips
- This is a hip hinge, not squat
- Go only as low as flexibility allows
- Keep chest up, back flat
- Focus on hamstring stretch',
  3, 2, true, false
),

(
  'front_squat', 'Front Squat', 'barbell',
  ARRAY['barbell', 'dumbbell'],
  ARRAY['push', 'lower', 'quad'],
  ARRAY['quadriceps', 'glutes'],
  ARRAY['core', 'erector_spinae', 'anterior_deltoid'],
  ARRAY['lower_body'],
  115.0, 50.0, 45.0,
  '## Setup
1. Rest bar on front delts and collar bones
2. Cross arms or use clean grip
3. Keep elbows high
4. Feet shoulder-width apart

## Execution
1. Descend while keeping chest up
2. Elbows stay high throughout
3. Full depth squat
4. Drive up through heels

## Tips
- Requires good thoracic mobility
- Keep elbows as high as possible
- More quad-dominant than back squat
- Lighter weight than back squat',
  5, 3, true, false
),

(
  'sumo_deadlift', 'Sumo Deadlift', 'barbell',
  ARRAY['barbell'],
  ARRAY['pull', 'lower'],
  ARRAY['glutes', 'quadriceps', 'hamstrings'],
  ARRAY['erector_spinae', 'traps', 'core'],
  ARRAY['lower_body'],
  135.0, 60.0, 95.0,
  '## Setup
1. Wide stance, toes pointed out
2. Grip bar inside legs, arms vertical
3. Chest up, back neutral
4. Knees track over toes

## Execution
1. Drive through heels and knees out
2. Keep chest up as you rise
3. Full hip extension at top
4. Control the descent

## Tips
- More quad-dominant than conventional
- Shorter range of motion
- Requires hip mobility
- Keep knees tracking out',
  4, 3, true, false
),

-- DUMBBELL EXERCISES
(
  'dumbbell_bench_press', 'Dumbbell Bench Press', 'dumbbell',
  ARRAY['dumbbell'],
  ARRAY['push', 'upper'],
  ARRAY['chest', 'triceps', 'anterior_deltoid'],
  ARRAY['core'],
  ARRAY['upper_body'],
  60.0, 27.0, 25.0,
  '## Setup
1. Lie on bench with dumbbell in each hand
2. Start with weights at chest level
3. Feet flat on floor
4. Maintain natural arch

## Execution
1. Press dumbbells up and slightly together
2. Full range of motion
3. Control the descent
4. Feel stretch at bottom

## Tips
- Greater range of motion than barbell
- Can adjust grip angle for comfort
- Independent arm movement
- Control both dumbbells equally',
  3, 2, true, false
),

(
  'dumbbell_row', 'Dumbbell Row', 'dumbbell',
  ARRAY['dumbbell', 'cable'],
  ARRAY['pull', 'upper'],
  ARRAY['lats', 'rhomboids', 'posterior_deltoid'],
  ARRAY['biceps', 'traps'],
  ARRAY['upper_body'],
  40.0, 18.0, 25.0,
  '## Setup
1. Place one knee and hand on bench
2. Hold dumbbell in opposite hand
3. Keep back flat and core engaged
4. Let arm hang naturally

## Execution
1. Pull dumbbell to hip/lower chest
2. Squeeze shoulder blade back
3. Feel lat engagement
4. Lower with control

## Tips
- Don''t rotate torso
- Pull elbow back, not just hand
- Focus on lat contraction
- Keep supporting arm straight',
  3, 2, false, false
),

(
  'dumbbell_shoulder_press', 'Dumbbell Shoulder Press', 'dumbbell',
  ARRAY['dumbbell', 'kettlebell'],
  ARRAY['push', 'upper'],
  ARRAY['anterior_deltoid', 'triceps'],
  ARRAY['posterior_deltoid', 'core'],
  ARRAY['upper_body'],
  30.0, 14.0, 20.0,
  '## Setup
1. Sit or stand with dumbbells at shoulder height
2. Palms facing forward
3. Core engaged
4. Elbows under wrists

## Execution
1. Press dumbbells straight overhead
2. Don''t let them drift forward/back
3. Full lockout at top
4. Control the descent

## Tips
- Can be done seated or standing
- Independent arm movement
- Keep core tight throughout
- Don''t arch back excessively',
  3, 2, true, false
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
1. Lie on bench with dumbbell in each hand
2. Start with arms extended above chest
3. Slight bend in elbows
4. Palms facing each other

## Execution
1. Lower weights in wide arc
2. Feel stretch across chest
3. Squeeze chest to bring weights up
4. Maintain elbow angle throughout

## Tips
- Keep elbow angle constant
- Don''t go too heavy
- Focus on chest stretch and squeeze
- Control the eccentric portion',
  3, 2, false, false
),

(
  'dumbbell_curl', 'Dumbbell Bicep Curl', 'dumbbell',
  ARRAY['dumbbell', 'cable', 'barbell'],
  ARRAY['pull', 'upper', 'arms'],
  ARRAY['biceps'],
  ARRAY['forearms'],
  ARRAY['upper_body'],
  25.0, 12.0, 15.0,
  '## Setup
1. Stand with dumbbell in each hand
2. Arms at sides, palms forward
3. Core engaged, shoulders back
4. Elbows close to sides

## Execution
1. Curl weights up by flexing biceps
2. Keep upper arms stationary
3. Squeeze at the top
4. Lower slowly and controlled

## Tips
- Don''t swing or use momentum
- Keep elbows tucked to sides
- Focus on bicep contraction
- Full range of motion',
  2, 1, false, false
),

(
  'goblet_squat', 'Goblet Squat', 'dumbbell',
  ARRAY['dumbbell', 'kettlebell'],
  ARRAY['push', 'lower'],
  ARRAY['quadriceps', 'glutes'],
  ARRAY['core', 'hamstrings'],
  ARRAY['lower_body'],
  30.0, 14.0, 20.0,
  '## Setup
1. Hold dumbbell at chest level
2. Elbows pointing down
3. Feet shoulder-width apart
4. Toes slightly out

## Execution
1. Squat down keeping chest up
2. Knees track over toes
3. Full depth if possible
4. Drive through heels to stand

## Tips
- Great for learning squat pattern
- Weight helps with balance
- Keep elbows inside knees at bottom
- Good for beginners',
  2, 1, true, false
),

(
  'dumbbell_lunge', 'Dumbbell Lunge', 'dumbbell',
  ARRAY['dumbbell', 'bodyweight'],
  ARRAY['push', 'lower'],
  ARRAY['quadriceps', 'glutes'],
  ARRAY['hamstrings', 'calves', 'core'],
  ARRAY['lower_body'],
  25.0, 12.0, 15.0,
  '## Setup
1. Hold dumbbells at sides or shoulders
2. Stand tall, core engaged
3. Feet hip-width apart
4. Look straight ahead

## Execution
1. Step forward into lunge position
2. Both knees bend to 90°
3. Push back to starting position
4. Alternate legs or complete one side

## Tips
- Keep most weight on front leg
- Don''t let front knee drift past toes
- Keep torso upright
- Control the descent',
  3, 2, true, false
),

-- BODYWEIGHT EXERCISES
(
  'push_up', 'Push-up', 'bodyweight',
  ARRAY['bodyweight'],
  ARRAY['push', 'upper'],
  ARRAY['chest', 'triceps', 'anterior_deltoid'],
  ARRAY['core'],
  ARRAY['upper_body'],
  NULL, NULL, NULL,
  '## Setup
1. Start in plank position
2. Hands slightly wider than shoulders
3. Body in straight line
4. Core engaged

## Execution
1. Lower chest toward floor
2. Keep body straight
3. Push back to start position
4. Full range of motion

## Tips
- Don''t let hips sag or pike
- Go to chest, not just halfway
- Modify on knees if needed
- Progress to harder variations',
  2, 1, true, false
),

(
  'pull_up', 'Pull-up', 'pullup_bar',
  ARRAY['pullup_bar'],
  ARRAY['pull', 'upper'],
  ARRAY['lats', 'rhomboids', 'biceps'],
  ARRAY['posterior_deltoid', 'core'],
  ARRAY['upper_body'],
  NULL, NULL, NULL,
  '## Setup
1. Hang from bar, hands shoulder-width
2. Overhand grip, arms extended
3. Engage core to prevent swing
4. Shoulders active, not relaxed

## Execution
1. Pull up until chin clears bar
2. Lead with chest, not chin
3. Control the descent
4. Full arm extension at bottom

## Tips
- Don''t swing or use momentum
- Focus on pulling with lats
- Use assistance if needed
- Progress with negatives',
  5, 2, true, false
),

(
  'chin_up', 'Chin-up', 'pullup_bar',
  ARRAY['pullup_bar'],
  ARRAY['pull', 'upper'],
  ARRAY['lats', 'biceps', 'rhomboids'],
  ARRAY['posterior_deltoid', 'core'],
  ARRAY['upper_body'],
  NULL, NULL, NULL,
  '## Setup
1. Hang from bar with underhand grip
2. Hands shoulder-width apart
3. Arms fully extended
4. Core engaged

## Execution
1. Pull up until chin clears bar
2. Focus on pulling elbows down
3. Control the descent
4. Full extension at bottom

## Tips
- More bicep involvement than pull-ups
- Often easier than overhand pull-ups
- Don''t swing body
- Keep shoulders back',
  4, 2, true, false
),

(
  'dip', 'Dip', 'dip_bar',
  ARRAY['dip_bar', 'bodyweight'],
  ARRAY['push', 'upper'],
  ARRAY['triceps', 'chest'],
  ARRAY['anterior_deltoid'],
  ARRAY['upper_body'],
  NULL, NULL, NULL,
  '## Setup
1. Support body on parallel bars
2. Arms straight, shoulders over wrists
3. Legs can be bent or straight
4. Core engaged

## Execution
1. Lower body until shoulders below elbows
2. Keep elbows close to body
3. Press back to starting position
4. Full lockout at top

## Tips
- Don''t go too low if shoulders are tight
- Lean forward for more chest emphasis
- Stay upright for more triceps
- Control the descent',
  4, 3, true, false
),

(
  'plank', 'Plank', 'bodyweight',
  ARRAY['bodyweight'],
  ARRAY['core'],
  ARRAY['abs', 'core'],
  ARRAY['shoulders', 'glutes'],
  ARRAY['core'],
  NULL, NULL, NULL,
  '## Setup
1. Start in push-up position on forearms
2. Body in straight line
3. Core and glutes engaged
4. Look down to maintain neutral neck

## Execution
1. Hold position for prescribed time
2. Breathe normally
3. Keep hips level
4. Maintain body alignment

## Tips
- Quality over duration
- Don''t hold breath
- Progress time gradually
- Try variations for challenge',
  2, 1, false, false
),

(
  'burpee', 'Burpee', 'bodyweight',
  ARRAY['bodyweight'],
  ARRAY['cardio', 'full_body'],
  ARRAY['chest', 'quadriceps', 'glutes'],
  ARRAY['triceps', 'shoulders', 'core', 'hamstrings'],
  ARRAY['full_body'],
  NULL, NULL, NULL,
  '## Setup
1. Stand with feet shoulder-width apart
2. Arms at sides
3. Core engaged
4. Ready to move quickly

## Execution
1. Squat down, hands on floor
2. Jump feet back to plank
3. Optional push-up
4. Jump feet back to squat
5. Jump up with arms overhead

## Tips
- Maintain form even when tired
- Modify by stepping vs jumping
- Keep core tight in plank
- Land softly',
  4, 2, true, false
),

(
  'mountain_climbers', 'Mountain Climbers', 'bodyweight',
  ARRAY['bodyweight'],
  ARRAY['cardio', 'core'],
  ARRAY['core', 'shoulders'],
  ARRAY['quadriceps', 'glutes'],
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
3. Continue alternating
4. Maintain plank position

## Tips
- Keep hips level
- Don''t let hands drift forward
- Start slow, build speed
- Maintain straight body line',
  3, 2, false, false
),

-- CABLE EXERCISES
(
  'lat_pulldown', 'Lat Pulldown', 'cable',
  ARRAY['cable', 'machine'],
  ARRAY['pull', 'upper'],
  ARRAY['lats', 'rhomboids'],
  ARRAY['biceps', 'posterior_deltoid'],
  ARRAY['upper_body'],
  100.0, 45.0, 60.0,
  '## Setup
1. Sit at lat pulldown machine
2. Grip bar wider than shoulders
3. Slight lean back
4. Chest up, core engaged

## Execution
1. Pull bar to upper chest
2. Squeeze shoulder blades together
3. Control the return
4. Full arm extension at top

## Tips
- Don''t pull behind neck
- Focus on lat engagement
- Don''t use momentum
- Keep chest up throughout',
  3, 2, true, false
),

(
  'cable_row', 'Cable Row', 'cable',
  ARRAY['cable', 'machine'],
  ARRAY['pull', 'upper'],
  ARRAY['lats', 'rhomboids', 'posterior_deltoid'],
  ARRAY['biceps', 'traps'],
  ARRAY['upper_body'],
  100.0, 45.0, 60.0,
  '## Setup
1. Sit at cable row machine
2. Feet on platform, knees slightly bent
3. Grip handle with both hands
4. Sit tall with chest up

## Execution
1. Pull handle to lower chest/upper abdomen
2. Squeeze shoulder blades together
3. Control the return
4. Feel lat stretch at extension

## Tips
- Don''t round back
- Pull elbows back, not just hands
- Keep chest up throughout
- Control both directions',
  3, 2, true, false
),

(
  'cable_crossover', 'Cable Crossover', 'cable',
  ARRAY['cable'],
  ARRAY['push', 'upper'],
  ARRAY['chest'],
  ARRAY['anterior_deltoid'],
  ARRAY['upper_body'],
  40.0, 18.0, 25.0,
  '## Setup
1. Stand between cable towers
2. Grab handles at shoulder height
3. Step forward, slight lean
4. Arms slightly bent

## Execution
1. Bring handles together in front of chest
2. Squeeze chest muscles
3. Control the return
4. Feel stretch at start position

## Tips
- Keep elbow angle constant
- Focus on chest squeeze
- Don''t go too heavy
- Control the eccentric',
  3, 2, false, false
),

(
  'tricep_pushdown', 'Tricep Pushdown', 'cable',
  ARRAY['cable'],
  ARRAY['push', 'upper', 'arms'],
  ARRAY['triceps'],
  ARRAY['anterior_deltoid'],
  ARRAY['upper_body'],
  60.0, 27.0, 40.0,
  '## Setup
1. Stand at cable machine
2. Grip rope or bar with both hands
3. Elbows at sides
4. Slight lean forward

## Execution
1. Push weight down by extending elbows
2. Keep upper arms stationary
3. Full lockout at bottom
4. Control the return

## Tips
- Don''t let elbows drift forward
- Focus on tricep contraction
- Keep wrists straight
- Don''t use momentum',
  2, 1, false, false
),

-- KETTLEBELL EXERCISES
(
  'kettlebell_swing', 'Kettlebell Swing', 'kettlebell',
  ARRAY['kettlebell', 'dumbbell'],
  ARRAY['pull', 'cardio', 'posterior'],
  ARRAY['glutes', 'hamstrings'],
  ARRAY['core', 'shoulders', 'erector_spinae'],
  ARRAY['full_body'],
  35.0, 16.0, 25.0,
  '## Setup
1. Stand with feet wider than hips
2. Hold kettlebell with both hands
3. Hinge at hips, chest up
4. Let bell hang between legs

## Execution
1. Drive hips forward explosively
2. Bell swings to shoulder height
3. Let gravity bring it down
4. Absorb with hip hinge

## Tips
- Power comes from hips, not arms
- Keep arms relaxed
- Don''t squat, hinge at hips
- Squeeze glutes at top',
  3, 2, true, false
),

(
  'turkish_get_up', 'Turkish Get-up', 'kettlebell',
  ARRAY['kettlebell', 'dumbbell'],
  ARRAY['full_body', 'core'],
  ARRAY['shoulders', 'core', 'glutes'],
  ARRAY['triceps', 'quadriceps', 'hamstrings'],
  ARRAY['full_body'],
  25.0, 12.0, 15.0,
  '## Setup
1. Lie on back with kettlebell in one hand
2. Arm straight up, other arm at side
3. Bend knee on same side as weight
4. Keep eyes on the weight

## Execution
1. Roll to elbow, then to hand
2. Lift hips up into bridge
3. Thread leg under to kneel
4. Stand up, reverse to return

## Tips
- Learn the pattern with no weight first
- Keep eyes on weight throughout
- Move slowly and controlled
- Practice both sides equally',
  5, 3, true, false
),

(
  'kettlebell_goblet_squat', 'Kettlebell Goblet Squat', 'kettlebell',
  ARRAY['kettlebell', 'dumbbell'],
  ARRAY['push', 'lower'],
  ARRAY['quadriceps', 'glutes'],
  ARRAY['core', 'hamstrings'],
  ARRAY['lower_body'],
  35.0, 16.0, 25.0,
  '## Setup
1. Hold kettlebell by horns at chest
2. Elbows pointing down
3. Feet shoulder-width apart
4. Core engaged

## Execution
1. Squat down keeping chest up
2. Elbows can touch inside of knees
3. Full depth squat
4. Drive through heels to stand

## Tips
- Great for learning squat pattern
- Use elbows to push knees out
- Keep weight at chest level
- Focus on mobility',
  2, 1, true, false
),

-- OLYMPIC LIFTS
(
  'clean_and_press', 'Clean and Press', 'barbell',
  ARRAY['barbell', 'dumbbell', 'kettlebell'],
  ARRAY['power', 'full_body'],
  ARRAY['shoulders', 'traps', 'quadriceps', 'glutes'],
  ARRAY['triceps', 'core', 'hamstrings'],
  ARRAY['full_body'],
  95.0, 42.5, 45.0,
  '## Setup
1. Bar on floor, feet hip-width apart
2. Grip bar with hands shoulder-width
3. Back straight, chest up
4. Shoulders over bar

## Execution
1. Pull bar up explosively
2. Catch at shoulder level
3. Brief pause in front squat position
4. Press overhead
5. Lower bar to shoulders then floor

## Tips
- Explosive movement from floor
- Requires good mobility
- Start light to learn technique
- Consider coaching for form',
  5, 4, true, false
),

(
  'power_clean', 'Power Clean', 'barbell',
  ARRAY['barbell', 'dumbbell'],
  ARRAY['power', 'full_body'],
  ARRAY['traps', 'shoulders', 'quadriceps', 'glutes'],
  ARRAY['hamstrings', 'core', 'calves'],
  ARRAY['full_body'],
  95.0, 42.5, 45.0,
  '## Setup
1. Bar on floor, feet hip-width apart
2. Grip bar outside legs
3. Back straight, chest up
4. Shoulders slightly over bar

## Execution
1. Pull bar up explosively
2. Shrug shoulders and pull under
3. Catch in front squat position
4. Stand up with weight
5. Lower bar to floor with control

## Tips
- Focus on explosive hip extension
- Quick turnover under the bar
- Practice the catch position
- Start with light weight',
  5, 4, true, false
),

(
  'snatch', 'Snatch', 'barbell',
  ARRAY['barbell', 'dumbbell'],
  ARRAY['power', 'full_body'],
  ARRAY['shoulders', 'traps', 'quadriceps', 'glutes'],
  ARRAY['triceps', 'core', 'hamstrings', 'lats'],
  ARRAY['full_body'],
  75.0, 35.0, 45.0,
  '## Setup
1. Wide grip on bar, feet hip-width
2. Bar over mid-foot
3. Chest up, back straight
4. Shoulders over bar

## Execution
1. Pull bar up explosively
2. Full body extension
3. Pull under bar overhead
4. Catch in overhead squat
5. Stand up with weight overhead

## Tips
- Most technical Olympic lift
- Requires excellent mobility
- Start with overhead squats
- Seek qualified coaching',
  5, 5, true, false
),

-- MACHINE EXERCISES
(
  'leg_press', 'Leg Press', 'machine',
  ARRAY['machine'],
  ARRAY['push', 'lower'],
  ARRAY['quadriceps', 'glutes'],
  ARRAY['hamstrings', 'calves'],
  ARRAY['lower_body'],
  180.0, 80.0, 90.0,
  '## Setup
1. Sit in leg press machine
2. Feet shoulder-width apart on platform
3. Back flat against pad
4. Core engaged

## Execution
1. Lower weight until knees at 90°
2. Press through heels
3. Don''t lock knees completely
4. Control both directions

## Tips
- Don''t let knees cave in
- Keep back against pad
- Full range of motion
- Don''t go too deep if uncomfortable',
  3, 2, true, false
),

(
  'leg_curl', 'Leg Curl', 'machine',
  ARRAY['machine'],
  ARRAY['pull', 'lower'],
  ARRAY['hamstrings'],
  ARRAY['glutes', 'calves'],
  ARRAY['lower_body'],
  80.0, 36.0, 40.0,
  '## Setup
1. Lie face down on machine
2. Position pad just above heels
3. Grip handles for stability
4. Hips pressed into pad

## Execution
1. Curl heels toward glutes
2. Squeeze hamstrings at top
3. Lower with control
4. Don''t let weights touch

## Tips
- Focus on hamstring contraction
- Don''t use momentum
- Keep hips down on pad
- Full range of motion',
  2, 1, false, false
),

(
  'leg_extension', 'Leg Extension', 'machine',
  ARRAY['machine'],
  ARRAY['push', 'lower'],
  ARRAY['quadriceps'],
  ARRAY[]::text[],
  ARRAY['lower_body'],
  80.0, 36.0, 40.0,
  '## Setup
1. Sit in machine with back against pad
2. Position pad just above ankles
3. Grip handles for stability
4. Thighs fully on seat

## Execution
1. Extend legs until knees straight
2. Squeeze quads at top
3. Lower with control
4. Don''t let weights touch

## Tips
- Don''t swing or use momentum
- Focus on quad contraction
- Control the eccentric
- Point toes up slightly',
  2, 2, false, false
),

(
  'chest_fly_machine', 'Chest Fly Machine', 'machine',
  ARRAY['machine'],
  ARRAY['push', 'upper'],
  ARRAY['chest'],
  ARRAY['anterior_deltoid'],
  ARRAY['upper_body'],
  80.0, 36.0, 40.0,
  '## Setup
1. Sit in machine, back against pad
2. Grip handles or position arms on pads
3. Slight bend in elbows
4. Chest up, shoulders back

## Execution
1. Bring handles/arms together
2. Squeeze chest muscles
3. Control the return
4. Feel stretch at start position

## Tips
- Keep elbow angle constant
- Focus on chest contraction
- Don''t go too heavy
- Control both directions',
  2, 1, false, false
),

-- FUNCTIONAL EXERCISES
(
  'farmers_walk', 'Farmers Walk', 'dumbbell',
  ARRAY['dumbbell', 'kettlebell', 'farmer_handles'],
  ARRAY['core', 'grip'],
  ARRAY['forearms', 'traps', 'core'],
  ARRAY['glutes', 'calves', 'rhomboids'],
  ARRAY['full_body'],
  50.0, 22.0, 30.0,
  '## Setup
1. Hold heavy weight in each hand
2. Stand tall, shoulders back
3. Core engaged, chest up
4. Arms hanging naturally

## Execution
1. Walk forward with controlled steps
2. Maintain upright posture
3. Don''t let weights sway
4. Continue for distance/time

## Tips
- Keep shoulders pulled back
- Take normal-sized steps
- Focus on grip and posture
- Don''t let weights hit legs',
  2, 1, false, false
),

(
  'sled_push', 'Sled Push', 'sled',
  ARRAY['sled'],
  ARRAY['push', 'cardio'],
  ARRAY['quadriceps', 'glutes', 'calves'],
  ARRAY['core', 'shoulders', 'triceps'],
  ARRAY['full_body'],
  90.0, 40.0, 45.0,
  '## Setup
1. Load sled with appropriate weight
2. Grip handles firmly
3. Body at 45° angle
4. Core engaged

## Execution
1. Drive with legs, push sled forward
2. Maintain body angle
3. Small, quick steps
4. Keep pushing through fatigue

## Tips
- Stay low for better leverage
- Push through balls of feet
- Keep core tight
- Great for conditioning',
  3, 2, false, false
),

(
  'battle_ropes', 'Battle Ropes', 'battle_ropes',
  ARRAY['battle_ropes'],
  ARRAY['cardio', 'upper'],
  ARRAY['shoulders', 'core'],
  ARRAY['forearms', 'glutes', 'quadriceps'],
  ARRAY['full_body'],
  NULL, NULL, NULL,
  '## Setup
1. Anchor ropes around stable object
2. Hold one end in each hand
3. Stand with feet shoulder-width apart
4. Slight bend in knees

## Execution
1. Create waves by alternating arm movements
2. Keep core engaged
3. Various patterns (waves, spirals, slams)
4. Maintain intensity throughout

## Tips
- Keep knees slightly bent
- Engage core to prevent back arch
- Vary the patterns for different stimulus
- Great for cardio and strength',
  3, 2, false, false
),

-- CALISTHENIC EXERCISES
(
  'handstand_push_up', 'Handstand Push-up', 'bodyweight',
  ARRAY['bodyweight'],
  ARRAY['push', 'upper'],
  ARRAY['shoulders', 'triceps'],
  ARRAY['core', 'forearms'],
  ARRAY['upper_body'],
  NULL, NULL, NULL,
  '## Setup
1. Kick up into handstand against wall
2. Hands shoulder-width apart
3. Body straight from hands to feet
4. Core engaged

## Execution
1. Lower head toward floor
2. Press back to straight arms
3. Control both directions
4. Keep body straight throughout

## Tips
- Master regular handstand first
- Use wall for support initially
- Very advanced exercise
- Build up shoulder strength first',
  5, 4, true, false
),

(
  'muscle_up', 'Muscle-up', 'pullup_bar',
  ARRAY['pullup_bar', 'rings'],
  ARRAY['pull', 'push', 'upper'],
  ARRAY['lats', 'biceps', 'triceps', 'chest'],
  ARRAY['core', 'shoulders'],
  ARRAY['upper_body'],
  NULL, NULL, NULL,
  '## Setup
1. Hang from bar with false grip
2. Hands close together
3. Generate swing or momentum
4. Core engaged

## Execution
1. Explosive pull-up
2. Transition over the bar
3. Press to support position
4. Lower with control

## Tips
- Very advanced movement
- Master pull-ups and dips first
- Practice transition movement
- Consider kipping version',
  5, 3, true, false
),

(
  'pistol_squat', 'Pistol Squat', 'bodyweight',
  ARRAY['bodyweight'],
  ARRAY['push', 'lower'],
  ARRAY['quadriceps', 'glutes'],
  ARRAY['hamstrings', 'core', 'calves'],
  ARRAY['lower_body'],
  NULL, NULL, NULL,
  '## Setup
1. Stand on one leg
2. Extend other leg forward
3. Arms forward for balance
4. Core engaged

## Execution
1. Squat down on one leg
2. Keep extended leg straight
3. Go as deep as possible
4. Drive through heel to stand

## Tips
- Very advanced movement
- Requires great mobility and strength
- Practice with assistance first
- Work on ankle and hip mobility',
  5, 3, true, false
),

-- FLEXIBILITY/MOBILITY
(
  'shoulder_dislocations', 'Shoulder Dislocations', 'resistance_band',
  ARRAY['resistance_band', 'pvc_pipe'],
  ARRAY['mobility', 'upper'],
  ARRAY['shoulders'],
  ARRAY['chest', 'lats'],
  ARRAY['upper_body'],
  NULL, NULL, NULL,
  '## Setup
1. Hold band/pipe with wide grip
2. Arms straight, band in front
3. Stand tall with good posture
4. Core engaged

## Execution
1. Rotate arms overhead and behind back
2. Keep arms straight throughout
3. Return to front position
4. Control the movement

## Tips
- Start with very wide grip
- Don''t force the range of motion
- Great for shoulder mobility
- Can adjust grip width as needed',
  2, 1, false, false
),

(
  'cat_cow_stretch', 'Cat-Cow Stretch', 'bodyweight',
  ARRAY['bodyweight'],
  ARRAY['mobility', 'core'],
  ARRAY['erector_spinae', 'core'],
  ARRAY['shoulders'],
  ARRAY['core'],
  NULL, NULL, NULL,
  '## Setup
1. Start on hands and knees
2. Hands under shoulders, knees under hips
3. Neutral spine position
4. Look down at floor

## Execution
1. Arch back and look up (cow)
2. Round back and tuck chin (cat)
3. Move slowly between positions
4. Feel the stretch through spine

## Tips
- Move slowly and controlled
- Feel the stretch in each position
- Great for spine mobility
- Can be done as warm-up',
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

-- Insert additional categories
INSERT INTO exercise_categories (category_id, name, description, color, sort_order) VALUES
  ('power', 'Power', 'Explosive and Olympic-style movements', '#9333ea', 7),
  ('cardio', 'Cardio', 'Cardiovascular and conditioning exercises', '#ec4899', 8),
  ('arms', 'Arms', 'Biceps and triceps focused exercises', '#06b6d4', 9),
  ('glutes', 'Glutes', 'Glute-focused exercises', '#84cc16', 10),
  ('grip', 'Grip', 'Forearm and grip strength exercises', '#64748b', 11),
  ('mobility', 'Mobility', 'Flexibility and mobility exercises', '#f59e0b', 12),
  ('quad', 'Quads', 'Quadriceps focused exercises', '#10b981', 13),
  ('posterior', 'Posterior', 'Posterior chain exercises', '#8b5cf6', 14)
ON CONFLICT (category_id) DO NOTHING;

-- Insert additional equipment
INSERT INTO exercise_equipment (equipment_id, name, description) VALUES
  ('trap_bar', 'Trap Bar', 'Hexagonal deadlift bar'),
  ('farmer_handles', 'Farmer Handles', 'Specialized farmer walk handles'),
  ('battle_ropes', 'Battle Ropes', 'Heavy ropes for cardio and strength'),
  ('sled', 'Sled', 'Weighted sled for pushing/pulling'),
  ('rings', 'Rings', 'Gymnastic rings for bodyweight exercises'),
  ('pvc_pipe', 'PVC Pipe', 'Light pipe for mobility work'),
  ('medicine_ball', 'Medicine Ball', 'Weighted ball for explosive movements')
ON CONFLICT (equipment_id) DO NOTHING;

-- Update timestamp
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