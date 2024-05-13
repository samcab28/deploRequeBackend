const Proyecto = require('../models/ProyectoModel');

const proyectoCtrl = {};


proyectoCtrl.obtenerIdsColaboradoresYResponsable = (colaboradores, responsable) => {
    const idsColaboradores = colaboradores.map(colaborador => colaborador._id);
    const idResponsable = responsable._id;
    return [...idsColaboradores, idResponsable];
};

proyectoCtrl.getProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.find();
        res.json(proyectos);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get projects', error: error.message });
    }
};

proyectoCtrl.getProyectoById = async (req, res) => {
    const { id } = req.params;

    try {
        const proyecto = await Proyecto.findById(id);
        if (!proyecto) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(proyecto);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: 'Invalid project ID' });
        }
        res.status(500).json({ message: 'Failed to get project', error: error.message });
    }
};


proyectoCtrl.createProyecto = async (req, res) => {
    const { nombre, recursos, presupuesto, colaboradores, tareas, estado, descripcion, fecha_inicio, responsable } = req.body;
    const newProyecto = new Proyecto({ nombre, recursos, presupuesto, colaboradores, tareas, estado, descripcion, fecha_inicio, responsable });

    try {
        await newProyecto.save();
        res.json({ message: 'Project created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create project', error: error.message });
    }
};

proyectoCtrl.deleteProyecto = async (req, res) => {
    const { id } = req.params;

    try {
        const proyecto = await Proyecto.findByIdAndDelete(id);
        if (!proyecto) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete project', error: error.message });
    }
};

proyectoCtrl.updateProyecto = async (req, res) => {
    const { id } = req.params;
    const { nombre, recursos, presupuesto, colaboradores, tareas, estado, descripcion, fecha_inicio, responsable } = req.body;

    try {
        const updatedProyecto = await Proyecto.findByIdAndUpdate(id, { nombre, recursos, presupuesto, colaboradores, tareas, estado, descripcion, fecha_inicio, responsable }, { new: true });
        if (!updatedProyecto) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ message: 'Project updated successfully', proyecto: updatedProyecto });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update project', error: error.message });
    }
};


proyectoCtrl.addTaskToProyecto = async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, responsable, estado, recursosEconomicos, tiempoEstimado, storyPoints } = req.body;

    try {
        const updatedProyecto = await Proyecto.findByIdAndUpdate(id, {
            $push: { tareas: { nombre, descripcion, responsable, estado:"Pendiente", recursosEconomicos, tiempoEstimado, storyPoints } }
        }, { new: true });

        if (!updatedProyecto) {
            return res.status(404).json({ message: 'Project not found' });
        }

        res.json({ message: 'Task added to project successfully', proyecto: updatedProyecto });
    } catch (error) {
        res.status(500).json({ message: 'Failed to add task to project', error: error.message });
    }
};


proyectoCtrl.editTask = async (req, res) => {
    const { id, taskId } = req.params;
    const { nombre, descripcion, responsable, estado, recursosEconomicos, tiempoEstimado, storyPoints } = req.body;

    try {
        const proyecto = await Proyecto.findById(id);
        if (!proyecto) {
            return res.status(404).json({ message: 'Project not found' });
        }

        const tarea = proyecto.tareas.find(t => t._id.toString() === taskId);
        if (!tarea) {
            return res.status(404).json({ message: 'Task not found' });
        }

        tarea.nombre = nombre;
        tarea.descripcion = descripcion;
        tarea.responsable = responsable;
        tarea.estado = estado;
        tarea.recursosEconomicos = recursosEconomicos; 
        tarea.tiempoEstimado = tiempoEstimado; 
        tarea.storyPoints = storyPoints;

        await proyecto.save();

        res.json({ message: 'Task updated successfully', proyecto });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update task', error: error.message });
    }
};


proyectoCtrl.deleteTaskProyecto = async (req, res) => {
    const { id, taskId } = req.params;

    try {
        const proyecto = await Proyecto.findById(id);
        if (!proyecto) {
            return res.status(404).json({ message: 'Project not found' });
        }

        proyecto.tareas = proyecto.tareas.filter(tarea => tarea._id.toString() !== taskId);

        await proyecto.save();
        res.json({ message: 'Task deleted successfully', proyecto });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete task', error: error.message });
    }
};


module.exports = proyectoCtrl;