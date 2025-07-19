import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // адрес вашего backend

export const register = (username, password) =>
  axios.post(`${API_URL}/register`, { username, password });

export const login = (username, password) =>
  axios.post(`${API_URL}/login`, { username, password });

export const fetchUsers = (token) =>
  axios.get(`${API_URL}/users`, { headers: { Authorization: `Bearer ${token}` } });

export const fetchMessages = (token) =>
  axios.get(`${API_URL}/messages`, { headers: { Authorization: `Bearer ${token}` } });