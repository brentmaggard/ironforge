# IronForge

IronForge is a modern, AI-powered workout tracking Progressive Web Application (PWA) inspired by Liftosaur. This project is built with Next.js 14, TypeScript, Tailwind CSS, and `shadcn/ui`. It aims to provide a comprehensive platform for programmable workouts, workout execution, and progress tracking.

## Project Overview

This application is being developed in phases, starting with core functionalities and progressively adding advanced features like a custom scripting language (FlexCode) and AI integration for program generation.

## Features

### Current UI Features (as of last update)

-   **Comprehensive Dashboard:** Integrated layout with responsive navigation (sidebar/hamburger menu).
-   **Authentication:** Basic Login and Registration forms.
-   **Workout Management:**
    -   View a list of workouts.
    -   Interactive interface to log sets for a workout.
-   **Program Management:**
    -   View a list of programs.
    -   Advanced program builder with support for defining weeks, days, and exercises, including placeholders for simple and FlexCode progression logic.
-   **Progress Tracking:**
    -   Dedicated pages for Workout History, Progress Charts (with dummy data and Recharts integration), and Analytics Dashboard.
-   **Utilities:**
    -   Plate Calculator with visual barbell representation and equipment settings.
-   **Exercise Database:** A page to view a list of exercises with details.

## Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm (or yarn/pnpm)
-   Git
-   Docker (for local Supabase setup, if chosen)
-   Supabase CLI (recommended for local Supabase setup)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/brentmaggard/ironforge.git
    cd ironforge
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Application

1.  **Start the Next.js development server:**
    ```bash
    npm run dev
    ```
    The application will typically run on `http://localhost:3000`.

2.  **Access the application:**
    Open your web browser and navigate to `http://localhost:3000`.

## Local Supabase Setup (Recommended)

Due to Docker image pull issues with `docker-compose` for Supabase services, it is highly recommended to set up local Supabase using the Supabase CLI.

1.  **Install Supabase CLI:**
    On macOS:
    ```bash
    brew install supabase/supabase/supabase
    ```
    For other OS, refer to: [https://supabase.com/docs/guides/cli/getting-started#install-the-supabase-cli](https://supabase.com/docs/guides/cli/getting-started#install-the-supabase-cli)

2.  **Initialize Supabase in your project:**
    Navigate to the `ironforge` project root:
    ```bash
    cd /Users/brentmaggard/Documents/projects/IronForge/ironforge
    ```
    Then:
    ```bash
    supabase init
    ```

3.  **Start Supabase services:**
    ```bash
    supabase start
    ```
    This will provide local Supabase URLs and keys.

4.  **Update Environment Variables:**
    Create a `.env.local` file in the `ironforge` project root and add the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` provided by `supabase start`.

## Development Workflow

-   **UI Development:** Continue building out components and pages.
-   **Backend Integration:** Once Supabase is running, connect UI components to the database for data persistence.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.