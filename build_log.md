Gemini Notes for IronForge Project

Current State (August 13, 2025)

This document summarizes the work done and the current state of the IronForge project, as managed by the Gemini CLI.

1. Project Setup & Environment
	•	Next.js 14 project initialized with App Router, TypeScript, and Tailwind CSS.
	•	shadcn/ui has been successfully initialized and its components (Button, Sheet) are available.
	•	recharts library installed for charting.
	•	Docker setup for local PostgreSQL and Supabase services (docker-compose.yml, Dockerfile) has been created.

2. UI Development & Layout Integration
	•	Core Dashboard Layout: The comprehensive layout from IronForge/ideas/ironforge-app-layout.tsx has been integrated as IronForge/ironforge/src/app/(dashboard)/ironforge-app.tsx. This component now serves as the main application shell for the dashboard, handling navigation and content switching.
	•	Dashboard Routing: The (dashboard)/layout.tsx has been simplified to render IronForgeApp. All previous individual page.tsx files within (dashboard) (e.g., programs, workouts, progress, settings, exercises) have been removed.
	•	Root Page: IronForge/ironforge/src/app/page.tsx was removed, and IronForge/ironforge/src/app/(dashboard)/page.tsx was created to serve the IronForgeApp at the root URL (/).
	•	Plate Calculator: The PlateCalculator component from IronForge/ideas/plate-calculator.tsx has been integrated as a new tab/view within the IronForgeApp.
	•	Program Builder: The advanced ProgramBuilder component from IronForge/ideas/program-builder-interface.tsx has been integrated as a conditional view within the “Programs” tab of IronForgeApp, allowing users to create/edit programs with detailed week/day/exercise structures and FlexCode editor placeholders.
	•	Workout History & Progress: The WorkoutHistoryAndProgress component from IronForge/ideas/workout-history-progress.tsx has been integrated as the content for the “Progress” and “History” tabs within IronForgeApp, including charts and workout history display.
	•	Authentication Pages: Basic login and registration forms are in place.
	•	Goals Page: Added a new Goals page to the dashboard. The page is divided into two columns: one for listing active goals (with circular progress indicators, goal names and current/target values, a “New goal” button, and an archived goals section) and another for showing a progress chart and details for the selected goal. Navigation entry for this page has been added to the IronForgeApp.
	•	Goals Page Enhancements: The Goals page has been iterated on to support drag‑and‑drop reordering of goals via a draggable handle on each goal card, preserving the selected state and list order. A light‑themed slide‑over panel for creating a new goal has been implemented; it opens when the “New goal” button is clicked and fills the content area on desktop screens, while the existing goals list and details are hidden during form entry. The form includes inputs for name, description, color picker, goal type chips, exercise selection, goal value, start and finish dates, and a prominent “Create goal” button. A close button (X) in the top‑right corner allows users to dismiss the panel. The translucent overlay has been lightened to allow some visibility of the underlying app without causing layout issues.
	•	Exercises Page: Added a new Exercises page to the dashboard. The page lists available exercises with columns for name, workout count, and muscle groups, and includes search and sort functionality. Each row has a 3‑dot menu for Edit, Duplicate, Move Data, and Delete actions. A primary “Add exercise” button opens a right‑side sheet with inputs for name and primary muscle groups. Styling and button design have been matched to the app’s existing look and feel.

3. Current Issues & Blockers
	•	Docker Image Pull Issue: The local Supabase setup via docker-compose is currently blocked by persistent “pull access denied” errors for Supabase Docker images (supabase/supabase and supabase/cli). This prevents the backend services from starting.
	•	Dummy Data: All UI components currently use dummy data. No actual backend integration or data persistence is implemented.

4. Where We Left Off
	•	The UI for the core Phase 1 features, and some advanced features from later phases (Plate Calculator, advanced Program Builder, Workout History/Progress, and now Goals), has been built out and integrated into a single-page application structure managed by IronForgeApp.
	•	The new Goals page now supports drag‑and‑drop reordering and includes a fully functional light‑themed slide‑over form for creating goals with a close (X) button.  The form temporarily hides the goals list and fills the content area to avoid overlay issues.
	•	The immediate blocker is still the Docker image pull issue for Supabase.

