// src/components/LoginPage.js
import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Correct path

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const { login, loadingAuth } = useAuth(); // Use auth context
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setFeedback({ message: '', type: '' }); // Clear previous feedback

    const result = await login(email, password);
    if (result.success) {
      setFeedback({ message: "Login successful!", type: "success" });
      setTimeout(() => navigate('/dashboard'), 1000); // Redirect on success
    } else {
      setFeedback({ message: result.error, type: "danger" });
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-lg p-3">
            <Card.Body>
              <h2 className="text-center mb-4">Login to Your Account</h2>
              {feedback.message && <Alert variant={feedback.type}>{feedback.message}</Alert>}
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100" disabled={loadingAuth}>
                  {loadingAuth ? <Spinner animation="border" size="sm" /> : 'Login'}
                </Button>
              </Form>
              <p className="text-center mt-3">
                Don't have an account? <Link to="/register">Register here</Link>
              </p>
              <p className="text-center mt-2">
                <Link to="/">Back to Landing Page</Link>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
