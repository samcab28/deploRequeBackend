const { Schema, model } = require('mongoose');

// Esquema para las tareas de un proyecto
const tareaSchema = new Schema({
  nombre: { type: String, required: true, trim: true },
  descripcion: { type: String, required: true, trim: true },
  responsable: { type: Schema.Types.ObjectId, ref: 'Colaborador' },
  estado: { type: String, required: true, trim: true }, // Pendiente, En Proceso, Terminada
});

// Esquema principal para los proyectos
const proyectoSchema = new Schema(
  {
    nombre: { type: String, required: true, trim: true },
    recursos: { type: [String], required: true },
    presupuesto: { type: Number, required: true },
    colaboradores: [{ type: Schema.Types.ObjectId, ref: 'Colaborador' }],
    tareas: [tareaSchema],
    estado: { type: String, required: true, trim: true },
    descripcion: { type: String, required: true, trim: true },
    fecha_inicio: { type: Date, required: true },
    responsable: { type: Schema.Types.ObjectId, ref: 'Colaborador' }
  },
  {
    timestamps: true,
  }
);

module.exports = model('Proyecto', proyectoSchema);
