const express = require('express');
const socketIO = require('socket.io');

const app = express();

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Escuchando en puerto ${PORT}...`);
});

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log(`${socket.id} realizo una conexion!`);
});
