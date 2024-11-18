// Trabajando con socket.io

const { Server} = require("socket.io");
const express = require("express");
const { createServer } = require("http");
const { join } = require("path");


const app = express();
const server = createServer(app);

// Instancia de socket.io. Le pasamos el server, mismo que recibe el controlador de express (app)
const io = new Server(server);

// Ruta para cargar el html con express
app.get('/', (req, res) => {
    res.sendFile(join(__dirname, "index.html"));

});
// console.log(server);

// Evento del socket que crea una conexión
io.on('connection', (socket) => {
    console.log(`Usuario conectado. Socket: ${socket}`);
    // Mostrando el evento chat messaje, que ocurre al precionar en el botón enviar en la página html
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
      io.emit('chat message', msg);
    });
  });


// Diciendo al servidor donde tiene que escuchar con referencia al puerto
server.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
