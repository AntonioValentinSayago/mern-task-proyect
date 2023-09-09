// getting-started.js
const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect( process.env.MONGODB_CNN,{
            useNewUrlParser: true,            
        }) 

        console.log("Base de datos Online")

    } catch (error) {
        console.log(error)
        throw new Error('Erro en la conexión en la base de datos')
    }

}

module.exports = {
    dbConnection
}