5. Next Steps (Proposed)
	1.	Resolve Local Supabase Setup: The highest priority is to get a local Supabase environment running. This might involve:
	•	Troubleshooting the current Docker image pull issue (less likely to be resolved by the agent).
	•	Recommended: Switching to the Supabase CLI for local setup (supabase init, supabase start), as previously proposed.
	2.	Integrate Supabase Authentication: Once Supabase is running, implement the authentication logic for the login and registration pages.
	3.	Connect UI to Supabase: Begin connecting the UI components (Programs, Workouts, Goals, etc.) to the Supabase backend for real data storage and retrieval.
	4.	Implement Core Logic: Develop the backend logic for program creation, workout logging, goal tracking (including saving, editing, deleting, and reordering goals), and progress tracking to interact with the Supabase database.

This file serves as a checkpoint for future sessions.

6. UI Refactor & Button Migration Plan

• Summary of Refactor Work Completed:
	– Reorganized dashboard into route-based structure using Next.js App Router.
	– Created IronForgeApp as the main shell chrome with shared navigation config.
	– Added error and loading boundaries to improve UX and resilience.
	– Introduced a centralized `utils.ts` with the `cn` function for conditional classNames.
	– Replaced all button usages with a new `Button` primitive component supporting variants.
	– Restored the header component to the dashboard shell for consistent branding and navigation.

• Step 3 – Button Migration Instructions:

	– Search for all button usages with these commands:
	
	  ```
	  rg --json 'className=.*btn' --json-seq
	  rg --json 'className=.*button' --json-seq
	  rg --json 'className=.*btn-primary' --json-seq
	  ```
	
	– Look for the following patterns in JSX:
	
	  ```tsx
	  <button className="btn btn-primary ...">...</button>
	  <button className="btn btn-subtle ...">...</button>
	  <button className="btn btn-danger ...">...</button>
	  <button className="btn btn-ghost ...">...</button>
	  <Button className="btn btn-primary ..." />
	  ```
	
	– Update imports:
	
	  Before:
	  ```tsx
	  // No import or custom buttons with className "btn ..."
	  ```
	
	  After:
	  ```tsx
	  import { Button } from "@/components/ui/button";
	  ```
	
	– Replace button element and className usage with the `Button` component and `variant` prop:
	
	  **Primary button:**
	  Before:
	  ```tsx
	  <button className="btn btn-primary px-4 py-2">Save</button>
	  ```
	  After:
	  ```tsx
	  <Button variant="primary" className="px-4 py-2">Save</Button>
	  ```
	
	  **Subtle button:**
	  Before:
	  ```tsx
	  <button className="btn btn-subtle">Cancel</button>
	  ```
	  After:
	  ```tsx
	  <Button variant="subtle">Cancel</Button>
	  ```
	
	  **Danger button:**
	  Before:
	  ```tsx
	  <button className="btn btn-danger">Delete</button>
	  ```
	  After:
	  ```tsx
	  <Button variant="danger">Delete</Button>
	  ```
	
	  **Ghost button:**
	  Before:
	  ```tsx
	  <button className="btn btn-ghost">More</button>
	  ```
	  After:
	  ```tsx
	  <Button variant="ghost">More</Button>
	  ```
	
	– For buttons with icon and label, adjust spacing to use the `Button` component’s built-in styles. For example:
	
	  Before:
	  ```tsx
	  <button className="btn btn-primary flex items-center gap-2">
	    <Icon />
	    Save
	  </button>
	  ```
	  After:
	  ```tsx
	  <Button variant="primary">
	    <Icon />
	    Save
	  </Button>
	  ```
	
	– Remove manual spacing classes like `gap-2` if the `Button` component handles icon-label spacing internally.

