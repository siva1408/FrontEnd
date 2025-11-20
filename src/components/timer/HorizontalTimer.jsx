import React from 'react';
import { motion } from 'framer-motion';
import { formatTime } from '../../utils/time';

const HorizontalTimer = ({ timeLeft, totalTime, mode }) => {
  const progress = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;

  const getModeColor = () => {
    switch (mode) {
      case 'work':
        return 'bg-red-500';
      case 'short_break':
        return 'bg-green-500';
      case 'long_break':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getModeGradient = () => {
    switch (mode) {
      case 'work':
        return 'from-red-500 to-red-600';
      case 'short_break':
        return 'from-green-500 to-green-600';
      case 'long_break':
        return 'from-blue-500 to-blue-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      {/* Time display */}
      <div className="text-center">
        <motion.div
          className="text-8xl md:text-9xl font-bold text-gray-900 dark:text-white"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          key={timeLeft}
        >
          {formatTime(timeLeft)}
        </motion.div>

        <div className="mt-4 text-lg md:text-xl font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wider">
          {mode === 'work'
            ? 'Focus Time'
            : mode === 'short_break'
            ? 'Short Break'
            : 'Long Break'}
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
        <motion.div
          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${getModeGradient()} rounded-full shadow-lg`}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: 'linear' }}
        />

        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
      </div>

      {/* Progress percentage */}
      <div className="text-center text-sm font-medium text-gray-500 dark:text-gray-400">
        {Math.round(progress)}% Complete
      </div>
    </div>
  );
};

export default HorizontalTimer;
