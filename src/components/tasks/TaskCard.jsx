import React from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaCheck, FaClock } from 'react-icons/fa';
import useTaskStore from '../../store/taskStore';

const TaskCard = ({ task, onEdit }) => {
  const { deleteTask, completeTask } = useTaskStore();

  const category = useTaskStore(
    (state) =>
      state.categories.find((c) => c.id === task.category)
  );

  const completedSubtasks = task.subtasks?.filter((s) => s.completed).length || 0;
  const totalSubtasks = task.subtasks?.length || 0;
  const progress =
    totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  return (
    <motion.div
      className="card p-4 hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      whileHover={{ y: -2 }}
      onClick={onEdit}
      layout
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {task.title}
          </h3>

          {task.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {task.description}
            </p>
          )}
        </div>

        <div className="flex space-x-2 ml-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              completeTask(task.id);
            }}
            className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
          >
            <FaCheck />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              deleteTask(task.id);
            }}
            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
          >
            <FaTrash />
          </button>
        </div>
      </div>

      {/* Category tag */}
      {category && (
        <div
          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mb-2"
          style={{
            backgroundColor: `${category.color}20`,
            color: category.color,
          }}
        >
          {category.name}
        </div>
      )}

      {/* Pomodoro progress */}
      <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
        <FaClock />
        <span>
          {task.pomodoroCompleted} / {task.pomodoroEstimate} Pomodoros
        </span>
      </div>

      {/* Subtasks progress */}
      {totalSubtasks > 0 && (
        <div className="mt-2">
          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
            <span>Subtasks</span>
            <span>
              {completedSubtasks} / {totalSubtasks}
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary-500 to-primary-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TaskCard;
