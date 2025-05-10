// models/Korisnici.js
const db = require('../config/db');  // Importovanje konekcije sa bazom

class Korisnici {
  constructor(id, ime, email, lozinka, datum_registracije) {
    this.id = id;
    this.ime = ime;
    this.email = email;
    this.lozinka = lozinka;
    this.datum_registracije = datum_registracije;
  }
}

module.exports = Korisnici;
