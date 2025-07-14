import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/test');
    } catch (err) {
      console.error(err);
      setError('Invalid email or password.');
    }
  };

  return (
    <div className=''>
      <div className="login-container min-h-screen flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 bg-white rounded shadow">
          <h2 className="text-xl font-bold mb-4">Login</h2>
          {error && <p className="text-red-500 mb-2">{error}</p>}
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
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
            Login
          </button>
          <br />
          <br />

          {/* ✅ Create account button */}
          <button
            type="button"
            onClick={() => navigate('/register')}
            className="w-full bg-gray-200 text-gray-700 py-2 rounded mt-3 hover:bg-gray-300"
          >
            Don't have an account? Create one
          </button>
        </form>
      </div>
    </div>
  );
}
