// src/components/Footer.js
import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-dark text-white">
      <Container className="d-flex flex-column flex-md-row justify-content-between align-items-center">
        <span className="text-muted text-center text-md-start mb-2 mb-md-0">
          &copy; {new Date().getFullYear()} PG Management. All rights reserved.
        </span>
        <nav className="footer-nav">
          <ul className="list-inline mb-0">
            <li className="list-inline-item me-3">
              <Link to="/about" className="text-muted text-decoration-none">About</Link>
            </li>
            <li className="list-inline-item me-3">
              <Link to="/contact" className="text-muted text-decoration-none">Contact Us</Link>
            </li>
            <li className="list-inline-item">
              <Link to="/privacy" className="text-muted text-decoration-none">Privacy Policy</Link>
            </li>
          </ul>
        </nav>
      </Container>
    </footer>
  );
};

export default Footer;
