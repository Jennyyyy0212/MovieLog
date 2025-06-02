import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/auth.service';
import {jwtDecode} from 'jwt-decode'; // Install it using npm install jwt-decode


export const AuthContext = createContext({
  user: null,
  token: null,
  loading: true,
  login: () => {},
  register: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on mount
    if (token) {
      // You might want to validate the token with your backend
      setUser({ userId: 'decoded-from-token' }); // In a real app, decode the JWT
    }
    setLoading(false);
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await authService.login(email, password);
      const { token } = response;
      
      if (token) {
        localStorage.setItem('token', token);
        setToken(token);
      }
      
      // In a real app, you'd decode the JWT to get user info
      setUser({ userId: 'decoded-from-token' });
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (username, email, password) => {
    try {
      await authService.register(username, email, password);
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};