const mongoose = require('mongoose');

const dbConection = async () => {
    try {
        await mongoose.connect( process.env.DB_CNN );
        console.log(` Conectado a la base de datos ${ process.env.DB_CNN }`);
    }
    catch (error) {
        console.log(error);
        throw new Error(` Error al conectar a la base de datos ${ error }`);
    }
}

module.exports = {
    dbConection
}