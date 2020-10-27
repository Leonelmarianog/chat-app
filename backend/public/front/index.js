let socket = io();
socket.on('connect', () => console.log('CONNECTED'));

//const socket = io.connect('http://localhost:3000');

let $formulario = document.querySelector('.formulario');
let $input = document.querySelector('#m');
const $participantes = document.querySelector('#participantes');

$formulario.onsubmit = (e) => {
  e.preventDefault();
  socket.emit('chat message', $input.value);
  $input.value = '';
  return false;
};

socket.on('chat message', (mensaje) => {
  let mensajes = document.querySelector('#messages');
  let lista = document.createElement('li');
  lista.innerText = mensaje;
  mensajes.appendChild(lista);
});

socket.on('participantes', (list) => {
  $participantes.innerHTML = '';
  list.forEach(element => {
    const nuevoParticipante = document.createElement('li');
    nuevoParticipante.innerText = element
    $participantes.appendChild(nuevoParticipante);
  });
});
