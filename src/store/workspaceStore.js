import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

const DEFAULT_WORKSPACES = [
  {
    id: 'default',
    name: 'Personal',
    icon: '🏠',
    color: '#3b82f6',
    settings: {
      workDuration: 25,
      shortBreakDuration: 5,
      longBreakDuration: 15,
      cyclesUntilLongBreak: 4,
    },
    theme: 'light',
  },
];

const useWorkspaceStore = create(
  devtools(
    persist(
      (set, get) => ({
        workspaces: DEFAULT_WORKSPACES,
        currentWorkspaceId: 'default',

        // Actions
        addWorkspace: (workspace) => {
          const newWorkspace = {
            id: uuidv4(),
            name: workspace.name,
            icon: workspace.icon || '📁',
            color: workspace.color || '#6b7280',
            settings: workspace.settings || {
              workDuration: 25,
              shortBreakDuration: 5,
              longBreakDuration: 15,
              cyclesUntilLongBreak: 4,
            },
            theme: workspace.theme || 'light',
            createdAt: new Date().toISOString(),
          };

          set((state) => ({
            workspaces: [...state.workspaces, newWorkspace],
          }));

          return newWorkspace.id;
        },

        updateWorkspace: (workspaceId, updates) => {
          set((state) => ({
            workspaces: state.workspaces.map((workspace) =>
              workspace.id === workspaceId
                ? {
                    ...workspace,
                    ...updates,
                    updatedAt: new Date().toISOString(),
                  }
                : workspace
            ),
          }));
        },

        deleteWorkspace: (workspaceId) => {
          // Prevent deleting the last workspace
          const { workspaces, currentWorkspaceId } = get();
          if (workspaces.length <= 1) {
            return;
          }

          set((state) => ({
            workspaces: state.workspaces.filter(
              (workspace) => workspace.id !== workspaceId
            ),
            // Switch to first workspace if deleting current one
            currentWorkspaceId:
              currentWorkspaceId === workspaceId
                ? state.workspaces.find((w) => w.id !== workspaceId)?.id
                : currentWorkspaceId,
          }));
        },

        switchWorkspace: (workspaceId) => {
          const { workspaces } = get();
          const workspace = workspaces.find((w) => w.id === workspaceId);

          if (workspace) {
            set({ currentWorkspaceId: workspaceId });
            return true;
          }

          return false;
        },

        getCurrentWorkspace: () => {
          const { workspaces, currentWorkspaceId } = get();
          return workspaces.find((w) => w.id === currentWorkspaceId);
        },

        duplicateWorkspace: (workspaceId) => {
          const { workspaces } = get();
          const workspace = workspaces.find((w) => w.id === workspaceId);

          if (!workspace) return;

          const newWorkspace = {
            ...workspace,
            id: uuidv4(),
            name: `${workspace.name} (Copy)`,
            createdAt: new Date().toISOString(),
          };

          set((state) => ({
            workspaces: [...state.workspaces, newWorkspace],
          }));

          return newWorkspace.id;
        },
      }),
      {
        name: 'pomodoro-workspace-storage',
      }
    )
  )
);

export default useWorkspaceStore;
