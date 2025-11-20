import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TaskCard from './TaskCard';

const SortableTaskCard = ({ task, onEditTask }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <TaskCard task={task} onEdit={() => onEditTask(task)} />
    </div>
  );
};

const KanbanColumn = ({ id, title, tasks, color, onEditTask }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`
        flex flex-col bg-gray-50 dark:bg-gray-800 rounded-xl p-4
        transition-all duration-300
        ${isOver ? 'ring-2 ring-primary-500 bg-primary-50 dark:bg-primary-900/20' : ''}
      `}
    >
      {/* Column header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${color}`} />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            ({tasks.length})
          </span>
        </div>
      </div>

      {/* Tasks */}
      <SortableContext
        items={tasks.map((task) => task.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3 flex-1 overflow-y-auto min-h-[200px]">
          {tasks.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-gray-400 dark:text-gray-600 text-sm">
              No tasks
            </div>
          ) : (
            tasks.map((task) => (
              <SortableTaskCard
                key={task.id}
                task={task}
                onEditTask={onEditTask}
              />
            ))
          )}
        </div>
      </SortableContext>
    </div>
  );
};

export default KanbanColumn;
