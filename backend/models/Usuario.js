import mongoose, { mongo } from "mongoose";

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

const Usuario = mongo.MongoDBCollectionNamespace('Usuario', usuarioShema)

export default Usuario;
