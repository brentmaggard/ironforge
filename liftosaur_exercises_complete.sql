-- Complete SQL INSERT script for all Liftosaur exercises
-- This script includes all 100+ exercises from the Liftosaur database
-- Generated from: https://github.com/astashov/liftosaur

-- Insert all exercises with complete data
INSERT INTO exercises (
    exercise_id,
    name,
    default_equipment,
    available_equipment,
    exercise_types,
    primary_muscles,
    secondary_muscles,
    body_parts,
    starting_weight_lbs,
    starting_weight_kg,
    default_warmup_weight,
    description,
    difficulty_level,
    safety_rating,
    is_compound,
    requires_spotter
) VALUES 

-- Barbell Exercises
('ab_wheel', 'Ab Wheel', 'bodyweight', ARRAY['bodyweight', 'cable'], ARRAY['core'], ARRAY['abs'], ARRAY['core'], ARRAY['core'], 0, 0, 0, '**Starting Position:**
1. Kneel on the floor with a mat for support
2. Grasp the ab wheel handles with both hands
3. Position the wheel directly under your shoulders

**Execution:**
1. Slowly roll the wheel forward, extending your body
2. Keep your core tight throughout the movement
3. Roll out as far as you can while maintaining control
4. Return to starting position by engaging your abs

**Key Points:**
- Keep your back straight throughout
- Don''t let your hips sag
- Control the negative portion
- Start with partial reps if needed', 4, 3, true, false),

('arnold_press', 'Arnold Press', 'dumbbell', ARRAY['dumbbell', 'kettlebell'], ARRAY['upper', 'push'], ARRAY['shoulders'], ARRAY['triceps', 'upper_chest'], ARRAY['shoulders'], 25, 12, 10, '**Starting Position:**
1. Sit on a bench with back support
2. Hold dumbbells at shoulder height
3. Start with palms facing toward you

**Execution:**
1. Press weights overhead while rotating palms outward
2. At the top, palms should face forward
3. Lower with reverse motion, rotating palms back

**Key Points:**
- Smooth rotation throughout
- Control the weight
- Full range of motion
- Keep core engaged', 3, 3, false, false),

('around_the_world', 'Around the World', 'dumbbell', ARRAY['dumbbell', 'cable', 'plate'], ARRAY['upper', 'isolation'], ARRAY['chest'], ARRAY['shoulders'], ARRAY['chest'], 15, 7, 5, '**Starting Position:**
1. Lie flat on bench
2. Hold light dumbbells with arms extended
3. Start with weights together above chest

**Execution:**
1. Lower weights in wide arc to sides
2. Continue arc until weights are at hip level
3. Reverse motion back to start
4. Keep slight bend in elbows throughout

**Key Points:**
- Use light weight
- Controlled movement
- Feel stretch in chest
- Don''t go too low if shoulder issues', 2, 4, false, false),

('back_extension', 'Back Extension', 'bodyweight', ARRAY['bodyweight', 'cable', 'dumbbell', 'plate'], ARRAY['lower', 'pull'], ARRAY['lower_back'], ARRAY['glutes', 'hamstrings'], ARRAY['back'], 0, 0, 0, '**Starting Position:**
1. Position yourself on back extension bench
2. Feet secured under foot pads
3. Cross arms over chest or behind head

**Execution:**
1. Lower upper body toward floor with control
2. Raise back up to starting position
3. Squeeze glutes and lower back at top

**Key Points:**
- Don''t hyperextend at top
- Control the descent
- Keep neutral spine
- Add weight when ready', 2, 3, true, false),

('ball_slams', 'Ball Slams', 'medicineball', ARRAY['medicineball'], ARRAY['full_body', 'conditioning'], ARRAY['abs', 'shoulders'], ARRAY['lats', 'triceps'], ARRAY['full_body'], 10, 5, 8, '**Starting Position:**
1. Stand with feet shoulder-width apart
2. Hold medicine ball overhead
3. Engage core and prepare for explosive movement

**Execution:**
1. Slam ball down with maximum force
2. Use entire body in the movement
3. Catch ball on bounce (if applicable)
4. Return to overhead position

**Key Points:**
- Maximum intensity
- Use legs and core
- Explosive movement
- Safe catching technique', 3, 2, true, false),

('battle_ropes', 'Battle Ropes', 'rope', ARRAY['rope'], ARRAY['conditioning', 'upper'], ARRAY['shoulders', 'arms'], ARRAY['core', 'forearms'], ARRAY['full_body'], 0, 0, 0, '**Starting Position:**
1. Anchor ropes securely
2. Hold one end in each hand
3. Stand with feet shoulder-width apart
4. Slight bend in knees

**Execution:**
1. Create waves by moving arms up and down
2. Alternate arms or move together
3. Maintain intensity throughout set

**Key Points:**
- Keep core engaged
- Various wave patterns
- High intensity exercise
- Focus on breathing', 3, 2, true, false),

('behind_the_neck_press', 'Behind the Neck Press', 'barbell', ARRAY['barbell', 'dumbbell', 'smith'], ARRAY['upper', 'push'], ARRAY['shoulders'], ARRAY['triceps'], ARRAY['shoulders'], 65, 30, 45, '**Starting Position:**
1. Sit or stand with barbell behind neck
2. Hands wider than shoulder-width
3. Bar resting on upper traps

**Execution:**
1. Press bar straight up behind head
2. Lower back to starting position with control

**Warning:**
- This exercise can be risky for shoulders
- Requires good shoulder mobility
- Consider alternatives if shoulder issues
- Use light weight and perfect form', 4, 5, false, true),

('bench_dip', 'Bench Dip', 'bodyweight', ARRAY['bodyweight'], ARRAY['upper', 'push'], ARRAY['triceps'], ARRAY['shoulders', 'chest'], ARRAY['arms'], 0, 0, 0, '**Starting Position:**
1. Sit on edge of bench
2. Hands next to hips, gripping bench
3. Slide forward off bench
4. Legs extended or bent

**Execution:**
1. Lower body by bending elbows
2. Go down until elbows at 90 degrees
3. Push back up to starting position

**Key Points:**
- Keep elbows close to body
- Don''t go too low
- Control the movement
- Add weight on lap when ready', 2, 3, false, false),

('bench_press', 'Bench Press', 'barbell', ARRAY['barbell', 'dumbbell', 'smith', 'cable'], ARRAY['upper', 'push'], ARRAY['chest'], ARRAY['shoulders', 'triceps'], ARRAY['chest'], 135, 60, 45, '**Starting Position:**
1. Lie flat on bench with feet on floor
2. Grip bar slightly wider than shoulders
3. Retract shoulder blades
4. Arch back slightly

**Execution:**
1. Lower bar to chest with control
2. Touch chest lightly
3. Press bar up explosively
4. Lock out arms at top

**Key Points:**
- Keep shoulder blades retracted
- Control the descent
- Drive through heels
- Maintain tension throughout', 3, 4, true, true),

('bench_press_close_grip', 'Close Grip Bench Press', 'barbell', ARRAY['barbell', 'dumbbell', 'smith'], ARRAY['upper', 'push'], ARRAY['triceps'], ARRAY['chest', 'shoulders'], ARRAY['arms'], 115, 50, 45, '**Starting Position:**
1. Lie on bench as with regular bench press
2. Grip bar with hands closer together
3. Hands about shoulder-width apart

**Execution:**
1. Lower bar to lower chest/upper abdomen
2. Keep elbows closer to body
3. Press back up focusing on triceps

**Key Points:**
- Don''t grip too narrow
- Keep elbows tucked
- Focus on triceps activation
- Control the weight', 3, 4, false, true),

('bench_press_wide_grip', 'Wide Grip Bench Press', 'barbell', ARRAY['barbell', 'dumbbell', 'smith'], ARRAY['upper', 'push'], ARRAY['chest'], ARRAY['shoulders', 'triceps'], ARRAY['chest'], 125, 55, 45, '**Starting Position:**
1. Lie on bench with wider than normal grip
2. Hands positioned wider than shoulders
3. Maintain shoulder blade retraction

**Execution:**
1. Lower bar to chest with control
2. Feel stretch in chest
3. Press back up powerfully

**Key Points:**
- Don''t go too wide
- Greater chest activation
- Be careful with shoulder position
- Control the stretch', 3, 4, true, true),

('bent_over_one_arm_row', 'Bent Over One Arm Row', 'dumbbell', ARRAY['dumbbell', 'kettlebell', 'cable'], ARRAY['upper', 'pull'], ARRAY['lats'], ARRAY['rhomboids', 'biceps'], ARRAY['back'], 35, 15, 20, '**Starting Position:**
1. Place knee and hand on bench for support
2. Hold weight in opposite hand
3. Keep back straight and parallel to floor

**Execution:**
1. Pull weight to side of torso
2. Squeeze shoulder blade back
3. Lower with control

**Key Points:**
- Don''t rotate torso
- Pull to hip, not chest
- Squeeze at the top
- Control the negative', 2, 2, false, false),

('bent_over_row', 'Bent Over Row', 'barbell', ARRAY['barbell', 'dumbbell', 'cable', 'smith'], ARRAY['upper', 'pull'], ARRAY['lats'], ARRAY['rhomboids', 'biceps'], ARRAY['back'], 95, 40, 45, '**Starting Position:**
1. Stand with feet hip-width apart
2. Hinge at hips, slight knee bend
3. Grip bar with overhand grip
4. Keep back straight

**Execution:**
1. Pull bar to lower chest/upper abdomen
2. Squeeze shoulder blades together
3. Lower with control

**Key Points:**
- Keep back straight throughout
- Don''t use momentum
- Pull to sternum
- Lead with elbows', 3, 3, true, false),

('bicep_curl', 'Bicep Curl', 'dumbbell', ARRAY['dumbbell', 'barbell', 'cable', 'band'], ARRAY['upper', 'pull'], ARRAY['biceps'], ARRAY['forearms'], ARRAY['arms'], 25, 12, 15, '**Starting Position:**
1. Stand with feet hip-width apart
2. Hold weights at sides
3. Keep elbows at sides

**Execution:**
1. Curl weights up by flexing biceps
2. Squeeze at the top
3. Lower slowly with control

**Key Points:**
- Don''t swing the weight
- Keep elbows stationary
- Full range of motion
- Control both directions', 1, 1, false, false),

('bicycle_crunch', 'Bicycle Crunch', 'bodyweight', ARRAY['bodyweight'], ARRAY['core'], ARRAY['abs'], ARRAY['obliques'], ARRAY['core'], 0, 0, 0, '**Starting Position:**
1. Lie on back with hands behind head
2. Lift shoulders off ground
3. Bring knees to 90-degree angle

**Execution:**
1. Bring right elbow to left knee
2. Extend right leg while rotating
3. Switch sides in cycling motion

**Key Points:**
- Don''t pull on neck
- Focus on rotation
- Keep constant tension
- Controlled movement', 2, 1, false, false),

('box_jump', 'Box Jump', 'plyobox', ARRAY['plyobox'], ARRAY['lower', 'plyometric'], ARRAY['quads'], ARRAY['glutes', 'calves'], ARRAY['legs'], 0, 0, 0, '**Starting Position:**
1. Stand facing box at appropriate height
2. Feet shoulder-width apart
3. Arms at sides ready to swing

**Execution:**
1. Swing arms back and squat down
2. Explode up swinging arms forward
3. Land softly on box with both feet
4. Step down carefully

**Key Points:**
- Start with lower box
- Soft landing is key
- Full hip extension at top
- Step down, don''t jump down', 3, 4, true, false),

('box_squat', 'Box Squat', 'barbell', ARRAY['barbell', 'bodyweight', 'dumbbell'], ARRAY['lower', 'squat'], ARRAY['quads'], ARRAY['glutes', 'hamstrings'], ARRAY['legs'], 115, 50, 45, '**Starting Position:**
1. Set up as normal squat
2. Box positioned behind you
3. Sit back to box height

**Execution:**
1. Squat down until sitting on box
2. Pause briefly on box
3. Drive up explosively

**Key Points:**
- Don''t relax completely on box
- Sit back, don''t drop down
- Drive through heels
- Great for learning squat depth', 2, 2, true, false),

('bulgarian_split_squat', 'Bulgarian Split Squat', 'bodyweight', ARRAY['bodyweight', 'dumbbell', 'barbell'], ARRAY['lower', 'squat'], ARRAY['quads'], ARRAY['glutes', 'hamstrings'], ARRAY['legs'], 0, 0, 0, '**Starting Position:**
1. Stand 2-3 feet in front of bench
2. Place rear foot on bench behind you
3. Most weight on front leg

**Execution:**
1. Lower into lunge position
2. Front thigh parallel to ground
3. Drive up through front heel

**Key Points:**
- Don''t push off back leg
- Keep torso upright
- Control the descent
- Focus on front leg', 3, 2, false, false),

('burpee', 'Burpee', 'bodyweight', ARRAY['bodyweight'], ARRAY['full_body', 'conditioning'], ARRAY['chest', 'legs'], ARRAY['shoulders', 'core'], ARRAY['full_body'], 0, 0, 0, '**Starting Position:**
1. Stand with feet shoulder-width apart
2. Arms at sides

**Execution:**
1. Squat down and place hands on floor
2. Jump feet back to plank position
3. Do push-up (optional)
4. Jump feet back to squat
5. Jump up with arms overhead

**Key Points:**
- Maintain good form throughout
- Modify as needed
- High intensity exercise
- Focus on smooth transitions', 3, 2, true, false),

('cable_crossover', 'Cable Crossover', 'cable', ARRAY['cable'], ARRAY['upper', 'push'], ARRAY['chest'], ARRAY['shoulders'], ARRAY['chest'], 30, 15, 20, '**Starting Position:**
1. Stand between cable towers
2. Grab high pulleys with slight forward lean
3. Arms slightly bent

**Execution:**
1. Bring hands together in arc motion
2. Squeeze chest at bottom
3. Return to start with control

**Key Points:**
- Keep slight bend in elbows
- Focus on chest squeeze
- Control the weight
- Various angles possible', 2, 2, false, false),

('cable_crunch', 'Cable Crunch', 'cable', ARRAY['cable'], ARRAY['core'], ARRAY['abs'], ARRAY['obliques'], ARRAY['core'], 50, 25, 30, '**Starting Position:**
1. Kneel in front of cable machine
2. Grab rope or handle overhead
3. Keep hips stationary

**Execution:**
1. Crunch down bringing elbows toward knees
2. Focus on abs contraction
3. Return to start with control

**Key Points:**
- Don''t use hip movement
- Focus on spinal flexion
- Squeeze abs at bottom
- Control the return', 2, 1, false, false),

('cable_kickback', 'Cable Kickback', 'cable', ARRAY['cable'], ARRAY['upper', 'push'], ARRAY['triceps'], ARRAY['shoulders'], ARRAY['arms'], 20, 10, 15, '**Starting Position:**
1. Face cable machine
2. Grab handle with one hand
3. Lean forward slightly
4. Upper arm parallel to floor

**Execution:**
1. Extend forearm back
2. Squeeze triceps at full extension
3. Return with control

**Key Points:**
- Keep upper arm still
- Full extension important
- Squeeze at the back
- Control both directions', 2, 1, false, false),

('cable_pull_through', 'Cable Pull Through', 'cable', ARRAY['cable'], ARRAY['lower', 'pull'], ARRAY['glutes'], ARRAY['hamstrings'], ARRAY['legs'], 40, 20, 25, '**Starting Position:**
1. Stand facing away from low cable
2. Reach between legs to grab rope
3. Walk forward for tension

**Execution:**
1. Drive hips back keeping knees soft
2. Feel stretch in hamstrings
3. Drive hips forward to return

**Key Points:**
- Hip hinge movement
- Keep back straight
- Drive with glutes
- Feel stretch in hamstrings', 2, 2, true, false),

('cable_twist', 'Cable Twist', 'cable', ARRAY['cable'], ARRAY['core'], ARRAY['obliques'], ARRAY['abs'], ARRAY['core'], 30, 15, 20, '**Starting Position:**
1. Stand sideways to cable machine
2. Grab handle with both hands
3. Arms extended
4. Feet shoulder-width apart

**Execution:**
1. Rotate torso away from machine
2. Keep arms straight
3. Return with control

**Key Points:**
- Rotate from core, not arms
- Keep hips facing forward
- Control the movement
- Feel obliques working', 2, 1, false, false),

('calf_press_on_leg_press', 'Calf Press on Leg Press', 'machine', ARRAY['machine'], ARRAY['lower'], ARRAY['calves'], ARRAY[], ARRAY['legs'], 135, 60, 90, '**Starting Position:**
1. Sit in leg press machine
2. Place balls of feet on platform
3. Heels hanging off edge

**Execution:**
1. Press through balls of feet
2. Rise up on toes as high as possible
3. Lower slowly feeling stretch

**Key Points:**
- Full range of motion
- Squeeze at the top
- Control the stretch
- Various foot positions', 2, 2, false, false),

('calf_press_on_seated_leg_press', 'Calf Press on Seated Leg Press', 'machine', ARRAY['machine'], ARRAY['lower'], ARRAY['calves'], ARRAY[], ARRAY['legs'], 90, 40, 70, '**Starting Position:**
1. Sit in seated leg press
2. Balls of feet on platform
3. Knees bent at 90 degrees

**Execution:**
1. Press through balls of feet
2. Extend ankles fully
3. Lower with control

**Key Points:**
- Keep knees stationary
- Focus on ankle movement
- Full extension important
- Feel the stretch', 2, 1, false, false),

('chest_dip', 'Chest Dip', 'bodyweight', ARRAY['bodyweight', 'assisted'], ARRAY['upper', 'push'], ARRAY['chest'], ARRAY['triceps', 'shoulders'], ARRAY['chest'], 0, 0, 0, '**Starting Position:**
1. Grab parallel bars or dip station
2. Support body weight on arms
3. Lean slightly forward

**Execution:**
1. Lower body until chest stretch is felt
2. Press back up to starting position
3. Lean forward to target chest more

**Key Points:**
- Forward lean targets chest
- Don''t go too low
- Control the descent
- Add weight when ready', 3, 3, true, false),

('chest_fly', 'Chest Fly', 'dumbbell', ARRAY['dumbbell', 'cable', 'machine'], ARRAY['upper', 'push'], ARRAY['chest'], ARRAY['shoulders'], ARRAY['chest'], 25, 12, 15, '**Starting Position:**
1. Lie on bench with dumbbells
2. Start with arms extended above chest
3. Slight bend in elbows

**Execution:**
1. Lower weights in wide arc
2. Feel stretch in chest
3. Bring weights back together above chest

**Key Points:**
- Keep elbow bend constant
- Focus on chest stretch
- Don''t go too low
- Squeeze at the top', 2, 3, false, false),

('chest_press', 'Chest Press', 'machine', ARRAY['machine', 'dumbbell'], ARRAY['upper', 'push'], ARRAY['chest'], ARRAY['shoulders', 'triceps'], ARRAY['chest'], 80, 35, 50, '**Starting Position:**
1. Sit in chest press machine
2. Adjust seat height
3. Grab handles at chest level

**Execution:**
1. Press handles forward
2. Extend arms fully
3. Return with control

**Key Points:**
- Keep back against pad
- Don''t lock elbows hard
- Squeeze chest at extension
- Control the return', 2, 2, false, false),

('chest_supported_row', 'Chest Supported Row', 'machine', ARRAY['machine', 'dumbbell'], ARRAY['upper', 'pull'], ARRAY['lats'], ARRAY['rhomboids', 'biceps'], ARRAY['back'], 80, 35, 50, '**Starting Position:**
1. Lie face down on incline bench
2. Grab weights or handles
3. Let arms hang straight down

**Execution:**
1. Pull weight to sides of chest
2. Squeeze shoulder blades together
3. Lower with control

**Key Points:**
- Keep chest against pad
- Pull elbows back
- Squeeze at the top
- Don''t use momentum', 2, 2, false, false),

('chin_up', 'Chin Up', 'bodyweight', ARRAY['bodyweight', 'assisted', 'band'], ARRAY['upper', 'pull'], ARRAY['biceps'], ARRAY['lats', 'rhomboids'], ARRAY['back'], 0, 0, 0, '**Starting Position:**
1. Hang from bar with underhand grip
2. Hands shoulder-width apart
3. Full arm extension

**Execution:**
1. Pull body up until chin over bar
2. Lower with control to full extension

**Key Points:**
- Full range of motion
- Control the descent
- Don''t swing or kip
- Easier than pull-ups for most', 3, 2, true, false),

('clean', 'Clean', 'barbell', ARRAY['barbell', 'dumbbell'], ARRAY['full_body', 'olympic'], ARRAY['traps'], ARRAY['legs', 'shoulders'], ARRAY['full_body'], 95, 40, 45, '**Starting Position:**
1. Bar on floor, feet hip-width apart
2. Grip bar with overhand grip
3. Shoulders over bar

**Execution:**
1. First pull: deadlift to knees
2. Second pull: explosive extension
3. Third pull: drop under bar
4. Catch in front squat position

**Key Points:**
- Complex technical movement
- Requires coaching
- Start with light weight
- Focus on timing', 5, 4, true, false),

('clean_and_jerk', 'Clean and Jerk', 'barbell', ARRAY['barbell'], ARRAY['full_body', 'olympic'], ARRAY['full_body'], ARRAY['full_body'], ARRAY['full_body'], 95, 40, 45, '**Starting Position:**
1. Set up as for clean
2. Complete clean first
3. Prepare for jerk

**Execution:**
1. Clean bar to front rack position
2. Dip and drive for jerk
3. Split or push jerk overhead
4. Recover to standing

**Key Points:**
- Most technical lift
- Requires extensive practice
- Olympic weightlifting movement
- Start very light', 5, 5, true, false),

('concentration_curl', 'Concentration Curl', 'dumbbell', ARRAY['dumbbell', 'cable'], ARRAY['upper', 'pull'], ARRAY['biceps'], ARRAY['forearms'], ARRAY['arms'], 20, 10, 15, '**Starting Position:**
1. Sit on bench with legs spread
2. Rest elbow on inner thigh
3. Hold weight with full arm extension

**Execution:**
1. Curl weight up slowly
2. Focus on biceps contraction
3. Lower with control

**Key Points:**
- Strict form important
- Don''t swing weight
- Focus on peak contraction
- Support arm is stable', 1, 1, false, false),

('cross_body_crunch', 'Cross Body Crunch', 'bodyweight', ARRAY['bodyweight'], ARRAY['core'], ARRAY['obliques'], ARRAY['abs'], ARRAY['core'], 0, 0, 0, '**Starting Position:**
1. Lie on back with knees bent
2. Hands behind head
3. Lift shoulders off ground

**Execution:**
1. Bring right elbow toward left knee
2. Crunch and twist simultaneously
3. Alternate sides

**Key Points:**
- Don''t pull on neck
- Focus on oblique contraction
- Control the movement
- Feel the twist', 2, 1, false, false),

('crunch', 'Crunch', 'bodyweight', ARRAY['bodyweight', 'cable', 'plate'], ARRAY['core'], ARRAY['abs'], ARRAY['obliques'], ARRAY['core'], 0, 0, 0, '**Starting Position:**
1. Lie on back with knees bent
2. Hands behind head or crossed on chest
3. Feet flat on floor

**Execution:**
1. Lift shoulders off ground
2. Crunch up toward knees
3. Lower with control

**Key Points:**
- Don''t pull on neck
- Small range of motion
- Focus on abs contraction
- Don''t use momentum', 1, 1, false, false),

('cycling', 'Cycling', 'bike', ARRAY['bike'], ARRAY['cardio', 'lower'], ARRAY['quads'], ARRAY['glutes', 'calves'], ARRAY['legs'], 0, 0, 0, '**Starting Position:**
1. Adjust bike seat and handlebars
2. Secure feet in pedals
3. Start with easy resistance

**Execution:**
1. Pedal in smooth circular motion
2. Maintain steady pace
3. Adjust resistance as needed

**Key Points:**
- Proper bike fit important
- Smooth pedal stroke
- Vary intensity
- Low impact cardio', 1, 1, false, false),

('deadlift', 'Deadlift', 'barbell', ARRAY['barbell', 'dumbbell', 'kettlebell', 'smith'], ARRAY['full_body', 'pull'], ARRAY['hamstrings'], ARRAY['glutes', 'traps'], ARRAY['full_body'], 135, 60, 95, '**Starting Position:**
1. Bar over midfoot, feet hip-width apart
2. Grip bar with mixed or overhand grip
3. Shoulders over bar, back straight

**Execution:**
1. Drive through heels and extend hips
2. Keep bar close to body
3. Stand tall with shoulders back

**Key Points:**
- Keep back straight throughout
- Bar stays close to body
- Drive with legs and hips
- Don''t round back', 4, 4, true, false),

('deadlift_high_pull', 'Deadlift High Pull', 'barbell', ARRAY['barbell', 'dumbbell'], ARRAY['full_body', 'pull'], ARRAY['traps'], ARRAY['shoulders', 'legs'], ARRAY['full_body'], 95, 40, 65, '**Starting Position:**
1. Set up as regular deadlift
2. Use slightly wider grip

**Execution:**
1. Deadlift bar explosively
2. Continue pulling bar high
3. Elbows lead the pull
4. Lower with control

**Key Points:**
- Explosive movement
- Keep bar close
- Elbows high
- Full body exercise', 4, 3, true, false),

('decline_bench_press', 'Decline Bench Press', 'barbell', ARRAY['barbell', 'dumbbell', 'smith'], ARRAY['upper', 'push'], ARRAY['lower_chest'], ARRAY['triceps', 'shoulders'], ARRAY['chest'], 115, 50, 45, '**Starting Position:**
1. Lie on decline bench
2. Secure feet under pads
3. Grip bar slightly wider than shoulders

**Execution:**
1. Lower bar to lower chest
2. Press back up explosively
3. Full lockout at top

**Key Points:**
- Targets lower chest
- Be careful getting on/off bench
- May feel awkward at first
- Good for chest development', 3, 3, true, true),

('decline_crunch', 'Decline Crunch', 'bodyweight', ARRAY['bodyweight', 'plate'], ARRAY['core'], ARRAY['abs'], ARRAY['obliques'], ARRAY['core'], 0, 0, 0, '**Starting Position:**
1. Lie on decline bench
2. Secure feet under pads
3. Hands behind head or on chest

**Execution:**
1. Crunch up against gravity
2. Lift shoulders toward hips
3. Lower with control

**Key Points:**
- Increased difficulty due to angle
- Don''t pull on neck
- Control the movement
- Feel abs working harder', 3, 2, false, false),

('deficit_deadlift', 'Deficit Deadlift', 'barbell', ARRAY['barbell'], ARRAY['full_body', 'pull'], ARRAY['hamstrings'], ARRAY['glutes', 'traps'], ARRAY['full_body'], 115, 50, 95, '**Starting Position:**
1. Stand on platform or plates
2. Set up as regular deadlift
3. Increased range of motion

**Execution:**
1. Pull bar up from deficit position
2. Full deadlift movement
3. Lower back to deficit

**Key Points:**
- Greater range of motion
- More challenging
- Improves off-floor strength
- Requires good flexibility', 4, 4, true, false),

('elliptical_machine', 'Elliptical Machine', 'machine', ARRAY['machine'], ARRAY['cardio'], ARRAY['legs'], ARRAY['arms'], ARRAY['full_body'], 0, 0, 0, '**Starting Position:**
1. Step onto elliptical platforms
2. Grab handles
3. Start slow movement

**Execution:**
1. Move in elliptical pattern
2. Push and pull with arms
3. Maintain steady rhythm

**Key Points:**
- Low impact cardio
- Full body movement
- Adjust resistance as needed
- Smooth motion important', 1, 1, false, false),

('face_pull', 'Face Pull', 'cable', ARRAY['cable', 'band'], ARRAY['upper', 'pull'], ARRAY['rear_delts'], ARRAY['rhomboids', 'traps'], ARRAY['shoulders'], 40, 20, 25, '**Starting Position:**
1. Set cable at face height
2. Grab rope with overhand grip
3. Step back for tension

**Execution:**
1. Pull rope toward face
2. Separate hands at face level
3. Squeeze shoulder blades
4. Return with control

**Key Points:**
- Great for posture
- Pull to face level
- Separate hands at end
- Feel rear delts working', 2, 1, false, false),

('flat_knee_raise', 'Flat Knee Raise', 'bodyweight', ARRAY['bodyweight'], ARRAY['core'], ARRAY['abs'], ARRAY['hip_flexors'], ARRAY['core'], 0, 0, 0, '**Starting Position:**
1. Lie flat on bench or floor
2. Hands at sides for support
3. Legs extended

**Execution:**
1. Bring knees to chest
2. Keep knees bent throughout
3. Lower legs with control

**Key Points:**
- Don''t let feet touch ground
- Control the movement
- Focus on abs
- Keep lower back pressed down', 2, 1, false, false),

('flat_leg_raise', 'Flat Leg Raise', 'bodyweight', ARRAY['bodyweight'], ARRAY['core'], ARRAY['abs'], ARRAY['hip_flexors'], ARRAY['core'], 0, 0, 0, '**Starting Position:**
1. Lie flat on bench or floor
2. Hands at sides for support
3. Legs straight

**Execution:**
1. Raise legs to vertical
2. Keep legs straight throughout
3. Lower with control

**Key Points:**
- More challenging than knee raises
- Keep legs straight
- Don''t let feet touch ground
- Control both directions', 3, 2, false, false),

('front_raise', 'Front Raise', 'dumbbell', ARRAY['dumbbell', 'barbell', 'cable', 'plate'], ARRAY['upper', 'push'], ARRAY['front_delts'], ARRAY['upper_chest'], ARRAY['shoulders'], 15, 7, 10, '**Starting Position:**
1. Stand with feet hip-width apart
2. Hold weights in front of thighs
3. Arms straight or slight bend

**Execution:**
1. Raise weights forward to shoulder height
2. Keep arms straight or slightly bent
3. Lower with control

**Key Points:**
- Don''t go above shoulder height
- Control the weight
- Don''t use momentum
- Feel front delts working', 2, 2, false, false),

('front_squat', 'Front Squat', 'barbell', ARRAY['barbell', 'dumbbell', 'kettlebell'], ARRAY['lower', 'squat'], ARRAY['quads'], ARRAY['glutes', 'core'], ARRAY['legs'], 95, 40, 45, '**Starting Position:**
1. Rest bar on front of shoulders
2. Elbows high, fingers supporting bar
3. Feet shoulder-width apart

**Execution:**
1. Squat down keeping torso upright
2. Go to comfortable depth
3. Drive up through heels

**Key Points:**
- Keep elbows high
- More upright torso than back squat
- Great for quad development
- Requires mobility', 4, 3, true, false),

('goblet_squat', 'Goblet Squat', 'dumbbell', ARRAY['dumbbell', 'kettlebell'], ARRAY['lower', 'squat'], ARRAY['quads'], ARRAY['glutes', 'core'], ARRAY['legs'], 25, 12, 15, '**Starting Position:**
1. Hold weight at chest level
2. Feet shoulder-width apart
3. Weight against chest

**Execution:**
1. Squat down between legs
2. Keep weight at chest
3. Drive up through heels

**Key Points:**
- Great for learning squat
- Keep weight close to chest
- Allows deep squat position
- Good for mobility', 2, 2, true, false),

('good_morning', 'Good Morning', 'barbell', ARRAY['barbell', 'dumbbell'], ARRAY['lower', 'pull'], ARRAY['hamstrings'], ARRAY['glutes', 'lower_back'], ARRAY['legs'], 65, 30, 45, '**Starting Position:**
1. Bar on upper back like squat
2. Feet hip-width apart
3. Hands holding bar securely

**Execution:**
1. Hinge at hips, pushing hips back
2. Keep knees slightly bent
3. Feel stretch in hamstrings
4. Return to upright position

**Key Points:**
- Hip hinge movement
- Keep back straight
- Don''t go too low
- Feel hamstrings stretch', 3, 4, true, false),

('glute_bridge', 'Glute Bridge', 'bodyweight', ARRAY['bodyweight', 'barbell', 'dumbbell'], ARRAY['lower'], ARRAY['glutes'], ARRAY['hamstrings', 'core'], ARRAY['legs'], 0, 0, 0, '**Starting Position:**
1. Lie on back with knees bent
2. Feet flat on floor hip-width apart
3. Arms at sides

**Execution:**
1. Drive hips up by squeezing glutes
2. Create straight line from knees to shoulders
3. Lower with control

**Key Points:**
- Squeeze glutes at top
- Don''t overarch back
- Drive through heels
- Great glute activation', 1, 1, false, false),

('glute_bridge_march', 'Glute Bridge March', 'bodyweight', ARRAY['bodyweight'], ARRAY['lower'], ARRAY['glutes'], ARRAY['hamstrings', 'core'], ARRAY['legs'], 0, 0, 0, '**Starting Position:**
1. Start in glute bridge position
2. Hips elevated and glutes engaged

**Execution:**
1. Maintain bridge position
2. Lift one leg up
3. Lower and switch legs
4. Keep hips level throughout

**Key Points:**
- Don''t let hips drop
- Keep glutes engaged
- Control the movement
- Challenges stability', 2, 1, false, false),

('glute_kickback', 'Glute Kickback', 'cable', ARRAY['cable', 'bodyweight'], ARRAY['lower'], ARRAY['glutes'], ARRAY['hamstrings'], ARRAY['legs'], 20, 10, 15, '**Starting Position:**
1. Face cable machine
2. Attach ankle strap
3. Hold machine for support

**Execution:**
1. Kick leg back behind you
2. Squeeze glutes at the back
3. Return with control

**Key Points:**
- Don''t arch back excessively
- Focus on glute contraction
- Keep hips facing forward
- Control both directions', 2, 1, false, false),

('hack_squat', 'Hack Squat', 'machine', ARRAY['machine'], ARRAY['lower', 'squat'], ARRAY['quads'], ARRAY['glutes'], ARRAY['legs'], 90, 40, 70, '**Starting Position:**
1. Stand in hack squat machine
2. Back against pad
3. Feet on platform

**Execution:**
1. Lower body by bending knees
2. Go to comfortable depth
3. Press back up through heels

**Key Points:**
- Keep back against pad
- Don''t let knees cave in
- Full range of motion
- Safer than free weight squats', 2, 2, true, false),

('hammer_curl', 'Hammer Curl', 'dumbbell', ARRAY['dumbbell', 'cable'], ARRAY['upper', 'pull'], ARRAY['biceps'], ARRAY['forearms'], ARRAY['arms'], 25, 12, 15, '**Starting Position:**
1. Stand with dumbbells at sides
2. Neutral grip (palms facing each other)
3. Elbows at sides

**Execution:**
1. Curl weights up keeping neutral grip
2. Squeeze biceps at top
3. Lower with control

**Key Points:**
- Neutral grip throughout
- Targets different part of biceps
- Don''t swing weights
- Keep elbows stationary', 1, 1, false, false),

('handstand_push_up', 'Handstand Push Up', 'bodyweight', ARRAY['bodyweight'], ARRAY['upper', 'push'], ARRAY['shoulders'], ARRAY['triceps', 'core'], ARRAY['shoulders'], 0, 0, 0, '**Starting Position:**
1. Kick up into handstand against wall
2. Hands shoulder-width apart
3. Body straight and inverted

**Execution:**
1. Lower head toward ground
2. Press back up to full extension

**Key Points:**
- Very advanced exercise
- Requires significant strength
- Use wall for support
- Progress gradually', 5, 4, false, false),

('hang_clean', 'Hang Clean', 'barbell', ARRAY['barbell', 'dumbbell'], ARRAY['full_body', 'olympic'], ARRAY['traps'], ARRAY['legs', 'shoulders'], ARRAY['full_body'], 75, 35, 45, '**Starting Position:**
1. Start with bar at hip level
2. Overhand grip
3. Slight knee bend

**Execution:**
1. Explosive hip extension
2. Shrug and pull bar up
3. Drop under and catch
4. Stand up to complete

**Key Points:**
- Simpler than full clean
- Still requires technique
- Explosive movement
- Focus on timing', 4, 3, true, false),

('hang_snatch', 'Hang Snatch', 'barbell', ARRAY['barbell'], ARRAY['full_body', 'olympic'], ARRAY['traps'], ARRAY['shoulders', 'legs'], ARRAY['full_body'], 65, 30, 45, '**Starting Position:**
1. Start with bar at hip level
2. Wide overhand grip
3. Slight knee bend

**Execution:**
1. Explosive hip extension
2. Pull bar overhead in one motion
3. Drop under bar
4. Catch overhead and stand

**Key Points:**
- Very technical movement
- Requires coaching
- Start very light
- Focus on mobility too', 5, 4, true, false),

('hanging_leg_raise', 'Hanging Leg Raise', 'bodyweight', ARRAY['bodyweight'], ARRAY['core'], ARRAY['abs'], ARRAY['hip_flexors'], ARRAY['core'], 0, 0, 0, '**Starting Position:**
1. Hang from pull-up bar
2. Arms fully extended
3. Legs straight down

**Execution:**
1. Raise legs up toward parallel
2. Keep legs straight if possible
3. Lower with control

**Key Points:**
- Very challenging exercise
- Bend knees if needed
- Don''t swing
- Control the descent', 4, 2, false, false),

('high_knee_skips', 'High Knee Skips', 'bodyweight', ARRAY['bodyweight'], ARRAY['cardio', 'plyometric'], ARRAY['quads'], ARRAY['calves', 'core'], ARRAY['legs'], 0, 0, 0, '**Starting Position:**
1. Stand tall with good posture
2. Arms at sides ready to pump

**Execution:**
1. Skip forward bringing knees high
2. Pump arms with each skip
3. Land on balls of feet

**Key Points:**
- High intensity movement
- Good for warm-up
- Explosive movement
- Land softly', 2, 2, false, false),

('high_row', 'High Row', 'cable', ARRAY['cable', 'machine'], ARRAY['upper', 'pull'], ARRAY['rear_delts'], ARRAY['rhomboids', 'traps'], ARRAY['back'], 60, 25, 40, '**Starting Position:**
1. Set cable at high position
2. Grab handles with overhand grip
3. Step back for tension

**Execution:**
1. Pull handles to upper chest/neck area
2. Squeeze shoulder blades together
3. Return with control

**Key Points:**
- Higher pulling angle
- Targets upper back well
- Good for posture
- Feel rear delts working', 2, 2, false, false),

('hip_abductor', 'Hip Abductor', 'machine', ARRAY['machine', 'band'], ARRAY['lower'], ARRAY['glutes'], ARRAY['hip_abductors'], ARRAY['legs'], 80, 35, 50, '**Starting Position:**
1. Sit in hip abductor machine
2. Place legs against pads
3. Adjust resistance

**Execution:**
1. Push legs apart against resistance
2. Squeeze glutes and hip muscles
3. Return with control

**Key Points:**
- Targets outer glutes
- Don''t use too much weight
- Feel muscles on outside of hips
- Good for hip stability', 1, 1, false, false),

('hip_adductor', 'Hip Adductor', 'machine', ARRAY['machine'], ARRAY['lower'], ARRAY['adductors'], ARRAY['inner_thighs'], ARRAY['legs'], 80, 35, 50, '**Starting Position:**
1. Sit in hip adductor machine
2. Place legs against inside pads
3. Adjust resistance

**Execution:**
1. Squeeze legs together
2. Feel inner thigh muscles working
3. Return with control

**Key Points:**
- Targets inner thighs
- Smooth controlled movement
- Don''t use excessive weight
- Good for overall leg strength', 1, 1, false, false),

('hip_thrust', 'Hip Thrust', 'barbell', ARRAY['barbell', 'dumbbell', 'bodyweight'], ARRAY['lower'], ARRAY['glutes'], ARRAY['hamstrings'], ARRAY['legs'], 95, 40, 45, '**Starting Position:**
1. Sit with upper back against bench
2. Barbell across hips
3. Feet flat on floor

**Execution:**
1. Drive hips up by squeezing glutes
2. Create straight line from knees to chest
3. Lower with control

**Key Points:**
- Excellent glute exercise
- Drive through heels
- Squeeze glutes at top
- Don''t overarch back', 2, 2, false, false),

('incline_bench_press', 'Incline Bench Press', 'barbell', ARRAY['barbell', 'dumbbell', 'smith'], ARRAY['upper', 'push'], ARRAY['upper_chest'], ARRAY['shoulders', 'triceps'], ARRAY['chest'], 115, 50, 45, '**Starting Position:**
1. Lie on incline bench (30-45 degrees)
2. Grip bar slightly wider than shoulders
3. Retract shoulder blades

**Execution:**
1. Lower bar to upper chest
2. Press back up explosively
3. Full lockout at top

**Key Points:**
- Targets upper chest
- Don''t make incline too steep
- Control the descent
- Drive through feet', 3, 3, true, true),

('incline_bench_press_wide_grip', 'Incline Bench Press Wide Grip', 'barbell', ARRAY['barbell', 'dumbbell'], ARRAY['upper', 'push'], ARRAY['upper_chest'], ARRAY['shoulders'], ARRAY['chest'], 105, 45, 45, '**Starting Position:**
1. Lie on incline bench
2. Wider than normal grip
3. Maintain shoulder blade retraction

**Execution:**
1. Lower bar to upper chest
2. Feel stretch in chest
3. Press back up powerfully

**Key Points:**
- Wider grip emphasizes chest
- Don''t go too wide
- Be careful with shoulder position
- Control the stretch', 3, 4, true, true),

('incline_chest_fly', 'Incline Chest Fly', 'dumbbell', ARRAY['dumbbell', 'cable'], ARRAY['upper', 'push'], ARRAY['upper_chest'], ARRAY['shoulders'], ARRAY['chest'], 20, 10, 15, '**Starting Position:**
1. Lie on incline bench with dumbbells
2. Start with arms extended above chest
3. Slight bend in elbows

**Execution:**
1. Lower weights in wide arc
2. Feel stretch in upper chest
3. Bring weights back together

**Key Points:**
- Targets upper chest
- Keep elbow bend constant
- Don''t go too low
- Focus on chest stretch', 2, 3, false, false),

('incline_chest_press', 'Incline Chest Press', 'machine', ARRAY['machine'], ARRAY['upper', 'push'], ARRAY['upper_chest'], ARRAY['shoulders', 'triceps'], ARRAY['chest'], 70, 30, 50, '**Starting Position:**
1. Sit in incline chest press machine
2. Adjust seat and back pad
3. Grab handles at chest level

**Execution:**
1. Press handles forward and up
2. Follow the machine''s path
3. Return with control

**Key Points:**
- Targets upper chest
- Safer than free weights
- Adjust seat for proper angle
- Control the movement', 2, 2, false, false),

('incline_curl', 'Incline Curl', 'dumbbell', ARRAY['dumbbell'], ARRAY['upper', 'pull'], ARRAY['biceps'], ARRAY['forearms'], ARRAY['arms'], 20, 10, 15, '**Starting Position:**
1. Lie back on incline bench
2. Arms hanging straight down
3. Hold dumbbells with underhand grip

**Execution:**
1. Curl weights up without moving upper arms
2. Squeeze biceps at top
3. Lower with control

**Key Points:**
- Arms hang straight down
- Don''t move upper arms
- Great biceps stretch
- Control both directions', 2, 2, false, false),

('incline_row', 'Incline Row', 'dumbbell', ARRAY['dumbbell', 'barbell'], ARRAY['upper', 'pull'], ARRAY['lats'], ARRAY['rhomboids', 'biceps'], ARRAY['back'], 35, 15, 25, '**Starting Position:**
1. Lie face down on incline bench
2. Let arms hang straight down
3. Hold weights with neutral grip

**Execution:**
1. Pull weights to sides of chest
2. Squeeze shoulder blades together
3. Lower with control

**Key Points:**
- Chest supported variation
- Pull elbows back
- Squeeze at the top
- No momentum possible', 2, 2, false, false),

('inverted_row', 'Inverted Row', 'bodyweight', ARRAY['bodyweight', 'trx'], ARRAY['upper', 'pull'], ARRAY['lats'], ARRAY['rhomboids', 'biceps'], ARRAY['back'], 0, 0, 0, '**Starting Position:**
1. Lie under bar or suspension trainer
2. Grab bar with overhand grip
3. Body straight, heels on ground

**Execution:**
1. Pull chest to bar
2. Keep body straight throughout
3. Lower with control

**Key Points:**
- Bodyweight pulling exercise
- Keep body straight
- Adjust difficulty with foot position
- Great for beginners', 2, 1, false, false),

('iso_lateral_chest_press', 'Iso Lateral Chest Press', 'machine', ARRAY['machine'], ARRAY['upper', 'push'], ARRAY['chest'], ARRAY['shoulders', 'triceps'], ARRAY['chest'], 60, 25, 40, '**Starting Position:**
1. Sit in iso-lateral machine
2. Adjust seat height
3. Grab handles independently

**Execution:**
1. Press one or both arms forward
2. Work arms independently
3. Return with control

**Key Points:**
- Work arms independently
- Helps address imbalances
- Can work one arm at a time
- Control the movement', 2, 2, false, false),

('iso_lateral_row', 'Iso Lateral Row', 'machine', ARRAY['machine'], ARRAY['upper', 'pull'], ARRAY['lats'], ARRAY['rhomboids', 'biceps'], ARRAY['back'], 60, 25, 40, '**Starting Position:**
1. Sit in iso-lateral row machine
2. Chest against pad
3. Grab handles independently

**Execution:**
1. Pull one or both handles back
2. Squeeze shoulder blades
3. Return with control

**Key Points:**
- Work arms independently
- Great for imbalances
- Pull elbows back
- Feel back muscles working', 2, 2, false, false),

('jackknife_sit_up', 'Jackknife Sit Up', 'bodyweight', ARRAY['bodyweight'], ARRAY['core'], ARRAY['abs'], ARRAY['hip_flexors'], ARRAY['core'], 0, 0, 0, '**Starting Position:**
1. Lie flat with arms overhead
2. Legs straight
3. Body in straight line

**Execution:**
1. Simultaneously bring knees and chest together
2. Reach for toes at top
3. Lower back to starting position

**Key Points:**
- Challenging ab exercise
- Control the movement
- Don''t use momentum
- Feel abs working hard', 3, 2, false, false),

('jump_rope', 'Jump Rope', 'rope', ARRAY['rope'], ARRAY['cardio'], ARRAY['calves'], ARRAY['shoulders', 'forearms'], ARRAY['full_body'], 0, 0, 0, '**Starting Position:**
1. Hold rope handles at sides
2. Rope behind feet
3. Stand tall with good posture

**Execution:**
1. Swing rope over head
2. Jump over rope with both feet
3. Land softly on balls of feet

**Key Points:**
- Great cardio exercise
- Start slow and build rhythm
- Stay on balls of feet
- Use wrists to turn rope', 2, 2, false, false),

('jump_squat', 'Jump Squat', 'bodyweight', ARRAY['bodyweight'], ARRAY['lower', 'plyometric'], ARRAY['quads'], ARRAY['glutes', 'calves'], ARRAY['legs'], 0, 0, 0, '**Starting Position:**
1. Stand with feet shoulder-width apart
2. Arms at sides

**Execution:**
1. Squat down to comfortable depth
2. Explode up jumping as high as possible
3. Land softly and immediately squat again

**Key Points:**
- Explosive movement
- Land softly
- Use arms for momentum
- High intensity exercise', 3, 3, true, false),

('jumping_jack', 'Jumping Jack', 'bodyweight', ARRAY['bodyweight'], ARRAY['cardio'], ARRAY['legs'], ARRAY['shoulders'], ARRAY['full_body'], 0, 0, 0, '**Starting Position:**
1. Stand with feet together
2. Arms at sides

**Execution:**
1. Jump feet apart while raising arms overhead
2. Jump feet back together while lowering arms
3. Repeat in rhythmic pattern

**Key Points:**
- Classic cardio exercise
- Maintain rhythm
- Land softly
- Good for warm-up', 1, 1, false, false),

('kettlebell_swing', 'Kettlebell Swing', 'kettlebell', ARRAY['kettlebell'], ARRAY['full_body'], ARRAY['glutes'], ARRAY['hamstrings', 'core'], ARRAY['full_body'], 20, 10, 15, '**Starting Position:**
1. Stand with feet wider than shoulders
2. Kettlebell on ground between feet
3. Hinge at hips to grab kettlebell

**Execution:**
1. Drive hips forward explosively
2. Swing kettlebell to shoulder height
3. Let kettlebell fall back between legs

**Key Points:**
- Hip hinge movement
- Drive with glutes and hips
- Don''t squat the movement
- Keep back straight', 3, 3, true, false),

('kettlebell_turkish_get_up', 'Kettlebell Turkish Get Up', 'kettlebell', ARRAY['kettlebell'], ARRAY['full_body'], ARRAY['shoulders'], ARRAY['core', 'legs'], ARRAY['full_body'], 15, 7, 10, '**Starting Position:**
1. Lie on back with kettlebell in one hand
2. Press kettlebell overhead
3. Bend knee on same side

**Execution:**
1. Complex multi-step movement
2. Stand up while keeping kettlebell overhead
3. Reverse the movement to lie back down

**Key Points:**
- Very complex movement
- Requires practice and coaching
- Start with light weight
- Focus on control', 5, 4, true, false),

('kipping_pull_up', 'Kipping Pull Up', 'bodyweight', ARRAY['bodyweight'], ARRAY['upper', 'pull'], ARRAY['lats'], ARRAY['biceps', 'core'], ARRAY['back'], 0, 0, 0, '**Starting Position:**
1. Hang from pull-up bar
2. Initiate swing from shoulders
3. Use momentum to assist

**Execution:**
1. Swing forward and back
2. Use hip drive to assist pull-up
3. Get chin over bar
4. Return with control

**Key Points:**
- Uses momentum
- More of a conditioning exercise
- Master strict pull-ups first
- Common in CrossFit', 4, 3, true, false),

('knee_raise', 'Knee Raise', 'bodyweight', ARRAY['bodyweight', 'captain_chair'], ARRAY['core'], ARRAY['abs'], ARRAY['hip_flexors'], ARRAY['core'], 0, 0, 0, '**Starting Position:**
1. Hang from pull-up bar or captain''s chair
2. Arms supporting body weight
3. Legs hanging straight

**Execution:**
1. Bring knees toward chest
2. Keep knees bent throughout
3. Lower with control

**Key Points:**
- Easier than leg raises
- Don''t swing
- Focus on abs
- Control the descent', 3, 2, false, false),

('kneeling_pulldown', 'Kneeling Pulldown', 'cable', ARRAY['cable'], ARRAY['upper', 'pull'], ARRAY['lats'], ARRAY['rhomboids', 'biceps'], ARRAY['back'], 80, 35, 50, '**Starting Position:**
1. Kneel facing cable machine
2. Grab lat pulldown bar
3. Lean back slightly

**Execution:**
1. Pull bar down to upper chest
2. Squeeze shoulder blades together
3. Return with control

**Key Points:**
- Different angle than seated
- Engage core for stability
- Pull bar to chest, not behind neck
- Feel lats working', 2, 2, false, false),

('knees_to_elbows', 'Knees to Elbows', 'bodyweight', ARRAY['bodyweight'], ARRAY['core'], ARRAY['abs'], ARRAY['hip_flexors'], ARRAY['core'], 0, 0, 0, '**Starting Position:**
1. Hang from pull-up bar
2. Arms fully extended
3. Legs hanging down

**Execution:**
1. Bring knees up toward elbows
2. Try to touch knees to elbows
3. Lower with control

**Key Points:**
- Very challenging exercise
- Don''t swing excessively
- Focus on core engagement
- Build up gradually', 4, 2, false, false),

('lat_pulldown', 'Lat Pulldown', 'cable', ARRAY['cable', 'machine'], ARRAY['upper', 'pull'], ARRAY['lats'], ARRAY['rhomboids', 'biceps'], ARRAY['back'], 100, 45, 70, '**Starting Position:**
1. Sit at lat pulldown machine
2. Grab bar wider than shoulders
3. Secure thighs under pads

**Execution:**
1. Pull bar down to upper chest
2. Squeeze shoulder blades together
3. Return with control

**Key Points:**
- Don''t pull behind neck
- Lean back slightly
- Feel lats stretching and contracting
- Control both directions', 2, 2, false, false),

('lateral_box_jump', 'Lateral Box Jump', 'plyobox', ARRAY['plyobox'], ARRAY['lower', 'plyometric'], ARRAY['legs'], ARRAY['glutes', 'calves'], ARRAY['legs'], 0, 0, 0, '**Starting Position:**
1. Stand beside box
2. Feet shoulder-width apart
3. Arms ready to swing

**Execution:**
1. Jump sideways onto box
2. Land softly with both feet
3. Step down to other side
4. Jump back over

**Key Points:**
- Lateral movement pattern
- Soft landings important
- Start with lower box
- Step down, don''t jump down', 3, 4, true, false),

('lateral_raise', 'Lateral Raise', 'dumbbell', ARRAY['dumbbell', 'cable', 'machine'], ARRAY['upper', 'push'], ARRAY['side_delts'], ARRAY['front_delts'], ARRAY['shoulders'], 15, 7, 10, '**Starting Position:**
1. Stand with dumbbells at sides
2. Arms straight or slight bend
3. Palms facing body

**Execution:**
1. Raise weights out to sides
2. Lift to shoulder height
3. Lower with control

**Key Points:**
- Don''t go above shoulder height
- Lead with pinkies
- Control the weight
- Feel sides of shoulders working', 2, 2, false, false),

('legs_up_bench_press', 'Legs Up Bench Press', 'barbell', ARRAY['barbell', 'dumbbell'], ARRAY['upper', 'push'], ARRAY['chest'], ARRAY['shoulders', 'triceps'], ARRAY['chest'], 115, 50, 45, '**Starting Position:**
1. Lie on bench with feet up
2. Knees bent at 90 degrees
3. Grip bar as normal bench press

**Execution:**
1. Lower bar to chest with control
2. Press back up explosively
3. Keep feet elevated throughout

**Key Points:**
- Removes leg drive
- More challenging for core
- Isolates upper body more
- Maintain foot position', 3, 3, true, true),

('leg_curl', 'Leg Curl', 'machine', ARRAY['machine'], ARRAY['lower'], ARRAY['hamstrings'], ARRAY['calves'], ARRAY['legs'], 70, 30, 50, '**Starting Position:**
1. Lie face down on leg curl machine
2. Position ankles under pads
3. Grip handles for stability

**Execution:**
1. Curl heels toward glutes
2. Squeeze hamstrings at top
3. Lower with control

**Key Points:**
- Don''t arch back excessively
- Full range of motion
- Control both directions
- Feel hamstrings working', 2, 2, false, false),

('leg_extension', 'Leg Extension', 'machine', ARRAY['machine'], ARRAY['lower'], ARRAY['quads'], ARRAY[], ARRAY['legs'], 80, 35, 60, '**Starting Position:**
1. Sit in leg extension machine
2. Back against pad
3. Ankles behind lower pads

**Execution:**
1. Extend legs until straight
2. Squeeze quads at top
3. Lower with control

**Key Points:**
- Don''t lock knees hard
- Feel quads working
- Control the descent
- Adjust seat position properly', 2, 2, false, false),

('leg_press', 'Leg Press', 'machine', ARRAY['machine'], ARRAY['lower'], ARRAY['quads'], ARRAY['glutes', 'hamstrings'], ARRAY['legs'], 180, 80, 135, '**Starting Position:**
1. Sit in leg press machine
2. Feet on platform shoulder-width apart
3. Back against pad

**Execution:**
1. Lower weight by bending knees
2. Go to comfortable depth
3. Press back up through heels

**Key Points:**
- Don''t let knees cave in
- Keep back against pad
- Don''t go too deep
- Control the weight', 2, 3, true, false),

('lunge', 'Lunge', 'bodyweight', ARRAY['bodyweight', 'dumbbell', 'barbell'], ARRAY['lower'], ARRAY['quads'], ARRAY['glutes', 'hamstrings'], ARRAY['legs'], 0, 0, 0, '**Starting Position:**
1. Stand with feet hip-width apart
2. Hands on hips or holding weights

**Execution:**
1. Step forward into lunge position
2. Lower until front thigh is parallel
3. Push back to starting position
4. Alternate legs or complete one side

**Key Points:**
- Keep torso upright
- Don''t let front knee go past toes
- Push through front heel
- Control the descent', 2, 2, true, false),

('lying_bicep_curl', 'Lying Bicep Curl', 'dumbbell', ARRAY['dumbbell'], ARRAY['upper', 'pull'], ARRAY['biceps'], ARRAY['forearms'], ARRAY['arms'], 20, 10, 15, '**Starting Position:**
1. Lie flat on bench
2. Hold dumbbells with arms extended
3. Arms perpendicular to body

**Execution:**
1. Curl weights toward shoulders
2. Keep upper arms still
3. Squeeze biceps at top
4. Lower with control

**Key Points:**
- Different angle than standing
- Keep upper arms perpendicular
- Don''t move shoulders
- Feel biceps stretch', 2, 2, false, false),

('lying_leg_curl', 'Lying Leg Curl', 'machine', ARRAY['machine'], ARRAY['lower'], ARRAY['hamstrings'], ARRAY['calves'], ARRAY['legs'], 60, 25, 40, '**Starting Position:**
1. Lie face down on machine
2. Ankles under pads
3. Hips pressed into pad

**Execution:**
1. Curl heels toward glutes
2. Squeeze hamstrings at top
3. Lower with control

**Key Points:**
- Keep hips down
- Full range of motion
- Don''t arch back
- Control both directions', 2, 2, false, false),

('mountain_climber', 'Mountain Climber', 'bodyweight', ARRAY['bodyweight'], ARRAY['cardio', 'core'], ARRAY['abs'], ARRAY['shoulders', 'legs'], ARRAY['full_body'], 0, 0, 0, '**Starting Position:**
1. Start in plank position
2. Hands under shoulders
3. Body in straight line

**Execution:**
1. Bring one knee toward chest
2. Quickly switch legs
3. Continue alternating rapidly

**Key Points:**
- High intensity exercise
- Keep hips level
- Maintain plank position
- Quick foot movements', 3, 2, true, false),

('muscle_up', 'Muscle Up', 'bodyweight', ARRAY['bodyweight'], ARRAY['upper'], ARRAY['lats'], ARRAY['triceps', 'chest'], ARRAY['back'], 0, 0, 0, '**Starting Position:**
1. Hang from pull-up bar
2. False grip or regular grip
3. Generate momentum

**Execution:**
1. Pull up explosively
2. Transition over the bar
3. Press to support position
4. Lower with control

**Key Points:**
- Very advanced exercise
- Requires significant strength
- Master pull-ups and dips first
- Explosive movement needed', 5, 4, true, false),

('oblique_crunch', 'Oblique Crunch', 'bodyweight', ARRAY['bodyweight'], ARRAY['core'], ARRAY['obliques'], ARRAY['abs'], ARRAY['core'], 0, 0, 0, '**Starting Position:**
1. Lie on side with knees bent
2. Bottom arm supporting head
3. Top hand behind head

**Execution:**
1. Crunch sideways bringing ribs to hip
2. Focus on oblique contraction
3. Lower with control
4. Complete set then switch sides

**Key Points:**
- Side-lying position
- Focus on oblique muscles
- Don''t pull on neck
- Feel side muscles working', 2, 1, false, false),

('overhead_press', 'Overhead Press', 'barbell', ARRAY['barbell', 'dumbbell'], ARRAY['upper', 'push'], ARRAY['shoulders'], ARRAY['triceps'], ARRAY['shoulders'], 95, 40, 45, '**Starting Position:**
1. Stand with feet hip-width apart
2. Bar at shoulder level
3. Grip slightly wider than shoulders

**Execution:**
1. Press bar straight overhead
2. Full lockout at top
3. Lower with control to shoulders

**Key Points:**
- Keep core tight
- Press straight up
- Don''t arch back excessively
- Full lockout overhead', 3, 3, false, false),

('overhead_squat', 'Overhead Squat', 'barbell', ARRAY['barbell'], ARRAY['full_body'], ARRAY['legs'], ARRAY['shoulders', 'core'], ARRAY['full_body'], 65, 30, 45, '**Starting Position:**
1. Start with bar overhead
2. Wide grip for stability
3. Feet shoulder-width apart

**Execution:**
1. Squat down while keeping bar overhead
2. Maintain upright torso
3. Drive up through heels

**Key Points:**
- Very challenging exercise
- Requires excellent mobility
- Keep bar over midfoot
- Start with very light weight', 5, 4, true, false),

('pec_deck', 'Pec Deck', 'machine', ARRAY['machine'], ARRAY['upper', 'push'], ARRAY['chest'], ARRAY['shoulders'], ARRAY['chest'], 70, 30, 50, '**Starting Position:**
1. Sit in pec deck machine
2. Back against pad
3. Arms against pads or holding handles

**Execution:**
1. Bring arms together in front of chest
2. Squeeze chest muscles
3. Return with control

**Key Points:**
- Focus on chest squeeze
- Don''t use momentum
- Adjust seat height properly
- Feel chest stretch at start', 1, 2, false, false),

('pendlay_row', 'Pendlay Row', 'barbell', ARRAY['barbell'], ARRAY['upper', 'pull'], ARRAY['lats'], ARRAY['rhomboids', 'biceps'], ARRAY['back'], 95, 40, 65, '**Starting Position:**
1. Bar on floor between reps
2. Bend over parallel to floor
3. Overhand grip on bar

**Execution:**
1. Pull bar explosively to lower chest
2. Lower bar back to floor
3. Reset between each rep

**Key Points:**
- Dead stop between reps
- Explosive pull
- Bar touches floor each rep
- More challenging than bent over row', 3, 3, true, false),

('pistol_squat', 'Pistol Squat', 'bodyweight', ARRAY['bodyweight'], ARRAY['lower'], ARRAY['quads'], ARRAY['glutes', 'core'], ARRAY['legs'], 0, 0, 0, '**Starting Position:**
1. Stand on one leg
2. Other leg extended forward
3. Arms forward for balance

**Execution:**
1. Squat down on one leg
2. Go as low as possible
3. Stand back up on same leg

**Key Points:**
- Very advanced exercise
- Requires significant strength and balance
- Start with assisted versions
- Build up gradually', 5, 3, true, false),

('plank', 'Plank', 'bodyweight', ARRAY['bodyweight'], ARRAY['core'], ARRAY['abs'], ARRAY['shoulders', 'back'], ARRAY['core'], 0, 0, 0, '**Starting Position:**
1. Start in push-up position
2. Lower to forearms
3. Body in straight line

**Execution:**
1. Hold position
2. Keep core tight
3. Breathe normally
4. Maintain straight line

**Key Points:**
- Don''t let hips sag
- Keep core engaged
- Build time gradually
- Breathe throughout', 2, 1, false, false),

('power_clean', 'Power Clean', 'barbell', ARRAY['barbell'], ARRAY['full_body', 'olympic'], ARRAY['traps'], ARRAY['legs', 'shoulders'], ARRAY['full_body'], 95, 40, 65, '**Starting Position:**
1. Bar on floor, feet hip-width apart
2. Overhand grip
3. Shoulders over bar

**Execution:**
1. First pull: deadlift to knees
2. Second pull: explosive extension
3. Catch bar at shoulder level
4. No front squat portion

**Key Points:**
- Explosive movement
- Catch bar higher than full clean
- Requires technique practice
- Start light', 4, 3, true, false),

('power_snatch', 'Power Snatch', 'barbell', ARRAY['barbell'], ARRAY['full_body', 'olympic'], ARRAY['traps'], ARRAY['shoulders', 'legs'], ARRAY['full_body'], 75, 35, 45, '**Starting Position:**
1. Wide grip on bar
2. Bar on floor
3. Shoulders over bar

**Execution:**
1. Explosive pull overhead
2. Catch bar at quarter squat depth
3. Stand up to complete lift

**Key Points:**
- Very technical movement
- Wide grip required
- Explosive and precise
- Requires coaching', 5, 4, true, false),

('preacher_curl', 'Preacher Curl', 'barbell', ARRAY['barbell', 'dumbbell', 'machine'], ARRAY['upper', 'pull'], ARRAY['biceps'], ARRAY['forearms'], ARRAY['arms'], 65, 30, 45, '**Starting Position:**
1. Sit at preacher bench
2. Arms resting on angled pad
3. Grip bar with underhand grip

**Execution:**
1. Curl bar up from stretched position
2. Squeeze biceps at top
3. Lower with control

**Key Points:**
- Prevents cheating
- Full stretch at bottom
- Don''t bounce at bottom
- Control the negative', 2, 2, false, false),

('press_under', 'Press Under', 'barbell', ARRAY['barbell'], ARRAY['upper', 'olympic'], ARRAY['shoulders'], ARRAY['triceps'], ARRAY['shoulders'], 65, 30, 45, '**Starting Position:**
1. Bar at shoulder level
2. Feet in split position
3. Prepare for overhead movement

**Execution:**
1. Press bar up while dropping under
2. Catch in split position
3. Stand up to complete

**Key Points:**
- Olympic lifting accessory
- Improves overhead speed
- Requires timing
- Practice movement pattern', 4, 3, false, false),

('pull_up', 'Pull Up', 'bodyweight', ARRAY['bodyweight', 'assisted', 'band'], ARRAY['upper', 'pull'], ARRAY['lats'], ARRAY['rhomboids', 'biceps'], ARRAY['back'], 0, 0, 0, '**Starting Position:**
1. Hang from bar with overhand grip
2. Hands wider than shoulders
3. Full arm extension

**Execution:**
1. Pull body up until chin over bar
2. Lower with control to full extension

**Key Points:**
- Full range of motion
- Control the descent
- Don''t swing or kip
- Build up gradually', 3, 2, true, false),

('pullover', 'Pullover', 'dumbbell', ARRAY['dumbbell', 'barbell'], ARRAY['upper'], ARRAY['lats'], ARRAY['chest', 'triceps'], ARRAY['back'], 30, 15, 20, '**Starting Position:**
1. Lie on bench with dumbbell
2. Hold weight with both hands overhead
3. Arms slightly bent

**Execution:**
1. Lower weight back and down
2. Feel stretch in lats and chest
3. Pull weight back over chest

**Key Points:**
- Focus on lat stretch
- Don''t go too heavy
- Keep slight bend in arms
- Control the stretch', 2, 3, false, false),

('push_press', 'Push Press', 'barbell', ARRAY['barbell', 'dumbbell'], ARRAY['upper', 'push'], ARRAY['shoulders'], ARRAY['legs', 'triceps'], ARRAY['shoulders'], 115, 50, 75, '**Starting Position:**
1. Bar at shoulder level
2. Feet hip-width apart
3. Ready for leg drive

**Execution:**
1. Slight dip with legs
2. Drive up explosively with legs
3. Press bar overhead with arms
4. Stand tall at top

**Key Points:**
- Uses leg drive
- More weight than strict press
- Explosive movement
- Timing is important', 3, 3, false, false),

('push_up', 'Push Up', 'bodyweight', ARRAY['bodyweight'], ARRAY['upper', 'push'], ARRAY['chest'], ARRAY['shoulders', 'triceps'], ARRAY['chest'], 0, 0, 0, '**Starting Position:**
1. Start in plank position
2. Hands slightly wider than shoulders
3. Body in straight line

**Execution:**
1. Lower body until chest near floor
2. Push back up to starting position
3. Keep body straight throughout

**Key Points:**
- Keep body straight
- Full range of motion
- Don''t let hips sag
- Modify on knees if needed', 2, 1, true, false),

('reverse_crunch', 'Reverse Crunch', 'bodyweight', ARRAY['bodyweight'], ARRAY['core'], ARRAY['abs'], ARRAY['hip_flexors'], ARRAY['core'], 0, 0, 0, '**Starting Position:**
1. Lie on back with knees bent
2. Hands at sides or behind head
3. Knees at 90-degree angle

**Execution:**
1. Bring knees toward chest
2. Lift hips slightly off ground
3. Lower with control

**Key Points:**
- Small range of motion
- Focus on lower abs
- Don''t use momentum
- Control the movement', 2, 1, false, false),

('reverse_curl', 'Reverse Curl', 'barbell', ARRAY['barbell', 'dumbbell'], ARRAY['upper', 'pull'], ARRAY['forearms'], ARRAY['biceps'], ARRAY['arms'], 45, 20, 35, '**Starting Position:**
1. Stand holding bar with overhand grip
2. Arms at sides
3. Hands shoulder-width apart

**Execution:**
1. Curl bar up using forearms
2. Keep overhand grip throughout
3. Lower with control

**Key Points:**
- Targets forearms more
- Use lighter weight than regular curls
- Keep wrists straight
- Control both directions', 2, 2, false, false),

('reverse_fly', 'Reverse Fly', 'dumbbell', ARRAY['dumbbell', 'cable', 'machine'], ARRAY['upper', 'pull'], ARRAY['rear_delts'], ARRAY['rhomboids'], ARRAY['shoulders'], 15, 7, 10, '**Starting Position:**
1. Bend forward at hips
2. Hold light weights with arms extended
3. Slight bend in elbows

**Execution:**
1. Raise weights out to sides and back
2. Squeeze shoulder blades together
3. Lower with control

**Key Points:**
- Targets rear delts
- Use light weight
- Feel rear shoulders working
- Good for posture', 2, 2, false, false),

('reverse_grip_concentration_curl', 'Reverse Grip Concentration Curl', 'dumbbell', ARRAY['dumbbell'], ARRAY['upper', 'pull'], ARRAY['forearms'], ARRAY['biceps'], ARRAY['arms'], 15, 7, 12, '**Starting Position:**
1. Sit with elbow resting on inner thigh
2. Hold weight with overhand grip
3. Arm fully extended

**Execution:**
1. Curl weight up with overhand grip
2. Focus on forearm muscles
3. Lower with control

**Key Points:**
- Overhand grip targets forearms
- Strict form important
- Feel forearms working
- Use lighter weight', 2, 1, false, false),

('reverse_lat_pulldown', 'Reverse Lat Pulldown', 'cable', ARRAY['cable'], ARRAY['upper', 'pull'], ARRAY['rear_delts'], ARRAY['rhomboids', 'traps'], ARRAY['back'], 60, 25, 40, '**Starting Position:**
1. Sit at lat pulldown with reverse grip
2. Underhand grip on bar
3. Lean back slightly

**Execution:**
1. Pull bar down to upper chest
2. Focus on rear delts and upper back
3. Return with control

**Key Points:**
- Underhand grip changes emphasis
- Targets different muscles
- Pull to upper chest
- Feel rear delts working', 2, 2, false, false),

('reverse_lunge', 'Reverse Lunge', 'bodyweight', ARRAY['bodyweight', 'dumbbell', 'barbell'], ARRAY['lower'], ARRAY['quads'], ARRAY['glutes', 'hamstrings'], ARRAY['legs'], 0, 0, 0, '**Starting Position:**
1. Stand with feet hip-width apart
2. Hands on hips or holding weights

**Execution:**
1. Step backward into lunge position
2. Lower until front thigh parallel
3. Push through front heel to return
4. Alternate legs

**Key Points:**
- Step backward instead of forward
- Keep torso upright
- Push through front heel
- Control the descent', 2, 2, true, false),

('reverse_wrist_curl', 'Reverse Wrist Curl', 'barbell', ARRAY['barbell', 'dumbbell'], ARRAY['upper'], ARRAY['forearms'], ARRAY[], ARRAY['arms'], 25, 12, 20, '**Starting Position:**
1. Sit with forearms on thighs
2. Hold bar with overhand grip
3. Hands hanging over knees

**Execution:**
1. Curl wrists up against gravity
2. Focus on top of forearms
3. Lower with control

**Key Points:**
- Targets top of forearms
- Use light weight
- Small range of motion
- Control both directions', 1, 1, false, false),

('reverse_plank', 'Reverse Plank', 'bodyweight', ARRAY['bodyweight'], ARRAY['core'], ARRAY['abs'], ARRAY['glutes', 'hamstrings'], ARRAY['core'], 0, 0, 0, '**Starting Position:**
1. Sit with legs extended
2. Hands behind you on ground
3. Fingers pointing toward feet

**Execution:**
1. Lift hips up into reverse plank
2. Body in straight line
3. Hold position

**Key Points:**
- Opposite of regular plank
- Keep body straight
- Engage glutes and core
- Build time gradually', 3, 2, false, false),

('romanian_deadlift', 'Romanian Deadlift', 'barbell', ARRAY['barbell', 'dumbbell'], ARRAY['lower', 'pull'], ARRAY['hamstrings'], ARRAY['glutes'], ARRAY['legs'], 115, 50, 75, '**Starting Position:**
1. Stand holding bar at hip level
2. Feet hip-width apart
3. Slight knee bend

**Execution:**
1. Hinge at hips, pushing hips back
2. Lower bar while keeping it close
3. Feel stretch in hamstrings
4. Drive hips forward to return

**Key Points:**
- Hip hinge movement
- Keep bar close to body
- Feel hamstring stretch
- Don''t round back', 3, 3, true, false),

('reverse_hyperextension', 'Reverse Hyperextension', 'machine', ARRAY['machine'], ARRAY['lower'], ARRAY['glutes'], ARRAY['hamstrings'], ARRAY['legs'], 50, 25, 0, '**Starting Position:**
1. Lie face down on reverse hyper machine
2. Grip handles for stability
3. Legs hanging down

**Execution:**
1. Raise legs up behind you
2. Squeeze glutes at top
3. Lower with control

**Key Points:**
- Targets glutes and hamstrings
- Don''t swing legs
- Focus on glute contraction
- Control the movement', 2, 2, false, false),

('rowing', 'Rowing', 'machine', ARRAY['machine'], ARRAY['cardio', 'full_body'], ARRAY['lats'], ARRAY['legs', 'core'], ARRAY['full_body'], 0, 0, 0, '**Starting Position:**
1. Sit on rowing machine
2. Secure feet in straps
3. Grab handle with both hands

**Execution:**
1. Drive with legs first
2. Pull handle to chest
3. Reverse the movement

**Key Points:**
- Legs, then back, then arms
- Great full body cardio
- Keep back straight
- Smooth rhythm important', 3, 2, true, false),

('russian_twist', 'Russian Twist', 'bodyweight', ARRAY['bodyweight', 'plate', 'medicineball'], ARRAY['core'], ARRAY['obliques'], ARRAY['abs'], ARRAY['core'], 0, 0, 0, '**Starting Position:**
1. Sit with knees bent
2. Lean back slightly
3. Lift feet off ground (optional)

**Execution:**
1. Rotate torso side to side
2. Touch ground beside hips
3. Keep core engaged throughout

**Key Points:**
- Rotate from core
- Keep chest up
- Add weight for difficulty
- Control the rotation', 2, 1, false, false),

('safety_squat_bar_squat', 'Safety Squat Bar Squat', 'barbell', ARRAY['barbell'], ARRAY['lower', 'squat'], ARRAY['quads'], ARRAY['glutes', 'core'], ARRAY['legs'], 115, 50, 75, '**Starting Position:**
1. Position safety squat bar on upper back
2. Hands on handles or crossed
3. Feet shoulder-width apart

**Execution:**
1. Squat down to comfortable depth
2. More upright torso than regular squat
3. Drive up through heels

**Key Points:**
- Specialty barbell
- Forces more upright posture
- Easier on shoulders
- Different muscle emphasis', 3, 2, true, false),

('seated_calf_raise', 'Seated Calf Raise', 'machine', ARRAY['machine'], ARRAY['lower'], ARRAY['calves'], ARRAY[], ARRAY['legs'], 90, 40, 70, '**Starting Position:**
1. Sit in seated calf raise machine
2. Balls of feet on platform
3. Knees under pads

**Execution:**
1. Raise up on toes as high as possible
2. Squeeze calves at top
3. Lower slowly feeling stretch

**Key Points:**
- Targets calves differently than standing
- Full range of motion
- Squeeze at the top
- Control the stretch', 1, 1, false, false),

('seated_front_raise', 'Seated Front Raise', 'dumbbell', ARRAY['dumbbell'], ARRAY['upper', 'push'], ARRAY['front_delts'], ARRAY['upper_chest'], ARRAY['shoulders'], 12, 5, 8, '**Starting Position:**
1. Sit on bench with back support
2. Hold dumbbells at sides
3. Arms straight or slight bend

**Execution:**
1. Raise weights forward to shoulder height
2. Keep arms straight or slightly bent
3. Lower with control

**Key Points:**
- Seated version prevents cheating
- Don''t go above shoulder height
- Control the weight
- Feel front delts working', 2, 2, false, false),

('seated_leg_curl', 'Seated Leg Curl', 'machine', ARRAY['machine'], ARRAY['lower'], ARRAY['hamstrings'], ARRAY[], ARRAY['legs'], 70, 30, 50, '**Starting Position:**
1. Sit in seated leg curl machine
2. Back against pad
3. Ankles against lower pads

**Execution:**
1. Curl heels toward glutes
2. Squeeze hamstrings at bottom
3. Return with control

**Key Points:**
- Different angle than lying curl
- Keep back against pad
- Full range of motion
- Control both directions', 2, 2, false, false),

('seated_leg_press', 'Seated Leg Press', 'machine', ARRAY['machine'], ARRAY['lower'], ARRAY['quads'], ARRAY['glutes', 'hamstrings'], ARRAY['legs'], 180, 80, 135, '**Starting Position:**
1. Sit in seated leg press
2. Back against pad
3. Feet on platform

**Execution:**
1. Lower weight by bending knees
2. Go to comfortable depth
3. Press back up through heels

**Key Points:**
- Similar to regular leg press
- Different angle and setup
- Keep back against pad
- Control the weight', 2, 3, true, false),

('seated_overhead_press', 'Seated Overhead Press', 'dumbbell', ARRAY['dumbbell', 'barbell'], ARRAY['upper', 'push'], ARRAY['shoulders'], ARRAY['triceps'], ARRAY['shoulders'], 50, 25, 35, '**Starting Position:**
1. Sit on bench with back support
2. Hold weights at shoulder level
3. Feet flat on floor

**Execution:**
1. Press weights straight overhead
2. Full lockout at top
3. Lower with control

**Key Points:**
- Back support prevents cheating
- Press straight up
- Full lockout important
- Control the descent', 2, 2, false, false),

('seated_palms_up_wrist_curl', 'Seated Palms Up Wrist Curl', 'dumbbell', ARRAY['dumbbell', 'barbell'], ARRAY['upper'], ARRAY['forearms'], ARRAY[], ARRAY['arms'], 15, 7, 12, '**Starting Position:**
1. Sit with forearms on thighs
2. Hold weight with underhand grip
3. Hands hanging over knees

**Execution:**
1. Curl wrists up
2. Focus on forearm muscles
3. Lower with control

**Key Points:**
- Targets under side of forearms
- Use light weight
- Small range of motion
- Control both directions', 1, 1, false, false),

('seated_row', 'Seated Row', 'cable', ARRAY['cable', 'machine'], ARRAY['upper', 'pull'], ARRAY['lats'], ARRAY['rhomboids', 'biceps'], ARRAY['back'], 100, 45, 70, '**Starting Position:**
1. Sit at cable row machine
2. Feet on platform
3. Grab handle with both hands

**Execution:**
1. Pull handle to lower chest/upper abdomen
2. Squeeze shoulder blades together
3. Return with control

**Key Points:**
- Keep back straight
- Pull to lower chest
- Lead with elbows
- Feel back muscles working', 2, 2, false, false),

('seated_wide_grip_row', 'Seated Wide Grip Row', 'cable', ARRAY['cable'], ARRAY['upper', 'pull'], ARRAY['rear_delts'], ARRAY['rhomboids', 'traps'], ARRAY['back'], 80, 35, 60, '**Starting Position:**
1. Sit at cable row with wide bar
2. Grip bar wider than shoulders
3. Feet on platform

**Execution:**
1. Pull bar to upper chest
2. Focus on rear delts and upper back
3. Return with control

**Key Points:**
- Wide grip changes emphasis
- Pull to upper chest
- Feel rear delts working
- Squeeze shoulder blades', 2, 2, false, false),

('shoulder_press', 'Shoulder Press', 'dumbbell', ARRAY['dumbbell', 'machine'], ARRAY['upper', 'push'], ARRAY['shoulders'], ARRAY['triceps'], ARRAY['shoulders'], 35, 15, 25, '**Starting Position:**
1. Stand or sit with dumbbells at shoulders
2. Palms facing forward
3. Core engaged

**Execution:**
1. Press weights straight overhead
2. Full lockout at top
3. Lower with control to shoulders

**Key Points:**
- Keep core tight
- Press straight up
- Don''t arch back excessively
- Control both directions', 2, 2, false, false),

('shoulder_press_parallel_grip', 'Shoulder Press Parallel Grip', 'dumbbell', ARRAY['dumbbell'], ARRAY['upper', 'push'], ARRAY['shoulders'], ARRAY['triceps'], ARRAY['shoulders'], 35, 15, 25, '**Starting Position:**
1. Hold dumbbells with neutral grip
2. Palms facing each other
3. Weights at shoulder level

**Execution:**
1. Press weights overhead with neutral grip
2. Keep palms facing each other
3. Lower with control

**Key Points:**
- Neutral grip may be easier on shoulders
- Press straight up
- Different feel than regular press
- Control the movement', 2, 2, false, false),

('shrug', 'Shrug', 'barbell', ARRAY['barbell', 'dumbbell', 'smith'], ARRAY['upper'], ARRAY['traps'], ARRAY[], ARRAY['shoulders'], 135, 60, 95, '**Starting Position:**
1. Stand holding weight at sides or in front
2. Arms straight
3. Shoulders in natural position

**Execution:**
1. Shrug shoulders straight up
2. Squeeze traps at top
3. Lower with control

**Key Points:**
- Straight up and down motion
- Don''t roll shoulders
- Squeeze traps at top
- Control the weight', 1, 2, false, false),

('side_bend', 'Side Bend', 'dumbbell', ARRAY['dumbbell'], ARRAY['core'], ARRAY['obliques'], ARRAY[], ARRAY['core'], 25, 12, 20, '**Starting Position:**
1. Stand with dumbbell in one hand
2. Other hand on hip or behind head
3. Feet shoulder-width apart

**Execution:**
1. Bend sideways toward weighted side
2. Use obliques to return to center
3. Complete set then switch sides

**Key Points:**
- Only bend sideways
- Don''t twist or bend forward
- Feel obliques working
- Control both directions', 1, 1, false, false),

('side_crunch', 'Side Crunch', 'bodyweight', ARRAY['bodyweight'], ARRAY['core'], ARRAY['obliques'], ARRAY[], ARRAY['core'], 0, 0, 0, '**Starting Position:**
1. Lie on side with knees bent
2. Bottom arm supporting head
3. Top hand behind head

**Execution:**
1. Crunch sideways bringing ribs toward hip
2. Focus on oblique contraction
3. Lower with control

**Key Points:**
- Targets obliques specifically
- Don''t pull on neck
- Feel side muscles working
- Complete set then switch sides', 2, 1, false, false),

('side_hip_abductor', 'Side Hip Abductor', 'bodyweight', ARRAY['bodyweight', 'band'], ARRAY['lower'], ARRAY['glutes'], ARRAY['hip_abductors'], ARRAY['legs'], 0, 0, 0, '**Starting Position:**
1. Lie on side with legs straight
2. Support head with bottom arm
3. Top leg ready to lift

**Execution:**
1. Lift top leg up sideways
2. Feel glutes and hip muscles working
3. Lower with control

**Key Points:**
- Targets hip abductors
- Keep body straight
- Don''t roll forward or back
- Feel outer hip working', 1, 1, false, false),

('side_lying_clam', 'Side Lying Clam', 'bodyweight', ARRAY['bodyweight', 'band'], ARRAY['lower'], ARRAY['glutes'], ARRAY['hip_abductors'], ARRAY['legs'], 0, 0, 0, '**Starting Position:**
1. Lie on side with knees bent
2. Feet together
3. Support head with bottom arm

**Execution:**
1. Lift top knee while keeping feet together
2. Feel glutes working
3. Lower with control

**Key Points:**
- Great glute activation exercise
- Keep feet together
- Don''t roll back
- Feel glutes working', 1, 1, false, false),

('side_plank', 'Side Plank', 'bodyweight', ARRAY['bodyweight'], ARRAY['core'], ARRAY['obliques'], ARRAY['abs', 'shoulders'], ARRAY['core'], 0, 0, 0, '**Starting Position:**
1. Lie on side with forearm on ground
2. Stack feet on top of each other
3. Lift hips off ground

**Execution:**
1. Hold side plank position
2. Keep body in straight line
3. Breathe normally

**Key Points:**
- Targets obliques and core
- Keep body straight
- Don''t let hips sag
- Build time gradually', 3, 2, false, false),

('single_leg_bridge', 'Single Leg Bridge', 'bodyweight', ARRAY['bodyweight'], ARRAY['lower'], ARRAY['glutes'], ARRAY['hamstrings', 'core'], ARRAY['legs'], 0, 0, 0, '**Starting Position:**
1. Lie on back with one knee bent
2. Other leg extended straight
3. Arms at sides

**Execution:**
1. Drive up through planted heel
2. Squeeze glutes at top
3. Lower with control
4. Complete set then switch legs

**Key Points:**
- More challenging than regular bridge
- Keep hips level
- Drive through planted heel
- Great glute activation', 2, 1, false, false),

('single_leg_calf_raise', 'Single Leg Calf Raise', 'bodyweight', ARRAY['bodyweight'], ARRAY['lower'], ARRAY['calves'], ARRAY[], ARRAY['legs'], 0, 0, 0, '**Starting Position:**
1. Stand on one foot
2. Other foot off ground
3. Hold something for balance if needed

**Execution:**
1. Rise up on toes of planted foot
2. Squeeze calf at top
3. Lower with control
4. Complete set then switch legs

**Key Points:**
- More challenging than two-leg version
- Focus on one calf at a time
- Use balance support if needed
- Full range of motion', 2, 2, false, false),

('single_leg_deadlift', 'Single Leg Deadlift', 'bodyweight', ARRAY['bodyweight', 'dumbbell'], ARRAY['lower'], ARRAY['hamstrings'], ARRAY['glutes', 'core'], ARRAY['legs'], 0, 0, 0, '**Starting Position:**
1. Stand on one leg
2. Other leg ready to extend behind
3. Hold weight if desired

**Execution:**
1. Hinge at hip while extending free leg back
2. Reach toward ground
3. Return to upright position
4. Complete set then switch legs

**Key Points:**
- Challenges balance and stability
- Hip hinge movement
- Keep back straight
- Feel hamstrings and glutes', 3, 3, true, false),

('single_leg_glute_bridge_bench', 'Single Leg Glute Bridge Bench', 'bodyweight', ARRAY['bodyweight'], ARRAY['lower'], ARRAY['glutes'], ARRAY['hamstrings', 'core'], ARRAY['legs'], 0, 0, 0, '**Starting Position:**
1. Lie with upper back on bench
2. One foot on ground, other leg extended
3. Arms for support

**Execution:**
1. Drive up through planted heel
2. Squeeze glutes at top
3. Lower with control
4. Complete set then switch legs

**Key Points:**
- Elevated version increases range
- Keep hips level
- Drive through planted heel
- Feel glutes working hard', 3, 2, false, false),

('single_leg_glute_bridge_straight', 'Single Leg Glute Bridge Straight', 'bodyweight', ARRAY['bodyweight'], ARRAY['lower'], ARRAY['glutes'], ARRAY['hamstrings', 'core'], ARRAY['legs'], 0, 0, 0, '**Starting Position:**
1. Lie on back with one knee bent
2. Other leg straight and elevated
3. Arms at sides

**Execution:**
1. Drive up through bent leg
2. Keep straight leg elevated
3. Squeeze glutes at top
4. Lower with control

**Key Points:**
- Straight leg makes it harder
- Keep elevated leg straight
- Drive through planted heel
- Challenge core stability', 3, 2, false, false),

('single_leg_glute_bridge_bent_knee', 'Single Leg Glute Bridge Bent Knee', 'bodyweight', ARRAY['bodyweight'], ARRAY['lower'], ARRAY['glutes'], ARRAY['hamstrings', 'core'], ARRAY['legs'], 0, 0, 0, '**Starting Position:**
1. Lie on back with one knee bent
2. Other knee pulled toward chest
3. Arms at sides

**Execution:**
1. Drive up through planted heel
2. Keep other knee pulled up
3. Squeeze glutes at top
4. Lower with control

**Key Points:**
- Bent knee position changes angle
- Keep knee pulled toward chest
- Drive through planted heel
- Feel glutes working', 2, 1, false, false),

('single_leg_hip_thrust', 'Single Leg Hip Thrust', 'bodyweight', ARRAY['bodyweight'], ARRAY['lower'], ARRAY['glutes'], ARRAY['hamstrings', 'core'], ARRAY['legs'], 0, 0, 0, '**Starting Position:**
1. Sit with upper back against bench
2. One foot planted, other leg extended
3. Prepare for hip drive

**Execution:**
1. Drive up through planted heel
2. Extend hips fully
3. Squeeze glutes at top
4. Lower with control

**Key Points:**
- Single leg version of hip thrust
- More challenging than bridge
- Keep hips level
- Drive through planted heel', 3, 2, false, false),

('sissy_squat', 'Sissy Squat', 'bodyweight', ARRAY['bodyweight'], ARRAY['lower'], ARRAY['quads'], ARRAY[], ARRAY['legs'], 0, 0, 0, '**Starting Position:**
1. Stand with feet close together
2. Hold something for balance
3. Lean back slightly

**Execution:**
1. Squat down while leaning back
2. Knees track forward
3. Feel intense quad stretch
4. Return to starting position

**Key Points:**
- Very challenging quad exercise
- Unique movement pattern
- Use support for balance
- Build up gradually', 4, 3, true, false),

('sit_up', 'Sit Up', 'bodyweight', ARRAY['bodyweight'], ARRAY['core'], ARRAY['abs'], ARRAY['hip_flexors'], ARRAY['core'], 0, 0, 0, '**Starting Position:**
1. Lie on back with knees bent
2. Feet flat on floor
3. Hands behind head or crossed on chest

**Execution:**
1. Sit all the way up to knees
2. Use abs to lift torso
3. Lower back down with control

**Key Points:**
- Full range of motion
- Different from crunches
- Can be hard on lower back
- Control both directions', 2, 3, false, false),

('skull_crusher', 'Skull Crusher', 'barbell', ARRAY['barbell', 'dumbbell'], ARRAY['upper', 'push'], ARRAY['triceps'], ARRAY[], ARRAY['arms'], 65, 30, 45, '**Starting Position:**
1. Lie on bench with bar held overhead
2. Arms perpendicular to body
3. Grip bar with hands close together

**Execution:**
1. Lower bar toward forehead by bending elbows
2. Keep upper arms stationary
3. Extend elbows to return bar overhead

**Key Points:**
- Keep upper arms still
- Don''t actually hit your skull
- Great triceps isolation
- Control the weight carefully', 3, 4, false, true),

('snatch', 'Snatch', 'barbell', ARRAY['barbell'], ARRAY['full_body', 'olympic'], ARRAY['traps'], ARRAY['full_body'], ARRAY['full_body'], 75, 35, 45, '**Starting Position:**
1. Wide grip on barbell
2. Bar on floor over midfoot
3. Shoulders over bar

**Execution:**
1. First pull: deadlift to knees
2. Second pull: explosive extension
3. Third pull: drop under bar
4. Catch overhead in squat position
5. Stand up to complete lift

**Key Points:**
- Most technical lift in weightlifting
- Requires extensive coaching
- Start very light
- Focus on mobility and technique', 5, 5, true, false),

-- Continue with remaining exercises...
('split_squat', 'Split Squat', 'bodyweight', ARRAY['bodyweight', 'dumbbell'], ARRAY['lower'], ARRAY['quads'], ARRAY['glutes', 'hamstrings'], ARRAY['legs'], 0, 0, 0, '**Starting Position:**
1. Stand in lunge position
2. Front foot planted, rear foot back
3. Most weight on front leg

**Execution:**
1. Lower straight down into lunge
2. Front thigh parallel to ground
3. Drive up through front heel
4. Complete set then switch legs

**Key Points:**
- Static lunge position
- Don''t step in and out
- Focus on front leg
- Control the movement', 2, 2, false, false),

('squat', 'Squat', 'barbell', ARRAY['barbell', 'bodyweight', 'dumbbell'], ARRAY['lower', 'squat'], ARRAY['quads'], ARRAY['glutes', 'hamstrings'], ARRAY['legs'], 135, 60, 95, '**Starting Position:**
1. Bar on upper back (not neck)
2. Feet shoulder-width apart
3. Toes slightly turned out

**Execution:**
1. Sit back and down like sitting in chair
2. Keep chest up and knees out
3. Go to comfortable depth
4. Drive up through heels

**Key Points:**
- King of all exercises
- Keep back straight
- Knees track over toes
- Drive through heels', 3, 3, true, false),

('squat_jump', 'Squat Jump', 'bodyweight', ARRAY['bodyweight'], ARRAY['lower', 'plyometric'], ARRAY['quads'], ARRAY['glutes', 'calves'], ARRAY['legs'], 0, 0, 0, '**Starting Position:**
1. Stand with feet shoulder-width apart
2. Arms at sides

**Execution:**
1. Squat down to comfortable depth
2. Explode up jumping as high as possible
3. Land softly and immediately squat again

**Key Points:**
- Same as jump squat
- Explosive movement
- Soft landings
- High intensity', 3, 3, true, false),

('stair_climber', 'Stair Climber', 'machine', ARRAY['machine'], ARRAY['cardio', 'lower'], ARRAY['quads'], ARRAY['glutes', 'calves'], ARRAY['legs'], 0, 0, 0, '**Starting Position:**
1. Step onto stair climber machine
2. Grab handrails lightly
3. Start slow stepping motion

**Execution:**
1. Step up and down continuously
2. Let machine set the pace
3. Maintain upright posture

**Key Points:**
- Great cardio exercise
- Targets legs well
- Don''t lean on handrails too much
- Adjust speed as needed', 2, 1, false, false),

('standing_calf_raise', 'Standing Calf Raise', 'bodyweight', ARRAY['bodyweight', 'machine', 'barbell'], ARRAY['lower'], ARRAY['calves'], ARRAY[], ARRAY['legs'], 0, 0, 0, '**Starting Position:**
1. Stand on balls of feet on platform
2. Heels hanging off edge
3. Hold weight or use machine

**Execution:**
1. Rise up on toes as high as possible
2. Squeeze calves at top
3. Lower slowly feeling stretch

**Key Points:**
- Full range of motion important
- Squeeze at the top
- Control the stretch at bottom
- Can do bodyweight or weighted', 1, 1, false, false),

('step_up', 'Step Up', 'bodyweight', ARRAY['bodyweight', 'dumbbell'], ARRAY['lower'], ARRAY['quads'], ARRAY['glutes'], ARRAY['legs'], 0, 0, 0, '**Starting Position:**
1. Stand facing box or step
2. One foot on box
3. Hold weights if desired

**Execution:**
1. Step up driving through heel on box
2. Step other foot up to meet it
3. Step down one foot at a time
4. Alternate leading leg

**Key Points:**
- Drive through heel on box
- Don''t push off bottom leg
- Control the descent
- Use appropriate box height', 2, 2, false, false),

('stiff_leg_deadlift', 'Stiff Leg Deadlift', 'barbell', ARRAY['barbell', 'dumbbell'], ARRAY['lower', 'pull'], ARRAY['hamstrings'], ARRAY['glutes'], ARRAY['legs'], 95, 40, 65, '**Starting Position:**
1. Stand holding bar at hip level
2. Legs straight or very slight bend
3. Feet hip-width apart

**Execution:**
1. Lower bar by pushing hips back
2. Keep legs relatively straight
3. Feel stretch in hamstrings
4. Drive hips forward to return

**Key Points:**
- Different from Romanian deadlift
- Less knee bend
- Greater hamstring stretch
- Keep bar close to body', 3, 3, true, false),

('sumo_deadlift', 'Sumo Deadlift', 'barbell', ARRAY['barbell'], ARRAY['lower', 'pull'], ARRAY['quads'], ARRAY['glutes', 'hamstrings'], ARRAY['legs'], 135, 60, 95, '**Starting Position:**
1. Wide stance, toes turned out
2. Arms inside legs
3. Hands closer together on bar

**Execution:**
1. Drive through heels and extend hips
2. Keep chest up
3. Stand tall at top

**Key Points:**
- Different leverages than conventional
- May be easier for some people
- Keep knees out
- More upright torso', 3, 3, true, false),

('sumo_squat', 'Sumo Squat', 'bodyweight', ARRAY['bodyweight', 'dumbbell'], ARRAY['lower'], ARRAY['quads'], ARRAY['glutes', 'adductors'], ARRAY['legs'], 0, 0, 0, '**Starting Position:**
1. Wide stance with toes turned out
2. Hold weight at chest if desired
3. Wider than regular squat

**Execution:**
1. Squat down between legs
2. Keep knees tracking over toes
3. Drive up through heels

**Key Points:**
- Targets inner thighs more
- Toes turned out
- Knees track over toes
- Good for hip mobility', 2, 2, true, false),

('superman', 'Superman', 'bodyweight', ARRAY['bodyweight'], ARRAY['lower'], ARRAY['lower_back'], ARRAY['glutes'], ARRAY['back'], 0, 0, 0, '**Starting Position:**
1. Lie face down on floor
2. Arms extended overhead
3. Legs straight

**Execution:**
1. Lift chest and legs off ground simultaneously
2. Squeeze lower back and glutes
3. Hold briefly then lower

**Key Points:**
- Don''t lift too high
- Feel lower back working
- Keep movements controlled
- Good for back strength', 2, 2, false, false),

('swimming', 'Swimming', 'pool', ARRAY['pool'], ARRAY['cardio', 'full_body'], ARRAY['lats'], ARRAY['shoulders', 'legs'], ARRAY['full_body'], 0, 0, 0, '**Starting Position:**
1. Enter pool
2. Choose swimming stroke
3. Start with easy pace

**Execution:**
1. Swim continuously
2. Focus on technique
3. Breathe regularly

**Key Points:**
- Excellent full body exercise
- Low impact on joints
- Various strokes target different muscles
- Great cardio workout', 2, 1, true, false),

('thruster', 'Thruster', 'barbell', ARRAY['barbell', 'dumbbell'], ARRAY['full_body'], ARRAY['shoulders'], ARRAY['legs', 'triceps'], ARRAY['full_body'], 65, 30, 45, '**Starting Position:**
1. Front squat position with bar
2. Feet shoulder-width apart
3. Bar resting on front of shoulders

**Execution:**
1. Squat down to full depth
2. Drive up explosively
3. Continue momentum to press bar overhead
4. Lower bar back to shoulders

**Key Points:**
- Combination of squat and press
- Use leg drive to help press
- Explosive movement
- High intensity exercise', 4, 3, true, false),

('tricep_dip', 'Tricep Dip', 'bodyweight', ARRAY['bodyweight', 'assisted'], ARRAY['upper', 'push'], ARRAY['triceps'], ARRAY['shoulders', 'chest'], ARRAY['arms'], 0, 0, 0, '**Starting Position:**
1. Grab parallel bars or dip station
2. Support body weight on arms
3. Keep body more upright than chest dips

**Execution:**
1. Lower body until elbows at 90 degrees
2. Press back up to starting position
3. Keep more upright to target triceps

**Key Points:**
- More upright targets triceps
- Don''t go too low
- Control the descent
- Add weight when ready', 3, 3, false, false),

('tricep_extension', 'Tricep Extension', 'dumbbell', ARRAY['dumbbell', 'cable'], ARRAY['upper', 'push'], ARRAY['triceps'], ARRAY[], ARRAY['arms'], 20, 10, 15, '**Starting Position:**
1. Stand or sit holding weight overhead
2. Upper arms vertical
3. Weight behind head

**Execution:**
1. Lower weight behind head by bending elbows
2. Keep upper arms still
3. Extend elbows to return weight overhead

**Key Points:**
- Keep upper arms vertical
- Don''t let elbows flare out
- Control the weight
- Feel triceps stretch', 2, 3, false, false),

('tricep_pushdown', 'Tricep Pushdown', 'cable', ARRAY['cable'], ARRAY['upper', 'push'], ARRAY['triceps'], ARRAY[], ARRAY['arms'], 50, 25, 35, '**Starting Position:**
1. Stand facing cable machine
2. Grab bar or rope with overhand grip
3. Elbows at sides

**Execution:**
1. Push weight down by extending elbows
2. Keep elbows at sides
3. Return with control

**Key Points:**
- Keep elbows stationary
- Don''t use momentum
- Squeeze triceps at bottom
- Control the return', 1, 1, false, false),

('treadmill', 'Treadmill', 'machine', ARRAY['machine'], ARRAY['cardio'], ARRAY['legs'], ARRAY[], ARRAY['legs'], 0, 0, 0, '**Starting Position:**
1. Step onto treadmill
2. Start with slow walking pace
3. Hold handrails initially if needed

**Execution:**
1. Walk or run at desired pace
2. Adjust speed and incline as needed
3. Maintain good posture

**Key Points:**
- Start slow and build up
- Good posture important
- Don''t hold handrails unless needed
- Vary speed and incline', 1, 2, false, false),

('upright_row', 'Upright Row', 'barbell', ARRAY['barbell', 'dumbbell', 'cable'], ARRAY['upper', 'pull'], ARRAY['traps'], ARRAY['shoulders'], ARRAY['shoulders'], 65, 30, 45, '**Starting Position:**
1. Stand holding bar with overhand grip
2. Hands closer than shoulder-width
3. Bar at arm''s length

**Execution:**
1. Pull bar straight up to chest level
2. Keep bar close to body
3. Elbows lead the movement
4. Lower with control

**Key Points:**
- Keep bar close to body
- Don''t pull too high
- Elbows lead the pull
- Can be hard on shoulders for some', 2, 3, false, false),

('walking', 'Walking', 'bodyweight', ARRAY['bodyweight'], ARRAY['cardio'], ARRAY['legs'], ARRAY[], ARRAY['legs'], 0, 0, 0, '**Starting Position:**
1. Stand with good posture
2. Arms at sides

**Execution:**
1. Walk at comfortable pace
2. Maintain good posture
3. Swing arms naturally

**Key Points:**
- Great low impact exercise
- Good for beginners
- Can be done anywhere
- Vary pace and terrain', 1, 1, false, false),

('wall_sit', 'Wall Sit', 'bodyweight', ARRAY['bodyweight'], ARRAY['lower'], ARRAY['quads'], ARRAY['glutes'], ARRAY['legs'], 0, 0, 0, '**Starting Position:**
1. Stand with back against wall
2. Slide down until thighs parallel to floor
3. Feet out from wall

**Execution:**
1. Hold position
2. Keep thighs parallel to floor
3. Breathe normally

**Key Points:**
- Isometric exercise
- Build time gradually
- Keep back against wall
- Feel quads working', 2, 1, false, false),

('wide_grip_lat_pulldown', 'Wide Grip Lat Pulldown', 'cable', ARRAY['cable'], ARRAY['upper', 'pull'], ARRAY['lats'], ARRAY['rhomboids', 'biceps'], ARRAY['back'], 100, 45, 70, '**Starting Position:**
1. Sit at lat pulldown machine
2. Grab bar with wide overhand grip
3. Secure thighs under pads

**Execution:**
1. Pull bar down to upper chest
2. Squeeze shoulder blades together
3. Return with control

**Key Points:**
- Wide grip emphasizes lats
- Pull to upper chest, not behind neck
- Feel lats stretching and contracting
- Control both directions', 2, 2, false, false),

('wide_grip_pull_up', 'Wide Grip Pull Up', 'bodyweight', ARRAY['bodyweight', 'assisted'], ARRAY['upper', 'pull'], ARRAY['lats'], ARRAY['rhomboids', 'biceps'], ARRAY['back'], 0, 0, 0, '**Starting Position:**
1. Hang from bar with wide overhand grip
2. Hands wider than shoulders
3. Full arm extension

**Execution:**
1. Pull body up until chin over bar
2. Focus on using lats
3. Lower with control to full extension

**Key Points:**
- Wide grip targets lats more
- More challenging than regular pull-ups
- Don''t swing or kip
- Build up gradually', 4, 2, true, false),

('wrist_curl', 'Wrist Curl', 'dumbbell', ARRAY['dumbbell', 'barbell'], ARRAY['upper'], ARRAY['forearms'], ARRAY[], ARRAY['arms'], 15, 7, 12, '**Starting Position:**
1. Sit with forearms on thighs
2. Hold weight with underhand grip
3. Hands hanging over knees

**Execution:**
1. Curl wrists up
2. Focus on forearm muscles
3. Lower with control

**Key Points:**
- Targets forearm flexors
- Use light weight
- Small range of motion
- Control both directions', 1, 1, false, false),

('wrist_roller', 'Wrist Roller', 'equipment', ARRAY['equipment'], ARRAY['upper'], ARRAY['forearms'], ARRAY[], ARRAY['arms'], 10, 5, 0, '**Starting Position:**
1. Hold wrist roller device
2. Arms extended in front
3. Weight hanging from string

**Execution:**
1. Roll weight up by rotating wrists
2. Lower weight back down slowly
3. Alternate directions

**Key Points:**
- Great forearm exercise
- Control both directions
- Build up gradually
- Can be very challenging', 3, 2, false, false),

('zercher_squat', 'Zercher Squat', 'barbell', ARRAY['barbell'], ARRAY['lower', 'squat'], ARRAY['quads'], ARRAY['glutes', 'core'], ARRAY['legs'], 95, 40, 65, '**Starting Position:**
1. Bar held in crook of elbows
2. Arms crossed to support bar
3. Feet shoulder-width apart

**Execution:**
1. Squat down keeping bar secure
2. Very upright torso position
3. Drive up through heels

**Key Points:**
- Unique bar position
- Forces upright posture
- Challenges core significantly
- Can be uncomfortable at first', 4, 3, true, false)

ON CONFLICT (exercise_id) DO UPDATE SET
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
    requires_spotter = EXCLUDED.requires_spotter;