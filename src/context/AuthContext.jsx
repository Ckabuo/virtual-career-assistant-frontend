import React, { createContext, useContext, useState } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const login = async (email, password) => {
    try {
      const res = await authAPI.login({ email, password });
      const { token } = res.data;
      setToken(token);
      setUser({ email });
      localStorage.setItem('token', token);
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  const register = async (username, email, password) => {
    try {
      await authAPI.register({ username, email, password });
      // Automatically log in after registration
      const res = await authAPI.login({ email, password });
      const { token } = res.data;
      setToken(token);
      setUser({ email });
      localStorage.setItem('token', token);
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
