import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import useTaskStore, { TASK_STATUS } from '../../store/taskStore';
import KanbanColumn from './KanbanColumn';
import TaskCard from './TaskCard';

const KanbanBoard = ({ onEditTask }) => {
  const { tasks, moveTask } = useTaskStore();
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const todoTasks = tasks.filter((task) => task.status === TASK_STATUS.TODO);
  const doingTasks = tasks.filter((task) => task.status === TASK_STATUS.DOING);
  const doneTasks = tasks.filter((task) => task.status === TASK_STATUS.DONE);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const activeTask = tasks.find((task) => task.id === active.id);
    const overColumn = over.id;

    if (activeTask && Object.values(TASK_STATUS).includes(overColumn)) {
      moveTask(activeTask.id, overColumn);
    }

    setActiveId(null);
  };

  const activeTask = activeId
    ? tasks.find((task) => task.id === activeId)
    : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KanbanColumn
          id={TASK_STATUS.TODO}
          title="To Do"
          tasks={todoTasks}
          color="bg-blue-500"
          onEditTask={onEditTask}
        />

        <KanbanColumn
          id={TASK_STATUS.DOING}
          title="Doing"
          tasks={doingTasks}
          color="bg-yellow-500"
          onEditTask={onEditTask}
        />

        <KanbanColumn
          id={TASK_STATUS.DONE}
          title="Done"
          tasks={doneTasks}
          color="bg-green-500"
          onEditTask={onEditTask}
        />
      </div>

      <DragOverlay>
        {activeTask ? (
          <div className="opacity-80">
            <TaskCard task={activeTask} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

export default KanbanBoard;
