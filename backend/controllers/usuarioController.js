//? Controlador para el intermediario entre el modelo usuario y la vista 
import Usuario from "../models/Usuario.js"
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";

const registrar = async ( req, res) => {

    // * Evitar registros duplicados
    const { email } = req.body;
    const existeUsuario = await Usuario.findOne({ email })

    if(existeUsuario) {
        const error = new Error('Usuario ya Registrado')
        return res.status(400).json({ msg: error.message })
    }

    try {
        const usuario = new Usuario(req.body);
        usuario.token = generarId();
        const usuarioAlmacenado = await usuario.save();
        res.send(usuarioAlmacenado)
    } catch (error) {
        console.log(error)
    }

}

// * Funcion para autenticar los usuarios
const login = async ( req, res) => {    

    const  { email, password } = req.body
    // ? Comprobar si el usuario existe
    const usuario = await Usuario.findOne({ email })
    if (!usuario) {
        const error = new Error('El Usuario no Existe')
        return res.status(400).json({ msg: error.message })
    }

    // ? Comprobar si el usuario esta confirmado
    if (!usuario.confirmado) {
        const error = new Error('Tu Cuenta no ha sido confirmada')
        return res.status(403).json({ msg: error.message })
    }

    // ? Comprobar us password 
    if( await usuario.comprobarPassword(password)){
        res.json({ 
            _id: usuario.id,
             nombre: usuario.nombre,
             email: usuario.email,
             token: generarJWT(usuario._id),
        })
    } else {
        const error = new Error('El password es Incorrecto')
        return res.status(403).json({ msg: error.message })
    }

}

// ? Funcion para confirmar la cuenta de los usuarios
const confirmar = async ( req, res) => {

    const { token } = req.params
    const usuarioConfirmar  = await Usuario.findOne({ token })

    if (!usuarioConfirmar) {
        const error = new Error('El Token no es Valido')
        return res.status(403).json({ msg: error.message })
    }

    try {
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = ""
        await usuarioConfirmar.save()
        res.json({ msg: 'Usuario Confirmado Correctamente'})
    } catch (error) {
        console.log(error)
    }

}


export {
    registrar,
    login,
    confirmar
}