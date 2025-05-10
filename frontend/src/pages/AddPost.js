import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AddPost.css'; //CSS fajl za stilizaciju

const AddPost = () => {
  const [formData, setFormData] = useState({ naslov: '', sadrzaj: '', slika: '', korisnik_id: '', autor: '' });
  const [error, setError] = useState(''); //  stanje za grešku

  // Funkcija za provjeru validnosti URL-a
  const isValidUrl = (url) => {
    const regex = /^(https?:\/\/)[^\s$.?#].[^\s]*$/; // Regularni izraz za URL
    return regex.test(url); // Vraća true ako je URL validan, inače false
  };

  // Funkcija koja se poziva kad se mijenja vrednost input polja
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Ako korisnik unosi URL slike, provjerava validnost URL-a
    if (name === 'slika' && value !== '' && !isValidUrl(value)) {
      setError('Unesite validan URL za sliku.'); // Ako URL nije validan, postavljamo grešku
    } else {
      setError(''); // Ako je URL validan, resetujemo grešku
    }

    // Ažuriramo stanje forme sa novim vrijednostima
    setFormData({ ...formData, [name]: value });
  };

  // Funkcija koja se poziva pri slanju forme
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Provjera da li je URL slike validan pre nego što pošaljemo podatke
    if (formData.slika && !isValidUrl(formData.slika)) {
      alert('Slika mora biti validan URL.'); // Ako nije validan, prikazujemo upozorenje
      return;
    }

    try {
      // Slanje podataka na backend koristeći axios
      const response = await axios.post('http://localhost:3001/postovi', formData);
      alert(response.data.poruka); // Prikazujemo poruku sa servera
      setFormData({ naslov: '', sadrzaj: '', slika: '', korisnik_id: '', autor: '' }); // Resetujemo formu nakon uspješnog slanja
    } catch (error) {
      // Ako dođe do greške prilikom slanja, obradjujemo grešku
      if (error.response) {
        console.error(error.response.data);
        alert(error.response.data.poruka || 'Greška pri dodavanju posta.'); // Ako postoji odgovor sa servera, prikazujemo poruku
      } else {
        console.error(error.message);
        alert('Greška pri komunikaciji sa serverom.'); // Ako nije bilo odgovora od servera, prikazujemo drugu grešku
      }
    }
  };

  return (
    <div className="form-container">
      <h2>Dodaj novi post</h2>
      <form onSubmit={handleSubmit} className="add-post-form">
        <input type="text" name="naslov" placeholder="Naslov" value={formData.naslov} onChange={handleChange} required />
        <textarea name="sadrzaj" placeholder="Sadržaj" value={formData.sadrzaj} onChange={handleChange} required />
        <input
          type="text"
          name="slika"
          placeholder="URL slike (npr. https://example.com/slika.jpg)"
          value={formData.slika}
          onChange={handleChange}
        />
        {error && <p className="error-message">{error}</p>} 
        <input type="text" name="korisnik_id" placeholder="ID korisnika" value={formData.korisnik_id} onChange={handleChange} required />
        <input type="text" name="autor" placeholder="Autor" value={formData.autor} onChange={handleChange} required />
        <button type="submit" disabled={!!error}>Dodaj post</button> {/* Dugme je onemogućeno ako postoji greška */}
      </form>
    </div>
  );
};

export default AddPost;
