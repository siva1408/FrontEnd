import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  AMOLED: 'amoled',
  GRADIENT_BLUE: 'gradient-blue',
  GRADIENT_PURPLE: 'gradient-purple',
  GRADIENT_GREEN: 'gradient-green',
  GRADIENT_SUNSET: 'gradient-sunset',
};

const DEFAULT_THEME_SETTINGS = {
  light: {
    primary: '#3b82f6',
    background: '#f9fafb',
    surface: '#ffffff',
    text: '#111827',
    textSecondary: '#6b7280',
  },
  dark: {
    primary: '#3b82f6',
    background: '#111827',
    surface: '#1f2937',
    text: '#f9fafb',
    textSecondary: '#9ca3af',
  },
  amoled: {
    primary: '#3b82f6',
    background: '#000000',
    surface: '#0a0a0a',
    text: '#ffffff',
    textSecondary: '#a3a3a3',
  },
  'gradient-blue': {
    primary: '#3b82f6',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    surface: '#1f2937',
    text: '#ffffff',
    textSecondary: '#d1d5db',
  },
  'gradient-purple': {
    primary: '#a855f7',
    background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
    surface: '#1f2937',
    text: '#ffffff',
    textSecondary: '#d1d5db',
  },
  'gradient-green': {
    primary: '#10b981',
    background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)',
    surface: '#1f2937',
    text: '#ffffff',
    textSecondary: '#d1d5db',
  },
  'gradient-sunset': {
    primary: '#f59e0b',
    background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    surface: '#1f2937',
    text: '#ffffff',
    textSecondary: '#d1d5db',
  },
};

const SOUND_PACKS = {
  DEFAULT: 'default',
  GENTLE: 'gentle',
  NATURE: 'nature',
  DIGITAL: 'digital',
  MINIMAL: 'minimal',
};

const FONTS = {
  SYSTEM: 'system-ui, -apple-system, sans-serif',
  INTER: 'Inter, sans-serif',
  ROBOTO: 'Roboto, sans-serif',
  POPPINS: 'Poppins, sans-serif',
  MONO: 'JetBrains Mono, monospace',
};

const useThemeStore = create(
  devtools(
    persist(
      (set, get) => ({
        currentTheme: THEMES.LIGHT,
        accentColor: '#3b82f6',
        soundPack: SOUND_PACKS.DEFAULT,
        font: FONTS.SYSTEM,
        customTheme: null,
        animations: true,
        reduceMotion: false,

        // Actions
        setTheme: (theme) => {
          set({ currentTheme: theme });

          // Apply theme to document
          const root = document.documentElement;

          if (theme === THEMES.DARK || theme === THEMES.AMOLED || theme.startsWith('gradient-')) {
            root.classList.add('dark');
          } else {
            root.classList.remove('dark');
          }

          // Apply theme colors
          const themeSettings = DEFAULT_THEME_SETTINGS[theme];
          if (themeSettings) {
            Object.entries(themeSettings).forEach(([key, value]) => {
              root.style.setProperty(`--color-${key}`, value);
            });
          }
        },

        setAccentColor: (color) => {
          set({ accentColor: color });
          document.documentElement.style.setProperty('--color-accent', color);
        },

        setSoundPack: (pack) => {
          set({ soundPack: pack });
        },

        setFont: (font) => {
          set({ font });
          document.documentElement.style.setProperty('--font-family', font);
        },

        setCustomTheme: (theme) => {
          set({ customTheme: theme, currentTheme: 'custom' });

          // Apply custom theme
          const root = document.documentElement;
          Object.entries(theme).forEach(([key, value]) => {
            root.style.setProperty(`--color-${key}`, value);
          });
        },

        toggleAnimations: () => {
          const { animations } = get();
          set({ animations: !animations });
        },

        toggleReduceMotion: () => {
          const { reduceMotion } = get();
          set({ reduceMotion: !reduceMotion });

          if (!reduceMotion) {
            document.documentElement.classList.add('reduce-motion');
          } else {
            document.documentElement.classList.remove('reduce-motion');
          }
        },

        getThemeSettings: () => {
          const { currentTheme, customTheme } = get();
          if (currentTheme === 'custom' && customTheme) {
            return customTheme;
          }
          return DEFAULT_THEME_SETTINGS[currentTheme] || DEFAULT_THEME_SETTINGS.light;
        },
      }),
      {
        name: 'pomodoro-theme-storage',
      }
    )
  )
);

export default useThemeStore;
export { THEMES, SOUND_PACKS, FONTS, DEFAULT_THEME_SETTINGS };
