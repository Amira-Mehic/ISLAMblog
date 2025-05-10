const pool = require('../config/db'); //  putanja do baze podataka 
//---------------------------------------------------------------------------------------------------------------------------------------------------
// Klasa koja predstavlja model komentara
//---------------------------------------------------------------------------------------------------------------------------------------------------
class Komentari {
  constructor(id, tekst, datum_kreiranja, korisnik_id, post_id) {
    this.id = id;
    this.tekst = tekst;
    this.datum_kreiranja = datum_kreiranja;
    this.korisnik_id = korisnik_id;
    this.post_id = post_id;
  }
}
//---------------------------------------------------------------------------------------------------------------------------------------------------
// Funkcija za dodavanje novog komentara
//---------------------------------------------------------------------------------------------------------------------------------------------------
const createKomentar = async (req, res) => {
    const { tekst, korisnik_id, post_id } = req.body;
  
    // Provjera da li su sva polja popunjena
    if (!tekst || !korisnik_id || !post_id) {
      return res.status(400).json({ poruka: 'Sva polja su obavezna!' });
    }
  
    try {
      // SQL upit za unos novog komentara u bazu
      const query =
        'INSERT INTO komentari (tekst, korisnik_id, post_id, datum_kreiranja) VALUES (?, ?, ?, NOW())';
      const [result] = await pool.execute(query, [tekst, korisnik_id, post_id]);
      res.status(201).json({ poruka: 'Komentar je uspješno dodat!', id: result.insertId });
    } catch (err) {
      res.status(500).json({ poruka: 'Greška pri dodavanju komentara.', detalji: err.message });
    }
};
//---------------------------------------------------------------------------------------------------------------------------------------------------
// Funkcija za dohvaćanje svih komentara za određeni post
//---------------------------------------------------------------------------------------------------------------------------------------------------
const getKomentariByPostId = async (req, res) => {
  const post_id = req.params.post_id;

  try {
    // SQL upit za dohvatanje komentara na osnovu post_id
    const query = 'SELECT * FROM komentari WHERE post_id = ?';
    const [rows] = await pool.execute(query, [post_id]);
    res.json(rows); // Vraća sve komentare za dati post
  } catch (err) {
    res.status(500).json({ poruka: 'Greška pri pretrazi komentara.', detalji: err.message });
  }
};
//---------------------------------------------------------------------------------------------------------------------------------------------------
// Funkcija za brisanje komentara
//---------------------------------------------------------------------------------------------------------------------------------------------------
const deleteKomentar = async (req, res) => {
  const { id } = req.params;

  try {
    // SQL upit za brisanje komentara po ID-u
    const query = 'DELETE FROM komentari WHERE id = ?';
    const [result] = await pool.execute(query, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ poruka: 'Komentar nije pronađen.' });
    }
    res.json({ poruka: 'Komentar je uspješno obrisan.' });
  } catch (err) {
    res.status(500).json({ poruka: 'Greška pri brisanju komentara.', detalji: err.message });
  }
};
//---------------------------------------------------------------------------------------------------------------------------------------------------
// Funkcija za ažuriranje komentara
//---------------------------------------------------------------------------------------------------------------------------------------------------
const updateKomentar = async (req, res) => {
  const { id } = req.params;
  const { noviTekst } = req.body;

  // Provjera da li je dostavljen novi tekst komentara
  if (!noviTekst) {
    return res.status(400).json({ poruka: 'Novi tekst komentara je obavezan.' });
  }

  try {
    // SQL upit za ažuriranje teksta komentara
    const query = 'UPDATE komentari SET tekst = ? WHERE id = ?';
    const [result] = await pool.execute(query, [noviTekst, id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ poruka: 'Komentar nije pronađen.' });
    }
    res.json({ poruka: 'Komentar je uspješno ažuriran.' });
  } catch (err) {
    res.status(500).json({ poruka: 'Greška pri ažuriranju komentara.', detalji: err.message });
  }
};

// Izvoz funkcija kako bi bile dostupne u drugim dijelovima aplikacije
module.exports = {
  createKomentar,
  getKomentariByPostId,
  deleteKomentar,
  updateKomentar,
};
