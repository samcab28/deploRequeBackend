const { Router } = require('express');
const router = Router();
const colaboradorCtrl = require('../controllers/Colaborador.controllers');

const { getColaboradores, createColaborador, getColaboradorById, deleteColaborador, updateColaborador, getProyectosColaborador } = require('../controllers/Colaborador.controllers');

router.route('/')
    .get(getColaboradores)
    //.get(getColaboradoresId)
    .post(createColaborador);


// En la ruta correspondiente
router.get('/ids', async (req, res) => {
    try {
        const colaboradorIds = await colaboradorCtrl.getColaboradorIds();
        res.json(colaboradorIds);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get colaborador IDs', error: error.message });
    }
});

router.route('/:id')
    .get(getColaboradorById)
    .put(updateColaborador)
    .delete(deleteColaborador);


router.get('/:id/proyectos', colaboradorCtrl.getProyectosColaborador);

module.exports = router;
