import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Registration from './components/Registration';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm'; // Import TaskForm for task creation

const App = () => {
    const [token, setToken] = useState('');

    const handleLogin = (token) => {
        setToken(token);
        // Optionally, store the token in localStorage or handle authenticated state
    };

    const handleLogout = () => {
        setToken('');
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/register" element={<Registration />} />
                    <Route
                        path="/tasks"
                        element={
                            token ? (
                                <>
                                    <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                                        Logout
                                    </button>
                                    <TaskForm token={token} />
                                    <TaskList token={token} />
                                </>
                            ) : (
                                <Navigate to="/login" />
                            )
                        }
                    />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
