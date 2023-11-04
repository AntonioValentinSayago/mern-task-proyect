import Proyecto from "../models/Proyecto.js"

const obtenerProyectos = async ( req, res ) => {

    const proyectos = await Proyecto.find().where('creador').equals(req.usuario);
    res.json(proyectos)

}

const nuevoProyecto = async ( req, res ) => {

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
const obtenerProyecto = async ( req, res ) => {

    const { id } = req.params;

    const proyecto = await Proyecto.findById(id.trim());

    // ? En caso de no exista el proyecto se muestra un msg
    if(!proyecto && id.length === 24){
        const error = new Error('El Proyecto no Existe')
        return res.status(404).json({ msg: error.message })
    }
    
    // ? Cuando el usuario no tiene permisos para ver el proyecto
    if(proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('Acción no Valida')
        return res.status(401).json({ msg: error.message })
    }

    res.json(proyecto)

}
const editarProyecto = async ( req, res ) => {}
const eliminarProyecto = async ( req, res ) => {}
const agregarColaborador = async ( req, res ) => {}
const eliminarColaborador = async ( req, res ) => {}
const obtenerTareas = async ( req, res ) => {}

export{
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
    obtenerTareas
}



