import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/dashboard" className="navbar-brand">
          📚 Attendance Monitor
        </Link>
        
        <div className="navbar-links">
          <Link to="/dashboard">
            Dashboard
          </Link>
          <Link to="/subjects">
            Manage Subjects
          </Link>
          <Link to="/auth-test">
            Auth Test
          </Link>
          <Link to="/debug-timetable">
            Debug Timetable
          </Link>
          <button className="navbar-logout" onClick={onLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 