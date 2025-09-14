
// src/components/Sidebar.js
import React from 'react';
import { Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Correct path

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { currentUser } = useAuth(); // Use auth context

  return (
    <div className={`sidebar ${isOpen ? 'show' : ''}`}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>PG Management</h2>
        <Button
          variant="link"
          className="text-white d-md-none"
          onClick={toggleSidebar}
          aria-label="Close sidebar"
          style={{ fontSize: '1.5rem' }}
        >
          ✕ {/* Unicode 'X' icon */}
        </Button>
      </div>
      <nav>
        <ul>
          {/* Conditional rendering for navigation links based on login status */}
          {currentUser ? (
            <>
              <li><Link to="/dashboard" className={location.pathname === '/dashboard' ? 'active' : ''} onClick={toggleSidebar}>Dashboard</Link></li>
              <li><Link to="/tenants" className={location.pathname.startsWith('/tenants') ? 'active' : ''} onClick={toggleSidebar}>Tenants</Link></li>
              <li><Link to="/rooms" className={location.pathname.startsWith('/rooms') ? 'active' : ''} onClick={toggleSidebar}>Rooms</Link></li>
              <li><Link to="/maintenance" className={location.pathname === '/maintenance' ? 'active' : ''} onClick={toggleSidebar}>Maintenance</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/" className={location.pathname === '/' ? 'active' : ''} onClick={toggleSidebar}>Home</Link></li>
              <li><Link to="/login" className={location.pathname === '/login' ? 'active' : ''} onClick={toggleSidebar}>Login</Link></li>
              <li><Link to="/register" className={location.pathname === '/register' ? 'active' : ''} onClick={toggleSidebar}>Register</Link></li>
              <li><Link to="/about" className={location.pathname === '/about' ? 'active' : ''} onClick={toggleSidebar}>About</Link></li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
