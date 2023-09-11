const Role = require('../models/role');

const esRoleValido = async( rol = '') => {
    const existeRol = await Role.findOne( { rol })
    if ( !existeRol ) {
        throw new Error( 'El rol no está registrado enb la DB' )
    }
}


module.exports = {
    esRoleValido
}