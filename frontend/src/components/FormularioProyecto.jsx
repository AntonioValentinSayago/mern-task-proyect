import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos";
import Alerta from "./Alerta";

const FormularioProyecto = () => {

    const [ id, setId ] = useState(null)
    const [ nombre, setNombre ] = useState('')
    const [ descripcion, setDescripcion ] = useState('')
    const [ fechaEntrega, setFechaEntrega ] = useState('')
    const [ cliente, setCliente ] = useState('')
    
    // * Context Api
    const { mostrarAlerta, alerta, submitProyecto, proyecto } = useProyectos();

    // * Valida si el ID ->paramas viene vacio para decirle al formulario que va editar
    const params = useParams();

    useEffect(() => {
        if ( params.id  ) {
         setId(proyecto._id)   
         setNombre(proyecto.nombre)   
         setDescripcion(proyecto.descripcion)   
         setFechaEntrega(proyecto.fechaEntrega.split('T')[0])
         setCliente(proyecto.cliente)   
        }
    },[params])


    // Todo: Validación del Formulario

    const handleSubmit = async e => {
        e.preventDefault();

        if([nombre, descripcion, fechaEntrega, cliente].includes('')){
            mostrarAlerta({
                msg: 'Todos los Campos son Obligatorios',
                error: true
            })

            return;
        }

        // Todo: Pasar los datos hacie el provider
        //*  Se pasa el ID para indicar que va editar el formulario
        await submitProyecto({id, nombre, descripcion, fechaEntrega, cliente });
        setId(null)
        setNombre('')
        setCliente('')
        setFechaEntrega('')
        setDescripcion('')
    }

    const { msg } = alerta;
    return (
        <form className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
        onSubmit={handleSubmit}
        >
            { msg && <Alerta alerta={alerta} />}
            <div className="mb-5">
                <label
                    htmlFor="nombre"
                    className="text-gray-700 uppercase font-bold text-sm"
                >
                    Nombre del Proyecto
                </label>

                <input
                    type="text"
                    name="nombre"
                    id="nombre"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Nombre del Proyecto"
                    value={nombre}
                    onChange={ e => setNombre(e.target.value) }
                />
            </div>

            <div className="mb-5">
                <label
                    htmlFor="descripcion"
                    className="text-gray-700 uppercase font-bold text-sm"
                >
                    Descripcion
                </label>

                <textarea
                    name="descripcion"
                    id="descripcion"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={ e => setDescripcion(e.target.value) }
                />
            </div>

            <div className="mb-5">
                <label
                    htmlFor="fecha-entrega"
                    className="text-gray-700 uppercase font-bold text-sm"
                >
                    Fecha Entrega
                </label>

                <input
                    type="date"
                    name="fecha-entrega"
                    id="fecha-entrega"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    value={fechaEntrega}
                    onChange={ e => setFechaEntrega(e.target.value) }
                />
            </div>

            <div className="mb-5">
                <label
                    htmlFor="cliente"
                    className="text-gray-700 uppercase font-bold text-sm"
                >
                    Nombre del Cliente
                </label>

                <input
                    type="text"
                    name="cliente"
                    id="cliente"
                    className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                    placeholder="Nombre del cliente"
                    value={cliente}
                    onChange={ e => setCliente(e.target.value) }
                />
            </div>

            <input 
                type="submit" 
                value={id ? 'Actualizar Proyecto':'Crear Proyecto'}
                className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
            />

        </form>
    );
};

export default FormularioProyecto;
