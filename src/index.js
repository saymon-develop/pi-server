const express = require('express'),
  app = express(),
  http = require('http').createServer(app),
  io = require('socket.io')(http)

// App setup
const HOST = '127.0.0.1'
const PORT = 3080

let clients = []

io.on('connection', (socket) => {
  console.log(`Client with id ${socket.id} connected`)
  clients.push(socket.id)

  socket.emit('message', "I'm server")

  socket.on('message', (message) =>
    console.log('Message: ', message)
  )

  socket.on('disconnect', () => {
    clients.splice(clients.indexOf(socket.id), 1)
    console.log(`Client with id ${socket.id} disconnected`)
  })
})

http.listen(PORT, HOST, () =>
  console.log(`Server listens http://${HOST}:${PORT}`)
)