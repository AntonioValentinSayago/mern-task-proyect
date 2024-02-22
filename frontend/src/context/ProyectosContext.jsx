import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from 'react-router-dom'
import axios from "axios";

const ProyectosContext = createContext()

// eslint-disable-next-line react/prop-types
const ProyectosProvider = ({ children }) => {

    const [proyectos, setProyectos] = useState([])
    const [alerta, setAlerta] = useState([])
    const [proyecto, setProyecto] = useState([])
    const [cargando, setCargando] = useState(false)

    // * state para eliminar la tarea
    const [ modalEliminarTarea, setModalEliminarTarea ] = useState( false )

    //* Provider para manejar las modales
    const [modalFormularioTarea, setModalFormularioTarea] = useState(false);

    //* SET para editar una tarea
    const [tarea, setTarea] = useState({})

    const navigate = useNavigate();

    // Todo: UseEffect para mostrar los proyectos creados

    useEffect(() => {
        const obtenerProyectos = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios('http://localhost:4000/api/proyectos', config);
                setProyectos(data)

            } catch (error) {
                console.log(error)
            }
        }
        obtenerProyectos()
    }, [])

    // ? Ventana de Alerta desde un conext provider
    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    // ? Funcion para insertar proyecto en la BD
    // * Validar que el formulario va editar o crear un proyecto 
    const submitProyecto = async proyecto => {

        //* Se valida si el ID existe o viene null
        if (proyecto.id) {
            await editarProyecto(proyecto);
        } else {
            await nuevoProyecto(proyecto);
        }

        // ! El codigo se mueve a la funcion 'nuevoProyecto()'

    }

    //* Funcion para editar el proyecto

    const editarProyecto = async proyecto => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axios.put(`http://localhost:4000/api/proyectos/${proyecto.id}`, proyecto, config)

            //* Sincronizar el State para ver los cambios
            const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id === data._id ? data : proyectoState);
            setProyectos(proyectosActualizados)

            //* Mostrar la alerta para ver los cambios
            setAlerta({
                msg: ' Proyecto Actualizado correctamente',
                error: false,
            })

            // * Redireccionar
            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000);
        } catch (error) {
            console.log(error);
        }
    }

    const nuevoProyecto = async proyecto => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('http://localhost:4000/api/proyectos', proyecto, config);

            setProyectos([...proyectos, data])

            setAlerta({
                msg: ' Proyecto Creado correctamente',
                error: false,
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000);

        } catch (error) {
            console.log(error)
        }
    }

    const obtenerProyecto = async id => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios(`http://localhost:4000/api/proyectos/${id}`, config)

            const { proyecto } = data
            setProyecto(proyecto);

        } catch (error) {
            console.log(error)
        } finally {
            setCargando(false)
        }
    }

    //* Funcion para eliminar el proyecto
    const eliminarProyecto = async id => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`http://localhost:4000/api/proyectos/${id}`, config);

            //* Sincronizar los Proyectos en el state
            const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id)
            setProyectos(proyectosActualizados)

            setAlerta({
                msg: data.msg,
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000);

        } catch (error) {
            console.log(error);
        }
    }

    //* Funcion para abrir o cerrar modal (nueva tarea)
    const handleModalTarea = () => {
        setModalFormularioTarea(!modalFormularioTarea)
        // * Siempre que vayamos crear una tarea nueva reinciamos el objeto
        setTarea({})
    }

    //* Enviar la Tarea a la base de datos
    const submitTarea = async tarea => {

        // * Validando si existe '_id' para saber si es editar o crear tarea
        if (tarea?.id) {
            await editarTarea(tarea)
        } else {
            await crearTarea(tarea)
        }

    }

    //* Funcion para crear una tarea
    const crearTarea = async tarea => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axios.post('http://localhost:4000/api/tareas', tarea, config)

            // * Se agrega la tarea al state -> para que carge cuando se agregue una nueva tarea
            const proyectoActualizado = { ...proyecto }
            proyectoActualizado.tareas = [...proyecto.tareas, data]
            //* Se Agrega al State
            setProyecto(proyectoActualizado)

            setAlerta({})
            setModalFormularioTarea(false)

        } catch (error) {
            console.log(error);
        }
    }

    // * Editar Tarea
    const editarTarea = async tarea => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await axios.put(`http://localhost:4000/api/tareas/${tarea.id}`, tarea, config)

            // Todo: se actualiza el DOM (STATE)
            const proyectoActualizado = {...proyecto}
            proyectoActualizado.tareas = proyectoActualizado.tareas.map( tareaState => tareaState._id === data._id? data : tareaState)
            setProyecto(proyectoActualizado)

            //* Configuracion de mostrar alerta y cerrar el modal
            setAlerta({})
            setModalFormularioTarea(false)
            
        } catch (error) {
            console.log(error);
        }
    }

    // * Editar una Tarea del proyecto
    const handleModalEditarTarea = tarea => {
        setTarea(tarea)
        setModalFormularioTarea(true)
    }

    // * Funcion para Eliminar una Tarea
    const handleModalEliminarTarea = tarea => {
        setTarea(tarea)
        setModalEliminarTarea(!modalEliminarTarea)
    }

    // * CONST eliminar tarea
    const eliminarTarea = async ()=> {
        try {
            try {
                const token = localStorage.getItem('token');
                if (!token) return;
    
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }
    
                const { data } = await axios.delete(`http://localhost:4000/api/tareas/${tarea._id}`, config)
    
                setAlerta({
                    msg: data.msg,
                    error: false
                })
                // Todo: se actualiza el DOM (STATE)
                const proyectoActualizado = {...proyecto}
                proyectoActualizado.tareas = proyectoActualizado.tareas.filter( tareaState => tareaState._id !== tarea._id)
                setProyecto(proyectoActualizado)
    
                //* Configuracion de mostrar alerta y cerrar el modal
                
                setModalEliminarTarea(false)
                setTarea({})

                setTimeout(() => {
                    setAlerta({})
                }, 2000)
                
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    // * Provider para buscar y agregar colaborador a las tareas
    const submitColaborador = async email => {
        console.log(email);
    }

    return (
        <ProyectosContext.Provider
            value={{
                proyectos,
                mostrarAlerta,
                alerta,
                submitProyecto,
                obtenerProyecto,
                proyecto,
                cargando,
                eliminarProyecto,
                modalFormularioTarea,
                handleModalTarea,
                submitTarea,
                handleModalEditarTarea,
                tarea,
                handleModalEliminarTarea,
                modalEliminarTarea,
                eliminarTarea,
                submitColaborador
            }}
        >
            {children}
        </ProyectosContext.Provider>
    )
}

export {
    ProyectosProvider
}

export default ProyectosContext;