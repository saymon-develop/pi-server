const express = require("express");
const socket = require("socket.io");
const five = require('johnny-five')

const CarModel = require("./model/car");

// App setup
const PORT = 3080;
const app = express();
const server = app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);

    const car = new five.Board();

    car.on("ready", ()=> {
      const rightMotor = new five.Motor({pins: {pwm: 9, dir: 8}, invertPWM: true })
      const leftMotor = new five.Motor({pins: {pwm: 6, dir: 7}, invertPWM: true })
      const carManipulator = new CarModel.services.CarService({right: rightMotor, left: leftMotor})
      console.log('Car: Init');

      // Socket setup
      const io = socket(server, {
        cors: {
          origin: `http://localhost:3000`,
          credentials: true
        }
      });
    
      io.on("connection", function (socket) {
        socket.emit("bootstrap", "WS:connection - success connected to the server");
    
        socket.on("forward", (arg) => {
          console.log("forward", arg);
          carManipulator.forward(arg);
        });
        socket.on("backward", (arg) => {
          console.log("backward", arg);
          carManipulator.backward(arg);
        });
        socket.on("stop", (arg) => {
          console.log("stop", arg);
          carManipulator.stop();
        });
    
    
        socket.on("left", (arg) => {
          console.log("left", arg);
          carManipulator.turnLeft(arg);
        });
        socket.on("right", (arg) => {
          console.log("right", arg);
          carManipulator.turnRight(arg);
        });
      });
  })
});