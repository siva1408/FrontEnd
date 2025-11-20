import React from 'react';
import { motion } from 'framer-motion';
import useGamificationStore from '../../store/gamificationStore';

const XPProgressBar = () => {
  const { level, xp, getProgress } = useGamificationStore();
  const progress = getProgress();

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Level {progress.level}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {Math.floor(progress.progressXp)} / {Math.floor(progress.requiredXp)} XP
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Total XP
          </p>
          <p className="text-2xl font-bold text-primary-600">
            {Math.floor(progress.currentXp)}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600"
          initial={{ width: 0 }}
          animate={{ width: `${progress.percentage}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-right">
        {Math.floor(progress.percentage)}% to next level
      </p>
    </div>
  );
};

export default XPProgressBar;
