const express = require("express");
const app = express();
const PORT = 4000;
//New imports
const http = require("http").Server(app); // http significa q usa tcp
const cors = require("cors");
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://localhost:4444",
  },
}); // aqui inicial el socket io
app.use(cors());
//Add this before the app.get() block
let users = [];
socketIO.on("connection", (socket) => {
  console.log(`🟢: ${socket.id} user just connected!`);
  //sends the message to all the users on the server
  socket.on("message", (data) => {
    socketIO.emit("messageResponse", data); // reenvia mensaje a todos los socket conectados
  });

  socket.on('typing', (data) => socket.broadcast.emit('typingResponse', data));

  //Listens when a new user joins the server
  socket.on("newUser", (data) => {
    //Adds the new user to the list of users
    users.push(data);
    // console.log(users);
    //Sends the list of users to the client
    socketIO.emit("newUserResponse", users);
  });
  //Listens and logs the message to the console
  socket.on("message", (data) => {
    console.log(data);
  });//desconecta el socket para que no se quede desconectado
  socket.on("disconnect", () => {
    console.log("🔴: A user disconnected :gafas_de_sol:");
  });
});
app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});
http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});