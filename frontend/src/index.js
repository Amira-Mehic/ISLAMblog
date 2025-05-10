import React from 'react';
import ReactDOM from 'react-dom/client'; // Importuj createRoot iz 'react-dom/client'
import './styles/index.css';  // Ako imaš stilove za osnovnu aplikaciju
import App from './App';  // Uključi tvoju App komponentu

// Koristi createRoot za React 18
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
