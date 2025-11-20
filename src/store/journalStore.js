import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

const useJournalStore = create(
  devtools(
    persist(
      (set, get) => ({
        entries: [],
        tags: [],

        // Actions
        addEntry: (entry) => {
          const newEntry = {
            id: uuidv4(),
            title: entry.title || `Journal Entry - ${new Date().toLocaleDateString()}`,
            content: entry.content || '',
            tags: entry.tags || [],
            date: entry.date || new Date().toISOString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          set((state) => ({
            entries: [...state.entries, newEntry],
          }));

          return newEntry.id;
        },

        updateEntry: (entryId, updates) => {
          set((state) => ({
            entries: state.entries.map((entry) =>
              entry.id === entryId
                ? {
                    ...entry,
                    ...updates,
                    updatedAt: new Date().toISOString(),
                  }
                : entry
            ),
          }));
        },

        deleteEntry: (entryId) => {
          set((state) => ({
            entries: state.entries.filter((entry) => entry.id !== entryId),
          }));
        },

        // Tags
        addTag: (tag) => {
          const { tags } = get();
          if (!tags.includes(tag)) {
            set({ tags: [...tags, tag] });
          }
        },

        removeTag: (tag) => {
          set((state) => ({
            tags: state.tags.filter((t) => t !== tag),
            // Remove tag from entries
            entries: state.entries.map((entry) => ({
              ...entry,
              tags: entry.tags.filter((t) => t !== tag),
            })),
          }));
        },

        // Getters
        getEntry: (entryId) => {
          const { entries } = get();
          return entries.find((entry) => entry.id === entryId);
        },

        getEntriesByDate: (date) => {
          const { entries } = get();
          const targetDate = new Date(date).toDateString();
          return entries.filter(
            (entry) => new Date(entry.date).toDateString() === targetDate
          );
        },

        getEntriesByTag: (tag) => {
          const { entries } = get();
          return entries.filter((entry) => entry.tags.includes(tag));
        },

        getEntriesByDateRange: (startDate, endDate) => {
          const { entries } = get();
          return entries.filter((entry) => {
            const entryDate = new Date(entry.date);
            return entryDate >= startDate && entryDate <= endDate;
          });
        },

        searchEntries: (query) => {
          const { entries } = get();
          const lowercaseQuery = query.toLowerCase();
          return entries.filter(
            (entry) =>
              entry.title.toLowerCase().includes(lowercaseQuery) ||
              entry.content.toLowerCase().includes(lowercaseQuery)
          );
        },

        exportEntries: (format = 'json') => {
          const { entries } = get();

          switch (format) {
            case 'json':
              return JSON.stringify(entries, null, 2);

            case 'txt':
              return entries
                .map(
                  (entry) =>
                    `${entry.title}\n${new Date(entry.date).toLocaleString()}\n\n${
                      entry.content
                    }\n\n---\n\n`
                )
                .join('');

            case 'md':
              return entries
                .map(
                  (entry) =>
                    `# ${entry.title}\n\n**Date:** ${new Date(
                      entry.date
                    ).toLocaleString()}\n\n${entry.content}\n\n---\n\n`
                )
                .join('');

            default:
              return JSON.stringify(entries, null, 2);
          }
        },
      }),
      {
        name: 'pomodoro-journal-storage',
      }
    )
  )
);

export default useJournalStore;
