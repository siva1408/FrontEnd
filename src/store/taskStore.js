import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

const TASK_STATUS = {
  TODO: 'todo',
  DOING: 'doing',
  DONE: 'done',
};

const useTaskStore = create(
  devtools(
    persist(
      (set, get) => ({
        tasks: [],
        categories: [
          { id: 'work', name: 'Work', color: '#3b82f6' },
          { id: 'personal', name: 'Personal', color: '#10b981' },
          { id: 'study', name: 'Study', color: '#f59e0b' },
          { id: 'health', name: 'Health', color: '#ef4444' },
        ],

        // Actions
        addTask: (task) => {
          const newTask = {
            id: uuidv4(),
            title: task.title,
            description: task.description || '',
            category: task.category || null,
            status: task.status || TASK_STATUS.TODO,
            pomodoroEstimate: task.pomodoroEstimate || 1,
            pomodoroCompleted: 0,
            subtasks: task.subtasks || [],
            notes: task.notes || '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            completedAt: null,
          };

          set((state) => ({
            tasks: [...state.tasks, newTask],
          }));

          return newTask.id;
        },

        updateTask: (taskId, updates) => {
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === taskId
                ? {
                    ...task,
                    ...updates,
                    updatedAt: new Date().toISOString(),
                  }
                : task
            ),
          }));
        },

        deleteTask: (taskId) => {
          set((state) => ({
            tasks: state.tasks.filter((task) => task.id !== taskId),
          }));
        },

        completeTask: (taskId) => {
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === taskId
                ? {
                    ...task,
                    status: TASK_STATUS.DONE,
                    completedAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                  }
                : task
            ),
          }));
        },

        moveTask: (taskId, newStatus) => {
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === taskId
                ? {
                    ...task,
                    status: newStatus,
                    updatedAt: new Date().toISOString(),
                    ...(newStatus === TASK_STATUS.DONE && {
                      completedAt: new Date().toISOString(),
                    }),
                  }
                : task
            ),
          }));
        },

        reorderTasks: (newTasks) => {
          set({ tasks: newTasks });
        },

        incrementPomodoro: (taskId) => {
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === taskId
                ? {
                    ...task,
                    pomodoroCompleted: task.pomodoroCompleted + 1,
                    updatedAt: new Date().toISOString(),
                  }
                : task
            ),
          }));
        },

        // Subtasks
        addSubtask: (taskId, subtask) => {
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === taskId
                ? {
                    ...task,
                    subtasks: [
                      ...task.subtasks,
                      {
                        id: uuidv4(),
                        title: subtask.title,
                        completed: false,
                        createdAt: new Date().toISOString(),
                      },
                    ],
                    updatedAt: new Date().toISOString(),
                  }
                : task
            ),
          }));
        },

        toggleSubtask: (taskId, subtaskId) => {
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === taskId
                ? {
                    ...task,
                    subtasks: task.subtasks.map((subtask) =>
                      subtask.id === subtaskId
                        ? { ...subtask, completed: !subtask.completed }
                        : subtask
                    ),
                    updatedAt: new Date().toISOString(),
                  }
                : task
            ),
          }));
        },

        deleteSubtask: (taskId, subtaskId) => {
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === taskId
                ? {
                    ...task,
                    subtasks: task.subtasks.filter(
                      (subtask) => subtask.id !== subtaskId
                    ),
                    updatedAt: new Date().toISOString(),
                  }
                : task
            ),
          }));
        },

        // Categories
        addCategory: (category) => {
          const newCategory = {
            id: uuidv4(),
            name: category.name,
            color: category.color || '#6b7280',
          };

          set((state) => ({
            categories: [...state.categories, newCategory],
          }));

          return newCategory.id;
        },

        updateCategory: (categoryId, updates) => {
          set((state) => ({
            categories: state.categories.map((category) =>
              category.id === categoryId
                ? { ...category, ...updates }
                : category
            ),
          }));
        },

        deleteCategory: (categoryId) => {
          set((state) => ({
            categories: state.categories.filter(
              (category) => category.id !== categoryId
            ),
            // Remove category from tasks
            tasks: state.tasks.map((task) =>
              task.category === categoryId
                ? { ...task, category: null }
                : task
            ),
          }));
        },

        // Getters
        getTasksByStatus: (status) => {
          const { tasks } = get();
          return tasks.filter((task) => task.status === status);
        },

        getTasksByCategory: (categoryId) => {
          const { tasks } = get();
          return tasks.filter((task) => task.category === categoryId);
        },

        getTask: (taskId) => {
          const { tasks } = get();
          return tasks.find((task) => task.id === taskId);
        },

        getCompletedTasks: () => {
          const { tasks } = get();
          return tasks.filter((task) => task.status === TASK_STATUS.DONE);
        },

        getTaskEfficiency: (taskId) => {
          const task = get().getTask(taskId);
          if (!task) return 0;
          return task.pomodoroEstimate > 0
            ? (task.pomodoroCompleted / task.pomodoroEstimate) * 100
            : 0;
        },
      }),
      {
        name: 'pomodoro-task-storage',
      }
    )
  )
);

export default useTaskStore;
export { TASK_STATUS };
