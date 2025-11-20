import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaFire, FaExpand } from 'react-icons/fa';
import Timer from '../components/timer/Timer';
import XPProgressBar from '../components/gamification/XPProgressBar';
import FocusMode from '../components/focus/FocusMode';
import useTimerStore from '../store/timerStore';
import useGamificationStore from '../store/gamificationStore';
import { getGreeting } from '../utils/time';

const HomeView = () => {
  const [isFocusMode, setIsFocusMode] = useState(false);
  const { totalFocusedMinutes, streak } = useTimerStore();
  const { totalPomodoros } = useGamificationStore();

  if (isFocusMode) {
    return <FocusMode onExit={() => setIsFocusMode(false)} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
          {getGreeting()}! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Ready to crush your goals today?
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Focus Time Today
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {totalFocusedMinutes}m
              </p>
            </div>
            <div className="text-4xl">⏱️</div>
          </div>
        </motion.div>

        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Total Pomodoros
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                {totalPomodoros}
              </p>
            </div>
            <div className="text-4xl">🍅</div>
          </div>
        </motion.div>

        <motion.div
          className="card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Current Streak
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
                {streak.current}
                <FaFire className="text-orange-500 ml-2" />
              </p>
            </div>
            <div className="text-4xl">🔥</div>
          </div>
        </motion.div>
      </div>

      {/* XP Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <XPProgressBar />
      </motion.div>

      {/* Timer */}
      <motion.div
        className="card relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <button
          onClick={() => setIsFocusMode(true)}
          className="absolute top-6 right-6 p-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors duration-200 shadow-lg flex items-center space-x-2"
        >
          <FaExpand />
          <span className="text-sm font-medium">Focus Mode</span>
        </button>

        <Timer />
      </motion.div>
    </div>
  );
};

export default HomeView;
