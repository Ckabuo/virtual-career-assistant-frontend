// components/Navbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center">
      <div className="text-lg font-semibold">Career Assistant</div>
      {user ? (
        <div className="flex items-center gap-4">
          <Link to="/test" className="hover:underline">Test</Link>
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          {user.email === 'admin@example.com' && (
            <Link to="/admin" className="hover:underline">Admin</Link>
          )}
          <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded hover:bg-red-600">
            Logout
          </button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link to="/login" className="hover:underline">Login</Link>
          <Link to="/register" className="hover:underline">Register</Link>
        </div>
      )}
    </nav>
  );
}
