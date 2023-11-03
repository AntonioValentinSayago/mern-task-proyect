import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const usuarioShema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    token: {
        type: String
    },
    confirmado: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

usuarioShema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next() // ? (Middleware)
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
})

const Usuario = mongoose.model('Usuario', usuarioShema)

export default Usuario;
