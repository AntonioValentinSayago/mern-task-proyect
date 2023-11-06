import Proyecto from '../models/Proyecto.js'
import Tarea from '../models/Tarea.js';
// ? Agregar Tarea conforme al proyecto que existe
const agregarTarea = async (req, res) => {

    //* Verificamos de que el proyecto existe
    const { proyecto } = req.body;

    const existeProyecto = await Proyecto.findById(proyecto);
    if (!existeProyecto) {
        const error = new Error('El proyecto no Existe');
        return res.status(404).json({ msg: error.message });
    }

    // * Valida que le persona tenga los permisos para añadir tareas
    if (existeProyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('No tienes los permisos para añadir Tareas');
        return res.status(404).json({ msg: error.message });
    }

    try {
        const tareaAlmacenada = await Tarea.create(req.body);
        res.json(tareaAlmacenada)
    } catch (error) {

    }

}

// ? Obtener tarea con Validacion 
const obtenerTarea = async (req, res) => {
    const { id } = req.params;

    const tarea = await Tarea.findById(id).populate("Proyecto")

    // * Valida que la Tarea Exista
    if (!tarea) {
        const error = new Error('Tarea no Encontrada');
        return res.status(404).json({ msg: error.message });
    }

    // * Valida que le persona tenga los permisos para ver tareas
    if (existeProyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('Acción no Valida');
        return res.status(403).json({ msg: error.message });
    }

    res.json(tarea)
}

const actualizarTarea = async (req, res) => {
    const { id } = req.params;

    const tarea = await Tarea.findById(id).populate("proyecto")

    // * Valida que la Tarea Exista
    if (!tarea) {
        const error = new Error('Tarea no Encontrada');
        return res.status(404).json({ msg: error.message });
    }

    // * Valida que le persona tenga los permisos para ver tareas
    if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('Acción no Valida');
        return res.status(403).json({ msg: error.message });
    }

    tarea.nombre = req.body.nombre || tarea.nombre
    tarea.descripcion = req.body.descripcion || tarea.descripcion
    tarea.prioridad = req.body.prioridad || tarea.prioridad
    tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega;

    try {
        const tareaAlmacenada = await tarea.save();
        res.json(tareaAlmacenada)
    } catch (error) {
        console.log(error)
    }

}

// ? Eliminar una Tarea
const eliminarTarea = async (req, res) => {
    const { id } = req.params;

    const tarea = await Tarea.findById(id).populate("proyecto")

    // * Valida que la Tarea Exista
    if (!tarea) {
        const error = new Error('Tarea no Encontrada');
        return res.status(404).json({ msg: error.message });
    }

    // * Valida que le persona tenga los permisos para ver tareas
    if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('Acción no Valida');
        return res.status(403).json({ msg: error.message });
    }


    try {
        await tarea.deleteOne()
        res.json({ msg: 'Tarea Eliminada '})
    } catch (error) {
        console.log(error)
    }
}

const cambiarEstado = async (req, res) => { }

export {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstado
}