// // src/components/MaintenanceRequests.js
// import React, { useEffect, useState } from 'react';
// import { Table, Button, Container, Form, Card, Row, Col } from 'react-bootstrap'; // <--- ADDED Card, Row, Col here
// // import axios from 'axios'; // <--- COMMENTED OUT OR REMOVED axios

// const MaintenanceRequests = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [newRequest, setNewRequest] = useState({ roomNumber: '', description: '' });

//   useEffect(() => {
//     // Mock API call for demonstration
//     const fetchRequests = async () => {
//       try {
//         setLoading(true);
//         await new Promise(resolve => setTimeout(resolve, 500));
//         const mockRequests = [
//           { id: 1, roomNumber: 'A101', description: 'Leaky faucet in bathroom', status: 'Pending', date: '2025-06-01' },
//           { id: 2, roomNumber: 'B202', description: 'AC not cooling', status: 'In Progress', date: '2025-06-03' },
//           { id: 3, roomNumber: 'C301', description: 'Light bulb fused', status: 'Completed', date: '2025-05-28' },
//         ];
//         setRequests(mockRequests);
//         /*
//         // Uncomment and use axios when you have a backend:
//         axios.get('/api/maintenance')
//           .then(response => setRequests(response.data))
//           .catch(err => {
//             console.error("Error fetching maintenance requests:", err);
//             setError("Failed to load maintenance requests.");
//           });
//         */
//       } catch (err) {
//         console.error("Error fetching maintenance requests:", err);
//         setError("Failed to load maintenance requests.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRequests();
//   }, []);

//   const handleStatusChange = (requestId, currentStatus) => {
//     const newStatus = currentStatus === 'Pending' ? 'In Progress' : (currentStatus === 'In Progress' ? 'Completed' : 'Pending');
//     console.log(`Updating request ${requestId} status to: ${newStatus}`);
//     /*
//     // Uncomment and use axios when you have a backend:
//     axios.post(`/api/maintenance/${requestId}/status`, { status: newStatus })
//       .then(() => {
//         setRequests(prevRequests => prevRequests.map(req =>
//           req.id === requestId ? { ...req, status: newStatus } : req
//         ));
//       })
//       .catch(error => console.error(error));
//     */
//     // Simulate successful update for frontend display:
//     setRequests(prevRequests => prevRequests.map(req =>
//       req.id === requestId ? { ...req, status: newStatus } : req
//     ));
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewRequest(prevState => ({ ...prevState, [name]: value }));
//   };

//   const handleSubmitRequest = (e) => {
//     e.preventDefault();
//     if (!newRequest.roomNumber || !newRequest.description) {
//       alert('Please fill in both room number and description.');
//       return;
//     }
//     // Mock API call for demonstration
//     const requestToAdd = {
//       id: requests.length > 0 ? Math.max(...requests.map(r => r.id)) + 1 : 1,
//       roomNumber: newRequest.roomNumber,
//       description: newRequest.description,
//       status: 'Pending',
//       date: new Date().toISOString().slice(0, 10)
//     };
//     console.log('Adding new request:', requestToAdd);
//     /*
//     // Uncomment and use axios when you have a backend:
//     axios.post('/api/maintenance', newRequest)
//       .then(response => {
//         setRequests(prevRequests => [...prevRequests, response.data]);
//         setNewRequest({ roomNumber: '', description: '' });
//       })
//       .catch(error => console.error(error));
//     */
//     // Simulate adding new request for frontend display:
//     setRequests(prevRequests => [...prevRequests, requestToAdd]);
//     setNewRequest({ roomNumber: '', description: '' });
//   };

//   if (loading) {
//     return <Container className="mt-4"><p>Loading maintenance requests...</p></Container>;
//   }

//   if (error) {
//     return <Container className="mt-4"><p className="text-danger">{error}</p></Container>;
//   }

//   return (
//     <Container className="mt-4">
//       <h2>Maintenance Requests</h2>

//       {/* Form to Add New Request */}
//       <Card className="mb-4 shadow-sm">
//         <Card.Body>
//           <Card.Title>Add New Maintenance Request</Card.Title>
//           <Form onSubmit={handleSubmitRequest}>
//             <Row className="mb-3">
//               <Col md={4}>
//                 <Form.Group controlId="roomNumber">
//                   <Form.Label>Room Number</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="e.g., A101"
//                     name="roomNumber"
//                     value={newRequest.roomNumber}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//               <Col md={8}>
//                 <Form.Group controlId="description">
//                   <Form.Label>Description</Form.Label>
//                   <Form.Control
//                     type="text"
//                     placeholder="e.g., Leaky faucet"
//                     name="description"
//                     value={newRequest.description}
//                     onChange={handleInputChange}
//                     required
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>
//             <Button variant="primary" type="submit">Submit Request</Button>
//           </Form>
//         </Card.Body>
//       </Card>


