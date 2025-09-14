// src/services/api.js
import axios from 'axios';

// --- API Base URL Configuration ---
// Make sure this matches your FastAPI backend URL (e.g., http://localhost:8000/api)
const API_BASE_URL = 'http://localhost:8000/api'; 

// Create an Axios instance
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to automatically attach the authentication token
// This runs before every request made with `apiClient`
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('pg_auth_token');
        if (token) {
            // Attach the token as a Bearer token in the Authorization header
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// --- Authentication Endpoints ---
export const loginUser = (email, password) => {
    return apiClient.post('/login', { email, password });
};

export const registerUser = (email, password) => {
    return apiClient.post('/register', { email, password });
};

// --- Tenant Endpoints ---
export const getTenants = () => {
    return apiClient.get('/tenants');
};

export const getTenantDetails = (tenantId) => {
    return apiClient.get(`/tenants/${tenantId}`);
};

export const addTenant = (tenantData) => {
    // Ensure date is in YYYY-MM-DD format for FastAPI
    const formattedData = {
        ...tenantData,
        joiningDate: tenantData.joiningDate.split('T')[0] // Assuming it might come as ISO string or Date obj
    };
    return apiClient.post('/tenants', formattedData);
};

export const updateTenant = (tenantId, tenantData) => {
    const formattedData = {
        ...tenantData,
        joiningDate: tenantData.joiningDate.split('T')[0]
    };
    return apiClient.put(`/tenants/${tenantId}`, formattedData);
};

export const deleteTenant = (tenantId) => {
    return apiClient.delete(`/tenants/${tenantId}`);
};

// --- Room Endpoints ---
export const getRooms = () => {
    return apiClient.get('/rooms');
};

export const addRoom = (roomData) => {
    return apiClient.post('/rooms', roomData);
};

export const updateRoom = (roomId, roomData) => {
    return apiClient.put(`/rooms/${roomId}`, roomData);
};

export const updateRoomStatus = (roomId, action) => {
    // 'action' can be 'occupied' or 'vacant'
    return apiClient.post(`/rooms/${roomId}/${action}`);
};

// --- Maintenance Endpoints ---
export const getMaintenanceRequests = () => {
    return apiClient.get('/maintenance');
};

export const addMaintenanceRequest = (requestData) => {
    const formattedData = {
        ...requestData,
        date: new Date().toISOString().split('T')[0] // Ensure YYYY-MM-DD
    };
    return apiClient.post('/maintenance', formattedData);
};

export const updateMaintenanceRequest = (requestId, requestData) => {
    const formattedData = {
        ...requestData,
        date: requestData.date.split('T')[0] // Ensure YYYY-MM-DD if it's not already
    };
    return apiClient.put(`/maintenance/${requestId}`, formattedData);
};

export const updateMaintenanceStatus = (requestId, newStatus) => {
    // 'newStatus' can be 'Pending', 'In Progress', 'Completed'
    // FastAPI expects this as a query parameter 'new_status'
    return apiClient.post(`/maintenance/${requestId}/status?new_status=${newStatus}`);
};

// --- Dashboard Endpoints ---
export const getDashboardStats = () => {
    return apiClient.get('/dashboard');
};
