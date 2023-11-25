const express = require('express');
const router = express.Router();
const FicheController = require('../controllers/ficheController');

router.post('/add', FicheController.addFiche);
// Ajoutez d'autres routes pour la gestion des fiches de paie

module.exports = router;
