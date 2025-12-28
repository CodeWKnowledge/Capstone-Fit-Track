import React, { useState, useEffect } from 'react';
import { Dumbbell, Scale, Activity, Plus } from 'lucide-react';
import StatCard from '../components/StatCard';
import WorkoutHistory from '../components/WorkoutHistory';
import WorkoutForm from '../components/WorkoutForm';
import ProgressChart from '../components/ProgressChart';
import { fetchExercises } from '../utils/api';

const Dashboard = ({ workouts, onAddWorkout, onDeleteWorkout, onEditWorkout }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [exercises, setExercises] = useState([]);

  // Load exercises for the dropdown
  useEffect(() => {
    const loadData = async () => {
        try {
            const data = await fetchExercises();
            setExercises(data);
        } catch (e) {
            console.error("Failed to load exercises for form", e);
        }
    };
    loadData();
  }, []);

  const handleEditClick = (workout) => {
    setEditingWorkout(workout);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingWorkout(null);
  };

  // Calculate Stats
  const totalWorkouts = workouts.length;
  const totalVolume = workouts.reduce((acc, curr) => acc + (curr.weight * curr.sets * curr.reps), 0);
  const totalSets = workouts.reduce((acc, curr) => acc + curr.sets, 0);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
            <p className="text-slate-500 dark:text-slate-400">Welcome back, keep pushing your limits!</p>
        </div>
        <button 
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-emerald-500/30 transition-all hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 dark:focus:ring-emerald-800"
        >
            <Plus className="h-5 w-5" />
            Log Workout
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard title="Total Workouts" value={totalWorkouts} icon={Dumbbell} color="blue" />
        <StatCard title="Volume Lifted" value={`${(totalVolume / 1000).toFixed(1)}k kg`} icon={Scale} color="violet" />
        <StatCard title="Total Sets" value={totalSets} icon={Activity} color="orange" />
      </div>

      {/* Main Content Area */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
             <div className="mb-8">
                <ProgressChart workouts={workouts} />
             </div>

             <WorkoutHistory 
                workouts={workouts} 
                onDelete={onDeleteWorkout} 
                onEdit={handleEditClick}
             />
        </div>
        
        <div>
            {/* Side Content / Motivation / Quick Stats */}
            <div className="rounded-xl border border-slate-200 bg-emerald-50 p-6 dark:border-slate-800 dark:bg-emerald-900/10">
                <h3 className="mb-2 text-lg font-bold text-emerald-900 dark:text-emerald-100">Daily Tip</h3>
                <p className="text-sm text-emerald-700 dark:text-emerald-300">
                    Consistency is key. Even a short workout is better than no workout. Hydrate well and listen to your body!
                </p>
            </div>
        </div>
      </div>

      {showForm && (
        <WorkoutForm 
            exercises={exercises} 
            onSave={(workout) => {
                if (editingWorkout) {
                    onEditWorkout(workout);
                } else {
                    onAddWorkout(workout);
                }
            }} 
            onClose={handleCloseForm} 
            initialData={editingWorkout}
        />
      )}
    </div>
  );
};

export default Dashboard;
