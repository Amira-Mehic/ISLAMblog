import React, { useState, useEffect } from 'react';
import API from '../services/api'; //  API servis za pozive prema backendu
import '../styles/MyProfile.css'; // CSS fajl za stilizaciju stranice

const MyProfile = () => {
  const [user, setUser] = useState(null); // Stanje za čuvanje podataka korisnika
  const [newName, setNewName] = useState(''); // Stanje za novo ime korisnika
  const [newEmail, setNewEmail] = useState(''); // Stanje za novi email korisnika
  const [newPassword, setNewPassword] = useState(''); // Stanje za novu lozinku korisnika

  const userId = 1; // ID korisnika koji je prijavljen ( koristi se ID korisnika sa sesije ili tokena)

  // useEffect hook koji se koristi za učitavanje podataka korisnika kada se stranica učita
  useEffect(() => {
    fetchUserProfile(); // Poziv funkcije za preuzimanje podataka korisnika
  }, []);

  // Funkcija za preuzimanje podataka korisnika sa backend servera
  const fetchUserProfile = async () => {
    try {
      const response = await API.get(`/korisnici/${userId}`); // API poziv za preuzimanje podataka korisnika sa backend-a
      console.log(response); //  log da se vidi šta API vraća
      setUser(response.data); // Postavljamo podatke korisnika u stanje
      setNewName(response.data.ime); // Postavljamo ime korisnika u stanje za izmjene
      setNewEmail(response.data.email); // Postavljamo email korisnika u stanje za izmjene
    } catch (error) {
      console.error('Greška pri učitavanju podataka korisnika:', error); // U slučaju greške logujemo grešku u konzolu
    }
  };

  // Funkcija za ažuriranje podataka korisnika
  const handleUpdateProfile = async () => {
    const updatedData = { ime: newName, email: newEmail, lozinka: newPassword }; // Novi podaci koje korisnik želi da ažurira
    try {
      await API.put(`/korisnici/${userId}`, updatedData); // API poziv za ažuriranje podataka korisnika
      alert('Profil je uspješno ažuriran!'); // Obavještenje korisniku da je profil ažuriran
      fetchUserProfile(); // Ponovo učitavamo podatke korisnika kako bi se prikazali ažurirani podaci
    } catch (error) {
      console.error('Greška pri ažuriranju profila:', error); // U slučaju greške logujemo grešku
    }
  };

  // Funkcija za brisanje profila korisnika
  const handleDeleteProfile = async () => {
    try {
      await API.delete(`/korisnici/${userId}`); // API poziv za brisanje korisničkog profila
      alert('Profil je obrisan!'); // Obavještenje korisniku da je profil obrisan
    } catch (error) {
      console.error('Greška pri brisanju profila:', error); // U slučaju greške logujemo grešku
    }
  };

  return (
    <div>
      {/* Prikazivanje podataka korisnika*/}
      {user ? (
        <>
          <h1>Moji podaci</h1>
          <div>
            <div>
              <label>Ime:</label>
              <input
                type="text"
                value={newName} // Prikazivanje trenutnog imena korisnika
                onChange={(e) => setNewName(e.target.value)} // Promjena imena u stanju
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={newEmail} // Prikazivanje trenutnog email-a korisnika
                onChange={(e) => setNewEmail(e.target.value)} // Promjena email-a u stanju
              />
            </div>
            <div>
              <label>Lozinka:</label>
              <input
                type="password"
                value={newPassword} // Prikazivanje trenutne lozinke korisnika
                onChange={(e) => setNewPassword(e.target.value)} // Promjena lozinke u stanju
              />
            </div>
            {/* Dugme za ažuriranje profila */}
            <button onClick={handleUpdateProfile}>Ažuriraj profil</button>  
            {/*<button onClick={handleDeleteProfile}>Obriši profil</button>   
              --- Kada se obriše profil, neće raditi ništa zbog veza.. 
              Ali, funkcionalnost brisanja je ispravno implementirana i u principu bi radilo i brisanje profila.*/}
          </div>
        </>
      ) : (
        <div>Učitavanje...</div> // Prikazivanje poruke dok se podaci učitavaju
      )}
    </div>
  );
};

export default MyProfile;
