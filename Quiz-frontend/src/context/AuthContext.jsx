// File: context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';

// 1. Create the context
const AuthContext = createContext();

// 2. Create the context provider component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for a token in local storage on initial load
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const config = {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          };
          const { data } = await axios.get('http://localhost:5000/api/auth/profile', config);
          // Assuming the backend sends back a user object
          setUser(data);
        } catch (err) {
          console.error('Token validation failed:', err);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoading(false);
    };
    checkAuthStatus();
  }, []);

  // Function to handle login
  const login = (userData) => {
    localStorage.setItem('token', userData.token);
    setUser({ username: userData.username }); // Store a simple user object
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  // Memoize the context value to prevent unnecessary re-renders
  const memoizedValue = useMemo(() => ({
    user,
    loading,
    login,
    logout,
  }), [user, loading]);

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Create a custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}