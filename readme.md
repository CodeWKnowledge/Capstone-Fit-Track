# FitTrack - Personal Fitness Tracker

FitTrack is a modern, responsive fitness tracking application built with React, Tailwind CSS, and Vite. It allows users to log workouts, track their progress over time, and browse exercises using the WGER API.

## Features

- **Dashboard**: View summary statistics (Total Workouts, Volume, Sets) and recent activity.
- **Workout Logging**: Easily log exercises, sets, reps, and weight.
- **Progress Tracking**: Visualize your progress with interactive charts powered by Recharts.
- **Exercise Library**: Browse and search a comprehensive list of exercises fetched from the WGER API.
- **Dark Mode**: Fully supported dark/light theme.
- **Responsive Design**: Optimized for mobile and desktop devices.
- **Persistence**: Data is saved to your browser's LocalStorage.

## Tech Stack

- **Frontend**: React.js (Vite)
- **Styling**: Tailwind CSS
- **State Management**: React Hooks + LocalStorage
- **Data Fetching**: Native Fetch API (WGER API)
- **Visualization**: Recharts
- **Icons**: Lucide React

## Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## Project Structure

- `src/components`: Reusable UI components (Navbar, WorkoutCard, etc.)
- `src/pages`: Main application views (Dashboard, Exercises)
- `src/hooks`: Custom React hooks (useLocalStorage)
- `src/utils`: Utility functions (API client)

## API Integration

This app uses the [WGER API](https://wger.de/en/software/api) to fetch exercise data. No API key is required for basic access, but rate limits may apply.

## Deployment

The project is ready for deployment on Vercel or Netlify.
1. Connect your repository.
2. Set the build command to `npm run build`.
3. Set the output directory to `dist`.
