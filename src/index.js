const express = require("express");
const socket = require("socket.io");

const carModel = require("./model/car/service");

// App setup
const PORT = 3080;
const app = express();
const server = app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
const car = new carModel.service.CarService();

// Socket setup
const io = socket(server, {
    cors: {
      origin: `http://localhost:3000`,
      credentials: true
    }
  });

io.on("connection", function (socket) {
  console.log("Made socket connection");
  socket.emit("bootstrap", "WS:connection - success connected to the server");
  car.init();

  socket.on("forward", (arg) => {
    console.log("forward");
    console.log("power", arg);
    car.start(arg);
  });
  socket.on("backward", (arg) => {
    console.log("backward");
    console.log("power", arg);
    car.backward(arg);
  });
  socket.on("stop", (arg) => {
    console.log("stop");
    console.log("power", arg);
    car.stop();
  });

  
  socket.on("left", (arg) => {
    console.log("left");
    console.log("power", arg);
    car.turnLeft(arg);
  });
  socket.on("right", (arg) => {
    console.log("right");
    console.log("power", arg);
    car.turnRight(arg);
  });
  socket.on("turn-stop", (arg) => {
    console.log("turn-stop");
    console.log(arg);
    car.cancelTurning();
  });
});