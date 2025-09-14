
// src/components/AddTenantForm.js
import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as api from '../services/api'; // Correct path

const AddTenantForm = () => {
  const navigate = useNavigate();
  const [tenantData, setTenantData] = useState({
    name: '', roomNumber: '', bedNumber: '', contact: '', email: '',
    joiningDate: '', rentAmount: '', securityDeposit: '', emergencyContact: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTenantData({ ...tenantData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(null); setSuccess(null);

    // Frontend validation for required fields
    if (!tenantData.name || !tenantData.roomNumber || !tenantData.contact || !tenantData.joiningDate || !tenantData.rentAmount) {
      setError("Please fill in all required fields (Name, Room No, Contact, Joining Date, Rent Amount).");
      setLoading(false); return;
    }

    // Convert rentAmount and securityDeposit to numbers
    const dataToSend = {
      ...tenantData,
      rentAmount: parseFloat(tenantData.rentAmount),
      securityDeposit: tenantData.securityDeposit ? parseFloat(tenantData.securityDeposit) : null,
    };

    try {
      const response = await api.addTenant(dataToSend); // Use api.addTenant
      console.log('Tenant added successfully:', response.data);
      setSuccess("Tenant added successfully!");
      setTenantData({ name: '', roomNumber: '', bedNumber: '', contact: '', email: '', joiningDate: '', rentAmount: '', securityDeposit: '', emergencyContact: '' });
      setTimeout(() => { navigate('/tenants'); }, 1500);
    } catch (err) {
      console.error('Error adding tenant:', err.response?.data || err.message);
      setError("Failed to add tenant. " + (err.response?.data?.detail || "Please try again."));
    } finally { setLoading(false); }
  };

  return (
    <Container className="mt-4">
      <h2>Add New Tenant</h2>
      <Card className="shadow-sm">
        <Card.Body>
          {success && <Alert variant="success">{success}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3"><Col md={6}><Form.Group controlId="formName"><Form.Label>Name <span className="text-danger">*</span></Form.Label><Form.Control type="text" placeholder="Enter tenant's full name" name="name" value={tenantData.name} onChange={handleChange} required /></Form.Group></Col><Col md={6}><Form.Group controlId="formRoomNumber"><Form.Label>Room Number <span className="text-danger">*</span></Form.Label><Form.Control type="text" placeholder="e.g., A101" name="roomNumber" value={tenantData.roomNumber} onChange={handleChange} required /></Form.Group></Col></Row>
            <Row className="mb-3"><Col md={6}><Form.Group controlId="formBedNumber"><Form.Label>Bed Number</Form.Label><Form.Control type="text" placeholder="e.g., 1 (optional)" name="bedNumber" value={tenantData.bedNumber} onChange={handleChange} /></Form.Group></Col><Col md={6}><Form.Group controlId="formContact"><Form.Label>Contact Number <span className="text-danger">*</span></Form.Label><Form.Control type="tel" placeholder="e.g., 9876543210" name="contact" value={tenantData.contact} onChange={handleChange} required /></Form.Group></Col></Row>
            <Row className="mb-3"><Col md={6}><Form.Group controlId="formEmail"><Form.Label>Email</Form.Label><Form.Control type="email" placeholder="Enter email address (optional)" name="email" value={tenantData.email} onChange={handleChange} /></Form.Group></Col><Col md={6}><Form.Group controlId="formJoiningDate"><Form.Label>Joining Date <span className="text-danger">*</span></Form.Label><Form.Control type="date" name="joiningDate" value={tenantData.joiningDate} onChange={handleChange} required /></Form.Group></Col></Row>
            <Row className="mb-3"><Col md={6}><Form.Group controlId="formRentAmount"><Form.Label>Rent Amount (₹) <span className="text-danger">*</span></Form.Label><Form.Control type="number" placeholder="e.g., 8000" name="rentAmount" value={tenantData.rentAmount} onChange={handleChange} required /></Form.Group></Col><Col md={6}><Form.Group controlId="formSecurityDeposit"><Form.Label>Security Deposit (₹)</Form.Label><Form.Control type="number" placeholder="e.g., 16000 (optional)" name="securityDeposit" value={tenantData.securityDeposit} onChange={handleChange} /></Form.Group></Col></Row>
            <Row className="mb-3"><Col md={12}><Form.Group controlId="formEmergencyContact"><Form.Label>Emergency Contact</Form.Label><Form.Control type="text" placeholder="Name - Phone (optional)" name="emergencyContact" value={tenantData.emergencyContact} onChange={handleChange} /></Form.Group></Col></Row>
            <Button variant="primary" type="submit" disabled={loading}>{loading ? 'Adding Tenant...' : 'Add Tenant'}</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddTenantForm;
