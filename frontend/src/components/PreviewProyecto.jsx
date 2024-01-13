import { Link } from "react-router-dom"

// eslint-disable-next-line react/prop-types
const PreviewProyecto = ({ proyecto }) => {
    // eslint-disable-next-line react/prop-types
    const { nombre, _id, cliente } = proyecto
  return (
    <div
      className="border-b p-5 flex"
    >
      <p
        className="flex-1"
      >
        {nombre}

        <span className="text-sm text-gray-500 uppercase">{''} {cliente}</span>
      </p>

      <Link
        className="text-green-600 hover:text-gray-800 uppercase text-sm font-bold"
        to={`${_id}`}
      >
      Ver Proyecto</Link>
    </div>
  )
}

export default PreviewProyecto