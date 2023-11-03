import mongoose from "mongoose";

const conectarDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGOOSE_URI, {
            useNewUrlParser:true,
            useUnifiedTopoLogy: true
        });

        const url = `${connection.connection.host}:${connection.connection.port}`
        console.log(`Mongo DB conectado en: ${url}`)
    } catch (error) {
        console.log(`error: ${error.message}`)
        process.exit(1) // * es para forzar que el proceso termine, sin importar que otros se esten ejecutando
    }
}

export default conectarDB