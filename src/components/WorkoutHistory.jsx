import React from 'react';
import { format } from 'date-fns';
import { Calendar, Trash2, Edit2 } from 'lucide-react';

const WorkoutHistory = ({ workouts = [], onDelete, onEdit }) => {
  if (workouts.length === 0) {
    return (
        <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400">No workouts logged yet. Start training!</p>
        </div>
    );
  }

  // Sort by date desc
  const sortedWorkouts = [...workouts].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-900 dark:text-white">Recent Activity</h2>
      <div className="space-y-3">
        {sortedWorkouts.map(workout => (
            <div key={workout.id} className="relative flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400">
                        <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-slate-900 dark:text-white">{workout.exerciseName}</h3>
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <span>{workout.sets} sets × {workout.reps} reps</span>
                            <span className="text-slate-300 dark:text-slate-700">•</span>
                            <span>{workout.weight} kg</span>
                            <span className="text-slate-300 dark:text-slate-700">•</span>
                            <span className="text-xs">{format(new Date(workout.date), 'MMM d, h:mm a')}</span>
                        </div>
                    </div>
                </div>
                
                <div className="flex gap-2">
                    {onEdit && (
                        <button 
                            onClick={() => onEdit(workout)}
                            className="rounded-md p-2 text-slate-400 hover:bg-emerald-50 hover:text-emerald-500 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-400"
                            aria-label="Edit workout"
                        >
                            <Edit2 className="h-4 w-4" />
                        </button>
                    )}
                    {onDelete && (
                        <button 
                            onClick={() => onDelete(workout.id)}
                            className="rounded-md p-2 text-slate-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                            aria-label="Delete workout"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    )}
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutHistory;
