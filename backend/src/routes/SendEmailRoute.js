//SendEmailRoute.js
const { Router } = require('express');
const router = Router();

const { enviarCorreos } = require('../controllers/SendEmail.controllers');

router.route('/')
    .post(enviarCorreos);

module.exports = router;
