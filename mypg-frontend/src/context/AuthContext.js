  // src/context/AuthContext.js
  import React, { useState, useEffect, createContext, useContext } from 'react';
  import { Spinner } from 'react-bootstrap'; // Ensure Spinner is imported
  import * as api from '../services/api';

  const AuthContext = createContext(null);

  export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(true);
    const [authToken, setAuthToken] = useState(null);

    useEffect(() => {
      const storedToken = localStorage.getItem('pg_auth_token');
      if (storedToken) {
        setAuthToken(storedToken);
        setCurrentUser({ email: storedToken.split('-')[0] || 'User' });
      }
      setLoadingAuth(false);
    }, []);

    const login = async (email, password) => {
      setLoadingAuth(true);
      try {
        const response = await api.loginUser(email, password);
        const { api_key, email: userEmail } = response.data;
        setAuthToken(api_key);
        setCurrentUser({ email: userEmail });
        localStorage.setItem('pg_auth_token', api_key);
        return { success: true };
      } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        let errorMessage = "Failed to log in.";
        if (error.response && error.response.status === 401) {
          errorMessage = error.response.data?.detail || "Invalid email or password.";
        }
        return { success: false, error: errorMessage };
      } finally {
        setLoadingAuth(false);
      }
    };

    const register = async (email, password) => {
      setLoadingAuth(true);
      try {
        const response = await api.registerUser(email, password);
        console.log("Registration successful:", response.data);
        return { success: true };
      } catch (error) {
        console.error("Registration error:", error.response?.data || error.message);
        let errorMessage = "Failed to register.";
        if (error.response && error.response.status === 400) {
          errorMessage = error.response.data?.detail || "Email already in use or invalid data.";
        }
        return { success: false, error: errorMessage };
      } finally {
        setLoadingAuth(false);
      }
    };

    const logout = async () => {
      setLoadingAuth(true);
      setAuthToken(null);
      setCurrentUser(null);
      localStorage.removeItem('pg_auth_token');
      setLoadingAuth(false);
      return { success: true };
    };

    const value = {
      currentUser,
      loadingAuth,
      login,
      register,
      logout,
      authToken,
    };

    return (
      <AuthContext.Provider value={value}>
        {loadingAuth ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading authentication...</span>
            </Spinner>
            <p className="mt-3">Initializing authentication...</p>
          </div>
        ) : (
          children
        )}
      </AuthContext.Provider>
    );
  };

  export const useAuth = () => {
    return useContext(AuthContext);
  };
