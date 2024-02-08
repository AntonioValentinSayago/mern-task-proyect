import PreviewProyecto from "../components/PreviewProyecto"
import useProyectos from "../hooks/useProyectos"

const Proyectos = () => {

  const { proyectos } = useProyectos()

  return (
    <>
      <h1 className="text-4-xl font-black">Proyectos</h1>

      <div className="bg-white shadow mt-10 rounded-lg p-5">
        {proyectos.length ?
          proyectos.map(proyecto => (
            <PreviewProyecto
              key={proyecto._id}
              proyecto={proyecto}
            />
          ))
          : <p className="mt-5 text-center text-gray-600 uppercase p-5">No hay proyectos Guardados</p>}
      </div>
    </>
  )
}

export default Proyectos