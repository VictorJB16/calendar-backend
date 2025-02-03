const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConection } = require('./database/config');
// en express si se necesita el dotenv para las variables de entorno


//!Crear el servidor express 

const app = express();

//!Base de datos
dbConection();

//!CORS

app.use( cors() );

//!Directorio Publico
// el use en node es como un middleware 
app.use( express.static('public') );

//!Lectura y parseo del body
// es pasar las peticiones por otro middleware
// las peticiones son de tipo json voy a procesarlas y obtener los datos
app.use( express.json() );


//Rutas
//TODO: auth: crear, login, renew   

app.use('/api/auth', require('./routes/auth') );


//TODO: CRUD: Eventos
app.use('/api/events', require('./routes/events'));


//!Escuchar peticiones 

app.listen( process.env.PORT , () => {
    console.log(` Servidor corriendo en ${ process.env.PORT }`);
});