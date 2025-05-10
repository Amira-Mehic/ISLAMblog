import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../services/api'; //  API servis za backend
import '../styles/HomePage.css';
import bin from '../assets/images/bin.png';
import edit from '../assets/images/edit.png';
import add from '../assets/images/add.png';

const HomePage = () => {
  const [posts, setPosts] = useState([]); // Stanje za čuvanje svih postova

  // Opcije za dodavanje, uređivanje i brisanje postova
  const options = [
    {
      title: 'Dodaj novi post',
      description: 'Kreiraj novi post na blogu.',
      image: add, // Ikona za dodavanje posta
      link: '/add-post', // Link za dodavanje posta
    },
    {
      title: 'Uredi postove',
      description: 'Izmijeni već postojeće postove.',
      image: edit, // Ikona za uređivanje postova
      link: '/edit-posts', // Link za uređivanje postova
    },
    {
      title: 'Obriši postove',
      description: 'Ukloni neželjene postove.',
      image: bin, // Ikona za brisanje postova
      link: '/delete-posts', // Link za brisanje postova
    },
  ];

  // Funkcija za preuzimanje svih postova sa servera
  const fetchPosts = async () => {
    try {
      const response = await API.get('/postovi'); // Poziv API-ja za preuzimanje svih postova
      setPosts(response.data); // Postavljanje postova u state
    } catch (error) {
      console.error('Greška pri preuzimanju postova:', error); // U slučaju greške, logujemo grešku u konzolu
    }
  };

  // useEffect hook za preuzimanje postova prilikom učitavanja stranice
  useEffect(() => {
    fetchPosts(); // Poziv funkcije za preuzimanje postova
  }, []); // Prazan niz znači da se funkcija poziva samo pri prvom učitavanju stranice

  return (
    <div>
     

      {/* Opcije za dodavanje, uređivanje i brisanje postova */}
      <div className="options-container">
        {options.map((option, index) => (
          <div key={index} className="option-card">
            <Link to={option.link}> {/* Link za navigaciju ka odgovarajućoj stranici */}
              <img src={option.image} alt={option.title} className="option-image" /> {/* Prikazivanje ikone */}
            </Link>
            <h3>{option.title}</h3> {/* Prikazivanje naslova opcije */}
            <p>{option.description}</p> {/* Prikazivanje opisa opcije */}
          </div>
        ))}
      </div>
      
      {/* Prikazivanje liste svih postova */}
      <h1 className="brandTitle"> Lista svih postova</h1>

      <div className="posts-container">
        {/* Mapiranje kroz sve postove i prikazivanje svakog posta */}
        {posts.map((post) => (
          <div key={post.id} className="post-card">
            <img
              src={post.slika} // Prikazivanje slike posta
              alt={post.naslov} // Prikazivanje alt teksta za sliku
              className="post-image"
            />
            <div className="post-content">
              <h3>{post.naslov}</h3> {/* Prikazivanje naslova posta */}
              <p>{post.sadrzaj.substring(0, 100)}...</p> {/* Prikazivanje prvih 100 karaktera sadržaja posta */}
              <p>
                <strong>Autor:</strong> {post.autor} {/* Prikazivanje autora posta */}
              </p>
              <Link to={`/post/${post.id}`} className="read-more-link">Pročitaj više</Link> {/* Link ka cijelom postu */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
