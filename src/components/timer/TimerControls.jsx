import React from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaRedo, FaForward } from 'react-icons/fa';
import useTimerStore from '../../store/timerStore';
import useGamificationStore from '../../store/gamificationStore';

const TimerControls = () => {
  const { isRunning, start, pause, reset, skip } = useTimerStore();
  const { skipSession } = useGamificationStore();

  const handleSkip = () => {
    skipSession();
    skip();
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      {/* Play/Pause Button */}
      <motion.button
        onClick={isRunning ? pause : start}
        className={`
          w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center
          text-white text-xl md:text-2xl shadow-lg
          ${
            isRunning
              ? 'bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
              : 'bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
          }
          transition-all duration-200
        `}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isRunning ? <FaPause /> : <FaPlay className="ml-1" />}
      </motion.button>

      {/* Reset Button */}
      <motion.button
        onClick={reset}
        className="
          w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center
          bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600
          text-gray-700 dark:text-gray-300 text-lg md:text-xl shadow-md
          transition-all duration-200
        "
        whileHover={{ scale: 1.05, rotate: -180 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaRedo />
      </motion.button>

      {/* Skip Button */}
      <motion.button
        onClick={handleSkip}
        className="
          w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center
          bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600
          text-gray-700 dark:text-gray-300 text-lg md:text-xl shadow-md
          transition-all duration-200
        "
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaForward />
      </motion.button>
    </div>
  );
};

export default TimerControls;
