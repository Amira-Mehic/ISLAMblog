const express = require('express');
const cors = require('cors'); // Uključivanje CORS paketa
const pool = require('./config/db'); // Uključivanje konekcije sa bazom
const AutentifikacijaRoutes = require('./routes/AutentifikacijaRoutes');
const PostoviRoutes = require('./routes/PostoviRoutes');
const KomentariRoutes = require('./routes/KomentariRoutes');
const KorisniciRoutes = require('./routes/KorisniciRoutes'); // Dodao rutu za korisnike

const app = express();
const PORT = 3001;

// Middleware za omogućavanje CORS-a za sve izvore
app.use(cors()); 

// Middleware za parsiranje JSON podataka
app.use(express.json()); 

// Rute
app.use('/postovi', PostoviRoutes);
app.use('/komentari', KomentariRoutes);
app.use('/auth', AutentifikacijaRoutes);
app.use('/korisnici', KorisniciRoutes);

// Osnovna ruta za testiranje servera
app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

// Ruta za dobijanje svih korisnika (npr. admin pristup)
app.get('/korisnici', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM korisnici'); // Preuzimanje korisnika iz baze
    res.json(rows); // Vraća sve korisnike u JSON formatu
  } catch (error) {
    console.error('Greška pri preuzimanju korisnika:', error);
    res.status(500).send('Došlo je do greške pri preuzimanju korisnika.');
  }
});

// Middleware za obradu grešaka
app.use((err, req, res, next) => {
  console.error('Greška na serveru:', err.stack); // Ispis greške u konzolu
  res.status(500).json({ poruka: 'Došlo je do greške na serveru.', error: err.message });
});

// Pokretanje servera
app.listen(PORT, () => {
  console.log(`Server je pokrenut na http://localhost:${PORT}`);
});
