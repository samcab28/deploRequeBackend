/*
para inicializacion automatica del usuario:

npm run dev, declaracion en scrips de package.json

*/
//inicializacion de variables de .env
require('dotenv').config();
const app = require('./app');

//llamada a la database
require('./database');

//llamada del servidor, ayudar a elegibilidad del codigo
const port = app.get('port');
app.listen(port, () => {
    console.log('Server is running on port ${port}');
});

//inicializacion de variables de .env
//inicializacion de variables de .env


/*require('dotenv').config();

const express = require('express');
const app = require('./app');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
//const Message = require('./models/messageModel'); // Importar el modelo de mensaje

app.use(cors());

//llamada a la database
require('./database');

//llamada del servidor, ayudar a elegibilidad del codigo
const port = app.get('port');

const server = http.createServer(app);
const io = new Server(server, {
    cors: {origin:"http://localhost:3000", methods: ["GET", "POST"]},
});

io.on("connection", (socket) => {
  console.log(`Server is running on port ${port}`);
  
  socket.on("send_message", async (data) => {
    console.log("Mensaje enviado:", data);
    try {
      const { author, content } = parseMessage(data.message); // Extraer autor y contenido del mensaje recibido
      const messageCount = await Message.countDocuments();
      
      // Si hay más de 50 mensajes, eliminamos el más antiguo
      if (messageCount >= 50) {
        const oldestMessage = await Message.findOne().sort({ createdAt: 1 });
        await Message.findByIdAndDelete(oldestMessage._id);
      }

      const newMessage = await Message.create({ author, content });
      console.log("Mensaje guardado en la base de datos:", newMessage);
      
      // Emitir evento 'receive_message' a todos los clientes conectados
      io.emit("receive_message", newMessage);
    } catch (error) {
      console.error("Error al guardar el mensaje en la base de datos:", error);
    }
  });
});

// Función para analizar el mensaje y extraer el autor y el contenido
function parseMessage(message) {
  const parts = message.split(':'); // Separar el mensaje en partes usando ':'
  const author = parts[0].trim(); // Obtener el autor (nombre)
  const content = parts.slice(1).join(':').trim(); // Obtener el contenido del mensaje
  return { author, content };
}


server.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});

module.exports = { port };

*/