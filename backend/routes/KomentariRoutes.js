const express = require('express');
const router = express.Router();
const KomentariKontroler = require('../controllers/KomentariKontroler');
// Rute za komntare koristeći metode iz kontrolera
// POST - Dodavanje komentara
router.post('/komentar', KomentariKontroler.createKomentar);

// GET - Dohvatanje komentara po post_id
router.get('/:post_id', KomentariKontroler.getKomentariByPostId); 

// DELETE - Brisanje komentara
router.delete('/komentar/:id', KomentariKontroler.deleteKomentar);

// PUT - Ažuriranje komentara
router.put('/komentar/:id', KomentariKontroler.updateKomentar);

module.exports = router;