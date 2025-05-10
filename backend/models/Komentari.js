const pool = require('../config/db'); 

class Komentari {
  constructor(id, tekst, datum_kreiranja, korisnik_id, post_id) {
    this.id = id;
    this.tekst = tekst;
    this.datum_kreiranja = datum_kreiranja;
    this.korisnik_id = korisnik_id;
    this.post_id = post_id;
  }
  
}
