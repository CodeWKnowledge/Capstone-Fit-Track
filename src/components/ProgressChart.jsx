import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

const ProgressChart = ({ workouts = [] }) => {
  // Get unique exercise names from workouts
  const exerciseNames = useMemo(() => {
    const names = new Set(workouts.map(w => w.exerciseName));
    return Array.from(names);
  }, [workouts]);

  const [selectedExercise, setSelectedExercise] = useState(exerciseNames[0] || '');

  // Update selected exercise if list changes and current selection is invalid
  React.useEffect(() => {
    if (!selectedExercise && exerciseNames.length > 0) {
        setSelectedExercise(exerciseNames[0]);
    }
  }, [exerciseNames, selectedExercise]);

  // Prepare data for the chart
  const chartData = useMemo(() => {
    if (!selectedExercise) return [];

    const exerciseWorkouts = workouts
        .filter(w => w.exerciseName === selectedExercise)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Group by date or just map? Let's just map for every session for now.
    // If multiple sets, maybe plot max weight per session?
    // Let's use 1RM estimate or just Max Weight lifted in that session.
    // Or simpler: One point per log entry. The user logs "Sets x Reps @ Weight".
    
    return exerciseWorkouts.map(w => ({
        date: format(new Date(w.date), 'MM/dd'),
        fullDate: format(new Date(w.date), 'PP p'),
        weight: w.weight,
        volume: w.sets * w.reps * w.weight
    }));
  }, [workouts, selectedExercise]);

  if (workouts.length === 0) {
    return (
        <div className="flex h-64 items-center justify-center rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <p className="text-slate-500 dark:text-slate-400">Log some workouts to see your progress!</p>
        </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white">Progress Tracking</h3>
        
        {exerciseNames.length > 0 && (
            <select
                className="rounded-lg border border-slate-300 bg-white p-2 text-sm text-slate-900 focus:border-emerald-500 focus:ring-emerald-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                value={selectedExercise}
                onChange={(e) => setSelectedExercise(e.target.value)}
            >
                {exerciseNames.map(name => (
                    <option key={name} value={name}>{name}</option>
                ))}
            </select>
        )}
      </div>

      <div className="h-64 w-full">
        {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                    <XAxis 
                        dataKey="date" 
                        stroke="#94a3b8" 
                        tick={{ fontSize: 12 }} 
                        tickLine={false}
                        axisLine={false}
                    />
                    <YAxis 
                        stroke="#94a3b8" 
                        tick={{ fontSize: 12 }} 
                        tickLine={false}
                        axisLine={false}
                        label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft', style: { fill: '#94a3b8' } }}
                    />
                    <Tooltip 
                        contentStyle={{ 
                            backgroundColor: 'white', 
                            borderRadius: '0.5rem', 
                            border: '1px solid #e2e8f0',
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                        }}
                    />
                    <Line 
                        type="monotone" 
                        dataKey="weight" 
                        stroke="#10b981" 
                        strokeWidth={2} 
                        dot={{ fill: '#10b981', r: 4 }} 
                        activeDot={{ r: 6 }} 
                    />
                </LineChart>
            </ResponsiveContainer>
        ) : (
             <div className="flex h-full items-center justify-center text-slate-400">
                Not enough data for this exercise.
             </div>
        )}
      </div>
    </div>
  );
};

export default ProgressChart;
