import { useState } from "react"
import useProyectos from "../hooks/useProyectos";
import Alerta from "../components/Alerta";

const FormularioColaborador = () => {


  const [email, setEmail] = useState('');
  
  const { mostrarAlerta , alerta, submitColaborador } = useProyectos()


  // */ Funcion para enviar al Formulario y buscar colaborador */
  const handleSubmit = e => {
    e.preventDefault();

    if (email === '') {
      mostrarAlerta({
        msg: 'El Email es Obligatorio',
        error: true
      })
      return
    }
    submitColaborador(email)
  }

  //* Constante para definir la alerta y mostrarla
  const { msg } = alerta

  return (
    <form
      className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      { msg && <Alerta alerta={alerta} />}
      <div className="mb-5">
        <label
          className='text-gray-700 uppercase font-bold text-sm'
          htmlFor="nombre"
        >
          Email Colaborador
        </label>
        <input
          type="email"
          id='email'
          placeholder='Email Colaborador'
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <input
        type="submit"
        className='bg-sky-600 hover:bg-sky-700 w-full
             p-3 text-white uppercase font-bold cursor-pointer transition-colors rounded'
        value="Buscar Colaborador" />
    </form>
  )
}

export default FormularioColaborador