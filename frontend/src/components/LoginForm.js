import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api'; //  API servis za pozive backendu
import '../styles/LoginForm.css'; // Uvoz CSS fajla

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    lozinka: '',
  });

  const [error, setError] = useState(null); // Za prikazivanje grešaka
  const [loading, setLoading] = useState(false); // Za prikazivanje učitavanja
  const navigate = useNavigate(); // Za navigaciju nakon prijave

  // Rukovanje promenama u formi
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Rukovanje slanjem forme
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const response = await API.post('/auth/prijava', formData);
      if (response.data.token) {
        localStorage.setItem('authToken', response.data.token); // Čuvanje tokena u localStorage
        
        onLogin(); // Pozivanje funkcije za postavljanje korisnika kao autentifikovanog
        alert('Prijava uspješna!');
        navigate('/'); // Redirektuje korisnika na početnu stranicu
      } else {
        setError('Pogrešna lozinka ili email!');
      }
    } catch (err) 
    {setError(`Greška: ${err.response?.data?.poruka || err.message}`);


    } finally {
      setLoading(false);
    }
  };

  
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Prijava</h2>
        {error && <p className="error-message">{error}</p>} {/* Prikazivanje greške */}
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Lozinka:</label>
        <input
          type="password"
          name="lozinka"
          value={formData.lozinka}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Učitavanje...' : 'Prijavi se'}
        </button>
        <p>Nemate nalog? <a href="/registracija">Registrujte se ovde</a></p>
      </form>
     
    </div>
  );
  
};

export default LoginForm;