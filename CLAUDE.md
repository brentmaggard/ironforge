# IronForge - Claude Project Context & Progress

## Project Overview

**IronForge** is a modern, AI-powered workout tracking Progressive Web Application (PWA) inspired by Liftosaur. It features a phased approach starting with JSON-based program configurations and eventually implementing a custom scripting language called **FlexCode** that allows users to define complex workout progression and deload logic using JavaScript-like syntax.

### Original Inspiration & Reference
- **Original Project**: [Liftosaur](https://github.com/astashov/liftosaur)
  - **Live App**: https://www.liftosaur.com
  - **Documentation**: https://www.liftosaur.com/docs
  - **Liftoscript Reference**: https://www.liftosaur.com/docs/docs/liftoscript-overview.html
- **License**: MIT (allows for replication and modification)
- **Key Innovation**: Programmable workouts with custom scripting language

### Development Philosophy
- **Phased Complexity**: Start with JSON-based program configurations, evolve to full FlexCode scripting
- **Local Development**: Complete Docker + local Supabase environment
- **Stack-First Learning**: Master Next.js/Docker/Supabase before AI features
- **Modern Stack**: Next.js 14, TypeScript, Supabase, Prisma alternatives
- **Offline-First**: PWA capabilities for gym use

## Technology Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode)
- **UI Library**: shadcn/ui + Tailwind CSS
- **State Management**: Zustand + React Query (@tanstack/react-query)
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts (progress visualization)
- **Icons**: Lucide React

### Backend & Database
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (email/password, magic links)
- **API**: Next.js API Routes with server-side Supabase client
- **Validation**: Zod schemas (shared between client/server)

### Development Tools
- **Build**: Next.js with Turbopack
- **Code Quality**: ESLint, Prettier, TypeScript strict
- **Package Manager**: npm

## Project Structure

```
ironforge/
├── src/
│   ├── app/                          # Next.js app directory
│   │   ├── (auth)/                   # Authentication pages  
│   │   │   ├── login/page.tsx        # ✅ Magic link login
│   │   │   ├── register/page.tsx     # ✅ User registration  
│   │   │   ├── callback/route.ts     # ✅ Auth callback handler
│   │   │   └── callback-client/page.tsx # ✅ Client-side auth completion
│   │   ├── (dashboard)/              # Main application pages
│   │   │   ├── goals/page.tsx        # ✅ Goals management page
│   │   │   ├── workouts/page.tsx     # 🔲 Workout tracking (placeholder)
│   │   │   ├── programs/page.tsx     # 🔲 Program management (placeholder)
│   │   │   ├── progress/page.tsx     # 🔲 Progress charts (placeholder)
│   │   │   ├── exercises/page.tsx    # 🔲 Exercise database (placeholder)
│   │   │   ├── settings/page.tsx     # 🔲 User settings (placeholder)
│   │   │   └── layout.tsx            # ✅ Dashboard layout with navigation
│   │   ├── api/                      # API endpoints
│   │   │   ├── goals/                # ✅ Goals CRUD operations
│   │   │   │   ├── route.ts          # ✅ GET, POST, PUT operations
│   │   │   │   └── [id]/route.ts     # ✅ Individual goal operations
│   │   │   ├── exercises/route.ts    # ✅ Exercise data endpoint
│   │   │   └── debug/auth/route.ts   # ✅ Authentication debugging
│   │   ├── globals.css               # ✅ Tailwind + CSS variables
│   │   └── layout.tsx                # ✅ Root layout with providers
│   ├── components/                   # Reusable UI components
│   │   ├── ui/                       # ✅ shadcn/ui base components
│   │   └── goals/                    # Goals-specific components
│   │       └── CreateGoalForm.tsx    # ✅ Comprehensive goal creation form
│   ├── hooks/                        # Custom React hooks
│   │   └── useGoals.ts               # ✅ Goals state management with React Query
│   ├── lib/                          # Utility libraries
│   │   ├── supabase/                 # ✅ Supabase client configurations
│   │   │   ├── client.ts             # ✅ Browser client (SSR compatible)
│   │   │   └── server.ts             # ✅ Server client for API routes
│   │   └── utils.ts                  # ✅ Utility functions (cn, etc.)
│   ├── providers/                    # React context providers
│   │   ├── QueryProvider.tsx         # ✅ React Query configuration
│   │   └── Providers.tsx             # ✅ Combined providers + toast notifications
│   ├── types/                        # TypeScript definitions
│   │   └── goals.ts                  # ✅ Complete goal type definitions & validation
│   └── config/                       # Configuration files
│       └── nav.ts                    # ✅ Navigation configuration
├── database/                         # Database schema & migrations
│   └── goals_schema.sql              # ✅ Complete SQL migration for goals system
├── scripts/                          # Development scripts
│   └── setup-database.md             # ✅ Database setup instructions
├── .env.local                        # ✅ Environment configuration
├── package.json                      # ✅ Dependencies and scripts
└── CLAUDE.md                         # 📄 This file
```

## Implementation Status

### ✅ COMPLETED FEATURES

#### **Goals System (Fully Functional)**
- **Database Schema**: Complete goals and exercises tables with RLS policies
- **API Endpoints**: Full CRUD operations (Create, Read, Update, Delete, Archive, Reorder)
- **Authentication**: Magic link login, user registration, session management
- **UI Components**: 
  - Modern goals dashboard with real-time updates
  - Comprehensive goal creation form with validation
  - Progress visualization with charts and progress circles
  - Drag & drop reordering functionality
  - Archive/restore capabilities
- **State Management**: React Query integration with optimistic updates
- **Data Types**: 6 goal types (strength, endurance, weight_loss, weight_gain, consistency, custom)
- **Progress Tracking**: Visual progress indicators and trend charts
- **Form Validation**: Comprehensive Zod schemas for type safety
- **Error Handling**: Loading states, error boundaries, user feedback
- **Responsive Design**: Mobile-first approach with proper touch interactions

#### **Authentication System**
- **Supabase Integration**: Proper SSR cookie handling
- **Magic Link Flow**: Email-based passwordless authentication  
- **Registration**: User account creation with email verification
- **Session Management**: Persistent sessions across page reloads
- **Protected Routes**: API endpoints secured with Row Level Security
- **Callback Handling**: Both PKCE and implicit OAuth flows supported

#### **Development Infrastructure**
- **TypeScript**: Strict mode configuration with comprehensive types
- **Next.js 14**: App Router with server and client components
- **Supabase**: Database, auth, and real-time subscriptions
- **UI Framework**: shadcn/ui components with Tailwind CSS
- **State Management**: React Query for server state, React hooks for local state
- **Form Handling**: React Hook Form with Zod validation
- **Code Quality**: ESLint configuration with TypeScript support

### 🔲 PLANNED FEATURES (Not Yet Implemented)

#### **Workout Tracking System**
- **Workout Sessions**: Create and log workout sessions
- **Set Tracking**: Log reps, weight, RPE for each set
- **Rest Timers**: Configurable rest periods between sets
- **Workout History**: Historical workout data and statistics
- **Program Integration**: Execute programmed workouts

#### **Program Management System**  
- **JSON Programs**: Simple program configuration system (Phase 1)
- **Program Builder**: Visual program creation interface
- **Built-in Programs**: Starting Strength, 5/3/1, StrongLifts, etc.
- **Program Import/Export**: Share and backup programs
- **FlexCode Scripting**: Advanced programming language (Phase 2)

#### **Exercise Database**
- **Exercise Library**: Comprehensive exercise database
- **Muscle Groups**: Exercise categorization and filtering
- **Instructions**: Exercise form and technique guidance
- **Equipment Tracking**: Manage available gym equipment
- **Exercise Substitutions**: Alternative exercise suggestions

#### **Progress Analytics**
- **Strength Progress**: Track 1RM progression over time
- **Volume Tracking**: Weekly/monthly volume analysis  
- **Body Measurements**: Weight, body fat, measurements
- **Performance Metrics**: Velocity, power, endurance metrics
- **Progress Photos**: Visual progress documentation

#### **Advanced Features**
- **AI Integration**: Natural language program generation
- **Plate Calculator**: Visual barbell loading calculator
- **Deload Detection**: Automatic plateau detection and deload suggestions
- **Program Optimization**: AI-powered program recommendations
- **Social Features**: Share workouts and progress with friends

### 🔧 TECHNICAL DEBT & IMPROVEMENTS NEEDED

#### **Code Quality**
- **ESLint Warnings**: Multiple unused imports and variables to clean up
- **TypeScript Strict**: Some `any` types still need proper typing
- **Component Optimization**: Some components could be split into smaller pieces
- **Error Boundaries**: Add more comprehensive error handling

#### **Performance Optimizations**
- **Bundle Size**: Code splitting for better loading times
- **Image Optimization**: Implement proper image handling
- **Caching**: Service worker for offline functionality
- **Database Queries**: Optimize queries with proper indexing

#### **User Experience**
- **Loading States**: More sophisticated loading indicators
- **Animations**: Smooth transitions and micro-interactions
- **Accessibility**: ARIA labels and keyboard navigation
- **Mobile UX**: Touch-specific optimizations

## Database Schema

### Current Tables

#### **goals**
```sql
- id: UUID (Primary Key)
- user_id: UUID (Foreign Key to auth.users)
- name: VARCHAR(100) (Goal name)
- description: TEXT (Optional description)
- color: VARCHAR(7) (Hex color code)
- goal_type: ENUM (strength, endurance, weight_loss, weight_gain, consistency, custom)
- exercise_id: UUID (Optional reference to exercises)
- exercise_name: VARCHAR(100) (Optional exercise name)
- target_value: DECIMAL(10,2) (Goal target)
- current_value: DECIMAL(10,2) (Current progress)
- unit: VARCHAR(20) (lbs, kg, reps, minutes, etc.)
- start_date: DATE (Goal start date)
- target_date: DATE (Optional target completion date)
- is_archived: BOOLEAN (Archive status)
- display_order: INTEGER (UI ordering)
- created_at/updated_at: TIMESTAMP (Audit fields)
```

#### **exercises**
```sql
- id: UUID (Primary Key)
- name: VARCHAR(100) (Exercise name)
- category: VARCHAR(50) (Exercise category)
- muscle_groups: TEXT[] (Target muscle groups)
- instructions: TEXT (Exercise instructions)
- equipment_needed: TEXT[] (Required equipment)
- is_compound: BOOLEAN (Compound vs isolation)
- created_at: TIMESTAMP (Creation date)
```

#### **goal_progress** (Inherited from previous session)
- Progress tracking history for goals

#### **profiles** (Inherited from previous session)
- User profile information

### Future Tables Needed

#### **programs**
```sql
- id, user_id, name, description
- program_config: JSON (Phase 1) / FlexCode script (Phase 2)
- config_type: ENUM (json, flexcode)
- is_public, tags, created_at, updated_at
```

#### **workouts**
```sql
- id, user_id, program_id, name, date
- duration, notes, created_at
- state: JSON (program state variables)
```

#### **workout_sets**
```sql
- id, workout_id, exercise_id, set_number
- reps, weight, rpe, is_warmup
- notes, created_at
```

## Environment Configuration

### Required Environment Variables
```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Development
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Development Commands
```bash
# Start development server
npm run dev

# Build for production  
npm run build

# Run linting
npm run lint

# Database operations (when using Prisma)
npx prisma studio
npx prisma generate
npx prisma migrate dev
```

## Recent Session Accomplishments

### **Session Date**: August 14, 2025 (Continued)

#### **Previous Issues Resolved**
1. **Authentication Cookie Problem**: Fixed Supabase SSR cookie handling that was preventing authenticated API calls
2. **Callback URL Issues**: Resolved magic link callback 404 errors by fixing redirect URLs
3. **TypeScript Compilation**: Fixed all major TypeScript errors and API route parameter types
4. **Goals API Integration**: Successfully connected React components to Supabase backend
5. **Form Validation**: Implemented comprehensive goal creation with proper validation
6. **Select Component Bug**: Fixed empty string values in Select components causing React errors

#### **Latest Session Issues Resolved**
7. **Select Component Empty String Bug**: Fixed remaining Select component issues with proper value handling
8. **Modal Save Button Visibility**: Fixed CreateGoalForm modal layout to ensure save button is always visible
9. **Form Default Values**: Set proper undefined defaults for optional fields to prevent React warnings

#### **Code Changes Made**
- Updated Supabase client to use `createBrowserClient` from `@supabase/ssr`
- Fixed server-side Supabase client to use async cookies and proper cookie methods
- Updated all API routes to handle Next.js 15 async params
- Created functional register page with proper validation
- Fixed callback route to handle both PKCE and implicit OAuth flows
- Implemented comprehensive goals dashboard with real-time updates
- **Fixed CreateGoalForm Select components**: Proper value handling for exercise and unit selections
- **Improved modal layout**: Fixed flexbox layout to ensure form buttons are always visible
- **Enhanced form defaults**: Set explicit undefined values for optional fields

#### **Current Status**
- ✅ **Goals system is fully functional** - users can create, edit, delete, and track goals
- ✅ **Authentication working** - magic link login and registration functional  
- ✅ **Database connected** - all goals operations persist to Supabase
- ✅ **UI polished** - modern, responsive interface with proper loading/error states
- ✅ **Goal creation form working** - all form fields, validation, and submission functional
- ✅ **Save button accessible** - modal layout ensures form actions are always visible
- 🔄 **Ready for comprehensive testing** - core functionality needs systematic validation

## Testing Requirements & Quality Assurance

### **Comprehensive Testing Plan (Current Priority)**

The goals system is functionally complete but requires systematic testing to identify and resolve any remaining issues before proceeding to the next features.

#### **Critical Test Areas**

**1. Goal Creation Workflow**
- ✅ Save button visibility (RESOLVED)
- ✅ Select component values (RESOLVED)
- 🔄 **NEEDS TESTING**: Form validation edge cases
- 🔄 **NEEDS TESTING**: All goal types and unit auto-selection
- 🔄 **NEEDS TESTING**: Exercise selection for strength goals
- 🔄 **NEEDS TESTING**: Color selection and persistence
- 🔄 **NEEDS TESTING**: Date selection and validation

**2. Goal Management Operations**
- 🔄 **NEEDS TESTING**: Goal list display and selection
- 🔄 **NEEDS TESTING**: Archive/unarchive functionality
- 🔄 **NEEDS TESTING**: Delete with confirmation dialog
- 🔄 **NEEDS TESTING**: Drag and drop reordering
- 🔄 **NEEDS TESTING**: Progress calculations and display

**3. UI/UX Functionality**
- 🔄 **NEEDS TESTING**: Responsive design on mobile devices
- 🔄 **NEEDS TESTING**: Modal behavior (open/close/escape key)
- 🔄 **NEEDS TESTING**: Loading states during operations
- 🔄 **NEEDS TESTING**: Error handling and user feedback
- 🔄 **NEEDS TESTING**: Show/hide archived goals toggle

**4. Data Persistence & API**
- 🔄 **NEEDS TESTING**: Goal creation persists to database
- 🔄 **NEEDS TESTING**: Goal updates save correctly
- 🔄 **NEEDS TESTING**: Proper error handling for API failures
- 🔄 **NEEDS TESTING**: Data consistency after page reload

#### **Automated Testing Strategy**

**Puppeteer Test Suite**: Comprehensive end-to-end testing covering:
- Page load and authentication flow
- Complete goal creation workflow (all field types)
- Form validation and error states
- Goal management operations (archive, delete, reorder)
- UI interactions and responsive behavior
- Data persistence verification

#### **Testing Workflow**
1. **Run Puppeteer test suite** to identify all functional issues
2. **Document issues systematically** using TodoWrite for tracking
3. **Prioritize fixes**: Critical → High → Medium → Low
4. **Fix issues iteratively** with immediate verification
5. **Re-test after fixes** to ensure no regression
6. **Clean up test data** and prepare for next development phase

### **Post-Testing Next Steps**

**Only after comprehensive testing is complete and all critical issues are resolved:**

#### **Immediate (Next Session)**
1. **Address all testing findings**: Fix any bugs or issues discovered
2. **Workout Tracking MVP**: Basic workout logging functionality
3. **Exercise Database**: Expand exercise library and categorization
4. **Program Builder**: Simple JSON-based program creation

### **Short Term (1-2 Sessions)**
1. **Progress Analytics**: Enhanced charts and progress tracking
2. **Plate Calculator**: Visual barbell loading calculator
3. **Profile Management**: User settings and preferences
4. **Data Export**: Backup and data portability features

### **Medium Term (3-5 Sessions)**
1. **PWA Implementation**: Offline functionality and app-like experience
2. **Program Library**: Built-in popular programs (5/3/1, Starting Strength, etc.)
3. **Advanced Analytics**: Volume tracking, strength progression analysis
4. **Mobile Optimizations**: Touch interactions and mobile-specific features

### **Long Term (Future Phases)**
1. **FlexCode Implementation**: Custom scripting language for programs
2. **AI Integration**: Natural language program generation
3. **Social Features**: Share progress and workouts
4. **Advanced Program Logic**: Complex periodization and auto-regulation

## Development Guidelines

### **Code Standards**
- **TypeScript Strict Mode**: All new code must pass strict type checking
- **Component Structure**: Use React Server Components where possible, Client Components for interactivity
- **Error Handling**: Every API call should have proper error boundaries and user feedback
- **Accessibility**: All interactive elements need proper ARIA labels and keyboard navigation
- **Mobile First**: Design and test on mobile devices first

### **Database Patterns**
- **Row Level Security**: All tables must have RLS policies for user data isolation
- **Audit Fields**: created_at and updated_at timestamps on all user data tables
- **Soft Deletes**: Use is_archived flags instead of hard deletes where appropriate
- **Indexing**: Add database indexes for commonly queried fields

### **State Management Patterns**
- **Server State**: Use React Query for API data with optimistic updates
- **Local State**: Use React useState/useReducer for component-local state
- **Global State**: Use Zustand for complex global state (avoid if possible)
- **Form State**: Use React Hook Form with Zod validation schemas

## Known Issues & Technical Notes

### **Current Limitations**
- **No Offline Support**: App requires internet connection (PWA planned)
- **Limited Exercise Data**: Basic exercise database needs expansion
- **No Program Logic**: Currently only goals tracking, no workout programs
- **Basic Analytics**: Progress visualization is simple, needs enhancement

### **Browser Compatibility**
- **Modern Browsers**: Designed for Chrome, Firefox, Safari (latest versions)
- **Mobile Safari**: Tested on iOS Safari, proper PWA support needed
- **Progressive Enhancement**: Core functionality works without JavaScript

### **Performance Notes**
- **React Query Caching**: 5-minute stale time for goals data
- **Optimistic Updates**: Goals operations update UI immediately
- **Image Loading**: No image optimization implemented yet
- **Bundle Size**: No code splitting implemented yet

## Current Development Status & Priorities

### **Immediate Action Required**
**Status**: Goals system implementation is complete but requires comprehensive testing before proceeding to next features.

**Current Priority**: Run systematic testing using Puppeteer to validate all functionality and identify any remaining issues.

### **Testing-First Development Approach**
This project follows a **test-driven quality assurance** approach:
1. **Complete feature implementation** ✅ (Goals system done)
2. **Comprehensive testing** 🔄 (Current phase)
3. **Issue identification and resolution** 🔄 (Pending test results)
4. **Quality validation** 🔄 (Ensure all functionality works correctly)
5. **Next feature development** ⏸️ (Only after testing complete)

### **Quality Gates**
Before proceeding to workout tracking implementation:
- ✅ All critical bugs must be resolved
- ✅ Core user workflows must be fully functional
- ✅ UI/UX must be polished and responsive
- ✅ Data persistence must be reliable
- ✅ Error handling must be comprehensive

---

## For Future Claude Sessions

This document represents the complete current state of the IronForge project as of August 14, 2025. The **goals system implementation is complete** and ready for comprehensive testing. 

**Critical Next Steps**:
1. **Run comprehensive Puppeteer test suite** to validate all functionality
2. **Systematically fix all identified issues** using TodoWrite for tracking
3. **Validate fixes through targeted re-testing**
4. **Only then proceed to workout tracking system implementation**

**Key Points for Continuation**:
- Goals system code is complete but needs testing validation
- Authentication and database infrastructure are stable
- Follow test-first quality approach before new features
- Maintain high code quality and user experience standards
- Build incrementally with proper testing at each step
- Use TodoWrite for systematic issue tracking and resolution