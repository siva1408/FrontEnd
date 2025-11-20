import React from 'react';
import { motion } from 'framer-motion';
import { formatTime } from '../../utils/time';

const CircularTimer = ({ timeLeft, totalTime, mode }) => {
  const progress = totalTime > 0 ? (timeLeft / totalTime) * 100 : 0;
  const radius = 140;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getModeColor = () => {
    switch (mode) {
      case 'work':
        return '#ef4444'; // red
      case 'short_break':
        return '#10b981'; // green
      case 'long_break':
        return '#3b82f6'; // blue
      default:
        return '#6b7280'; // gray
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-80 h-80 md:w-96 md:h-96">
        <svg
          className="transform -rotate-90 w-full h-full"
          viewBox="0 0 320 320"
        >
          {/* Background circle */}
          <circle
            cx="160"
            cy="160"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            className="text-gray-200 dark:text-gray-700"
          />

          {/* Progress circle */}
          <motion.circle
            cx="160"
            cy="160"
            r={radius}
            stroke={getModeColor()}
            strokeWidth="12"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-linear"
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
          />
        </svg>

        {/* Time display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.div
            className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            key={timeLeft}
          >
            {formatTime(timeLeft)}
          </motion.div>

          <div className="mt-4 text-sm md:text-base font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
            {mode === 'work'
              ? 'Focus Time'
              : mode === 'short_break'
              ? 'Short Break'
              : 'Long Break'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularTimer;
