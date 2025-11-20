import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const ACHIEVEMENTS = [
  {
    id: 'first_pomodoro',
    title: 'Getting Started',
    description: 'Complete your first Pomodoro',
    icon: '🎯',
    requirement: 1,
    xpReward: 10,
  },
  {
    id: 'focus_beast',
    title: 'Focus Beast',
    description: 'Complete 10 Pomodoros in one day',
    icon: '🦁',
    requirement: 10,
    xpReward: 100,
  },
  {
    id: 'ten_streak',
    title: '10 Pomodoros Streak',
    description: 'Complete 10 Pomodoros in a row',
    icon: '🔥',
    requirement: 10,
    xpReward: 50,
  },
  {
    id: 'five_day_streak',
    title: '5 Successful Days',
    description: 'Complete at least one Pomodoro for 5 days in a row',
    icon: '📅',
    requirement: 5,
    xpReward: 150,
  },
  {
    id: 'no_skip_day',
    title: 'No-Skip Day',
    description: 'Complete a full day without skipping any session',
    icon: '⚡',
    requirement: 1,
    xpReward: 75,
  },
  {
    id: 'century_club',
    title: 'Century Club',
    description: 'Complete 100 total Pomodoros',
    icon: '💯',
    requirement: 100,
    xpReward: 500,
  },
  {
    id: 'early_bird',
    title: 'Early Bird',
    description: 'Complete a Pomodoro before 7 AM',
    icon: '🌅',
    requirement: 1,
    xpReward: 25,
  },
  {
    id: 'night_owl',
    title: 'Night Owl',
    description: 'Complete a Pomodoro after 11 PM',
    icon: '🦉',
    requirement: 1,
    xpReward: 25,
  },
];

const calculateLevel = (xp) => {
  // Level = floor(sqrt(XP / 100))
  return Math.floor(Math.sqrt(xp / 100)) + 1;
};

const calculateXpForNextLevel = (level) => {
  // XP needed for next level = (level^2) * 100
  return level * level * 100;
};

const useGamificationStore = create(
  devtools(
    persist(
      (set, get) => ({
        xp: 0,
        level: 1,
        totalPomodoros: 0,
        consecutivePomodoros: 0,
        unlockedAchievements: [],
        dailyStats: {},

        // Actions
        addXP: (amount) => {
          const { xp, level } = get();
          const newXp = xp + amount;
          const newLevel = calculateLevel(newXp);

          set({ xp: newXp, level: newLevel });

          // Check if leveled up
          if (newLevel > level) {
            return { leveledUp: true, newLevel };
          }

          return { leveledUp: false };
        },

        completePomodoro: () => {
          const { totalPomodoros, consecutivePomodoros } = get();
          const today = new Date().toDateString();
          const { dailyStats } = get();

          const newTotalPomodoros = totalPomodoros + 1;
          const newConsecutivePomodoros = consecutivePomodoros + 1;

          // Update daily stats
          const todayStats = dailyStats[today] || { count: 0, skipped: 0 };
          const newDailyStats = {
            ...dailyStats,
            [today]: {
              ...todayStats,
              count: todayStats.count + 1,
            },
          };

          set({
            totalPomodoros: newTotalPomodoros,
            consecutivePomodoros: newConsecutivePomodoros,
            dailyStats: newDailyStats,
          });

          // Add base XP for completing a pomodoro
          const xpResult = get().addXP(10);

          // Check achievements
          get().checkAchievements();

          return xpResult;
        },

        skipSession: () => {
          const today = new Date().toDateString();
          const { dailyStats } = get();

          const todayStats = dailyStats[today] || { count: 0, skipped: 0 };
          const newDailyStats = {
            ...dailyStats,
            [today]: {
              ...todayStats,
              skipped: todayStats.skipped + 1,
            },
          };

          set({
            consecutivePomodoros: 0,
            dailyStats: newDailyStats,
          });
        },

        checkAchievements: () => {
          const {
            totalPomodoros,
            consecutivePomodoros,
            unlockedAchievements,
            dailyStats,
          } = get();

          const today = new Date().toDateString();
          const todayStats = dailyStats[today] || { count: 0, skipped: 0 };

          const newlyUnlocked = [];

          ACHIEVEMENTS.forEach((achievement) => {
            // Skip if already unlocked
            if (unlockedAchievements.some((a) => a.id === achievement.id)) {
              return;
            }

            let unlocked = false;

            switch (achievement.id) {
              case 'first_pomodoro':
                unlocked = totalPomodoros >= 1;
                break;
              case 'focus_beast':
                unlocked = todayStats.count >= 10;
                break;
              case 'ten_streak':
                unlocked = consecutivePomodoros >= 10;
                break;
              case 'five_day_streak':
                // Check if user has completed at least one pomodoro for 5 days in a row
                const sortedDates = Object.keys(dailyStats).sort().reverse();
                let streakDays = 0;
                let currentDate = new Date();

                for (let i = 0; i < 5; i++) {
                  const dateStr = new Date(
                    currentDate.getTime() - i * 24 * 60 * 60 * 1000
                  ).toDateString();
                  if (dailyStats[dateStr] && dailyStats[dateStr].count > 0) {
                    streakDays++;
                  } else {
                    break;
                  }
                }

                unlocked = streakDays >= 5;
                break;
              case 'no_skip_day':
                unlocked = todayStats.count > 0 && todayStats.skipped === 0;
                break;
              case 'century_club':
                unlocked = totalPomodoros >= 100;
                break;
              case 'early_bird':
                // Check if completed before 7 AM (would need timestamp tracking)
                // For now, simplified version
                unlocked = false;
                break;
              case 'night_owl':
                // Check if completed after 11 PM (would need timestamp tracking)
                // For now, simplified version
                unlocked = false;
                break;
              default:
                unlocked = false;
            }

            if (unlocked) {
              newlyUnlocked.push(achievement);
              get().addXP(achievement.xpReward);
            }
          });

          if (newlyUnlocked.length > 0) {
            set({
              unlockedAchievements: [
                ...unlockedAchievements,
                ...newlyUnlocked.map((a) => ({
                  ...a,
                  unlockedAt: new Date().toISOString(),
                })),
              ],
            });
          }

          return newlyUnlocked;
        },

        getProgress: () => {
          const { level, xp } = get();
          const currentLevelXp = (level - 1) * (level - 1) * 100;
          const nextLevelXp = calculateXpForNextLevel(level);
          const progressXp = xp - currentLevelXp;
          const requiredXp = nextLevelXp - currentLevelXp;

          return {
            level,
            currentXp: xp,
            progressXp,
            requiredXp,
            percentage: (progressXp / requiredXp) * 100,
          };
        },

        getAchievements: () => {
          const { unlockedAchievements } = get();
          return ACHIEVEMENTS.map((achievement) => ({
            ...achievement,
            unlocked: unlockedAchievements.some((a) => a.id === achievement.id),
            unlockedAt: unlockedAchievements.find((a) => a.id === achievement.id)
              ?.unlockedAt,
          }));
        },

        resetDaily: () => {
          set({ consecutivePomodoros: 0 });
        },
      }),
      {
        name: 'pomodoro-gamification-storage',
      }
    )
  )
);

export default useGamificationStore;
export { ACHIEVEMENTS, calculateLevel, calculateXpForNextLevel };
