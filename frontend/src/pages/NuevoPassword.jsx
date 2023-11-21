import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Alerta from "../components/Alerta"

const NuevoPassword = () => {

  const [tokenValido, setTokenValido] = useState(false)
  const [alerta, setAlerta] = useState({})

  const params = useParams();
  const { token } = params

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await axios(`http://localhost:4000/api/usuarios/olvide-password/${token}`)
        setTokenValido(true)

      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }
  }, [])

  c// * Extraemos el mensaje de la alerta, para mostrar
  const { msg } = alerta

  return (
    <>
      <h1 className="text-sky-600 font-black text-4xl capitalize">
        Reestablce tu Password y Administra tus <span className="text-slate-700">Proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      {tokenValido && (
        <form className="my-10 bg-white shadow rounded-lg px-10 py-5">

          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
            > Password</label>
            <input
              type="password"
              placeholder="Nuevo Password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              id="password"
            />
          </div>

          <input
            type="submit"
            value="Guardar Nuevo Password"
            className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" />

        </form>
      )}

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

export default NuevoPassword