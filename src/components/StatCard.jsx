import React from 'react';

const StatCard = ({ title, value, icon: Icon, color = "emerald" }) => {
  const colorClasses = {
    emerald: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
    blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
    violet: "bg-violet-100 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400",
    orange: "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400",
  };

  return (
    <div className="flex items-center rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className={`mr-4 flex h-12 w-12 items-center justify-center rounded-full ${colorClasses[color]}`}>
        {Icon && <Icon className="h-6 w-6" />}
      </div>
      <div>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
        <p className="text-2xl font-bold text-slate-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
};

export default StatCard;
