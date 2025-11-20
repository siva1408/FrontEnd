import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const TIMER_MODES = {
  WORK: 'work',
  SHORT_BREAK: 'short_break',
  LONG_BREAK: 'long_break',
};

const useTimerStore = create(
  devtools(
    persist(
      (set, get) => ({
        // Timer state
        mode: TIMER_MODES.WORK,
        timeLeft: 25 * 60, // seconds
        isRunning: false,
        isPaused: false,
        completedCycles: 0,
        currentTaskId: null,

        // Settings
        settings: {
          workDuration: 25, // minutes
          shortBreakDuration: 5,
          longBreakDuration: 15,
          cyclesUntilLongBreak: 4,
          autoStartBreaks: false,
          autoStartWork: false,
          soundEnabled: true,
          volume: 0.7,
          notificationsEnabled: true,
          timerStyle: 'circular', // 'circular', 'horizontal', 'minimal'
        },

        // Timer history
        sessions: [],
        totalFocusedMinutes: 0,
        streak: {
          current: 0,
          longest: 0,
          lastSessionDate: null,
        },

        // Actions
        setMode: (mode) => {
          const { settings } = get();
          let duration;

          switch (mode) {
            case TIMER_MODES.WORK:
              duration = settings.workDuration * 60;
              break;
            case TIMER_MODES.SHORT_BREAK:
              duration = settings.shortBreakDuration * 60;
              break;
            case TIMER_MODES.LONG_BREAK:
              duration = settings.longBreakDuration * 60;
              break;
            default:
              duration = settings.workDuration * 60;
          }

          set({
            mode,
            timeLeft: duration,
            isRunning: false,
            isPaused: false,
          });
        },

        start: () => {
          set({ isRunning: true, isPaused: false });
        },

        pause: () => {
          set({ isRunning: false, isPaused: true });
        },

        reset: () => {
          const { mode, settings } = get();
          let duration;

          switch (mode) {
            case TIMER_MODES.WORK:
              duration = settings.workDuration * 60;
              break;
            case TIMER_MODES.SHORT_BREAK:
              duration = settings.shortBreakDuration * 60;
              break;
            case TIMER_MODES.LONG_BREAK:
              duration = settings.longBreakDuration * 60;
              break;
            default:
              duration = settings.workDuration * 60;
          }

          set({
            timeLeft: duration,
            isRunning: false,
            isPaused: false,
          });
        },

        tick: () => {
          const { timeLeft, isRunning } = get();
          if (isRunning && timeLeft > 0) {
            set({ timeLeft: timeLeft - 1 });
          }
        },

        completeSession: () => {
          const { mode, completedCycles, settings, sessions, totalFocusedMinutes, currentTaskId } = get();

          // Add session to history
          const session = {
            id: Date.now(),
            mode,
            duration: mode === TIMER_MODES.WORK ? settings.workDuration :
                     mode === TIMER_MODES.SHORT_BREAK ? settings.shortBreakDuration :
                     settings.longBreakDuration,
            completedAt: new Date().toISOString(),
            taskId: currentTaskId,
          };

          const newSessions = [...sessions, session];

          // Update focus time
          let newFocusedMinutes = totalFocusedMinutes;
          if (mode === TIMER_MODES.WORK) {
            newFocusedMinutes += settings.workDuration;
          }

          // Update cycles and determine next mode
          let newCycles = completedCycles;
          let nextMode = mode;

          if (mode === TIMER_MODES.WORK) {
            newCycles += 1;
            if (newCycles % settings.cyclesUntilLongBreak === 0) {
              nextMode = TIMER_MODES.LONG_BREAK;
            } else {
              nextMode = TIMER_MODES.SHORT_BREAK;
            }
          } else {
            nextMode = TIMER_MODES.WORK;
          }

          // Update streak
          const today = new Date().toDateString();
          const { streak } = get();
          let newStreak = { ...streak };

          if (mode === TIMER_MODES.WORK) {
            if (streak.lastSessionDate === today) {
              // Already counted today
            } else if (streak.lastSessionDate) {
              const lastDate = new Date(streak.lastSessionDate);
              const diffTime = new Date() - lastDate;
              const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

              if (diffDays === 1) {
                // Continue streak
                newStreak.current += 1;
                newStreak.longest = Math.max(newStreak.longest, newStreak.current);
              } else if (diffDays > 1) {
                // Streak broken
                newStreak.current = 1;
              }
            } else {
              // First session
              newStreak.current = 1;
              newStreak.longest = 1;
            }
            newStreak.lastSessionDate = today;
          }

          set({
            sessions: newSessions,
            completedCycles: newCycles,
            totalFocusedMinutes: newFocusedMinutes,
            streak: newStreak,
          });

          // Set next mode
          get().setMode(nextMode);

          // Auto-start if enabled
          if (
            (nextMode === TIMER_MODES.WORK && settings.autoStartWork) ||
            (nextMode !== TIMER_MODES.WORK && settings.autoStartBreaks)
          ) {
            get().start();
          }
        },

        skip: () => {
          const { mode, completedCycles, settings } = get();
          let nextMode;

          if (mode === TIMER_MODES.WORK) {
            if ((completedCycles + 1) % settings.cyclesUntilLongBreak === 0) {
              nextMode = TIMER_MODES.LONG_BREAK;
            } else {
              nextMode = TIMER_MODES.SHORT_BREAK;
            }
          } else {
            nextMode = TIMER_MODES.WORK;
          }

          get().setMode(nextMode);
        },

        updateSettings: (newSettings) => {
          const { settings } = get();
          set({
            settings: { ...settings, ...newSettings },
          });
        },

        setCurrentTask: (taskId) => {
          set({ currentTaskId: taskId });
        },

        getTodaysSessions: () => {
          const { sessions } = get();
          const today = new Date().toDateString();
          return sessions.filter(session => {
            return new Date(session.completedAt).toDateString() === today;
          });
        },

        getSessionsByDateRange: (startDate, endDate) => {
          const { sessions } = get();
          return sessions.filter(session => {
            const sessionDate = new Date(session.completedAt);
            return sessionDate >= startDate && sessionDate <= endDate;
          });
        },
      }),
      {
        name: 'pomodoro-timer-storage',
      }
    )
  )
);

export default useTimerStore;
export { TIMER_MODES };
