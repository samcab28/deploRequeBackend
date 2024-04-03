const { Router } = require('express');
const router = Router();
const proyectoCtrl = require('../controllers/Proyecto.controllers');
const Proyecto = require('../models/ProyectoModel');

const { getProyectos, createProyecto, getProyectoById, deleteProyecto, updateProyecto, addTaskToProyecto, editTask, deleteTaskProyecto } = require('../controllers/Proyecto.controllers');

// Función para obtener los IDs de colaboradores y el ID del responsable
const obtenerIdsColaboradoresYResponsable = proyectoCtrl.obtenerIdsColaboradoresYResponsable;

router.route('/')
    .get(getProyectos)
    .post(createProyecto);

router.route('/:id')
    .get(getProyectoById)
    .put(updateProyecto)
    .delete(deleteProyecto);

router.route('/:id/add-task')
    .put(addTaskToProyecto);

router.route('/:id/edit-task/:taskId')
    .put(editTask);

router.route('/:id/delete-task/:taskId')
    .delete(deleteTaskProyecto);


router.route('/:id/participantes')
    .get(async (req, res) => {
        try {
            const proyecto = await Proyecto.findById(req.params.id);
            if (!proyecto) {
                return res.status(404).json({ message: 'Project not found' });
            }

            const idsParticipantes = obtenerIdsColaboradoresYResponsable(proyecto.colaboradores, proyecto.responsable);
            res.json(idsParticipantes);
        } catch (error) {
            res.status(500).json({ message: 'Failed to get participants', error: error.message });
        }
    });

module.exports = router;
