import React, { useState, useEffect } from 'react';
import { fetchExercises } from '../utils/api';
import ExerciseCard from '../components/ExerciseCard';
import { Search, Loader2 } from 'lucide-react';

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const [filteredExercises, setFilteredExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadExercises = async () => {
      try {
        setLoading(true);
        const data = await fetchExercises();
        setExercises(data);
        setFilteredExercises(data);
      } catch (err) {
        setError('Failed to load exercises. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    loadExercises();
  }, []);

  useEffect(() => {
    const filtered = exercises.filter(ex => 
        ex.name && ex.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredExercises(filtered);
  }, [searchTerm, exercises]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Exercises</h1>
        <span className="text-sm text-slate-500 dark:text-slate-400">
            {filteredExercises.length} results
        </span>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-slate-400" />
        </div>
        <input 
            type="text" 
            className="block w-full rounded-lg border border-slate-300 bg-white p-4 pl-10 text-sm text-slate-900 focus:border-emerald-500 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder-slate-400 dark:focus:border-emerald-500 dark:focus:ring-emerald-500" 
            placeholder="Search exercises..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-emerald-500" />
        </div>
      ) : error ? (
        <div className="rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900/20 dark:text-red-400">
            {error}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredExercises.map(exercise => (
                <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
            {filteredExercises.length === 0 && (
                <div className="col-span-full py-10 text-center text-slate-500 dark:text-slate-400">
                    No exercises found matching "{searchTerm}"
                </div>
            )}
        </div>
      )}
    </div>
  );
};

export default Exercises;
