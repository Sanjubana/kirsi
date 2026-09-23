import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load session from localStorage/sessionStorage on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('kirsi_session_user') || sessionStorage.getItem('kirsi_session_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to load user session:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Mock Login
  const login = async (identifier, mode, value, remember = false) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1200));

    let mockUser = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name: 'Rajesh Kumar',
      phone: '9876543210',
      email: 'rajesh.kumar@kirsi.com',
      village: 'Kalyanpura',
      district: 'Jhalawar',
      role: 'Farmer',
    };

    // If the user entered an email, update the mock user details
    if (identifier.includes('@')) {
      mockUser.email = identifier;
      mockUser.name = identifier.split('@')[0];
    } else {
      mockUser.phone = identifier;
    }

    if (remember) {
      localStorage.setItem('kirsi_session_user', JSON.stringify(mockUser));
    } else {
      sessionStorage.setItem('kirsi_session_user', JSON.stringify(mockUser));
    }
    setUser(mockUser);
    return mockUser;
  };

  // Mock Signup
  const signup = async (formData, remember = false) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const newUser = {
      id: 'usr_' + Math.random().toString(36).substr(2, 9),
      name: formData.name,
      phone: formData.phone,
      email: formData.email || `${formData.name.toLowerCase().replace(/\s+/g, '')}@kirsi.com`,
      village: formData.village,
      district: formData.district,
      role: formData.role || 'Farmer',
    };

    if (remember) {
      localStorage.setItem('kirsi_session_user', JSON.stringify(newUser));
    } else {
      sessionStorage.setItem('kirsi_session_user', JSON.stringify(newUser));
    }
    setUser(newUser);
    return newUser;
  };

  // Mock Logout
  const logout = () => {
    localStorage.removeItem('kirsi_session_user');
    sessionStorage.removeItem('kirsi_session_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};
