import { BrowserRouter, Routes, Route } from 'react-router-dom'

import AuthLayout from './layouts/AuthLayout'

import Login from './pages/Login'
import Registrar from './pages/Registrar'
import OlvidePassword from './pages/OlvidePassword'
import NuevoPassword from './pages/NuevoPassword'
import ConfirmarCuneta from './pages/ConfirmarCuneta'


import { AuthProvider } from './context/AuthProvider'
import RutaProtegida from './layouts/RutaProtegida'
import Proyectos from './pages/Proyectos'
function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path='registrar' element={<Registrar />} />
            <Route path='olvide-password' element={<OlvidePassword />} />
            <Route path='olvide-password/:token' element={<NuevoPassword />} />
            <Route path='confirmar/:id' element={<ConfirmarCuneta />} />
          </Route>

          <Route path='/proyectos' element={<RutaProtegida />}>
            <Route index element={<Proyectos />} />
          </Route>

        </Routes>
      </AuthProvider>

    </BrowserRouter>
  )
}

export default App
