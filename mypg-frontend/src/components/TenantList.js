
// src/components/TenantList.js
import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as api from '../services/api'; // Correct path

const TenantList = () => {
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTenants = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.getTenants(); // Use api.getTenants
        setTenants(response.data);
      } catch (err) {
        console.error("Error fetching tenants:", err.response?.data || err.message);
        setError("Failed to load tenant data. " + (err.response?.data?.detail || ""));
      } finally {
        setLoading(false);
      }
    };
    fetchTenants();
  }, []);

  const handleDeleteTenant = async (tenantId) => {
    if (window.confirm("Are you sure you want to delete this tenant?")) {
      try {
        setLoading(true);
        await api.deleteTenant(tenantId); // Use api.deleteTenant
        setTenants(tenants.filter(tenant => tenant.id !== tenantId));
        // You might want to also re-fetch dashboard stats after deletion if they rely on tenant count
      } catch (err) {
        console.error("Error deleting tenant:", err.response?.data || err.message);
        setError("Failed to delete tenant. " + (err.response?.data?.detail || ""));
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <Container className="mt-4"><p>Loading tenants...</p></Container>;
  }
  if (error) {
    return <Container className="mt-4"><Alert variant="danger">{error}</Alert></Container>;
  }

  return (
    <Container className="mt-4">
      <Row className="mb-3 align-items-center">
        <Col><h2>Tenant List</h2></Col>
        <Col xs="auto"><Button variant="primary" onClick={() => navigate('/tenants/add')}>Add New Tenant</Button></Col>
      </Row>
      <Table striped bordered hover responsive>
        <thead><tr><th>Name</th><th>Room No</th><th>Contact</th><th>Joining Date</th><th>Rent</th><th>Actions</th></tr></thead>
        <tbody>
          {tenants.length > 0 ? (
            tenants.map(tenant => (<tr key={tenant.id}>
              <td>{tenant.name}</td>
              <td>{tenant.roomNumber}</td>
              <td>{tenant.contact}</td>
              <td>{tenant.joiningDate}</td>
              <td>₹{tenant.rentAmount.toLocaleString('en-IN')}</td>
              <td>
                <Button variant="info" size="sm" onClick={() => navigate(`/tenants/${tenant.id}`)} className="me-2">View</Button>
                <Button variant="danger" size="sm" onClick={() => handleDeleteTenant(tenant.id)}>Delete</Button>
              </td>
            </tr>))
          ) : (
            <tr><td colSpan="6" className="text-center">No tenants found.</td></tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default TenantList;
