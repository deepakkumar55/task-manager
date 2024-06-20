import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');  // Clear previous error
        try {
            console.log('Submitting login request...');
            const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            console.log('Login response:', response.data);
            const token = response.data.token;
            onLogin(token);  // Notify parent component (App.js) about successful login
        } catch (error) {
            console.error('Login error:', error);
            if (error.response) {
                setError('Invalid credentials. Please try again.');
            } else {
                setError('Something went wrong. Please try again later.');
            }
        }
    };
    
    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl mb-4">Login</h2>
                <div className="mb-4">
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Email" required />
                </div>
                <div className="mb-4">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Password" required />
                </div>
                {error && <p className="text-red-500 text-xs italic">{error}</p>}
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                    Login
                </button>
                <p className="mt-4">
                    Don't have an account? <Link to="/register" className="text-blue-500 hover:text-blue-700">Register here</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;