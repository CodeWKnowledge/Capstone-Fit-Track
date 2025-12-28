import React, { useState } from 'react';
import { Plus, X, Save } from 'lucide-react';

const WorkoutForm = ({ exercises = [], onSave, onClose, initialData = null }) => {
  const [exerciseId, setExerciseId] = useState(initialData ? initialData.exerciseId : '');
  const [sets, setSets] = useState(initialData ? initialData.sets : '');
  const [reps, setReps] = useState(initialData ? initialData.reps : '');
  const [weight, setWeight] = useState(initialData ? initialData.weight : '');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!exerciseId || !sets || !reps || !weight) {
      setError('Please fill in all fields');
      return;
    }

    const selectedExercise = exercises.find(ex => ex.id === parseInt(exerciseId));
    
    // If editing, keep ID and Date, else generate new
    onSave({
      id: initialData ? initialData.id : Date.now(),
      exerciseId: parseInt(exerciseId),
      exerciseName: selectedExercise ? selectedExercise.name : (initialData ? initialData.exerciseName : 'Unknown Exercise'),
      sets: parseInt(sets),
      reps: parseInt(reps),
      weight: parseFloat(weight),
      date: initialData ? initialData.date : new Date().toISOString()
    });
    
    // Clear form or close
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md scale-100 rounded-2xl bg-white p-6 shadow-2xl transition-all dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {initialData ? 'Edit Workout' : 'Log Workout'}
            </h2>
            <button onClick={onClose} className="rounded-full p-1 hover:bg-slate-100 dark:hover:bg-slate-800">
                <X className="h-5 w-5 text-slate-500" />
            </button>
        </div>

        {error && (
            <div className="mb-4 rounded-md bg-red-50 p-2 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                {error}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Exercise</label>
                <select 
                    className="w-full rounded-lg border border-slate-300 bg-white p-2.5 text-slate-900 focus:border-emerald-500 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                    value={exerciseId}
                    onChange={(e) => setExerciseId(e.target.value)}
                >
                    <option value="">Select an exercise</option>
                    {exercises.map(ex => (
                        <option key={ex.id} value={ex.id}>{ex.name}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Sets</label>
                    <input 
                        type="number" 
                        min="1"
                        className="w-full rounded-lg border border-slate-300 p-2.5 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        value={sets} 
                        onChange={e => setSets(e.target.value)}
                        placeholder="3"
                    />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Reps</label>
                    <input 
                        type="number" 
                        min="1"
                        className="w-full rounded-lg border border-slate-300 p-2.5 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        value={reps} 
                        onChange={e => setReps(e.target.value)}
                        placeholder="10"
                    />
                </div>
                <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300">Weight (kg)</label>
                    <input 
                        type="number" 
                        min="0"
                        step="0.5"
                        className="w-full rounded-lg border border-slate-300 p-2.5 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        value={weight} 
                        onChange={e => setWeight(e.target.value)}
                        placeholder="50"
                    />
                </div>
            </div>

            <button 
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-800"
            >
                <Save className="h-4 w-4" />
                Save Workout
            </button>
        </form>
      </div>
    </div>
  );
};

export default WorkoutForm;
