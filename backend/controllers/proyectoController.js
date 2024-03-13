import Proyecto from "../models/Proyecto.js"
import Tarea from "../models/Tarea.js";
import Usuario from "../models/Usuario.js";

const obtenerProyectos = async (req, res) => {

    //* 120324 Obtenemos nuevo resultados 'or' condiciones de que tiene que ser iguales
    const proyectos = await Proyecto.find({
        '$or' : [
            {'colaboradores' : {$in: req.usuario}},
            {'creador' : {$in: req.usuario}},
        ]
    })
        //* se eliminar el 'where' porque se coloco el 'or'
        // .where('creador')
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

    const proyecto = await Proyecto.findById(id.trim())
        .populate("tareas")//* Traemos las tareas de cada proyecto
        .populate('colaboradores' , 'nombre email'); //* Solo traemos nombre e email

    // ? En caso de no exista el proyecto se muestra un msg
    if (!proyecto && id.length === 24) {
        const error = new Error('El Proyecto no Existe')
        return res.status(404).json({ msg: error.message })
    }

    // ? Cuando el usuario no tiene permisos para ver el proyecto
    //* 120324 Se cambia la condicion
    if (proyecto.creador.toString() !== req.usuario._id.toString() && !proyecto.colaboradores.some( colaborador =>  colaborador._id.toString() === req.usuario._id.toString() )) {
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
// * Se trabaja con la funcion 29 de feb del 2024
const agregarColaborador = async (req, res) => {

    //* recibe el id de la funcion del ProyectContext
    const proyecto = await Proyecto.findById(req.params.id)

    //* Valida de que el proyecto exista
    if (!proyecto) {
        const error = new Error('Proyecto no Encontrado')
        return res.status(404).json({ msg: error.message })
    }

    // * Se valida que no se agrege otro usuario al proyecto
    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('Acción no Valida')
        return res.status(404).json({ msg: error.message })
    }


    //* // * Obtenemos el email que se le pasa desde el endpoint
    const { email } = req.body

    const usuario = await Usuario.findOne({ email }).select('-confirmado -createAt -password -token -updateAt -__v')


    //* Validar si existe el email
    if (!usuario) {
        const error = new Error('Usuario no Encontrado')
        return res.status(404).json({ msg: error.message })
    }

    //* El colaborar no es el mismo admin del proyecto
    if(proyecto.creador.toString() === usuario._id.toString()) {
        const error = new Error('El creador del proyecto no puede ser el mismo')
        return res.status(404).json({ msg: error.message })
    }

    //* Revisar que no este agregado al proyecto el mismo colaborador
    if (proyecto.colaboradores.includes(usuario._id)) {
        const error = new Error('El usuario ya pertenece al proyecto')
        return res.status(404).json({ msg: error.message })
    }

    //* En caso de que este todo bien, se agrega el usuario
    proyecto.colaboradores.push(usuario._id)
    await proyecto.save();
    res.json({ msg: 'Colaborador Agregado Correctamente'})
 }
const eliminarColaborador = async (req, res) => { 
    const proyecto = await Proyecto.findById(req.params.id);

    if (!proyecto) {
      const error = new Error("Proyecto No Encontrado");
      return res.status(404).json({ msg: error.message });
    }
  
    if (proyecto.creador.toString() !== req.usuario._id.toString()) {
      const error = new Error("Acción no válida");
      return res.status(404).json({ msg: error.message });
    }
  
    // Esta bien, se puede eliminar
    proyecto.colaboradores.pull(req.body.id);
    await proyecto.save();
    res.json({ msg: "Colaborador Eliminado Correctamente" });

}

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



