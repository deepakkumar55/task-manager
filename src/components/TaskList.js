import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

const ItemType = {
    TASK: 'task'
};

const Task = ({ task, index, moveTask }) => {
    const [, ref] = useDrag({
        type: ItemType.TASK,
        item: { index },
    });

    const [, drop] = useDrop({
        accept: ItemType.TASK,
        hover: (item) => {
            if (item.index !== index) {
                moveTask(item.index, index);
                item.index = index;
            }
        },
    });

    return (
        <div ref={(node) => ref(drop(node))} className="mb-4 p-4 border rounded shadow">
            <h3 className="font-bold">{task.title}</h3>
            <p>{task.description}</p>
            <p><strong>Status:</strong> {task.status}</p>
            {task.dueDate && <p><strong>Due Date:</strong> {task.dueDate}</p>}
            {task.category && <p><strong>Category:</strong> {task.category}</p>}
        </div>
    );
};

const TaskList = ({ token }) => {
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/tasks', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTasks(response.data);
            } catch (error) {
                setError('Error fetching tasks. Please try again.');
            }
        };
        fetchTasks();
    }, [token]);

    const moveTask = (fromIndex, toIndex) => {
        const updatedTasks = [...tasks];
        const [movedTask] = updatedTasks.splice(fromIndex, 1);
        updatedTasks.splice(toIndex, 0, movedTask);
        setTasks(updatedTasks);
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="container mx-auto">
                <h2 className="text-2xl font-bold mb-4">Task List</h2>
                {error && <p className="text-red-500 text-xs italic">{error}</p>}
                {tasks.map((task, index) => (
                    <Task key={task._id} index={index} task={task} moveTask={moveTask} />
                ))}
            </div>
        </DndProvider>
    );
};

export default TaskList;