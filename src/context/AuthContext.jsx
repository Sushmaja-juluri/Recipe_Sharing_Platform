import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Set auth token
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
      localStorage.removeItem('token');
    }
  };

  // Load user data
  const loadUser = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/auth/user');
      setUser(res.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.msg || 'Session expired - please login again');
      logout();
    } finally {
      setLoading(false);
    }
  };

  // Register user
  const register = async (formData) => {
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      setToken(res.data.token);
      await loadUser();
      navigate('/recipes');
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 
                      err.response?.data?.errors?.[0]?.msg || 
                      'Registration failed';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login user
  const login = async (formData) => {
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
      setToken(res.data.token);
      await loadUser();
      navigate('/recipes');
    } catch (err) {
      const errorMsg = err.response?.data?.msg || 'Invalid credentials';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    setToken(null);
    setUser(null);
    setAuthToken(null);
    navigate('/');
  };

  // Clear errors
  const clearErrors = () => setError(null);

  // Initialize auth state
  useEffect(() => {
    setAuthToken(token); // Ensure token is set in headers
    if (token) loadUser();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        error,
        loading,
        register,
        login,
        logout,
        clearErrors
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};