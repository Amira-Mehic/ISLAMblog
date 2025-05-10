import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/DeletePost.css';

const DeletePost = () => {
  const [posts, setPosts] = useState([]); // Stanje za čuvanje liste postova

  // useEffect hook za učitavanje postova sa servera kada se komponenta učita
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Slanje GET zahtjeva za preuzimanje svih postova sa servera
        const response = await axios.get('http://localhost:3001/postovi');
        setPosts(response.data); // Ažuriranje stanja sa postovima preuzetim sa servera
      } catch (error) {
        console.error(error); // Ako dođe do greške, logujemo je u konzolu
      }
    };
    fetchPosts(); // Pozivanje funkcije za preuzimanje postova
  }, []); // Prazan niz znači da će funkcija biti pozvana samo jednom pri prvom renderovanju

  // Funkcija za brisanje posta
  const handleDelete = async (id) => {
    console.log(`Brišem post ID: ${id}`); // Loguje ID posta koji brišemo
    try {
      // Slanje DELETE zahteva za brisanje posta sa određenim ID-jem
      const response = await axios.delete(`http://localhost:3001/postovi/${id}`);
      alert(response.data.poruka); // Prikazivanje poruke sa servera (npr. potvrda uspješnog brisanja)
      setPosts(posts.filter((post) => post.id !== id)); // Ažuriranje stanja tako da se izbriše post sa datim ID-jem
    } catch (error) {
      console.error(error.response.data); // Ako dođe do greške, logujemo grešku u konzolu
      alert('Greška pri brisanju posta.'); // Prikazivanje poruke o grešci korisniku
    }
  };


  return (
    <div className="delete-post-container">
      <h2>Obriši postove</h2>
      <div className="posts-list">
        {posts.map((post) => (
          <div className="post-frame" key={post.id}>
            <h3>{post.naslov}</h3>
            {/* Dugme za brisanje posta */}
            <button className="delete-button" onClick={() => handleDelete(post.id)}>Obriši</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeletePost;
