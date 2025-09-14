// src/components/AddRoomForm.js
import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as api from '../services/api'; // Correct path

const AddRoomForm = () => {
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState({ roomNumber: '', numberOfBeds: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData({ ...roomData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(null); setSuccess(null);

    const formattedData = {
        ...roomData,
        numberOfBeds: parseInt(roomData.numberOfBeds),
    };

    if (!formattedData.roomNumber || !formattedData.numberOfBeds) {
      setError("Please fill in both Room Number and Number of Beds."); setLoading(false); return;
    }
    if (formattedData.numberOfBeds <= 0) {
      setError("Number of Beds must be a positive number."); setLoading(false); return;
    }
    try {
      const response = await api.addRoom(formattedData); // Use api.addRoom
      console.log('Room added successfully:', response.data);
      setSuccess("Room added successfully!");
      setRoomData({ roomNumber: '', numberOfBeds: '' });
      setTimeout(() => { navigate('/rooms'); }, 1500);
    } catch (err) {
      console.error('Error adding room:', err.response?.data || err.message); setError("Failed to add room. " + (err.response?.data?.detail || "Please try again."));
    } finally { setLoading(false); }
  };

  return (
    <Container className="mt-4">
      <h2>Add New Room</h2>
      <Card className="shadow-sm">
        <Card.Body>
          {success && <Alert variant="success">{success}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Row className="mb-3"><Col md={6}><Form.Group controlId="formRoomNumber"><Form.Label>Room Number <span className="text-danger">*</span></Form.Label><Form.Control type="text" placeholder="e.g., D405" name="roomNumber" value={roomData.roomNumber} onChange={handleChange} required /></Form.Group></Col><Col md={6}><Form.Group controlId="formNumberOfBeds"><Form.Label>Number of Beds <span className="text-danger">*</span></Form.Label><Form.Control type="number" placeholder="e.g., 3" name="numberOfBeds" value={roomData.numberOfBeds} onChange={handleChange} min="1" required /></Form.Group></Col></Row>
            <Button variant="primary" type="submit" disabled={loading}>{loading ? 'Adding Room...' : 'Add Room'}</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddRoomForm;
