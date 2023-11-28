import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";

const ProyectosContext = createContext()

// eslint-disable-next-line react/prop-types
const ProyectosProvider = ({ children }) => {

    const [ proyectos, setProyectos ] = useState([])
    const [ alerta, setAlerta ] = useState([])

    // ? Ventana de Alerta desde un conext provider
    const mostrarAlerta = alerta => {
        setAlerta(alerta)

        setTimeout(() => {
            setAlerta({})
        }, 5000);
    }

    // ? Funcion para insertar proyecto en la BD
    const  submitProyecto = async proyecto => {
        console.log(proyecto)
    }

    return (
        <ProyectosContext.Provider
            value={{
                proyectos,
                mostrarAlerta,
                alerta,
                submitProyecto
            }}
        >
            {children}
        </ProyectosContext.Provider>
    )
}

export{
    ProyectosProvider
}

export default ProyectosContext;