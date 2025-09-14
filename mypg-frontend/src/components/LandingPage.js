// // src/components/LandingPage.js
// import React from 'react';
// import { Container, Button, Card, Row, Col } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext'; // Correct path

// const LandingPage = () => {
//   const { currentUser } = useAuth(); // Use the auth context

//   return (
//     <Container className="mt-5 text-center">
//       <h1 className="mb-4">Welcome to PG Management System</h1>
//       <p className="lead mb-5">Your comprehensive solution for managing paying guest accommodations efficiently.</p>

//       <Row className="justify-content-center g-4">
//         <Col md={6}>
//           <Card className="shadow-sm">
//             <Card.Body>
//               <Card.Title>About Us</Card.Title>
//               <Card.Text>
//                 We provide a robust platform to streamline all aspects of PG management,
//                 from tenant tracking and room allocation to maintenance requests and financial overview.
//               </Card.Text>
//               <Button variant="outline-primary" as={Link} to="/about">Learn More</Button>
//             </Card.Body>
//           </Card>
//         </Col>
//         <Col md={6}>
//           <Card className="shadow-sm">
//             <Card.Body>
//               <Card.Title>Dashboard</Card.Title>
//               <Card.Text>
//                 Access your personalized dashboard to get a quick overview of your PG operations.
//               </Card.Text>
//               <Button variant="primary" as={Link} to="/dashboard">
//                 {currentUser ? 'Go to Dashboard' : 'Login to Dashboard'}
//               </Button>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default LandingPage;
// src/components/LandingPage.js
import React from 'react';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LandingPage = () => {
  const { currentUser } = useAuth();

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <div 
        className="hero-section text-white text-center d-flex align-items-center justify-content-center"
        style={{
          backgroundImage: `url('https://placehold.co/1200x600/32CD32/FFFFFF?text=Modern%20PG%20Living')`, // Placeholder for a modern PG building/room
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '500px', // Responsive height
          position: 'relative',
          marginBottom: '50px',
          borderRadius: '10px', // Rounded corners
          overflow: 'hidden', // Hide overflow for rounded corners
        }}
      >
        {/* Overlay for better text readability */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay
          borderRadius: '10px',
        }}></div>
        <Container className="position-relative z-1" style={{ maxWidth: '800px' }}>
          <h1 className="display-3 fw-bold mb-4 animate__animated animate__fadeInDown">
            Simplify Your PG Management
          </h1>
          <p className="lead mb-5 animate__animated animate__fadeInUp animate__delay-1s">
            Effortlessly manage tenants, rooms, and maintenance with our intuitive and powerful system.
            Focus on providing the best living experience.
          </p>
          <Button
            variant="primary"
            size="lg"
            as={Link}
            to={currentUser ? "/dashboard" : "/register"}
            className="shadow-lg animate__animated animate__zoomIn animate__delay-2s"
            style={{ borderRadius: '30px', padding: '12px 30px', fontSize: '1.2rem' }}
          >
            {currentUser ? 'Go to Dashboard' : 'Get Started Free'}
          </Button>
        </Container>
      </div>

      {/* Features Section */}
      <Container className="my-5">
        <h2 className="text-center mb-5 fw-bold text-primary">Key Features</h2>
        <Row className="g-4 text-center">
          <Col md={4}>
            <Card className="feature-card shadow-sm h-100 border-0 rounded-4">
              <Card.Img 
                variant="top" 
                src="https://placehold.co/400x250/B0E0E6/333?text=Tenant%20Management" 
                alt="Tenant Management" 
                className="rounded-top-4" 
              />
              <Card.Body>
                <Card.Title className="fw-bold text-dark">Tenant Tracking</Card.Title>
                <Card.Text className="text-muted">
                  Keep a detailed record of all tenants, their agreements, payments, and personal information.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="feature-card shadow-sm h-100 border-0 rounded-4">
              <Card.Img 
                variant="top" 
                src="https://placehold.co/400x250/FFD700/333?text=Room%20Allocation" 
                alt="Room Allocation" 
                className="rounded-top-4" 
              />
              <Card.Body>
                <Card.Title className="fw-bold text-dark">Room & Bed Allocation</Card.Title>
                <Card.Text className="text-muted">
                  Efficiently assign rooms and beds, track availability, and manage occupancy.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="feature-card shadow-sm h-100 border-0 rounded-4">
              <Card.Img 
                variant="top" 
                src="https://placehold.co/400x250/98FB98/333?text=Maintenance%20Tracking" 
                alt="Maintenance Tracking" 
                className="rounded-top-4" 
              />
              <Card.Body>
                <Card.Title className="fw-bold text-dark">Maintenance Management</Card.Title>
                <Card.Text className="text-muted">
                  Log, track, and resolve maintenance requests promptly, ensuring tenant satisfaction.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* About Us & Dashboard CTA Section */}
      <Container className="my-5">
        <h2 className="text-center mb-5 fw-bold text-dark">Ready to Optimize Your PG?</h2>
        <Row className="justify-content-center g-4">
          <Col md={6}>
            <Card className="shadow-lg h-100 border-primary rounded-4">
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title className="text-center fw-bold text-primary mb-3">Learn More About Us</Card.Title>
                <Card.Text className="text-center text-muted flex-grow-1">
                  Discover our mission, vision, and how our platform can revolutionize your PG business.
                </Card.Text>
                <div className="text-center mt-3">
                  <Button variant="outline-primary" as={Link} to="/about" className="rounded-pill">
                    About Us
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card className="shadow-lg h-100 border-success rounded-4">
              <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title className="text-center fw-bold text-success mb-3">Access Your Dashboard</Card.Title>
                <Card.Text className="text-center text-muted flex-grow-1">
                  Already a user? Log in to your personalized dashboard and take control of your PG operations.
                </Card.Text>
                <div className="text-center mt-3">
                  <Button variant="success" as={Link} to="/dashboard" className="rounded-pill">
                    Go to Dashboard
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LandingPage;
