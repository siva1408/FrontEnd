import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useTimerStore, { TIMER_MODES } from '../../store/timerStore';
import CircularTimer from './CircularTimer';
import HorizontalTimer from './HorizontalTimer';
import MinimalTimer from './MinimalTimer';
import TimerControls from './TimerControls';
import { useTimer } from '../../hooks/useTimer';

const Timer = () => {
  const { settings, mode, timeLeft } = useTimerStore();
  useTimer(); // Initialize timer hook

  const getTotalTime = () => {
    switch (mode) {
      case TIMER_MODES.WORK:
        return settings.workDuration * 60;
      case TIMER_MODES.SHORT_BREAK:
        return settings.shortBreakDuration * 60;
      case TIMER_MODES.LONG_BREAK:
        return settings.longBreakDuration * 60;
      default:
        return settings.workDuration * 60;
    }
  };

  const totalTime = getTotalTime();

  const renderTimer = () => {
    switch (settings.timerStyle) {
      case 'circular':
        return (
          <CircularTimer timeLeft={timeLeft} totalTime={totalTime} mode={mode} />
        );
      case 'horizontal':
        return (
          <HorizontalTimer
            timeLeft={timeLeft}
            totalTime={totalTime}
            mode={mode}
          />
        );
      case 'minimal':
        return (
          <MinimalTimer timeLeft={timeLeft} totalTime={totalTime} mode={mode} />
        );
      default:
        return (
          <CircularTimer timeLeft={timeLeft} totalTime={totalTime} mode={mode} />
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={settings.timerStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderTimer()}
        </motion.div>
      </AnimatePresence>

      <TimerControls />

      {/* Mode selector */}
      <div className="flex space-x-2">
        <ModeButton
          mode={TIMER_MODES.WORK}
          label="Work"
          color="bg-red-500 hover:bg-red-600"
        />
        <ModeButton
          mode={TIMER_MODES.SHORT_BREAK}
          label="Short Break"
          color="bg-green-500 hover:bg-green-600"
        />
        <ModeButton
          mode={TIMER_MODES.LONG_BREAK}
          label="Long Break"
          color="bg-blue-500 hover:bg-blue-600"
        />
      </div>
    </div>
  );
};

const ModeButton = ({ mode, label, color }) => {
  const { mode: currentMode, setMode, isRunning } = useTimerStore();
  const isActive = currentMode === mode;

  const handleClick = () => {
    if (!isRunning) {
      setMode(mode);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={isRunning}
      className={`
        px-4 py-2 rounded-lg text-sm font-medium text-white
        transition-all duration-200 shadow-md
        ${isActive ? color : 'bg-gray-400 dark:bg-gray-600'}
        ${isRunning ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}
      `}
      whileHover={!isRunning ? { scale: 1.05 } : {}}
      whileTap={!isRunning ? { scale: 0.95 } : {}}
    >
      {label}
    </motion.button>
  );
};

export default Timer;
