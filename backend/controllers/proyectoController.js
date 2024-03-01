import Proyecto from "../models/Proyecto.js"
import Tarea from "../models/Tarea.js";
import Usuario from "../models/Usuario.js";

const obtenerProyectos = async (req, res) => {

    const proyectos = await Proyecto.find()
        .where('creador')
        .equals(req.usuario)
        .select("-tareas"); //* Evitamos traer las tareas cuando se muestren en la vista de todos los proyectos
    res.json(proyectos)

}

const nuevoProyecto = async (req, res) => {

    const proyecto = new Proyecto(req.body);
    proyecto.creador = req.usuario._id;

    try {
        const proyectoAlmacenado = await proyecto.save();
        res.json(proyectoAlmacenado)
    } catch (error) {
        console.log(error)
    }

}

// * Obtener proyecto existente desde la url
const obtenerProyecto = async (req, res) => {

    const { id } = req.params;

    const proyecto = await Proyecto.findById(id.trim()).populate("tareas"); //* Traemos las tareas de cada proyecto

    // ? En caso de no exista el proyecto se muestra un msg
    if (!proyecto && id.length === 24) {
        const error = new Error('El Proyecto no Existe')
        return res.status(404).json({ msg: error.message })
    }

    // ? Cuando el usuario no tiene permisos para ver el proyecto
    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('Acción no Valida')
        return res.status(401).json({ msg: error.message })
    }

    // ? Obtener Tarea del Proyecto
    //const tareas = await Tarea.find().where('proyecto').equals(proyecto._id)

    res.json({
        proyecto
    })

}

// * Funcion para Editar un Proyecto
const editarProyecto = async (req, res) => {

    const { id } = req.params;

    const proyecto = await Proyecto.findById(id.trim());

    // ? En caso de no exista el proyecto se muestra un msg
    if (!proyecto && id.length === 24) {
        const error = new Error('El Proyecto no Existe')
        return res.status(404).json({ msg: error.message })
    }

    // ? Cuando el usuario no tiene permisos para ver el proyecto
    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('Acción no Valida')
        return res.status(401).json({ msg: error.message })
    }

    // ? Obtenemos los datos para actualizar y validamos en caso de que no exista
    proyecto.nombre = req.body.nombre || proyecto.nombre;
    proyecto.descripcion = req.body.descripcion || proyecto.descripcion;
    proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega;
    proyecto.cliente = req.body.cliente || proyecto.cliente;

    try {
        const proyectoAlmacenado = await proyecto.save();
        res.json(proyectoAlmacenado)
    } catch (error) {
        console.log(error)
    }

}

// * Eliminar proyecto
const eliminarProyecto = async (req, res) => {

    const { id } = req.params;

    const proyecto = await Proyecto.findById(id.trim());

    // ? En caso de no exista el proyecto se muestra un msg
    if (!proyecto && id.length === 24) {
        const error = new Error('El Proyecto no Existe')
        return res.status(404).json({ msg: error.message })
    }

    // ? Cuando el usuario no tiene permisos para ver el proyecto
    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('Acción no Valida')
        return res.status(401).json({ msg: error.message })
    }

    try {
        await proyecto.deleteOne();
        res.json({ msg: "Proyecto Eliminado " });
    } catch (error) {
        console.log(error)
    }
}

// * Habilitanfo la Búsuqueda por Email
const buscarColaborador = async (req, res) => {

    // * Obtenemos el email que se le pasa desde el endpoint
    const { email } = req.body

    const usuario = await Usuario.findOne({ email }).select('-confirmado -createAt -password -token -updateAt -__v')


    //* Validar si existe el email
    if (!usuario) {
        const error = new Error('Usuario no Encontrado')
        return res.status(404).json({ msg: error.message })
    }

    res.json(usuario)

}
const agregarColaborador = async (req, res) => { }
const eliminarColaborador = async (req, res) => { }

// * Obtenemos las tareas por Proyecto
// const obtenerTareas = async (req, res) => {
//     const { id } = req.params;

//     const existeProyecto = await Proyecto.findById(id);
//     if (!editarProyecto) {
//         const error = new Error('No Encontrado')
//         return res.status(401).json({ msg: error.message })
//     }

//     // ? Obtenemos las tareas conforme al Proyetco
//     const tareas = await Tarea.find().where('proyecto').equals(id)
//     res.json(tareas)
// }

export {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    buscarColaborador,
    agregarColaborador,
    eliminarColaborador
}



