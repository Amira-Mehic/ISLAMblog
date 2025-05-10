CREATE DATABASE ISLAMblog;

USE ISLAMblog;
-- Kreiranje tebele korisnici
CREATE TABLE korisnici (
  id INT AUTO_INCREMENT PRIMARY KEY,
  ime VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  lozinka VARCHAR(255) NOT NULL,
  datum_registracije TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Kreiranje tebele postovi
CREATE TABLE postovi (
  id INT AUTO_INCREMENT PRIMARY KEY,
  naslov VARCHAR(255) NOT NULL,
  sadrzaj TEXT NOT NULL,
  slika VARCHAR(255),
  datum_kreiranja TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  korisnik_id INT,
  autor VARCHAR(255) NOT NULL,
  FOREIGN KEY (korisnik_id) REFERENCES korisnici(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

-- Kreiranje tebele komentari
CREATE TABLE komentari (
  id INT AUTO_INCREMENT PRIMARY KEY,
  tekst TEXT NOT NULL,
  datum_kreiranja TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  korisnik_id INT,
  post_id INT,
  FOREIGN KEY (korisnik_id) REFERENCES korisnici(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE,
  FOREIGN KEY (post_id) REFERENCES postovi(id) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE
);

SELECT * FROM korisnici;
SELECT * FROM postovi;
SELECT * FROM komentari;

DROP TABLE IF EXISTS korisnici;
DROP TABLE IF EXISTS postovi;
DROP TABLE IF EXISTS komentari;


