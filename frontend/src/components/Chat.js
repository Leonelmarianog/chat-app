import React, { useState, useEffect } from "react";
import "../index.css";
import socketIOClient from "socket.io-client";

let ENDPOINT;

if (process.env.NODE_ENV === "development") {
  console.log("development");
  ENDPOINT = "http://localhost:5000";
} else if (process.env.NODE_ENV === "production") {
  console.log("production");
  ENDPOINT = "chat-aplicacion-practica.herokuapp.com";
}

const socket = socketIOClient(ENDPOINT);

const Chat = () => {
  const [state, setState] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.on("chat message", (data) => {
      const newState = [...state, data];
      setState(newState);
    });
  }, [state]);

  return (
    <div>
      <ul id="messages">
        {state &&
          state.map((message, index) => (
            <li key={`message-${index + 1}`}>{message}</li>
          ))}
      </ul>
      <form
        className="formulario"
        onSubmit={(event) => {
          event.preventDefault();
          socket.emit("chat message", { message: input });
        }}
      >
        <input
          id="m"
          autoComplete="off"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button className="boton">Send</button>
      </form>
    </div>
  );
};

export default Chat;
