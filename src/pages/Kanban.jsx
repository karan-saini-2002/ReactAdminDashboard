// src/pages/Kanban.jsx
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Paper, Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Task 1' },
    'task-2': { id: 'task-2', content: 'Task 2' },
    'task-3': { id: 'task-3', content: 'Task 3' },
    'task-4': { id: 'task-4', content: 'Task 4' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

const Kanban = () => {
  const [state, setState] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // If the user dropped the item outside of any droppable area
    if (!destination) {
      return;
    }

    // If the user dropped the item back to its original position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    // Moving within the same column
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
      return;
    }

    // Moving from one column to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setState(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box sx={{ display: 'flex', justifyContent: 'space-around', padding: 2 }}>
        {state.columnOrder.map((columnId) => {
          const column = state.columns[columnId];
          const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

          return (
            <Column key={column.id} column={column} tasks={tasks} />
          );
        })}
      </Box>
    </DragDropContext>
  );
};

const Column = ({ column, tasks }) => {
  return (
    <Box sx={{ margin: 1 }}>
      <Paper sx={{ padding: 2 }}>
        <Typography variant="h6" gutterBottom>{column.title}</Typography>
        <Droppable droppableId={column.id}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              style={{ backgroundColor: '#f0f0f0', padding: '8px', minHeight: '100px' }}
            >
              {tasks.map((task, index) => (
                <Task key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Paper>
    </Box>
  );
};

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Paper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{ padding: 2, marginBottom: 1 }}
        >
          {task.content}
        </Paper>
      )}
    </Draggable>
  );
};

// Prop types validation
Kanban.propTypes = {
  tasks: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
  columns: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      taskIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
};

Column.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    taskIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
};

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default Kanban;
