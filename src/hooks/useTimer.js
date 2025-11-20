import { useEffect, useRef } from 'react';
import useTimerStore from '../store/timerStore';
import useGamificationStore from '../store/gamificationStore';
import useTaskStore from '../store/taskStore';
import { playSound } from '../utils/sounds';

export const useTimer = () => {
  const intervalRef = useRef(null);
  const {
    timeLeft,
    isRunning,
    mode,
    settings,
    currentTaskId,
    tick,
    completeSession,
    start,
    pause,
  } = useTimerStore();

  const { completePomodoro } = useGamificationStore();
  const { incrementPomodoro } = useTaskStore();

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        const currentTimeLeft = useTimerStore.getState().timeLeft;

        if (currentTimeLeft > 0) {
          tick();
        } else {
          // Session completed
          clearInterval(intervalRef.current);
          handleSessionComplete();
        }
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, tick]);

  const handleSessionComplete = () => {
    // Play completion sound
    if (settings.soundEnabled) {
      playSound('complete', settings.volume);
    }

    // Show notification
    if (settings.notificationsEnabled && 'Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('Pomodoro Complete!', {
          body: `${mode === 'work' ? 'Work session' : 'Break'} completed!`,
          icon: '/icon.png',
        });
      }
    }

    // Update gamification if it was a work session
    if (mode === 'work') {
      completePomodoro();

      // Update task pomodoro count
      if (currentTaskId) {
        incrementPomodoro(currentTaskId);
      }
    }

    // Complete session and move to next mode
    completeSession();
  };

  return {
    timeLeft,
    isRunning,
    mode,
    settings,
    currentTaskId,
    start,
    pause,
  };
};
