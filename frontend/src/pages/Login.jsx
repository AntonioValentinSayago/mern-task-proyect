import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../components/Alerta"

import useAuth from "../hooks/useAuth"
import axios from "axios";

const Login = () => {

  // ? Validacion del useSate para el usuario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const { setAuth } = useAuth();

  //* Direccionar al Cliente cuando inicie sesion
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();

    // Validar los campos del formulario
    if ([email, password].includes('')) {
      setAlerta({
        msg: 'Los campos son Obligatorios',
        error: true
      });
      return;
    }

    // Todo: Se envia información al Servidor
    try {
      const { data } = await axios.post('http://localhost:4000/api/usuarios/login', { email, password })

      setAlerta({})

      // ? almacenar el token del usuario autenticado en Local Storage
      localStorage.setItem('token', data.token)
      setAuth(data);
      navigate('/proyectos')
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
        Inicia Sesión y Administra tus <span className="text-slate-700">Proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      <form
        className="my-10 bg-white shadow rounded-lg px-10 py-5"
        onSubmit={handleSubmit}
      >
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

        <input
          type="submit"
          value="Iniciar Sesion"
          className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors" />

      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="registrar"
        >¿No tienes una Cuenta? Registrate</Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="olvide-password"
        >Olvide mi Password</Link>
      </nav>

    </>
  )
}

export default Login