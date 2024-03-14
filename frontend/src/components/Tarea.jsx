import { formatearFecha } from "../helpers/formatearFecha";
import useProyectos from "../hooks/useProyectos";
import useAdmin from "../hooks/useAdmin";
// eslint-disable-next-line react/prop-types
const Tarea = ({ tarea }) => {

  const { handleModalEditarTarea, handleModalEliminarTarea } = useProyectos()

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

        {estado ? (
          <button className="bg-sky-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">Completa</button>
        ) : (
          <button className="bg-gray-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg">Incompleta</button>
        )}

        {admin && (
          <button
            className="bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg"
            onClick={() => handleModalEliminarTarea(tarea)}
          >
            Eliminar
          </button>
        )}

      </div>
    </div>
  )
}

export default Tarea