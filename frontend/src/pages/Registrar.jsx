import { useState } from "react"
import { Link } from "react-router-dom"

import clienteAxios from "../config/clienteAxios"

// * Importacion de componentes
import Alerta from "../components/Alerta"

const Registrar = () => {

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault();

    // ? Validacion del formulario. (Campos Vacios)
    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({
        msg: 'Todos los campos son Obligatorios',
        error: true
      })
      return
    }

    // ? Validacion del password sean Iguales. (Campos Vacios)
    if (password !== repetirPassword) {
      setAlerta({
        msg: 'Los password no son Iguales',
        error: true
      })
      return
    }


    // ? Validacion del password sean Iguales. (Campos Vacios)
    if (password.length < 8) {
      setAlerta({
        msg: 'El password es muy Corto',
        error: true
      })
      return
    }

    // * Seteamos el alerta
    setAlerta({})

    // ? Cuando pase las validacion, creamos el usuario en la API
    try {
      const { data } = await clienteAxios.post(`/usuarios`, { nombre, email, password });

      setAlerta({
        msg: data.msg,
        error: false
      })

      // * Seteamos el formulario
      setNombre('')
      setEmail('')
      setPassword('')
      setRepetirPassword('')

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }


  }

  const { msg } = alerta;
  return (
    <>
      <h1 className="text-sky-600 font-black text-4xl capitalize">
        Crea tu Cuenta y Administra tus <span className="text-slate-700">Proyectos</span>
      </h1>

      {/* Se muestra el alerta en caso de que exista */}
      {msg && <Alerta alerta={alerta} />}

      <form
        className="my-10 bg-white shadow rounded-lg px-10 py-5"
        onSubmit={handleSubmit}
      >

        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="nombre"
          > Nombre de Usuario</label>
          <input
            id="nombre"
            type="text"
            placeholder="Nombre de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          > Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          > Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password2"
          > Confirmar Password</label>
          <input
            id="password2"
            type="password"
            placeholder="Confirmar Cuenta"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={repetirPassword}
            onChange={e => setRepetirPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Crear Cuenta"
          className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" />

      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >Ya tienes una Cuenta? Inicia Sesión</Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/olvide-password"
        >Olvide mi Password</Link>
      </nav>

    </>
  )
}

export default Registrar