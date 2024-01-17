import { useParams } from "react-router-dom";
import useProyectos from "../hooks/useProyectos"
import { useEffect } from "react";
import FormularioProyecto from "../components/FormularioProyecto";

const EditarProyecto = () => {

    const params = useParams();
    const { obtenerProyecto, proyecto, cargando } = useProyectos();

    useEffect(() => {
        obtenerProyecto(params.id)
    }, []);

    const { nombre } = proyecto;

    if (cargando) return 'Cargando...'

    return (
        <>
            <h1 className="font-black text-4xl">EditarProyecto: {nombre}</h1>

            <div className="mt-10 flex justify-center">
                <FormularioProyecto />
            </div>

        </>
    )
}

export default EditarProyecto