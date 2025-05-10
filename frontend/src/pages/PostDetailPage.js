import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Za preuzimanje parametara iz URL-a
import API from '../services/api'; //  API servis za pozive prema backendu
import '../styles/PostDetailPage.css'; // CSS za stilizaciju stranice

const PostDetailPage = () => {
  const { postId } = useParams(); // Preuzimanje ID-a posta iz URL parametara
  const [post, setPost] = useState(null); // Stanje za čuvanje podataka o postu
  const [komentari, setKomentari] = useState([]); // Stanje za čuvanje liste komentara
  const [noviKomentar, setNoviKomentar] = useState(''); // Stanje za unos novog komentara
  const [komentarZaIzmenu, setKomentarZaIzmenu] = useState(null); // Stanje za komentar koji se uređuje
  const [noviTekst, setNoviTekst] = useState(''); // Stanje za novi tekst komentara

  // Funkcija za preuzimanje podataka o postu
  const fetchPost = async () => {
    try {
      const response = await API.get(`/postovi/${postId}`); // API poziv za preuzimanje podataka o postu
      setPost(response.data); // Postavljanje podataka o postu u stanje
    } catch (error) {
      console.error('Greška pri preuzimanju posta:', error.message); // Logovanje greške ako dođe do problema
    }
  };

  // Funkcija za preuzimanje komentara za post
  const fetchKomentari = async () => {
    try {
      const response = await API.get(`/komentari/${postId}`); // API poziv za preuzimanje komentara za određeni post
      setKomentari(response.data); // Postavljanje komentara u stanje
    } catch (error) {
      console.error('Greška pri preuzimanju komentara:', error.message); // Logovanje greške ako dođe do problema
    }
  };

  // Funkcija za dodavanje novog komentara
  const handleDodajKomentar = async () => {
    if (!noviKomentar.trim()) return; // Ako je komentar prazan, ne šaljemo ništa

    try {
      await API.post('/komentari/komentar', {
        tekst: noviKomentar, // Tekst novog komentara
        korisnik_id: 1, // ID korisnika koji ostavlja komentar 
        post_id: postId, // ID posta na koji se komentar odnosi
      });

      setNoviKomentar(''); // Čišćenje polja za unos komentara
      fetchKomentari(); // Ponovno učitavanje komentara
    } catch (error) {
      console.error('Greška pri dodavanju komentara:', error.message); // Logovanje greške ako dođe do problema
    }
  };

  // Funkcija za brisanje komentara
  const handleBrisiKomentar = async (id) => {
    try {
      await API.delete(`/komentari/komentar/${id}`); // API poziv za brisanje komentara prema ID-u
      fetchKomentari(); // Ponovno učitavanje komentara nakon brisanja
    } catch (error) {
      console.error('Greška pri brisanju komentara:', error.message); // Logovanje greške ako dođe do problema
    }
  };

  // Funkcija za početak izmjene komentara
  const handleIzmeniKomentar = (komentar) => {
    setKomentarZaIzmenu(komentar); // Postavljanje komentara koji se uređuje
    setNoviTekst(komentar.tekst); // Preuzimanje trenutnog teksta komentara za izmjenu
  };

  // Funkcija za ažuriranje komentara
  const handleAžurirajKomentar = async () => {
    if (!noviTekst.trim()) return; // Ako je novi tekst prazan, ne šaljemo ništa

    try {
      await API.put(`/komentari/komentar/${komentarZaIzmenu.id}`, {
        noviTekst: noviTekst, // Novi tekst komentara
      });

      setKomentarZaIzmenu(null); // Resetovanje stanja za uređivanje
      setNoviTekst(''); // Čišćenje polja za novi tekst komentara
      fetchKomentari(); // Ponovno učitavanje komentara nakon izmjene
    } catch (error) {
      console.error('Greška pri ažuriranju komentara:', error.message); // Logovanje greške ako dođe do problema
    }
  };

  // useEffect hook za učitavanje podataka kada se stranica učita ili postId promijeni
  useEffect(() => {
    fetchPost(); // Učitavanje podataka o postu
    fetchKomentari(); // Učitavanje komentara za post
  }, [postId]);

  if (!post) {
    return <div>Učitavanje...</div>; // Ako podaci o postu još nisu učitani, prikazujemo "Učitavanje..."
  }

  return (
    <div className="post-detail-container">
      <div className="post-content">
        <h1>{post.naslov}</h1> {/* Naslov posta */}
        <img src={post.slika} alt={post.naslov} className="post-image" /> {/* Slika posta */}
        <p>{post.sadrzaj}</p> {/* Sadržaj posta */}
        <p><strong>Autor:</strong> {post.autor}</p> {/* Autor posta */}
      </div>

      <div className="comments-section">
        <h2>Komentari</h2>
        <ul className="comments-list">
          {komentari.map((komentar) => (
            <li key={komentar.id} className="comment-item">
              <strong>{komentar.korisnik_ime}</strong>: {komentar.tekst}
              {/* Prikazivanje komentara i opcije za izmjene */}
              {komentarZaIzmenu && komentarZaIzmenu.id === komentar.id ? (
                <div>
                  <textarea
                    value={noviTekst}
                    onChange={(e) => setNoviTekst(e.target.value)} // Promijena teksta komentara
                  />
                  <button onClick={handleAžurirajKomentar}>Ažuriraj</button> {/* Ažuriranje komentara */}
                  <button onClick={() => setKomentarZaIzmenu(null)}>Odustani</button> {/* Otkazivanje izmjene */}
                </div>
              ) : (
                <>
                  <button onClick={() => handleIzmeniKomentar(komentar)}>Izmijeni</button> {/* Aktiviranje izmjene komentara */}
                  <button onClick={() => handleBrisiKomentar(komentar.id)}>Obriši</button> {/* Brisanje komentara */}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="add-comment-form">
        <h3>Dodaj komentar</h3>
        <textarea
          value={noviKomentar}
          onChange={(e) => setNoviKomentar(e.target.value)} // Promijena unosa za novi komentar
          className="comment-input"
        />
        <button onClick={handleDodajKomentar}>Dodaj</button> {/* Dodavanje komentara */}
      </div>
    </div>
  );
};

export default PostDetailPage;
