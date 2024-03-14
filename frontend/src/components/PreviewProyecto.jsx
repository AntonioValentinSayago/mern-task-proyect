import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"
// eslint-disable-next-line react/prop-types
const PreviewProyecto = ({ proyecto }) => {

  const { auth } = useAuth()
  // eslint-disable-next-line react/prop-types
  const { nombre, _id, cliente, creador } = proyecto
  return (
    <div
      className="border-b p-5 flex"
    >
      <div className='flex items-center gap-2'>
        <p className='flex-1'>
          {nombre}

          <span className='text-sm text-gray-500 uppercase'>
            {''} {cliente}
          </span>
        </p>

        {auth._id !== creador && (
          <p className='p-1 text-xs rounded-lg text-white bg-green-500 font-bold uppercase'>Colaborador</p>
        )}
      </div>


      <Link
        className="text-green-600 hover:text-gray-800 uppercase text-sm font-bold"
        to={`${_id}`}
      >
        Ver Proyecto</Link>
    </div>
  )
}

export default PreviewProyecto