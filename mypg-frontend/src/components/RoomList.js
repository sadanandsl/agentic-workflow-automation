
// src/components/RoomList.js
import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import * as api from '../services/api'; // Correct path

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.getRooms(); // Use api.getRooms
        setRooms(response.data);
      } catch (err) {
        console.error("Error fetching rooms:", err.response?.data || err.message);
        setError("Failed to load room data. " + (err.response?.data?.detail || ""));
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const handleRoomAction = async (roomId, currentStatus) => {
    const newStatus = currentStatus === 'vacant' ? 'occupied' : 'vacant';
    try {
      await api.updateRoomStatus(roomId, newStatus); // Use api.updateRoomStatus
      setRooms(prevRooms => prevRooms.map(room =>
        room.id === roomId ? { ...room, status: newStatus } : room // Optimistically update status
      ));
      // You might want to also re-fetch dashboard stats if they rely on room occupancy
    } catch (err) {
      console.error("Error updating room status:", err.response?.data || err.message);
      setError("Failed to update room status. " + (err.response?.data?.detail || ""));
    }
  };

  if (loading) {
    return <Container className="mt-4"><p>Loading rooms...</p></Container>;
  }
  if (error) {
    return <Container className="mt-4"><Alert variant="danger">{error}</Alert></Container>;
  }

  return (
    <Container className="mt-4">
      <Row className="mb-3 align-items-center">
        <Col><h2>Room Management</h2></Col>
        <Col xs="auto"><Button variant="primary" onClick={() => navigate('/rooms/add')}>Add New Room</Button></Col>
      </Row>
      <Table striped bordered hover responsive>
        <thead><tr><th>Room No</th><th>Beds</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {rooms.length > 0 ? (
            rooms.map(room => (<tr key={room.id}><td>{room.roomNumber}</td><td>{room.numberOfBeds}</td><td>{room.status.charAt(0).toUpperCase() + room.status.slice(1)}</td><td><Button variant={room.status === 'vacant' ? 'success' : 'danger'} onClick={() => handleRoomAction(room.id, room.status)} size="sm">Mark as {room.status === 'vacant' ? 'Occupied' : 'Vacant'}</Button></td></tr>))
          ) : (
            <tr><td colSpan="4" className="text-center">No rooms found.</td></tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default RoomList;
