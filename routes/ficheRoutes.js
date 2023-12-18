const express = require('express');
const router = express.Router();
const FicheController = require('../controllers/ficheController');

router.get('/getFiches/:username', FicheController.getFiches);

router.get('/:username', FicheController.getFiche);

router.put('/:username', FicheController.updateFiche);

router.delete('/:username', FicheController.deleteFiche);

router.post('/create', FicheController.addFiche);

module.exports = router;