• Converting Concatenated className to `cn(...)` calls:

	– Identify JSX elements where `className` is constructed via string concatenation or template literals, e.g.:
	
	  ```tsx
	  <div className={"px-4 " + (active ? "bg-blue-500" : "bg-gray-200")}>...</div>
	  ```
	
	– Replace with `cn` from utils:
	
	  ```tsx
	  import { cn } from "@/lib/utils";
	
	  <div className={cn("px-4", active ? "bg-blue-500" : "bg-gray-200")}>...</div>
	  ```
	
	– This improves readability and consistency across the codebase.

• Optional Polish:

	– Add breadcrumbs for better navigation context.
	– Introduce DX guardrails such as lint rules or commit hooks to enforce button usage and className patterns.
	– Use path aliases consistently for imports to reduce relative path hell.

• Sanity Checklist for Verification:

	– Verify all buttons render correctly with appropriate styles and variants.
	– Check that no raw `button` elements with `btn` class remain.
	– Confirm all imports of `Button` come from the new primitive component.
	– Test icon+label buttons for proper spacing.
	– Ensure all concatenated `className` usages are replaced with `cn(...)`.
	– Run the app and verify no UI regressions or console errors.
	– Confirm error/loading boundaries show as expected during slow or error states.
	– Validate navigation and header appear correctly across dashboard routes.

7. Supabase Auth Integration (Paused)

Supabase Auth work was started, including magic link login, profiles table with trigger, and an account page, but is currently paused due to technical issues integrating with `@supabase/auth-helpers-nextjs`.

Future work will utilize `@supabase/ssr` for better compatibility with Next.js App Router.

The following Supabase Auth stubs are included to allow resuming development when ready:

### Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Package Installs

```bash
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
```

### Supabase Client Helpers

```ts
// lib/supabase-client.ts
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// lib/supabase-server.ts
import { createServerClient } from '@supabase/auth-helpers-nextjs';

export const createServerSupabaseClient = (req: any, res: any) =>
  createServerClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
    req,
    res,
  });
```

### Login Page

```tsx
// app/login/page.tsx
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase-client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email });
    if (error) {
      setMessage(error.message);
    } else {
      setMessage('Check your email for the login link!');
    }
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleLogin}>Send Magic Link</button>
      {message && <p>{message}</p>}
    </div>
  );
}
```

### Auth Callback Route

```tsx
// app/api/auth/callback/route.ts
import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export async function GET(req: Request) {
  const res = NextResponse.next();
  const supabase = createServerSupabaseClient(req, res);

  const { data, error } = await supabase.auth.getSession();

  if (error || !data.session) {
    return NextResponse.redirect('/login');
  }

  return res;
}
```

### SQL for Profiles Table and Trigger

```sql
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  full_name text,
  avatar_url text,
  website text
);

create or replace function public.handle_profile_update()
returns trigger as $$
begin
  if new.full_name <> old.full_name then
    update profiles set updated_at = now() where id = new.id;
  end if;
  return new;
end;
$$ language plpgsql;

create trigger update_profiles_updated_at
before update on profiles
for each row execute function public.handle_profile_update();
```

### Account Page

```tsx
// app/(dashboard)/account/page.tsx
import { createServerSupabaseClient } from '@/lib/supabase-server';

export default async function AccountPage() {
  const supabase = createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return <p>Please log in to view your account.</p>;
  }

  return (
    <div>
      <h1>Account</h1>
      <p>Email: {session.user.email}</p>
      {/* Additional profile info here */}
    </div>
  );
}
```

### Sign Out Route

```tsx
// app/api/auth/signout/route.ts
import { NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';

export async function POST(req: Request) {
  const res = NextResponse.next();
  const supabase = createServerSupabaseClient(req, res);

  await supabase.auth.signOut();

  return NextResponse.redirect('/login');
}
```

This concludes the current Supabase Auth integration stubs. Development will resume once the integration issues are resolved.