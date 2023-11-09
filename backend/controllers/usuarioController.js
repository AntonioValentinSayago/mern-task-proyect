//? Controlador para el intermediario entre el modelo usuario y la vista 
import Usuario from "../models/Usuario.js"
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";

const registrar = async (req, res) => {

    // * Evitar registros duplicados
    const { email } = req.body;
    const existeUsuario = await Usuario.findOne({ email })

    if (existeUsuario) {
        const error = new Error('Usuario ya Registrado')
        return res.status(400).json({ msg: error.message })
    }

    try {
        const usuario = new Usuario(req.body);
        usuario.token = generarId();

        // * Insertar Usuario en la DB
        await usuario.save();
        res.send({ msg: "Usuario Creado Correctamente, Revisa tu Email para confirmar la cuenta"})
    } catch (error) {
        console.log(error)
    }

}

// * Funcion para autenticar los usuarios
const login = async (req, res) => {

    const { email, password } = req.body
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
    if (await usuario.comprobarPassword(password)) {
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
const confirmar = async (req, res) => {

    const { token } = req.params
    const usuarioConfirmar = await Usuario.findOne({ token })

    if (!usuarioConfirmar) {
        const error = new Error('El Token no es Valido')
        return res.status(403).json({ msg: error.message })
    }

    try {
        usuarioConfirmar.confirmado = true;
        usuarioConfirmar.token = ""
        await usuarioConfirmar.save()
        res.json({ msg: 'Usuario Confirmado Correctamente' })
    } catch (error) {
        console.log(error)
    }

}


// ? Olivde password
const olvidePassowrd = async (req, res) => {
    const { email } = req.body;
    // * Comprobar si el Usuario existe
    const usuario = await Usuario.findOne({ email })
    if (!usuario) {
        const error = new Error('El Usuario no Existe')
        return res.status(400).json({ msg: error.message })
    }

    try {
        usuario.token = generarId();
        await usuario.save()
        res.json({ msg: 'Hemos enviado un email con las instrucciones' })
    } catch (error) {
        console.log(error)
    }
}


// ? comprobarToken para poder cambiar el password 
const comprobarToken = async (req, res) => {
    const { token } = req.params;

    const tokenValido = await Usuario.findOne({ token })

    if (tokenValido) {
        res.json({ msg: 'Token Valido, el usuario existe' })
    } else {
        const error = new Error('El Token no es Valido')
        return res.status(400).json({ msg: error.message })
    }
}

// ? Funcion para actualizar el password
const nuevoPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    const usuario = await Usuario.findOne({ token })
    if (usuario) {
        usuario.password = password;
        usuario.token = ''
        try {
            await usuario.save()
            res.json({ msg: 'Password actualizado correctamente' })
        } catch (error) {
            console.log(error)
        }
    } else {
        const error = new Error('El Token no es Valido')
        return res.status(400).json({ msg: error.message })
    }

}

// ? Perfil para el usuario
const perfil = async ( req, res, next) => {
    const { usuario } = req;
    res.json(usuario)
}


export {
    registrar,
    login,
    confirmar,
    olvidePassowrd,
    comprobarToken,
    nuevoPassword,
    perfil
}