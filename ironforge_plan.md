# IronForge - Claude Project Context

## Project Overview

**IronForge** is a modern, AI-powered workout tracking Progressive Web Application (PWA) inspired by Liftosaur. It features a phased approach starting with JSON-based program configurations and eventually implementing a custom scripting language called **FlexCode** that allows users to define complex workout progression and deload logic using JavaScript-like syntax.

### Original Inspiration & Reference
- **Original Project**: [Liftosaur](https://github.com/astashov/liftosaur)
  - **Live App**: https://www.liftosaur.com
  - **Documentation**: https://www.liftosaur.com/docs
  - **Liftoscript Reference**: https://www.liftosaur.com/docs/docs/liftoscript-overview.html
  - **Program Examples**: https://www.liftosaur.com/programs
- **License**: MIT (allows for replication and modification)
- **Language**: Original is written in TypeScript with Preact
- **Key Features to Replicate**: Programmable workouts, workout execution, progress tracking

### Key Innovation & Development Approach
- **Phased Complexity**: Start with JSON-based program configurations, evolve to full FlexCode scripting
- **Local Development**: Complete Docker + local Supabase environment
- **Stack-First Learning**: Master Next.js/Docker/Supabase before AI features
- **Modern Stack**: Next.js 14, TypeScript, local Supabase, Prisma, Docker
- **Offline-First**: PWA with service worker for offline functionality
- **Data Layer**: Supabase Cloud (managed Postgres) — no local Docker

## Project Goals

### Primary Objectives
- **Learning Focus**: Modern web development stack mastery (Next.js, Docker, Supabase)
- **Personal Tool**: Build for personal use and sharing with friends
- **General Fitness**: Target broader audience beyond programmers
- **Feature Parity**: Recreate all Liftosaur functionality with modern improvements
- **AI Enhancement**: Add natural language program generation (later phases)

### Success Criteria
- Full-featured workout tracking with programmable routines
- Local Docker development environment with Supabase
- Progressive Web App capabilities
- JSON-based program builder (Phase 1) evolving to FlexCode (Phase 2)
- Form-based program builder for non-programmers
- Offline functionality matching or exceeding original Liftosaur

## Development Philosophy & Approach

### Phased Development Strategy
1. **Phase 1**: Supabase Cloud connection, basic auth (magic link), JSON-based programs
2. **Phase 2**: Full FlexCode interpreter implementation
3. **Phase 3**: AI integration for program generation
4. **Phase 4**: Advanced PWA features and optimizations

### Code Delivery Approach
- **Complete Components**: Full, production-ready code files provided
- **Liftosaur Analysis**: Explain original concepts as we build IronScript equivalents
- **Stack-First Learning**: Master infrastructure before advanced features
- **Fresh Build**: Complete new project setup (ignoring previous Docker issues)

## Technology Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode)
- **UI Library**: shadcn/ui + Tailwind CSS
- **State Management**: Zustand + React Query
- **Forms**: React Hook Form + Zod validation
- **Code Editor**: Monaco Editor (for future FlexCode syntax highlighting)
- **Charts**: Recharts (progress visualization)
- **Animations**: Framer Motion
- **PWA**: Custom service worker + manifest

### Backend & Database
- **Database**: Supabase Cloud (managed Postgres)
- **ORM / DB access**: Direct Supabase client first; Prisma (optional) for typed models & migrations
- **API**: Next.js Route Handlers (App Router); server actions where practical
- **Authentication**: Supabase Auth (magic link / OAuth) via `@supabase/ssr`
- **Validation**: Zod schemas (shared between client/server)
- **File Storage**: Supabase Storage (for future image features)

### DevOps & Infrastructure
- **Hosting**: Vercel (primary). Alternatives: Netlify, Render
- **Secrets**: Env vars in Vercel Project Settings and local `.env.local`
- **CI/CD**: GitHub Actions (typecheck, lint, build) + Vercel preview deploys
- **Monitoring**: (Later) Vercel analytics + Supabase logs

## Core Features

### Phase 1 MVP Features (Foundation)
- [ ] Connect to Supabase Cloud project (URL + anon key); environment configured
- [ ] User authentication (Supabase Auth magic link) with profiles table & RLS
- [ ] JSON-based program configuration system (simpler than FlexCode)
- [ ] Form-based program builder (drag-and-drop/form interface)
- [ ] Workout execution interface with real-time logging
- [ ] Basic progress tracking and charts

### Phase 2 Features (Advanced Programming)
- [ ] Full FlexCode scripting engine (JavaScript-like interpreter)
- [ ] Advanced FlexCode editor with syntax highlighting and debugging
- [ ] Built-in program library (5/3/1, Starting Strength, StrongLifts, etc.)
- [ ] Program import/export functionality

### Phase 3 Features (AI Enhancement)
- [ ] AI program generator (natural language → JSON configs first, then FlexCode)
- [ ] Smart exercise suggestions and program optimization
- [ ] Personalized recommendations based on progress patterns

### Phase 4 Features (PWA & Advanced)
- [ ] Plate calculator with visual barbell representation
- [ ] Equipment management (plates, barbells, dumbbells)
- [ ] Rest timer with notifications
- [ ] Exercise database with instructions and muscle groups
- [ ] Comprehensive progress analytics and insights
- [ ] Body measurement tracking
- [ ] Exercise substitution system
- [ ] PWA with offline sync capabilities
- [ ] Multiple program management
- [ ] Deload and plateau-breaking algorithms

## Database Schema

### Core Entities

#### Users Table
```sql
users (
  id: UUID PRIMARY KEY,
  email: STRING UNIQUE,
  name: STRING,
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP,
  settings: JSON -- preferences, units, equipment
)
```

#### Programs Table
```sql
programs (
  id: UUID PRIMARY KEY,
  user_id: UUID REFERENCES users(id),
  name: STRING,
  description: TEXT,
  program_config: JSON, -- JSON-based config (Phase 1) or FlexCode script (Phase 2)
  config_type: ENUM('json', 'flexcode'), -- tracks which system is used
  is_public: BOOLEAN DEFAULT false,
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP,
  tags: STRING[] -- difficulty, muscle groups, etc.
)
```

#### Exercises Table
```sql
exercises (
  id: UUID PRIMARY KEY,
  name: STRING,
  category: STRING, -- squat, bench, deadlift, etc.
  muscle_groups: STRING[],
  instructions: TEXT,
  equipment_needed: STRING[],
  is_compound: BOOLEAN,
  created_at: TIMESTAMP
)
```

#### Workouts Table
```sql
workouts (
  id: UUID PRIMARY KEY,
  user_id: UUID REFERENCES users(id),
  program_id: UUID REFERENCES programs(id),
  name: STRING,
  date: DATE,
  duration: INTERVAL,
  notes: TEXT,
  created_at: TIMESTAMP,
  state: JSON -- program state variables
)
```

#### WorkoutSets Table
```sql
workout_sets (
  id: UUID PRIMARY KEY,
  workout_id: UUID REFERENCES workouts(id),
  exercise_id: UUID REFERENCES exercises(id),
  set_number: INTEGER,
  reps: INTEGER,
  weight: DECIMAL,
  rpe: DECIMAL, -- Rate of Perceived Exertion
  is_warmup: BOOLEAN DEFAULT false,
  notes: TEXT,
  created_at: TIMESTAMP
)
```

## Program Configuration Systems

### Phase 1: JSON-Based Program Configuration
Simple, structured approach that covers most common progression patterns:

```json
{
  "name": "Starting Strength",
  "exercises": [
    {
      "name": "Squat",
      "progression": {
        "type": "linear",
        "increment": "5lb",
        "deloadAfter": 3,
        "deloadPercent": 0.9
      },
      "sets": 3,
      "reps": 5
    }
  ]
}
```

**Supported Progression Types:**
- `linear`: Add weight each session
- `percentage`: Based on training max (5/3/1 style)
- `wave`: Undulating periodization
- `custom`: For complex patterns

### Phase 2: FlexCode Scripting Language
Full JavaScript-like programming for complex logic:

```javascript
// Linear progression with deloads
if (completedReps >= targetReps) {
  state.weight = state.weight + 5lb
} else {
  state.failures = state.failures + 1
}

// Deload logic
if (state.failures >= 3) {
  state.failures = 0
  state.weight = state.weight * 0.9
}

// 5/3/1 percentage work
state.trainingMax = state.oneRepMax * 0.9
if (week % 4 == 1) {
  state.weight = state.trainingMax * 0.85
  targetReps = "5+"
}
```

## Detailed Development Plan

### Phase 1: Environment Setup & Foundation (Weeks 1-2)
1.  **Docker + Supabase Environment:**
    *   Create complete `docker-compose.yml` with local Supabase setup
    *   Configure PostgreSQL, Supabase API, and Auth services
    *   Set up the Next.js app service with proper environment variables
    *   Create initialization scripts for database and Supabase
2.  **Project Foundation:**
    *   Initialize Next.js 14 project with TypeScript (strict mode)
    *   Set up project structure as defined in documentation
    *   Configure Prisma with local Supabase connection
    *   Create initial database migration and seed data
3.  **UI Foundation:**
    *   Install and configure shadcn/ui and Tailwind CSS
    *   Create basic layout with header and navigation
    *   Set up routing structure for auth and dashboard

### Phase 2: Authentication & JSON Program System (Weeks 3-4)
1.  **Authentication Integration:**
    *   Implement Supabase Auth with local instance
    *   Create registration and login pages with forms
    *   Set up Zustand store for auth state management
    *   Protect dashboard routes with authentication
2.  **JSON Program Configuration:**
    *   Design JSON schema for common program types
    *   Create program builder UI with form-based approach
    *   Implement JSON program interpreter (simpler than FlexCode)
    *   Build program CRUD operations and API routes

### Phase 3: Workout Execution & Progress Tracking (Weeks 5-6)
1.  **Workout Engine:**
    *   Create workout execution interface
    *   Implement JSON program interpretation for workout generation
    *   Build set logging and rest timer components
    *   Save workout history with state persistence
2.  **Progress Visualization:**
    *   Create progress tracking dashboards
    *   Implement charts with Recharts
    *   Build analytics for volume, strength progression
    *   Export and data visualization features

### Phase 4: FlexCode Implementation (Future)
1.  **FlexCode Parser:**
    *   Research and implement parser (likely using chevrotain.js)
    *   Create FlexCode interpreter with state management
    *   Build Monaco Editor integration with syntax highlighting
2.  **Migration System:**
    *   Convert JSON programs to FlexCode equivalents
    *   Provide both simple (JSON) and advanced (FlexCode) modes
    *   Maintain backward compatibility

## Project Structure

```
ironforge/
├── docker-compose.yml          # Docker services with local Supabase
├── Dockerfile                  # Next.js application container
├── supabase/                   # Local Supabase configuration
│   ├── config.toml            # Supabase settings
│   └── seed.sql               # Initial data setup
├── package.json               # Dependencies and scripts
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── migrations/            # Database migrations
│   └── seed.ts               # Sample data seeding
├── public/
│   ├── manifest.json         # PWA manifest
│   └── sw.js                # Service worker
├── src/
│   ├── app/                   # Next.js app directory
│   │   ├── (auth)/           # Authentication pages
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (dashboard)/      # Main application
│   │   │   ├── programs/
│   │   │   ├── workouts/
│   │   │   ├── progress/
│   │   │   └── settings/
│   │   ├── api/              # API routes
│   │   │   ├── auth/
│   │   │   ├── programs/
│   │   │   ├── workouts/
│   │   │   └── ai/           # Future AI integration
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Landing page
│   ├── components/           # Reusable UI components
│   │   ├── ui/              # shadcn/ui components
│   │   ├── workout/         # Workout execution
│   │   ├── program/         # Program management
│   │   └── charts/          # Progress visualization
│   ├── lib/                 # Utility libraries
│   │   ├── program-configs/ # JSON program interpreters
│   │   ├── flexcode/        # Future FlexCode interpreter
│   │   ├── supabase/        # Database client
│   │   ├── utils.ts         # General utilities
│   │   └── validations.ts   # Zod schemas
│   ├── stores/              # Zustand state management
│   │   ├── authStore.ts
│   │   ├── workoutStore.ts
│   │   └── programStore.ts
│   └── types/               # TypeScript definitions
└── scripts/
    └── setup-local-dev.sh    # Development environment setup
```

## Key Liftosaur Concepts to Replicate

### 1. Program Structure
**Liftosaur Approach**: Programs contain exercises with Liftoscript for progression logic
**IronForge Adaptation**: 
- Phase 1: JSON-based configs for common patterns
- Phase 2: FlexCode scripting for advanced users
- Both phases maintain state persistence between workouts

### 2. Workout Execution
**Liftosaur Approach**: Real-time workout interface with set logging and timers
**IronScript Adaptation**: 
- Mobile-first workout execution interface
- Touch-optimized set logging
- Progressive Web App capabilities for offline gym use

### 3. State Management
**Liftosaur Approach**: Program state variables persist between workouts
**IronScript Adaptation**:
- JSON configs maintain simple state (weights, failures)
- FlexCode allows complex state manipulation
- Database storage with Prisma for reliability

### 4. Progress Tracking
**Liftosaur Approach**: Charts and analytics for strength progression
**IronScript Adaptation**:
- Modern chart library (Recharts) with responsive design
- Advanced analytics with React Query caching
- Export capabilities for data portability

## Environment Configuration

### Docker Services
```yaml
# docker-compose.yml structure
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: ironforge
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password

  supabase:
    image: supabase/supabase:latest
    depends_on:
      - postgres
    environment:
      DATABASE_URL: postgresql://postgres:password@postgres:5432/ironforge
      JWT_SECRET: your-jwt-secret
      ANON_KEY: your-anon-key
      SERVICE_ROLE_KEY: your-service-role-key

  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://postgres:password@postgres:5432/ironforge
      NEXT_PUBLIC_SUPABASE_URL: http://supabase:8000
      NEXT_PUBLIC_SUPABASE_ANON_KEY: your-anon-key
    depends_on:
      - supabase
```

### Environment Variables
```bash
# .env.local
DATABASE_URL="postgresql://postgres:password@localhost:5432/ironforge"
NEXT_PUBLIC_SUPABASE_URL="http://localhost:8000"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
# Future Phase 3
OPENAI_API_KEY="sk-your-openai-key"
```

## Development Workflow

### Local Development Commands
```bash
# Initial setup
git clone <repo-url>
cd ironforge

# Start all services (Postgres + Supabase + Next.js)
docker-compose up -d

# Database operations
docker-compose exec app npx prisma migrate dev
docker-compose exec app npm run db:seed
docker-compose exec app npx prisma studio

# Development
docker-compose exec app npm run dev
docker-compose exec app npm run lint
docker-compose exec app npm run test

# Supabase management
docker-compose exec supabase supabase status
docker-compose exec supabase supabase db reset
```

## Important Technical Considerations

### Performance & Architecture
- **Offline-First**: Core features work without internet using service workers
- **Mobile-Optimized**: Touch-first interface design for gym environments  
- **Type Safety**: End-to-end TypeScript with strict mode and Prisma
- **Progressive Enhancement**: JSON configs provide simple path, FlexCode adds power
- **Local Development**: Complete environment runs locally without external dependencies

### Security & Data Management
- **Local Supabase**: Full control over authentication and data storage
- **Data Validation**: Zod schemas for JSON configs and API validation
- **State Persistence**: Reliable workout state storage between sessions
- **Backup Strategy**: Easy data export and program sharing capabilities

### Learning & Development Goals
- **Stack Mastery**: Deep understanding of Next.js, Docker, Supabase ecosystem
- **Progressive Complexity**: Start simple, add advanced features incrementally
- **Real-World Application**: Build something personally useful while learning
- **Modern Practices**: Current best practices for full-stack development

## Next Steps & Ready State

### Ready to Begin Development
- **Environment First**: Set up complete Docker + local Supabase environment
- **Complete Code Delivery**: Expecting full, production-ready components and files
- **Concept Explanation**: Need analysis of Liftosaur patterns as we implement equivalents
- **Fresh Start**: New project setup without previous configuration issues

### Priority Order
1. **Docker + Supabase Setup**: Complete local development environment
2. **Basic Authentication**: User registration and login with local Supabase
3. **JSON Program System**: Simple but functional program configuration
4. **Workout Execution**: Core functionality for logging workouts
5. **Progress Tracking**: Basic charts and analytics
6. **FlexCode Implementation**: Advanced scripting capabilities (future phase)
7. **AI Integration**: Natural language program generation (future phase)

---

## Context for Future Claude Sessions

This document represents the complete, updated project specification for IronForge incorporating all refinements from our discussion:

- **Phased complexity approach** (JSON → FlexCode → AI)
- **Complete code file delivery** methodology
- **Local Supabase + Docker environment** setup
- **Stack-first learning** priority over AI features
- **Fresh build approach** ignoring previous Docker issues
- **Liftosaur concept analysis** as we build equivalents

The project is ready for implementation starting with the Docker + local Supabase environment setup, followed by building features incrementally with complete, production-ready code components.