import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import useLocalStorage from './hooks/useLocalStorage';
import Exercises from './pages/Exercises';
import Dashboard from './pages/Dashboard';

function App() {
  const [isDarkMode, setIsDarkMode] = useLocalStorage('isDarkMode', false);
  const [workouts, setWorkouts] = useLocalStorage('workouts', []);

  useEffect(() => {
    // Apply dark mode class to html element
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const addWorkout = (workout) => {
    setWorkouts([workout, ...workouts]);
  };

  const deleteWorkout = (id) => {
    setWorkouts(workouts.filter(w => w.id !== id));
  };

  const editWorkout = (updatedWorkout) => {
    setWorkouts(workouts.map(w => w.id === updatedWorkout.id ? updatedWorkout : w));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 transition-colors duration-200">
      <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      
      <main className="container mx-auto py-8 px-4">
        <Routes>
            <Route path="/" element={<Dashboard workouts={workouts} onAddWorkout={addWorkout} onDeleteWorkout={deleteWorkout} onEditWorkout={editWorkout} />} />
            <Route path="/exercises" element={<Exercises />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
