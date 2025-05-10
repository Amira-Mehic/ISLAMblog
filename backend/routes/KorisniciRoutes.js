const express = require('express');
const router = express.Router();
const KorisniciKontroler = require('../controllers/KorisniciKontroler');

// Rute za korisnike koristeći metode iz kontrolera

// POST ruta za kreiranje novog korisnika
router.post('/', KorisniciKontroler.createKorisnik);

// GET ruta za pretragu korisnika prema ID-U
router.get('/:id', KorisniciKontroler.getKorisnikById);

// PUT ruta za ažuriranje postojećeg korisnika
router.put('/:id', KorisniciKontroler.updateKorisnik);

// DELETE ruta za brisanje postojećeg korisnika
router.delete('/:id', KorisniciKontroler.deleteKorisnik);

// GET ruta za pretragu korisnika prema ID-u

module.exports = router;
