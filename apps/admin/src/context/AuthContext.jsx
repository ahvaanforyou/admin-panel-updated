// =============================================================================
// src/context/AuthContext.jsx — Multi-Admin Authentication Context
// =============================================================================
import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';
import { CUSTOMIZATION } from '../config/customization';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem('ahvaan_admin_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await api.login(email, password);
      // Look up admin name/role from CUSTOMIZATION or fallback
      const foundAdmin = CUSTOMIZATION.admins?.find(a => a.email.toLowerCase() === email.toLowerCase());
      const adminProfile = {
        email,
        name: foundAdmin?.name || CUSTOMIZATION.sharedAdmin?.name || "Ahvaan Admin",
        role: foundAdmin?.role || "Admin",
        token: data.access_token,
      };
      
      localStorage.setItem('ahvaan_admin_token', data.access_token);
      localStorage.setItem('ahvaan_admin_user', JSON.stringify(adminProfile));
      setAdmin(adminProfile);
      return adminProfile;
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email, password, name = "Admin") => {
    setLoading(true);
    setError(null);
    try {
      await api.signupAdmin(email, password);
      // Auto-login after signup
      return await login(email, password);
    } catch (err) {
      setError(err.message || 'Signup failed.');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('ahvaan_admin_token');
    localStorage.removeItem('ahvaan_admin_user');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, isAuthenticated: !!admin, loading, error, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
