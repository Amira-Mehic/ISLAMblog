import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage'; // Početna stranica
import RegisterForm from './components/RegisterForm'; // Forma za registraciju
import LoginForm from './components/LoginForm'; // Forma za prijavu
import AddPost from './pages/AddPost'; // Forma za dodavanje posta
import EditPost from './pages/EditPost'; // Stranica za uređivanje posta
import DeletePost from './pages/DeletePost'; // Stranica za brisanje posta
import PostDetailPage from './pages/PostDetailPage'; // Detalji o postu
import MyProfile from './pages/MyProfile'; // Dodaj import za MyProfile

const App = () => {
  // State za autentifikaciju korisnika (da li je ulogovan)
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Funkcija za prijavu
  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('authToken', 'user-auth-token'); // Spremanje tokena za autentifikaciju
  };

  // Funkcija za odjavu
  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('authToken'); // Uklanjanje tokena sa localStorage
  };

  return (
    <Router>
      <Routes>
        {/* Ako je korisnik autentifikovan, prikazuje mu se HomePage, inače ga preusmJeri na prijavu */}
        <Route path="/" element={isAuthenticated ? <><Navbar onLogout={handleLogout} /><HomePage /></> : <Navigate to="/prijava" />} />
        
        <Route path="/registracija" element={<RegisterForm onRegister={handleLogin} />} />
        
        <Route path="/prijava" element={<LoginForm onLogin={handleLogin} />} />
        
               {/* Postovi - sa Navbar, samo za autentifikovane korisnike */}
        <Route path="/add-post" element={isAuthenticated ? <><Navbar onLogout={handleLogout} /><AddPost /></> : <Navigate to="/prijava" />} />
        <Route path="/edit-posts" element={isAuthenticated ? <><Navbar onLogout={handleLogout} /><EditPost /></> : <Navigate to="/prijava" />} />
        <Route path="/delete-posts" element={isAuthenticated ? <><Navbar onLogout={handleLogout} /><DeletePost /></> : <Navigate to="/prijava" />} />
        <Route path="/MyProfile" element={isAuthenticated ? <><Navbar onLogout={handleLogout} /><MyProfile /></> : <Navigate to="/prijava" />} />
        <Route path="/post/:postId" element={isAuthenticated ? <><Navbar onLogout={handleLogout} /><PostDetailPage /></> : <Navigate to="/prijava" />} />
      </Routes>
    </Router>
  );
};

export default App;
   
