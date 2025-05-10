const express = require('express');
const router = express.Router();
const AutentifikacijaKontroler = require('../controllers/AutentifikacijaKontroler');  // Uvoz kontrolera

// POST ruta za registraciju korisnika
router.post('/registracija', AutentifikacijaKontroler.registracija);

// POST ruta za prijavu korisnika
router.post('/prijava', AutentifikacijaKontroler.prijava);

module.exports = router;
