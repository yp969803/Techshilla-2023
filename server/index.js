const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('join-message',(roomId)=>{
    socket.join(roomId)
    console.log('User joined with roomId '+roomId);
    
  })
});

server.listen(80, () => {
  console.log('listening on *:80');
});