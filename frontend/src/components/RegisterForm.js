import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api'; // Koristi API servis
import '../styles/RegisterForm.css'; // Uvoz CSS fajla

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    ime: '',
    email: '',
    lozinka: '',
  });

  const [error, setError] = useState(null); // Za prikazivanje grešaka
  const [loading, setLoading] = useState(false); // Za prikazivanje učitavanja
  const navigate = useNavigate(); // Za navigaciju nakon uspješne registracije

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

    // Validacija email-a
    if (!formData.email.match(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)) {
      setError('Unesite važeći email.');
      setLoading(false);
      return;
    }

    try {
      const response = await API.post('/korisnici', formData);  // Pošaljite podatke na backend
      alert(response.data.poruka);  // Prikazivanje poruke
      navigate('/prijava'); // Redirektuje korisnika na stranicu za prijavu
    } catch (err) {
      setError(`Greška: ${err.response?.data?.poruka || err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Registracija</h2>
        {error && <p className="error-message">{error}</p>} 
        <label>Ime:</label>
        <input
          type="text"
          name="ime"
          value={formData.ime}
          onChange={handleChange}
          required
        />
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
          {loading ? 'Učitavanje...' : 'Registruj se'}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
