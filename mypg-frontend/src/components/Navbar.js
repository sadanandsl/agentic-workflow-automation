
// // src/components/Navbar.js
// import React from 'react';
// import { Button, Spinner } from 'react-bootstrap';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'; // Correct path

// const Navbar = ({ toggleSidebar }) => {
//   const { currentUser, logout, loadingAuth } = useAuth(); // Use auth context
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     const result = await logout();
//     if (result.success) {
//       navigate('/login');
//     } else {
//       console.error("Logout failed:", result.error);
//     }
//   };

//   return (
//     <header className="navbar">
//       <button className="navbar-toggler d-md-none" onClick={toggleSidebar} aria-label="Toggle sidebar">
//         ☰ {/* Unicode hamburger icon */}
//       </button>
//       <h1>Welcome to PG Management</h1>
//       <div className="navbar-right-content">
//         {loadingAuth ? (
//           <Spinner animation="border" size="sm" />
//         ) : currentUser ? (
//           <>
//             <span className="me-3 d-none d-sm-inline">Logged in as: <strong>{currentUser.email || 'Guest'}</strong></span>
//             <Button variant="outline-danger" size="sm" onClick={handleLogout} disabled={loadingAuth}>
//               Logout
//             </Button>
//           </>
//         ) : (
//           <Button variant="outline-success" size="sm" as={Link} to="/login">
//             Login
//           </Button>
//         )}
//       </div>
//     </header>
//   );
// };

// export default Navbar;
// src/components/Navbar.js
import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Correct path

const Navbar = ({ toggleSidebar }) => {
  const { currentUser, logout, loadingAuth } = useAuth(); // Use auth context
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      navigate('/login'); // Redirect to login page after logout
    } else {
      console.error("Logout failed:", result.error);
    }
  };

  return (
    <header className="app-navbar"> {/* Changed class name to avoid Bootstrap conflicts and for custom styling */}
      <button className="navbar-toggler d-md-none" onClick={toggleSidebar} aria-label="Toggle sidebar">
        ☰ {/* Unicode hamburger icon */}
      </button>
      <div className="navbar-brand-container">
        <Link to={currentUser ? "/dashboard" : "/"} className="navbar-brand-link">
          <span className="navbar-brand-icon">🏠</span> {/* Professional-looking icon */}
          <span className="navbar-brand-text">PG Management System</span>
        </Link>
      </div>
      
      <div className="navbar-right-content">
        {loadingAuth ? (
          <Spinner animation="border" size="sm" variant="primary" /> // Added variant for consistent color
        ) : currentUser ? (
          <>
            <span className="me-3 d-none d-sm-inline navbar-user-email">
              Logged in as: <strong>{currentUser.email || 'Guest'}</strong>
            </span>
            <Button variant="outline-danger" size="sm" onClick={handleLogout} disabled={loadingAuth} className="rounded-pill px-3 py-1">
              Logout
            </Button>
          </>
        ) : (
          <Button variant="outline-primary" size="sm" as={Link} to="/login" className="rounded-pill px-3 py-1">
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default Navbar;
