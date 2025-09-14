
// src/components/TenantDetails.js
import React, { useState, useEffect } from 'react';
import { Container, Card, ListGroup, Alert, Spinner, Row, Col, Button } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import * as api from '../services/api'; // Correct path

const TenantDetails = () => {
  const { tenantId } = useParams();
  const [tenant, setTenant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTenantDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.getTenantDetails(tenantId); // Use api.getTenantDetails
        setTenant(response.data);
      } catch (err) {
        console.error("Error fetching tenant details:", err.response?.data || err.message);
        setError("Failed to load tenant details. " + (err.response?.data?.detail || ""));
      } finally {
        setLoading(false);
      }
    };
    fetchTenantDetails();
  }, [tenantId]);

  if (loading) return <Container className="mt-4"><p>Loading tenant details...</p></Container>;
  if (error) return <Container className="mt-4"><Alert variant="danger">{error}</Alert></Container>;
  if (!tenant) return (<Container className="mt-4"><Alert variant="warning">Tenant not found.</Alert><Link to="/tenants"><Button variant="secondary">Back to Tenant List</Button></Link></Container>);

  return (
    <Container className="mt-4">
      <Row className="mb-3"><Col><h2>Tenant Details: {tenant.name}</h2></Col><Col xs="auto"><Link to="/tenants"><Button variant="secondary">Back to List</Button></Link></Col></Row>
      <Card className="shadow-sm"><Card.Body><ListGroup variant="flush">
        <ListGroup.Item><strong>Name:</strong> {tenant.name}</ListGroup.Item>
        <ListGroup.Item><strong>Room Number:</strong> {tenant.roomNumber}</ListGroup.Item>
        <ListGroup.Item><strong>Bed Number:</strong> {tenant.bedNumber || 'N/A'}</ListGroup.Item>
        <ListGroup.Item><strong>Contact:</strong> {tenant.contact}</ListGroup.Item>
        <ListGroup.Item><strong>Email:</strong> {tenant.email || 'N/A'}</ListGroup.Item>
        <ListGroup.Item><strong>Joining Date:</strong> {tenant.joiningDate}</ListGroup.Item>
        <ListGroup.Item><strong>Rent Amount:</strong> ₹{tenant.rentAmount.toLocaleString('en-IN')}</ListGroup.Item>
        <ListGroup.Item><strong>Security Deposit:</strong> ₹{tenant.securityDeposit ? tenant.securityDeposit.toLocaleString('en-IN') : 'N/A'}</ListGroup.Item>
        <ListGroup.Item><strong>Emergency Contact:</strong> {tenant.emergencyContact || 'N/A'}</ListGroup.Item>
      </ListGroup></Card.Body></Card>
    </Container>
  );
};

export default TenantDetails;
