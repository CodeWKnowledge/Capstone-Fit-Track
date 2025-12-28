import { Link, NavLink } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';

const Navbar = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white">
            <Dumbbell className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">FitTrack</span>
        </Link>
        
        <div className="flex items-center gap-4">
            <NavLink 
              to="/" 
              className={({ isActive }) => `text-sm font-medium transition-colors hover:text-emerald-600 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-400'}`}
            >
              Dashboard
            </NavLink>
            <NavLink 
              to="/exercises" 
              className={({ isActive }) => `text-sm font-medium transition-colors hover:text-emerald-600 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-600 dark:text-slate-400'}`}
            >
              Exercises
            </NavLink>
            <button 
                onClick={toggleDarkMode}
                className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50"
            >
                {isDarkMode ? '🌙' : '☀️'}
            </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
