import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus } from 'react-icons/fa';
import KanbanBoard from '../components/tasks/KanbanBoard';
import useTaskStore from '../store/taskStore';

const TasksView = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const { addTask, updateTask, categories } = useTaskStore();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    pomodoroEstimate: 1,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingTask) {
      updateTask(editingTask.id, formData);
    } else {
      addTask(formData);
    }

    setFormData({
      title: '',
      description: '',
      category: '',
      pomodoroEstimate: 1,
    });
    setShowAddTask(false);
    setEditingTask(null);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      category: task.category || '',
      pomodoroEstimate: task.pomodoroEstimate,
    });
    setShowAddTask(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Tasks
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your tasks and track progress
          </p>
        </div>

        <button
          onClick={() => setShowAddTask(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <FaPlus />
          <span>Add Task</span>
        </button>
      </div>

      {/* Add/Edit Task Form */}
      {showAddTask && (
        <motion.div
          className="card mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            {editingTask ? 'Edit Task' : 'Add New Task'}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Task Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="input-field"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="input-field"
                rows="3"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="input-field"
                >
                  <option value="">No category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Pomodoro Estimate
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.pomodoroEstimate}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      pomodoroEstimate: parseInt(e.target.value),
                    })
                  }
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <button type="submit" className="btn-primary">
                {editingTask ? 'Update Task' : 'Add Task'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddTask(false);
                  setEditingTask(null);
                  setFormData({
                    title: '',
                    description: '',
                    category: '',
                    pomodoroEstimate: 1,
                  });
                }}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Kanban Board */}
      <KanbanBoard onEditTask={handleEditTask} />
    </div>
  );
};

export default TasksView;
