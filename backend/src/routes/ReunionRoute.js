const { Router } = require('express');
const router = Router();

const { getReuniones, createReunion, getReunionById, deleteReunion, updateReunion } = require('../controllers/Reunion.controllers');

router.route('/')
    .get(getReuniones)
    .post(createReunion);

router.route('/:id')
    .get(getReunionById)
    .put(updateReunion)
    .delete(deleteReunion);

module.exports = router;
