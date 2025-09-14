
// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap'; // Ensure Container and Spinner are imported for use in about page and loading
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// Import AuthProvider and useAuth from context
import { AuthProvider, useAuth } from './context/AuthContext';

// Import all components from components folder
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import TenantList from './components/TenantList';
import RoomList from './components/RoomList';
import TenantDetails from './components/TenantDetails';
import MaintenanceRequests from './components/MaintenanceRequests';
import AddTenantForm from './components/AddTenantForm';
import AddRoomForm from './components/AddRoomForm';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute'; // This component itself uses useAuth internally
import Footer from './components/Footer'; // Import the Footer component here

// AppContent component to handle conditional rendering based on auth state
const AppContent = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { currentUser, loadingAuth } = useAuth(); // Get auth state from context

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  // Show a global loading spinner while authentication status is being determined
  if (loadingAuth) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading application...</span>
        </Spinner>
        <p className="mt-3">Loading application...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      {/* Sidebar is only rendered if the user is logged in */}
      {currentUser && <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
      
      {/* Overlay for sidebar (only shown if sidebar is open AND user is logged in) */}
      {currentUser && <div className={`overlay ${isSidebarOpen ? 'show' : ''} d-md-none`} onClick={closeSidebar}></div>}

      <div className="main-content">
        {/* Navbar is always rendered, its content (login/logout buttons) adapts based on login status */}
        <Navbar toggleSidebar={toggleSidebar} />
        
        <div className="page-content">
          <Routes>
            {/* Public Routes:
                - If logged in, redirect to dashboard.
                - If logged out, show the public page.
            */}
            <Route path="/" element={currentUser ? <Navigate to="/dashboard" replace /> : <LandingPage />} />
            <Route path="/login" element={currentUser ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
            <Route path="/register" element={currentUser ? <Navigate to="/dashboard" replace /> : <RegisterPage />} />
            
            {/* About page is always accessible, as it's a simple info page */}
            <Route path="/about" element={<Container className="mt-5 text-center"><h2>About PG Management</h2><p>This is a demo application for managing Paying Guest accommodations.</p><Link to="/">Back Home</Link></Container>} />

            {/* Protected Routes:
                - Wrapped in ProtectedRoute component to ensure user is logged in.
            */}
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/tenants" element={<ProtectedRoute><TenantList /></ProtectedRoute>} />
            <Route path="/tenants/add" element={<ProtectedRoute><AddTenantForm /></ProtectedRoute>} />
            <Route path="/tenants/:tenantId" element={<ProtectedRoute><TenantDetails /></ProtectedRoute>} />
            <Route path="/rooms" element={<ProtectedRoute><RoomList /></ProtectedRoute>} />
            <Route path="/rooms/add" element={<ProtectedRoute><AddRoomForm /></ProtectedRoute>} />
            <Route path="/maintenance" element={<ProtectedRoute><MaintenanceRequests /></ProtectedRoute>} />

            {/* Catch-all route for any unhandled paths:
                - If logged in, redirect to dashboard.
                - If logged out, redirect to landing page.
            */}
            <Route path="*" element={currentUser ? <Navigate to="/dashboard" replace /> : <Navigate to="/" replace />} />
          </Routes>
        </div>
        {/* Footer is always rendered, below the main content area */}
        <Footer />
      </div>
    </div>
  );
};

// The main App component just sets up the Router and AuthProvider
const App = () => {
  return (
    <Router>
      <AuthProvider>
        <AppContent /> {/* Render the new wrapper component */}
      </AuthProvider>
    </Router>
  );
};

export default App;
