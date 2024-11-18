// Trabajando con socket.io
const http = require('http');
const fs = require('fs');
const socketIo = require('socket.io');

// Variable para el contador de conexiones
let connections = 0;

// Función server que manejará las solicitudes HTTP
function server(req, res) {
    // Lee el archivo HTML
    fs.readFile('index.html', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Error al cargar el archivo HTML');
            return;
        } else {
            // Responde con el contenido del archivo HTML
            res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
            res.end(data);

        }

    });
}

// Crea el servidor HTTP y adjunta el manejador de funciones
const httpServer = http.createServer(server);

// Inicializa socket.io
const io = socketIo(httpServer);

// Evento para cada conexión de socket
io.on('connection', (socketServer) => {
    // Incrementa el contador de conexiones
    connections++;
    console.log(`Nueva conexión establecida. Conexiones activas: ${connections}`);

    // Envía el contador de conexiones al cliente
    socketServer.emit('connectionsUpdate', connections);


    // Manejando otro evento
    socketServer.on('nuevo_evento', (nombre) => {
        console.log("Esto fue enviado desde el cliente: ", nombre);
    });
    // Maneja la desconexión
    socketServer.on('disconnect', () => {
        connections--;
        console.log(`Conexión terminada. Conexiones activas: ${connections}`);
        socketServer.emit('connectionsUpdate', connections);
    });
});

// Inicia el servidor en el puerto 3000
httpServer.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});
