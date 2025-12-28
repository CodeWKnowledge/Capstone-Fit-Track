import React from 'react';

const ExerciseCard = ({ exercise }) => {
  // Strip HTML from description for preview
  const descriptionPreview = exercise.description 
    ? exercise.description.replace(/<[^>]*>?/gm, '').slice(0, 100) + '...'
    : 'No description available.';

  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="relative mb-4 h-48 overflow-hidden rounded-lg bg-slate-100 dark:bg-slate-800">
        {exercise.image ? (
            <img 
                src={exercise.image} 
                alt={exercise.name} 
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                loading="lazy"
            />
        ) : (
            <div className="flex h-full w-full items-center justify-center text-slate-300 dark:text-slate-600">
                {/* Fallback pattern or icon */}
                <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </div>
        )}
      </div>

      <h3 className="mb-2 text-xl font-semibold text-slate-900 dark:text-white">
        {exercise.name}
      </h3>
      
      <div className="flex-grow">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {descriptionPreview}
          </p>
      </div>

      <div className="mt-4 flex items-center justify-between">
         {/* Placeholder for tags or actions */}
         <span className="text-xs font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Base Exercise
         </span>
         
         {/* Future: Add to workout button */}
      </div>
    </div>
  );
};

export default ExerciseCard;
