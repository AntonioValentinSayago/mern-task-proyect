
const { Schema, model } = require('mongoose')

const UsuarioShema = Schema({
    nombre:{
        type: String,
        required: [true, ' El Nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true, ' El Correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true, ' La contraseña es obligatoria']
    },
    img:{
        type: String,
    },
    rol:{
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }

})

UsuarioShema.methods.toJSON = function(){
    const { __v, password, ...usuario } = this.toObject();
    return usuario;
}

module.exports = model( 'Uusarios', UsuarioShema )
