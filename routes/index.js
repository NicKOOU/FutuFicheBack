const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');
const ficheRoutes = require('./ficheRoutes');

router.use('/users', userRoutes);
router.use('/fiches', ficheRoutes);

module.exports = router;
