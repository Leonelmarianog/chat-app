const express = require('express');
const socketIO = require('socket.io');

const app = express();

/* app.use(express.static('frontend/build')); */
app.use(express.static('backend/public'));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Escuchando en puerto ${PORT}...`);
});

const io = socketIO(server);

function actualizarListaParticipantes() {
  io.of('/').clients((error, clients) => {
    if (error) throw error;
    console.log('clientes: ', clients);
    io.emit('participantes', clients);
  });
}

io.on('connection', (socket) => {
  console.log(`${socket.id} realizo una conexion!`);
  actualizarListaParticipantes();

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    actualizarListaParticipantes();
    console.log('Client disconnected');
  });
});
