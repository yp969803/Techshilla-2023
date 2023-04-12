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
  
  socket.on('join-message',(roomId)=>{
    console.log('a user connected');
    socket.join(roomId)
    console.log('User joined with roomId '+roomId);
    
  })
  socket.on('screen-data',(Data)=>{
    var data=JSON.parse(Data)
    var room=data.room;
    var imgStr=data.image;
    console.log(data.room)
    console.log("Hello World")
    socket.broadcast.to(room).emit('screen-data',imgStr)

  })
  socket.on("mouse-move",(data)=>{
    var room=JSON.parse(data).room
    socket.broadcast.to(room).emit("mouse-move",data);

  })
  socket.on("mouse-click",(data)=>{
    var room=JSON.parse(data).room
    socket.broadcast.to(room).emit("mouse-click",data);

  })
  socket.on("type",(data)=>{
    var room=JSON.parse(data).room
    socket.broadcast.to(room).emit("type",data);

  })
  
  
  
});

server.listen(80, () =>{
  console.log('listening on *:80');
});