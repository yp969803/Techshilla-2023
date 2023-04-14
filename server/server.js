// const express = require('express');
// const app = express();
// const http = require('http');
// const server = http.createServer(app);
// const cors=require('cors')
// const { Server } = require("socket.io");
// const io = new Server(server,{cors:{origin:"*"}});
// app.use(cors({
//   origin:"*"
// }))
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', (socket) => {
  
//   socket.on('join-message',(roomId)=>{
//     console.log('a user connected');
//     socket.join(roomId)
//     console.log('User joined with roomId '+roomId);
    
//   })
//   socket.on('screen-data',(Data)=>{
//     var data=JSON.parse(Data)
//     var room=data.room;
//     var imgStr=data.image;
//     console.log(data.room)
//     console.log("Hello World")
//     socket.broadcast.to(room).emit('screen-data',imgStr)

//   })
//   socket.on("mouse-move",(data)=>{
//     var room=JSON.parse(data).room
//     socket.broadcast.to(room).emit("mouse-move",data);

//   })
//   socket.on("mouse-click",(data)=>{
//     var room=JSON.parse(data).room
//     socket.broadcast.to(room).emit("mouse-click",data);

//   })
//   socket.on("type",(data)=>{
//     var room=JSON.parse(data).room
//     socket.broadcast.to(room).emit("type",data);

//   })
  

// });
// server.listen(80, () =>{
//   console.log('listening on *:80');
// });

const express=require('express')
const app=express()
const http = require('http');
const server = http.createServer(app);
const cors=require('cors')
const { Server } = require("socket.io");
const io = new Server(server,{cors:{origin:"*"}});
app.use(cors({
  origin:"*"
}))
const mongoose=require('mongoose')
const usermodel=require('./models/user.js')
const passport=require('passport')
const flash=require('express-flash')
const session=require('express-session')
const methodoverride=require('method-override')

app.use(methodoverride('_method'))   
app.set('view-engine','ejs')
const mongodbstore=require('connect-mongodb-session')(session)
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1/Techshilla').then((res)=>console.log('mongod connected'));
  const store=new mongodbstore({
    uri: 'mongodb://127.0.0.1/qIITR',
  collection: 'mySessions'
  })
  app.use(flash())
app.use(session({
    secret:'helloworld',
    resave:false,
    saveUninitialized:false,
    store:store,
    cookie:{
        maxAge:100*1000*3600*24
    }

}))
app.use(express.urlencoded({extended:false}))
app.use(passport.initialize())
app.use(passport.session())
app.use('/auth',require('./routes/auth.js'))

 
    const checkauthenticated=(req,res,next)=>{
        if(req.isAuthenticated()){
            return next()
        }
        res.redirect('/auth/login')
    }
 const checknotauthenticated=(req,res,next)=>{
        if(req.isAuthenticated()){
            return res.redirect('/')
        }
        next()
    } 

app.get('/',checkauthenticated,async(req,res)=>{
     try{
      res.render('index.ejs',{name:req.user.username})
     }catch(e){
        console.log(e)
        res.status(404).send("Internal server error")
     }
})
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
server.listen(80,()=>{
    console.log('app is started in port 80')
})
}


