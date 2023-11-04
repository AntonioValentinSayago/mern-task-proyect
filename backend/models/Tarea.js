import mongoose from "mongoose"; 

const tareaShema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    descripcion:{
        type: String,
        required: true,
        trim: true
    },
    estado: {
        type: Boolean,
        default: false,
    },
    fechaEntrega:{
        type: Date,
        required: true,
        default: Date.now()
    },
    prioridad: {
        type: String,
        required: true,
        enum: ["Baja", "Media", "Alta"]
    },
    proyecto:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Proyecto",
    }
},{
    timestamps: true
})

const Tarea = mongoose.model("Tareas", tareaShema);

export default Tarea;
