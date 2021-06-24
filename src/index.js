const express = require("express");
const socket = require("socket.io");

// App setup
const PORT = 3080;
const app = express();
const server = app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

// Socket setup
const io = socket(server, {
    cors: {
      origin: `http://localhost:3000`,
      credentials: true
    }
  });

io.on("connection", function (socket) {
  console.log("Made socket connection");
  socket.emit("hello", "world");

  socket.on("magic", (arg) => {
    console.log(arg);
  });
});