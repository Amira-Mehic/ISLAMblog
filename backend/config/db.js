const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',            // Direktno postavljanje hosta
  user: 'root',         // korisnik za bazu
  password: 'abcd1234', // lozinka za bazu
  database: 'ISLAMblog',     // Naziv  baze podataka
  waitForConnections: true,     // čeka ako su sve konekcije zauzete
  connectionLimit: 10,          // Maksimalan broj veza u pool-u
  queueLimit: 0                 // Nema limita za čekanje u redu
});

module.exports = pool.promise();
