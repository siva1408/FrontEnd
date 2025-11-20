import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useUserStore = create(
  devtools((set, get) => ({
    user: null,
    loading: true,
    error: null,

    // Actions
    setUser: (user) => {
      set({ user, loading: false, error: null });
    },

    setLoading: (loading) => {
      set({ loading });
    },

    setError: (error) => {
      set({ error, loading: false });
    },

    logout: () => {
      set({ user: null, loading: false, error: null });
    },

    updateProfile: (updates) => {
      const { user } = get();
      if (user) {
        set({
          user: {
            ...user,
            ...updates,
          },
        });
      }
    },

    isAuthenticated: () => {
      const { user } = get();
      return !!user;
    },
  }))
);

export default useUserStore;
