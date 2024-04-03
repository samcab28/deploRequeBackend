//definicion del servidor y codigo basico
const express = require('express');
const cors = require('cors');
const app = express();


//------------------------------------------------------------------------------
//settings 
app.set('port', process.env.PORT || 4000);

//------------------------------------------------------------------------------
//middlewares
//funciones antes de que lleguen a las rutas

//usada para el uso de varios servidores al tiempo, conexion fronend - backend
app.use(cors());

//usada para el uso de archivos formato .json
app.use(express.json());

//------------------------------------------------------------------------------
// routes
app.use('/api/login',require('./routes/LoginRoute'));
app.use('/api/colaborador',require('./routes/ColaboradorRoute'));
app.use('/api/Admin',require('./routes/AdminRoute'));
app.use('/api/proyecto',require('./routes/ProyectoRoute'));
app.use('/api/reunion',require('./routes/ReunionRoute'));
app.use('/api/burndown', require('./routes/BurndownRoute'));
app.use('/api/sendEmail', require('./routes/SendEmailRoute'));
//app.use('/api/message', require('./routes/messageRoute'));
app.use('/api/foro', require('./routes/ForoRoute'));
module.exports = app;