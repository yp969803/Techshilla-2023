const { app, BrowserWindow ,ipcMain} = require('electron')
var robot = require("robotjs");
const{v4:uuidv4}=require('uuid')
const screenshot=require('screenshot-desktop')
var socket=require('socket.io-client')('http://localhost')
var interval;

const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 500,
    height: 150,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration:true,
      enableRemoteModule: true,
      contextIsolation: false,
    }
  })
  win.webContents.openDevTools()
  win.removeMenu()
  
  win.loadFile('index.html')
  socket.on("mouse-move",(data)=>{
      var obj=JSON.parse(data);
      var x=obj.x
      var y=obj.y
      robot.moveMouse(x, y)

  })
  socket.on("mouse-click",(data)=>{
    robot.mouseClick()
  })
  socket.on("mouse-type",(data)=>{
    var obj=JSON.parse(data)
    var key=obj.key
    robot.keyTap(key)
  })
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
ipcMain.on('start-share',(event,arg)=>{
    //take contious screen shots
    //broadcast to all other users
    var uuid=uuidv4();
    socket.emit('join-message',uuid)
    console.log(uuid)
    event.sender.send('uuid',uuid);
    interval=setInterval(()=>{
       screenshot().then((img)=>{
        var imgStr=Buffer.from(img).toString('base64')
        var obj={};
        obj.room=uuid;
        obj.image=imgStr;
        // console.log(imgStr)
        socket.emit("screen-data",JSON.stringify(obj))
        console.log('send')
       })
    },100)
    // socket.emit('screen-data','hello world')

})
ipcMain.on('stop-share',()=>{
    //stop broadcasting & screen capturing
    clearInterval(interval);
})