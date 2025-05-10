import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/EditPost.css'; 

const EditPost = () => {
  const [posts, setPosts] = useState([]); // Stanje za čuvanje svih postova
  const [editingPost, setEditingPost] = useState(null); // Stanje za čuvanje posta koji se trenutno uređuje

  // useEffect hook za učitavanje postova sa servera prilikom učitavanja komponente
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Slanje GET zahteva za preuzimanje svih postova sa servera
        const response = await axios.get('http://localhost:3001/postovi');
        setPosts(response.data); // Ažuriranje stanja sa preuzetim postovima
      } catch (error) {
        console.error(error); // Ako dođe do greške, logujemo je u konzolu
      }
    };
    fetchPosts(); // Pozivanje funkcije za preuzimanje postova
  }, []); // Prazan niz znači da će funkcija biti pozvana samo jednom pri prvom renderovanju komponente

  // Funkcija koja se poziva prilikom slanja forme za ažuriranje posta
  const handleUpdate = async (e) => {
    e.preventDefault(); // Spriječava podrazumijevano ponašanje (osvježavanje stranice)

    try {
      // Slanje PUT zahteva za ažuriranje posta sa datim ID-jem
      const response = await axios.put(`http://localhost:3001/postovi/${editingPost.id}`, editingPost);
      alert(response.data.poruka); // Prikazivanje poruke sa servera (npr. potvrda uspješnog ažuriranja)
      setEditingPost(null); // Resetovanje stanja "editingPost" nakon uspješnog ažuriranja
    } catch (error) {
      console.error(error); // Ako dođe do greške, logujemo je u konzolu
      alert('Greška pri ažuriranju posta.'); // Prikazivanje poruke o grešci korisniku
    }
  };

  return (
    <div className="edit-post-container">
      <h2>Uredi postove</h2>
      <div className="posts-list">
        {/* Prikazivanje svih postova sa dugmetom za uređivanje */}
        {posts.map((post) => (
          <div className="post-frame" key={post.id}>
            <h3>{post.naslov}</h3>
            {/* Dugme za selektovanje posta koji treba da se uređuje */}
            <button className="edit-button" onClick={() => setEditingPost(post)}>Uredi</button>
          </div>
        ))}
      </div>

      {/* Prikazivanje forme za uređivanje ako je odabran post */}
      {editingPost && (
        <form onSubmit={handleUpdate} className="edit-form">
          <input
            type="text"
            value={editingPost.naslov} // Prikazivanje trenutnog naslova posta
            onChange={(e) => setEditingPost({ ...editingPost, naslov: e.target.value })} // Ažuriranje naslova
            placeholder="Naslov"
            required
          />
          <textarea
            value={editingPost.sadrzaj} // Prikazivanje trenutnog sadržaja posta
            onChange={(e) => setEditingPost({ ...editingPost, sadrzaj: e.target.value })} // Ažuriranje sadržaja
            placeholder="Sadržaj"
            required
          />
          <input
            type="text"
            value={editingPost.slika} // Prikazivanje trenutnog URL-a slike posta
            onChange={(e) => setEditingPost({ ...editingPost, slika: e.target.value })} // Ažuriranje URL-a slike
            placeholder="URL slike"
          />
          <button type="submit" className="save-button">Sačuvaj</button> {/* Dugme za sačuvanje izmjena */}
        </form>
      )}
    </div>
  );
};

export default EditPost;
