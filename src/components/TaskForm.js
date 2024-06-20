import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ token }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('pending');
    const [dueDate, setDueDate] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/tasks', {
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
            setTitle('');
            setDescription('');
            setStatus('pending');
            setDueDate('');
            setCategory('');
            setError('');
        } catch (error) {
            setError('Error adding task. Please try again.');
        }
    };

    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-4">Add New Task</h2>
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
                    Add Task
                </button>
            </form>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
        </div>
    );
};

export default TaskForm;