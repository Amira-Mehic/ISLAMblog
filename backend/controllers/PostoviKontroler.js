const pool = require('../config/db'); // Uključivanje konekcije sa bazom podataka
//---------------------------------------------------------------------------------------------------------------------------------------------------
// Funkcija za kreiranje novog posta
//---------------------------------------------------------------------------------------------------------------------------------------------------
const createPost = async (req, res) => {
  const { naslov, sadrzaj, slika, korisnik_id, autor } = req.body; // Ekstrakcija podataka iz tijela zahtjeva

  // Provjera da li su sva obavezna polja prisutna
  if (!naslov || !sadrzaj || !korisnik_id || !autor) {
    return res.status(400).json({ poruka: 'Sva polja su obavezna!' }); // Ako nedostaje neko polje, vraća se greška
  }

  try {
    // SQL upit za unos novog posta u bazu
    const [result] = await pool.query(
      'INSERT INTO postovi (naslov, sadrzaj, slika, datum_kreiranja, korisnik_id, autor) VALUES (?, ?, ?, NOW(), ?, ?)',
      [naslov, sadrzaj, slika || null, korisnik_id, autor] // Ako slika nije poslata, postavlja se na null
    );
    res.status(201).json({ poruka: 'Post je uspješno kreiran!', id: result.insertId }); // Vraćamo ID novog posta
  } catch (error) {
    console.error(error); // Logovanje greške u konzolu
    res.status(500).json({ poruka: 'Greška pri kreiranju posta.' }); // Slanje odgovora o grešci
  }
};
//---------------------------------------------------------------------------------------------------------------------------------------------------
// Funkcija za preuzimanje svih postova
//---------------------------------------------------------------------------------------------------------------------------------------------------
const getAllPosts = async (req, res) => {
  try {
    // SQL upit za dohvat svih postova zajedno sa imenom autora iz tabele korisnici
    const [rows] = await pool.query(`
      SELECT p.*, k.ime AS autor
      FROM postovi p
      JOIN korisnici k ON p.korisnik_id = k.id
    `);
    res.json(rows); // Slanje svih postova kao JSON
  } catch (error) {
    console.error(error); // Logovanje greške u konzolu
    res.status(500).json({ poruka: 'Greška pri preuzimanju postova.' }); // Obrada greške
  }
};
//---------------------------------------------------------------------------------------------------------------------------------------------------
// Funkcija za preuzimanje posta prema ID-u
//---------------------------------------------------------------------------------------------------------------------------------------------------
const getPostById = async (req, res) => {
  const { id } = req.params; // Preuzimanje ID-a iz URL parametara

  try {
    // SQL upit za dohvat jednog posta zajedno sa imenom autora
    const [rows] = await pool.query(`
      SELECT p.*, k.ime AS autor
      FROM postovi p
      JOIN korisnici k ON p.korisnik_id = k.id
      WHERE p.id = ?
    `, [id]);

    console.log('Preuzet post:', rows); // Logovanje podataka o preuzetom postu (opcionalno)

    // Provjera da li je post pronađen
    if (rows.length === 0) {
      return res.status(404).json({ poruka: 'Post nije pronađen!' }); // Ako post nije pronađen, vraća se greška
    }

    res.json(rows[0]); // Slanje podataka o pronađenom postu
  } catch (error) {
    console.error('Greška pri preuzimanju posta:', error); // Logovanje greške
    res.status(500).json({ poruka: 'Greška pri preuzimanju posta.' }); // Obrada greške
  }
};
//---------------------------------------------------------------------------------------------------------------------------------------------------
// Funkcija za ažuriranje postojećeg posta
//---------------------------------------------------------------------------------------------------------------------------------------------------
const updatePost = async (req, res) => {
  const { id } = req.params; // ID posta koji se ažurira
  const { naslov, sadrzaj, slika } = req.body; // Novi podaci za ažuriranje

  // Provjera da li su naslov i sadržaj prisutni
  if (!naslov || !sadrzaj) {
    return res.status(400).json({ poruka: 'Naslov i sadržaj su obavezni!' }); // Ako nedostaju, vraća se greška
  }

  try {
    // SQL upit za ažuriranje postojećeg posta
    const [result] = await pool.query(
      'UPDATE postovi SET naslov = ?, sadrzaj = ?, slika = ? WHERE id = ?',
      [naslov, sadrzaj, slika || null, id]
    );

    // Provjera da li je post ažuriran
    if (result.affectedRows === 0) {
      return res.status(404).json({ poruka: 'Post nije pronađen!' }); // Ako post nije pronađen, vraća se greška
    }

    res.json({ poruka: 'Post je uspješno ažuriran!' }); // Potvrda o uspješnom ažuriranju
  } catch (error) {
    console.error(error); // Logovanje greške u konzolu
    res.status(500).json({ poruka: 'Greška pri ažuriranju posta.' }); // Obrada greške
  }
};
//---------------------------------------------------------------------------------------------------------------------------------------------------
// Funkcija za brisanje postojećeg posta
//---------------------------------------------------------------------------------------------------------------------------------------------------
const deletePost = async (req, res) => {
  const { id } = req.params; // ID posta koji se briše

  try {
    // SQL upit za brisanje postojećeg posta
    const [result] = await pool.query('DELETE FROM postovi WHERE id = ?', [id]);

    // Provjera da li je post obrisan
    if (result.affectedRows === 0) {
      return res.status(404).json({ poruka: 'Post nije pronađen!' }); // Ako post nije pronađen, vraća se greška
    }

    res.json({ poruka: 'Post je uspješno obrisan!' }); // Potvrda o uspješnom brisanju
  } catch (error) {
    console.error(error); // Logovanje greške u konzolu
    res.status(500).json({ poruka: 'Greška pri brisanju posta.' }); // Obrada greške
  }
};

// Izvoz funkcija kako bi mogle biti korišćene u rutama
module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
};
