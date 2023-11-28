import { useContext } from "react";
import ProyectosContext from "../context/ProyectosContext";

const useProyectos = () => {
    return useContext(ProyectosContext)
}

export default useProyectos