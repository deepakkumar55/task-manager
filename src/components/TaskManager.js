import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskManager = ({ token }) => {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('');
    const [editingTask, setEditingTask] = useState(null);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingTask) {
                const response = await axios.put(`http://localhost:5000/api/tasks/${editingTask._id}`, {
                    title,
                    description,
                    status,
                    dueDate,
                    category
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTasks(tasks.map(task => (task._id === editingTask._id ? response.data : task)));
            } else {
                const response = await axios.post('http://localhost:5000/api/tasks', {
                    title,
                    description,
                    status,
                    dueDate,
                    category
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setTasks([...tasks, response.data]);
            }
            resetForm();
        } catch (error) {
            setError('Task submission failed. Please try again.');
        }
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setStatus('pending');
        setDueDate('');
        setCategory('');
        setEditingTask(null);
    };

    const handleEdit = (task) => {
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
        setDueDate(task.dueDate ? task.dueDate.substring(0, 10) : '');
        setCategory(task.category);
        setEditingTask(task);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTasks(tasks.filter(task => task._id !== id));
        } catch (error) {
            setError('Error deleting task. Please try again.');
        }
    };

    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-4">Task Manager</h2>
            <form onSubmit={handleSubmit} className="mb-8">
                <div className="flex mb-4">
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2" placeholder="Title" required />
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2" placeholder="Description" required />
                </div>
                <div className="flex mb-4">
                    <input type="text" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2" placeholder="Due Date (Optional)" />
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ml-2" placeholder="Category (Optional)" />
                </div>
                <div className="mb-4">
                    <select value={status} onChange={(e) => setStatus(e.target.value)} className="shadow appearance-none border rounded w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    {editingTask ? 'Update Task' : 'Add Task'}
                </button>
            </form>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
            <div>
                {tasks.map(task => (
                    <div key={task._id} className="mb-4 p-4 border rounded shadow">
                        <h3 className="font-bold">{task.title}</h3>
                        <p>{task.description}</p>
                        <p><strong>Status:</strong> {task.status}</p>
                        {task.dueDate && <p><strong>Due Date:</strong> {task.dueDate}</p>}
                        {task.category && <p><strong>Category:</strong> {task.category}</p>}
                        <button onClick={() => handleEdit(task)} className="mt-2 bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2">
                            Edit
                        </button>
                        <button onClick={() => handleDelete(task._id)} className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskManager;