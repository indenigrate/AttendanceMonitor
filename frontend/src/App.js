import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import TestAPI from './components/TestAPI';
import SubjectManager from './components/SubjectManager';
import AuthTest from './components/AuthTest';
import DebugTimetable from './components/DebugTimetable';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [token]);

  const handleLogin = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        {isAuthenticated && <Navbar onLogout={handleLogout} />}
        <div className="container">
          <Routes>
            <Route 
              path="/login" 
              element={
                isAuthenticated ? 
                <Navigate to="/dashboard" replace /> : 
                <Login onLogin={handleLogin} />
              } 
            />
            <Route 
              path="/signup" 
              element={
                isAuthenticated ? 
                <Navigate to="/dashboard" replace /> : 
                <Signup onLogin={handleLogin} />
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                isAuthenticated ? 
                <Dashboard token={token} /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/test" 
              element={<TestAPI />} 
            />
            <Route 
              path="/subjects" 
              element={
                isAuthenticated ? 
                <SubjectManager /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/auth-test" 
              element={
                isAuthenticated ? 
                <AuthTest /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/debug-timetable" 
              element={
                isAuthenticated ? 
                <DebugTimetable /> : 
                <Navigate to="/login" replace />
              } 
            />
            <Route 
              path="/" 
              element={
                isAuthenticated ? 
                <Navigate to="/dashboard" replace /> : 
                <Navigate to="/login" replace />
              } 
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App; 