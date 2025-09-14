// src/components/RegisterPage.js
import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Correct path

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const { register, loadingAuth } = useAuth(); // Use auth context
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setFeedback({ message: '', type: '' });

    if (password !== confirmPassword) {
      setFeedback({ message: "Passwords do not match.", type: "danger" });
      return;
    }
    if (password.length < 6) {
      setFeedback({ message: "Password must be at least 6 characters long.", type: "danger" });
      return;
    }

    const result = await register(email, password);
    if (result.success) {
      setFeedback({ message: "Registration successful! You can now log in.", type: "success" });
      setTimeout(() => navigate('/login'), 1500); // Redirect to login on success
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
              <h2 className="text-center mb-4">Create New Account</h2>
              {feedback.message && <Alert variant={feedback.type}>{feedback.message}</Alert>}
              <Form onSubmit={handleRegister}>
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

                <Form.Group className="mb-3" controlId="formConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100" disabled={loadingAuth}>
                  {loadingAuth ? <Spinner animation="border" size="sm" /> : 'Register'}
                </Button>
              </Form>
              <p className="text-center mt-3">
                Already have an account? <Link to="/login">Login here</Link>
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

export default RegisterPage;