//       {/* List of Requests */}
//       <Table striped bordered hover responsive>
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Room No</th>
//             <th>Description</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {requests.length > 0 ? (
//             requests.map(request => (
//               <tr key={request.id}>
//                 <td>{request.date}</td>
//                 <td>{request.roomNumber}</td>
//                 <td>{request.description}</td>
//                 <td>
//                   <span className={`badge bg-${
//                     request.status === 'Pending' ? 'warning' :
//                     request.status === 'In Progress' ? 'info' :
//                     'success'
//                   }`}>
//                     {request.status}
//                   </span>
//                 </td>
//                 <td>
//                   <Button
//                     variant={request.status === 'Completed' ? 'secondary' : 'primary'}
//                     onClick={() => handleStatusChange(request.id, request.status)}
//                     disabled={request.status === 'Completed'}
//                     size="sm"
//                   >
//                     {request.status === 'Pending' ? 'Mark In Progress' :
//                      request.status === 'In Progress' ? 'Mark Completed' : 'Completed'}
//                   </Button>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="5" className="text-center">No maintenance requests found.</td>
//             </tr>
//           )}
//         </tbody>
//       </Table>
//     </Container>
//   );
// };

// export default MaintenanceRequests;
// src/components/MaintenanceRequests.js
import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Spinner, Form, Row, Col, Card } from 'react-bootstrap';
import * as api from '../services/api'; // Correct path

const MaintenanceRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [newRequest, setNewRequest] = useState({ roomNumber: '', description: '' });

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.getMaintenanceRequests(); // Use api.getMaintenanceRequests
        setRequests(response.data);
      } catch (err) {
        console.error("Error fetching maintenance requests:", err.response?.data || err.message);
        setError("Failed to load maintenance requests. " + (err.response?.data?.detail || ""));
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleStatusChange = async (requestId, currentStatus) => {
    const newStatus = currentStatus === 'Pending' ? 'In Progress' : (currentStatus === 'In Progress' ? 'Completed' : 'Pending');
    try {
      const response = await api.updateMaintenanceStatus(requestId, newStatus); // Use api.updateMaintenanceStatus
      setRequests(prevRequests => prevRequests.map(req => req.id === requestId ? response.data : req));
      // You might want to also re-fetch dashboard stats if they rely on pending requests
    } catch (err) {
      console.error("Error updating maintenance status:", err.response?.data || err.message);
      setError("Failed to update maintenance status. " + (err.response?.data?.detail || ""));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRequest(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null); // Clear previous success
    if (!newRequest.roomNumber || !newRequest.description) {
      setError('Please fill in both room number and description.');
      setLoading(false);
      return;
    }
    try {
      const response = await api.addMaintenanceRequest(newRequest); // Use api.addMaintenanceRequest
      setRequests(prevRequests => [...prevRequests, response.data]);
      setNewRequest({ roomNumber: '', description: '' });
      setSuccess("Maintenance request added!");
    } catch (err) {
      console.error('Error adding maintenance request:', err.response?.data || err.message);
      setError("Failed to add request. " + (err.response?.data?.detail || ""));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Container className="mt-4"><p>Loading maintenance requests...</p></Container>;
  }
  if (error) {
    return <Container className="mt-4"><Alert variant="danger">{error}</Alert></Container>;
  }

  return (
    <Container className="mt-4">
      <h2>Maintenance Requests</h2>
      <Card className="mb-4 shadow-sm"><Card.Body><Card.Title>Add New Maintenance Request</Card.Title><Form onSubmit={handleSubmitRequest}>
        <Row className="mb-3"><Col md={4}><Form.Group controlId="roomNumber"><Form.Label>Room Number</Form.Label><Form.Control type="text" placeholder="e.g., A101" name="roomNumber" value={newRequest.roomNumber} onChange={handleInputChange} required /></Form.Group></Col><Col md={8}><Form.Group controlId="description"><Form.Label>Description</Form.Label><Form.Control type="text" placeholder="e.g., Leaky faucet" name="description" value={newRequest.description} onChange={handleInputChange} required /></Form.Group></Col></Row>
        <Button variant="primary" type="submit" disabled={loading}>Submit Request</Button>
      </Form>{error && <Alert variant="danger" className="mt-2">{error}</Alert>}{success && <Alert variant="success" className="mt-2">{success}</Alert>}</Card.Body></Card>
      <Table striped bordered hover responsive>
        <thead><tr><th>Date</th><th>Room No</th><th>Description</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map(request => (<tr key={request.id}><td>{request.date}</td><td>{request.roomNumber}</td><td>{request.description}</td><td><span className={`badge bg-${request.status === 'Pending' ? 'warning' : request.status === 'In Progress' ? 'info' : 'success'}`}>{request.status}</span></td><td><Button variant={request.status === 'Completed' ? 'secondary' : 'primary'} onClick={() => handleStatusChange(request.id, request.status)} disabled={request.status === 'Completed' || loading} size="sm">{request.status === 'Pending' ? 'Mark In Progress' : request.status === 'In Progress' ? 'Mark Completed' : 'Completed'}</Button></td></tr>))
          ) : (
            <tr><td colSpan="5" className="text-center">No maintenance requests found.</td></tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default MaintenanceRequests;
