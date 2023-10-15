const Role = require('../models/role');

const Usuario = require('../models/usuario');

const esRoleValido = async( rol = '') => {
    const existeRol = await Role.findOne( { rol })
    if ( !existeRol ) {
        throw new Error( 'El rol no está registrado enb la DB' )
    }
}

const emailExiste = async( email = '' ) => {

    // ? Verificar si el correo existe || Valudacion del correo
    const existeEmail = await Usuario.findOne( { correo })
    if ( existeEmail ) {
        throw new Error( 'El correo ya esta registrado' )
    }
}

const existeUsuarioPorId = async ( id ) => {

    // ? Verificar si el correo existe
    const existeUsuario = await Usuario.findId( id );
    if ( !existeUsuario ) {
        throw new Error( 'El ID no existe' )
    }
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}