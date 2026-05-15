import React, { createContext, useContext, useState, useEffect } from 'react';
import { dashboardData as initialDashboardData, chatHistory as initialChatHistory } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Initialize state from localStorage if available
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const saved = localStorage.getItem('isAuthenticated');
    return saved === 'true';
  });

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : {
      firstName: 'Student',
      lastName: 'User',
      email: 'student@university.edu'
    };
  });

  const [dashboardData, setDashboardData] = useState(initialDashboardData);
  const [chatHistory, setChatHistory] = useState(initialChatHistory);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const login = (userData) => {
    setIsAuthenticated(true);
    if (userData) {
      setUser(prev => ({ ...prev, ...userData }));
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    // Optionally clear user data on logout, but we might want to keep it to simulate remembered accounts
  };

  const updateUser = (data) => {
    setUser(prev => ({ ...prev, ...data }));
  };

  const toggleTaskCompletion = (taskId) => {
    setDashboardData(prev => ({
      ...prev,
      remediationTasks: prev.remediationTasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    }));
  };

  const addChatMessage = (message) => {
    const newMessage = { id: Date.now(), role: 'user', content: message };
    setChatHistory(prev => [...prev, newMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = { 
        id: Date.now() + 1, 
        role: 'ai', 
        content: `I've received your message: "${message}". As an AI, I am currently using mock responses.` 
      };
      setChatHistory(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <AppContext.Provider value={{
      isAuthenticated,
      user,
      login,
      logout,
      updateUser,
      dashboardData,
      toggleTaskCompletion,
      chatHistory,
      addChatMessage
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
