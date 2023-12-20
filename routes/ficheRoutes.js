const express = require('express');
const router = express.Router();
const FicheController = require('../controllers/ficheController');

router.get('/getFiches/:username', FicheController.getFiches);

router.get('/:username/:ficheId', FicheController.getFiche);

router.put('/:username/:ficheId', FicheController.updateFiche);

router.delete('/:username/:ficheId', FicheController.deleteFiche);

router.post('/create', FicheController.addFiche);

module.exports = router;
