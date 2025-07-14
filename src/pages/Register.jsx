import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      navigate('/test'); // Redirect to test page after auto-login
    } catch (err) {
      console.error(err);
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className='form-body'>
      <div className="register-container min-h-screen flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 bg-white rounded shadow">
          <h2 className="text-xl font-bold mb-4">Register</h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <label className="block mb-2">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border p-2 mb-4"
            required
          />
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 mb-4"
            required
          />
          <label className="block mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 mb-4"
            required
          />
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">
            Sign Up
          </button>
          <br />
          <br />

          <button
            type="button"
            onClick={() => navigate('/login')}
            className="w-full bg-gray-200 text-gray-700 py-2 rounded mt-3 hover:bg-gray-300"
          >
            Already have an account? Login
          </button>
        </form>
      </div>
    </div>
  );
}
