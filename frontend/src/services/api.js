import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3001',  // Tvoj backend server
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;
