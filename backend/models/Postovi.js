// models/Post.js
const db = require('../db');  // Importovanje konekcije sa bazom

class Postovi {
  constructor(id, naslov, sadrzaj, slika, datum_kreiranja, korisnik_id) {
    this.id = id;
    this.naslov = naslov;
    this.sadrzaj = sadrzaj;
    this.slika = slika;
    this.datum_kreiranja = datum_kreiranja;
    this.korisnik_id = korisnik_id;
    this.autor = this.autor;
  }
}

module.exports = Postovi;
