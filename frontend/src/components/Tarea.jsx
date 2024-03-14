import { formatearFecha } from "../helpers/formatearFecha";
import useProyectos from "../hooks/useProyectos";
import useAdmin from "../hooks/useAdmin";
// eslint-disable-next-line react/prop-types
const Tarea = ({ tarea }) => {

  const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } = useProyectos()

  // eslint-disable-next-line react/prop-types
  const { descripcion, nombre, prioridad, fechaEntrega, estado, _id } = tarea;

  const admin = useAdmin();

  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p className="text-xl">{nombre}</p>
        <p className="text-xl text-gray-500 uppercase">{descripcion}</p>
        <p className="text-xl">{formatearFecha(fechaEntrega)}</p>
        <p className="text-xl text-gray-600">{prioridad}</p>
      </div>
      <div className="flex gap-2">
        {admin && (
          <button
            className="bg-indigo-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => handleModalEditarTarea(tarea)}
          >
            Editar
          </button>
        )}

        <button
          className={`${estado ? 'bg-sky-600' : 'bg-gray-600'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
          onClick={() => completarTarea(_id)}
        >{estado ? 'Completa' : 'Incompleta'}</button>


        {/* ? Se segmenta el codigo para hacerlo mas corto */}
        
        {admin && (
          <button
            className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => handleModalEliminarTarea(tarea)}
          >
            Eliminar
          </button>
        )} *

      </div>
    </div>
  )
}

export default Tarea