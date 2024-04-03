// BurndownController.js
const Proyecto = require('../models/ProyectoModel');

const BurndownCtrl = {};

BurndownCtrl.getBurndownData = async (req, res) => {
  const projectId = req.params.id;

  try {
    const proyecto = await Proyecto.findById(projectId);

    if (!proyecto) {
      return res.status(404).json({ message: 'Proyecto no encontrado' });
    }

    const tareas = proyecto.tareas;
    const totalWork = tareas.length;
    let remainingWork = 0;
    tareas.forEach(tarea => {
      if (tarea.estado === 'Pendiente' || tarea.estado === 'En Progreso') {
        remainingWork++;
      }
    });

    const burndownData = {
      totalWork: totalWork,
      remainingWork: remainingWork
    };

    res.json({ burndownData });
  } catch (error) {
    console.error('Error al obtener los datos del Burndown Chart:', error);
    res.status(500).json({ message: 'Error al obtener los datos del Burndown Chart' });
  }
};

module.exports = BurndownCtrl;
