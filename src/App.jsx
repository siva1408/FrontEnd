import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaHome,
  FaTasks,
  FaChartLine,
  FaCog,
  FaBook,
  FaBriefcase,
  FaMoon,
  FaSun,
} from 'react-icons/fa';
import HomeView from './views/HomeView';
import TasksView from './views/TasksView';
import useThemeStore from './store/themeStore';
import { useTabVisibility } from './hooks/useTabVisibility';
import { useIdleDetection } from './hooks/useIdleDetection';
import useTimerStore from './store/timerStore';
import confetti from 'canvas-confetti';

const VIEWS = {
  HOME: 'home',
  TASKS: 'tasks',
  ANALYTICS: 'analytics',
  JOURNAL: 'journal',
  SETTINGS: 'settings',
};

function App() {
  const [currentView, setCurrentView] = useState(VIEWS.HOME);
  const { currentTheme, setTheme } = useThemeStore();
  const { pause } = useTimerStore();

  // Tab visibility - auto pause when tab is hidden
  useTabVisibility((isVisible) => {
    if (!isVisible) {
      pause();
    }
  });

  // Idle detection - auto pause after 5 minutes of inactivity
  useIdleDetection(5 * 60 * 1000, () => {
    pause();
  });

  // Initialize theme on mount
  useEffect(() => {
    setTheme(currentTheme);
  }, []);

  // Request notification permission
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const toggleTheme = () => {
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  };

  const renderView = () => {
    switch (currentView) {
      case VIEWS.HOME:
        return <HomeView />;
      case VIEWS.TASKS:
        return <TasksView />;
      case VIEWS.ANALYTICS:
        return (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Analytics
            </h1>
            <div className="card">
              <p className="text-gray-600 dark:text-gray-400">
                Analytics dashboard coming soon! Track your productivity trends,
                heatmaps, and detailed statistics.
              </p>
            </div>
          </div>
        );
      case VIEWS.JOURNAL:
        return (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Journal
            </h1>
            <div className="card">
              <p className="text-gray-600 dark:text-gray-400">
                Journal feature coming soon! Write notes, reflections, and export
                your entries.
              </p>
            </div>
          </div>
        );
      case VIEWS.SETTINGS:
        return (
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Settings
            </h1>
            <div className="card">
              <p className="text-gray-600 dark:text-gray-400">
                Settings panel coming soon! Customize timer durations, sounds,
                themes, and more.
              </p>
            </div>
          </div>
        );
      default:
        return <HomeView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="text-3xl">🍅</div>
              <h1 className="text-2xl font-bold text-gradient">PomodoroFlow</h1>
            </div>

            {/* Nav items */}
            <div className="flex items-center space-x-1">
              <NavButton
                icon={<FaHome />}
                label="Home"
                active={currentView === VIEWS.HOME}
                onClick={() => setCurrentView(VIEWS.HOME)}
              />
              <NavButton
                icon={<FaTasks />}
                label="Tasks"
                active={currentView === VIEWS.TASKS}
                onClick={() => setCurrentView(VIEWS.TASKS)}
              />
              <NavButton
                icon={<FaChartLine />}
                label="Analytics"
                active={currentView === VIEWS.ANALYTICS}
                onClick={() => setCurrentView(VIEWS.ANALYTICS)}
              />
              <NavButton
                icon={<FaBook />}
                label="Journal"
                active={currentView === VIEWS.JOURNAL}
                onClick={() => setCurrentView(VIEWS.JOURNAL)}
              />
              <NavButton
                icon={<FaCog />}
                label="Settings"
                active={currentView === VIEWS.SETTINGS}
                onClick={() => setCurrentView(VIEWS.SETTINGS)}
              />

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-3 ml-4 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                {currentTheme === 'light' ? <FaMoon /> : <FaSun />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Confetti canvas for celebrations */}
      <canvas
        id="confetti-canvas"
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-50"
      />
    </div>
  );
}

const NavButton = ({ icon, label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center space-x-2 px-4 py-2 rounded-lg
        font-medium text-sm transition-all duration-200
        ${
          active
            ? 'bg-primary-600 text-white shadow-md'
            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
        }
      `}
    >
      <span>{icon}</span>
      <span className="hidden md:inline">{label}</span>
    </button>
  );
};

export default App;
