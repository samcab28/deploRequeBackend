// BurndownRoute.js
const express = require('express');
const router = express.Router();
const {getBurndownData} = require('../controllers/Burndown.controllers');

// Definir la ruta para obtener los datos del Burndown Chart
router.route('/:id')
    .get(getBurndownData);

module.exports = router;
