const express = require('express');
const router = express.Router();
const PostoviKontroler = require('../controllers/PostoviKontroler');

// Rute za postove koristeći metode iz kontrolera

// GET ruta za sve postove
router.get('/', PostoviKontroler.getAllPosts);

// POST ruta za kreiranje novog posta
router.post('/', PostoviKontroler.createPost);

// PUT ruta za ažuriranje postojećeg posta
router.put('/:id', PostoviKontroler.updatePost);

// DELETE ruta za brisanje postojećeg posta
router.delete('/:id', PostoviKontroler.deletePost);

// GET ruta za preuzimanje posta po ID-u
router.get('/:id', PostoviKontroler.getPostById);

module.exports = router;
