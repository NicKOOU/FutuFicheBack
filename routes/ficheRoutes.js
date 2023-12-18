const express = require('express');
const router = express.Router();
const FicheController = require('../controllers/ficheController');

router.get('/get', FicheController.getFiches);

router.get('/:id', FicheController.getFiche);

router.put('/:id', FicheController.updateFiche);

router.delete('/:id', FicheController.deleteFiche);

router.post('/create', FicheController.addFiche);

module.exports = router;
