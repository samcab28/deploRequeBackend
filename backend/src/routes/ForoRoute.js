const { Router } = require('express');
const router = Router();

const { createForo, getForos,postMessage, getMessages } = require('../controllers/Foro.controllers');
const colaboradorCtrl = require('../controllers/Colaborador.controllers');
const adminCtrl = require('../controllers/Admin.controllers');
const proyectoCtrl = require('../controllers/Proyecto.controllers');
const Proyecto = require('../models/ProyectoModel');

router.route('/')
    .get(getForos)
    .post(createForo);
 
// Define la ruta para obtener los IDs de colaboradores y administradores
router.get('/ids', async (req, res) => {
    try {
        const colaboradorIds = await colaboradorCtrl.getColaboradorIds();
        const adminIds = await adminCtrl.getAdminIds();
        const idsUnificados = colaboradorIds.concat(adminIds);
        res.json(idsUnificados);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get colaboradores and admins IDs', error: error.message });
    }
});

// Ruta para obtener los participantes de un proyecto específico
router.get('/:proyecto/participantes', async (req, res) => {
    const { proyecto } = req.params;

    try {
        // Obtener información del proyecto
        const proyectoInfo = await Proyecto.findById(proyecto);
        if (!proyectoInfo) {
            return res.status(404).json({ message: 'Proyecto no encontrado' });
        }

        // Obtener los IDs de colaboradores y el ID del responsable del proyecto
        const colaboradoresYResponsableIds = proyectoCtrl.obtenerIdsColaboradoresYResponsable(proyectoInfo.colaboradores, proyectoInfo.responsable);
        
        res.json(colaboradoresYResponsableIds);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get participantes', error: error.message });
    }
});

router.route('/:foroId/mensaje')
    .get(getMessages)
    .post(postMessage);


module.exports = router;
