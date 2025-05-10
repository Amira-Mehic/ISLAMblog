import React from 'react';
import { Navigate } from 'react-router-dom';

// Komponenta koja omogućava pristup stranici samo autentifikovanim korisnicima
const PrivateRoute = ({ children, isAuthenticated }) => {
  // Ako korisnik nije autentifikovan, preusmjerava se na stranicu za prijavu
  if (!isAuthenticated) {
    return <Navigate to="/prijava" />; // Preusmjeravanje na "/prijava" ako korisnik nije prijavljen
  }

  return children; // Ako je korisnik autentifikovan, prikazujemo sadržaj koji je proslijeđen
};

export default PrivateRoute;
