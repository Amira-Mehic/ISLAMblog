import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Importujemo stilove iz navbar.css
import logo from '../assets/images/logo.png';

const Navbar = ({ onLogout }) => {
  return (
    <nav className="navbar">
      <div className="leftSection">
        {/* Navigacija na HomePage klikom na logo */}
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        {/* Navigacija na HomePage klikom na naziv brenda */}
        <Link to="/" className="brandName">
          PUTIS
        </Link>
      </div>
      <div className="rightSection">
        <ul className="navLinks">
          <li>
            <Link to="/MyProfile" className="profileButton">Moj Profil</Link>
          </li>
          <li>
            <button onClick={onLogout} className="logoutButton">Odjavi se</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
