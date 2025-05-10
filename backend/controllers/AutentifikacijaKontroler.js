const bcrypt = require('bcryptjs');  // biblioteka za poređenje lozinki 
const jwt = require('jsonwebtoken');  // Za generisanje JWT tokena
const pool = require('../config/db');  // Konekcija sa bazom
const express = require('express');

// POST ruta za registraciju korisnika
const registracija = async (req, res) => {
  const { ime, email, lozinka } = req.body;

  if (!ime || !email || !lozinka) {
    return res.status(400).json({ poruka: 'Sva polja su obavezna!' });
  }

  try {
    // Provjerava da li email već postoji u bazi
    const [existingUser] = await pool.query('SELECT * FROM korisnici WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ poruka: 'Korisnik sa tim emailom već postoji!' });
    }

    // Unos novog korisnika u bazu
    const [result] = await pool.query(
      'INSERT INTO korisnici (ime, email, lozinka, datum_registracije) VALUES (?, ?, ?, NOW())',
      [ime, email, lozinka]
    );
    res.status(201).json({ poruka: 'Korisnik je uspješno registrovan!', id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).send('Greška pri registraciji korisnika.');
  }
};

// POST ruta za prijavu korisnika
const prijava = async (req, res) => {
  const { email, lozinka } = req.body;

  if (!email || !lozinka) {
    return res.status(400).json({ poruka: 'Email i lozinka su obavezni!' });
  }

  try {
    // Proveri da li korisnik sa tim emailom postoji
    const [rows] = await pool.query('SELECT * FROM korisnici WHERE email = ?', [email]);

    if (rows.length === 0) {
      return res.status(400).json({ poruka: 'Korisnik sa tim emailom ne postoji!' });
    }

    // Provjera lozinke (ako nije enkriptovana, upoređujemo obične lozinke)
    const korisnik = rows[0];  // Pretpostavljamo da je korisnik jedinstven
    if (lozinka !== korisnik.lozinka) {
      return res.status(400).json({ poruka: 'Pogrešna lozinka!' });
    }

    // Ako je lozinka ispravna, generiši JWT token
    const token = jwt.sign(
      { id: korisnik.id, ime: korisnik.ime, email: korisnik.email },
      'moja_tajna_za_potpisivanje',  // Tajna za potpisivanje tokena ( definisana u .env fajlu)
      { expiresIn: '1h' }  // Token važi 1 sat
    );

    // šalje token korisniku
    res.json({ poruka: 'Prijava uspješna!', token });
  } catch (error) {
    console.error(error);
    res.status(500).send('Greška pri prijavi korisnika.');
  }
};

module.exports = { registracija, prijava };