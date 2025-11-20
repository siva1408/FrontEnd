import React from 'react';
import { motion } from 'framer-motion';
import { formatTime } from '../../utils/time';

const MinimalTimer = ({ timeLeft, totalTime, mode }) => {
  const getModeColor = () => {
    switch (mode) {
      case 'work':
        return 'text-red-500';
      case 'short_break':
        return 'text-green-500';
      case 'long_break':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {/* Time display - Extra large */}
      <motion.div
        className={`text-9xl md:text-[12rem] font-bold ${getModeColor()} font-mono tracking-tight`}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        key={timeLeft}
        transition={{ duration: 0.3 }}
      >
        {formatTime(timeLeft)}
      </motion.div>

      {/* Mode indicator - subtle */}
      <motion.div
        className="text-xs md:text-sm font-medium text-gray-400 uppercase tracking-[0.3em]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {mode === 'work'
          ? 'Focus'
          : mode === 'short_break'
          ? 'Break'
          : 'Long Break'}
      </motion.div>

      {/* Minimal progress indicator */}
      <div className="flex space-x-2">
        {[...Array(totalTime > 0 ? Math.ceil(totalTime / 60) : 25)].map(
          (_, i) => {
            const minutesPassed = Math.floor((totalTime - timeLeft) / 60);
            const isActive = i <= minutesPassed;

            return (
              <motion.div
                key={i}
                className={`w-1 h-8 rounded-full transition-all duration-300 ${
                  isActive
                    ? mode === 'work'
                      ? 'bg-red-500'
                      : mode === 'short_break'
                      ? 'bg-green-500'
                      : 'bg-blue-500'
                    : 'bg-gray-300 dark:bg-gray-700'
                }`}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: isActive ? 1 : 0.5 }}
                transition={{ delay: i * 0.02 }}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default MinimalTimer;
