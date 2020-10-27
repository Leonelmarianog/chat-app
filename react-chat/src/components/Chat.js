import React from 'react';
import '../index.css';
import io from 'socket.io-client';
const socket = io.connect('http://localhost:3000');
socket.on('connect', () => console.log('CONNECTED'));

const Chat = () => {
  return (
    <div>
      <ul id="messages">
        <li>asdasdasd</li>
        <li>asdasdasd</li>
        <li>asdasdasd</li>
        <li>asdasdasd</li>
      </ul>
      <form
        className="formulario"
        action=""
        //onSubmit={(e, value) => {
        //e.preventDefault();
        //socket.emit('chat message', e.target.value);
      >
        <input id="m" autoComplete="off" />
        <button className="boton">Send</button>
      </form>
    </div>
  );
};

export default Chat;
