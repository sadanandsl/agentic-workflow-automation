
// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, Alert, Spinner, ProgressBar } from 'react-bootstrap'; // Ensure Spinner is imported
import { useAuth } from '../context/AuthContext';
import * as api from '../services/api';

const Dashboard = () => {
  const { currentUser, authToken } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    totalRooms: 0,
    occupiedRooms: 0,
    totalTenants: 0,
    vacantBeds: 0,
    pendingMaintenance: 0,
  });
  const [welcomeMessage, setWelcomeMessage] = useState('Loading dashboard data...');
  const [loadingDashboard, setLoadingDashboard] = useState(true);
  const [errorDashboard, setErrorDashboard] = useState(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      if (!authToken) {
        setLoadingDashboard(false);
        setErrorDashboard("Authentication token missing. Please log in.");
        return;
      }
      setLoadingDashboard(true);
      setErrorDashboard(null);

      try {
        const response = await api.getDashboardStats();
        setDashboardData(response.data);
        setWelcomeMessage(`Welcome, ${currentUser?.email || 'User'}!`);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err.response?.data || err.message);
        let errorDetail = err.response?.data?.detail;
        let errorMessage = "Failed to load dashboard data.";

        if (errorDetail) {
          if (Array.isArray(errorDetail)) {
            errorMessage += " " + errorDetail.map(e => `${e.loc ? e.loc.join('.') + ': ' : ''}${e.msg}`).join('; ');
          } else if (typeof errorDetail === 'string') {
            errorMessage += " " + errorDetail;
          } else {
            errorMessage += " Details: " + JSON.stringify(errorDetail);
          }
        } else if (err.message) {
          errorMessage += " " + err.message;
        }

        setErrorDashboard(errorMessage + " Please try again after logging in.");
      } finally {
        setLoadingDashboard(false);
      }
    };

    fetchDashboardStats();
  }, [authToken, currentUser]);

  const occupancyPercentage = dashboardData.totalRooms > 0
    ? (dashboardData.occupiedRooms / dashboardData.totalRooms) * 100
    : 0;

  if (loadingDashboard) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" role="status" className="mb-3" />
        <p>Loading dashboard data...</p>
      </Container>
    );
  }

  if (errorDashboard) {
    return <Container className="mt-4"><Alert variant="danger">{errorDashboard}</Alert></Container>;
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-3">{welcomeMessage}</h2>
      <Row className="g-4">
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Total Rooms</Card.Title>
              <Card.Text className="display-4 text-primary">{dashboardData.totalRooms}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Occupied Rooms</Card.Title>
              <Card.Text className="display-4 text-info">{dashboardData.occupiedRooms}</Card.Text>
              <ProgressBar now={occupancyPercentage} label={`${occupancyPercentage.toFixed(1)}%`} className="mt-3" variant="info" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Total Tenants</Card.Title>
              <Card.Text className="display-4 text-success">{dashboardData.totalTenants}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Vacant Beds</Card.Title>
              <Card.Text className="display-4 text-warning">{dashboardData.vacantBeds}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="text-center shadow-sm">
            <Card.Body>
              <Card.Title>Pending Maintenance</Card.Title>
              <Card.Text className="display-4 text-danger">{dashboardData.pendingMaintenance}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
