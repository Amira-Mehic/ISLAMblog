const pool = require('../config/db'); // Uključivanje konekcije sa bazom podataka

class KorisniciKontroler {
//---------------------------------------------------------------------------------------------------------------------------------------------------
  // Kreiranje novog korisnika
//---------------------------------------------------------------------------------------------------------------------------------------------------
  static async createKorisnik(req, res) {
    const { ime, email, lozinka } = req.body; // Ekstrakcija podataka iz tijela zahtjeva

    try {
      // SQL upit za dodavanje korisnika u bazu sa trenutnim datumom registracije
      const query = `INSERT INTO korisnici (ime, email, lozinka, datum_registracije) 
                     VALUES (?, ?, ?, NOW())`;
      const [result] = await pool.execute(query, [ime, email, lozinka]); // Izvršavanje upita
      
      res.status(201).json({ poruka: 'Korisnik je uspješno kreiran!', id: result.insertId }); // Slanje odgovora sa ID-em novog korisnika
    } catch (err) {
      res.status(500).json({ poruka: 'Greška pri dodavanju korisnika: ' + err.message }); // Obrada greške
    }
  }
//---------------------------------------------------------------------------------------------------------------------------------------------------
  // Dohvatanje korisnika prema ID-u
//---------------------------------------------------------------------------------------------------------------------------------------------------
  static async getKorisnikById(req, res) {
    const { id } = req.params; // Uzimanje ID-a iz URL parametara

    try {
      const query = `SELECT * FROM korisnici WHERE id = ?`; // SQL upit za pretragu korisnika po ID-u
      const [rows] = await pool.execute(query, [id]); // Izvršavanje upita

      if (rows.length === 0) {
        return res.status(404).json({ poruka: 'Korisnik nije pronađen!' }); // Ako korisnik ne postoji, vraća se 404 status
      }

      res.json(rows[0]); // Slanje pronađenog korisnika kao odgovor
    } catch (err) {
      console.error('Greška pri pretrazi korisnika:', err); // Logovanje greške u konzolu
      res.status(500).json({ poruka: 'Greška pri pretrazi korisnika: ' + err.message }); // Obrada greške
    }
  }
//---------------------------------------------------------------------------------------------------------------------------------------------------
  // Ažuriranje korisnika prema email adresi
//---------------------------------------------------------------------------------------------------------------------------------------------------
  static async updateKorisnikByEmail(req, res) {
    const { email } = req.params; // Uzimanje emaila iz URL parametara
    const { ime, lozinka } = req.body; // Uzimanje novih podataka iz tijela zahtjeva

    try {
      const query = `UPDATE korisnici SET ime = ?, lozinka = ? WHERE email = ?`; // SQL upit za ažuriranje
      const [result] = await pool.execute(query, [ime, lozinka, email]); // Izvršavanje upita

      if (result.affectedRows === 0) {
        return res.status(404).json({ poruka: 'Korisnik nije pronađen!' }); // Ako nije ažuriran nijedan red, korisnik nije pronađen
      }

      res.json({ poruka: 'Korisnik je uspješno ažuriran!' }); // Slanje potvrde o ažuriranju
    } catch (err) {
      res.status(500).json({ poruka: 'Greška pri ažuriranju korisnika: ' + err.message }); // Obrada greške
    }
  }
//---------------------------------------------------------------------------------------------------------------------------------------------------
  // Ažuriranje podataka korisnika prema ID-u
//---------------------------------------------------------------------------------------------------------------------------------------------------
  static async updateKorisnik(req, res) {
    const { id } = req.params; // Uzimanje ID-a iz URL parametara
    const { ime, email, lozinka } = req.body; // Uzimanje novih podataka iz tijela zahtjeva

    try {
      const query = `UPDATE korisnici SET ime = ?, email = ?, lozinka = ? WHERE id = ?`; // SQL upit za ažuriranje korisnika
      const [result] = await pool.execute(query, [ime, email, lozinka, id]); // Izvršavanje upita

      if (result.affectedRows === 0) {
        return res.status(404).json({ poruka: 'Korisnik nije pronađen!' }); // Ako korisnik ne postoji, vraća se 404 status
      }

      res.json({ poruka: 'Korisnik je uspješno ažuriran!' }); // Slanje potvrde o ažuriranju
    } catch (err) {
      res.status(500).json({ poruka: 'Greška pri ažuriranju korisnika: ' + err.message }); // Obrada greške
    }
  }
//------------------------------------------------------------------------//--------------------------------------------------------------------------
  // Brisanje korisnika prema ID-u --------- ovo nije postvljeno na frontend jer se poremeti sve kad se izbrise korisnik zbog veza
  //------------------------------------------------------------------------//------------------------------------------------------------------------
  static async deleteKorisnik(req, res) {
    const { id } = req.params; // Uzimanje ID-a iz URL parametara

    try {
      const query = `DELETE FROM korisnici WHERE id = ?`; // SQL upit za brisanje korisnika
      const [result] = await pool.execute(query, [id]); // Izvršavanje upita

      if (result.affectedRows === 0) {
        return res.status(404).json({ poruka: 'Korisnik nije pronađen!' }); // Ako korisnik ne postoji, vraća se 404 status
      }

      res.json({ poruka: 'Korisnik je uspješno obrisan!' }); // Slanje potvrde o brisanju
    } catch (err) {
      res.status(500).json({ poruka: 'Greška pri brisanju korisnika: ' + err.message }); // Obrada greške
    }
  }
}

module.exports = KorisniciKontroler; // Izvoz klase kako bi mogla biti korišćena u rutama
