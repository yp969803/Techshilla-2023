const { app, BrowserWindow ,ipcMain} = require('electron')
const{v4,uuidv4}=require('uuid')
const screenshot=require('screenshot-desktop')
var socket=require('socket.io-client')('http://103.37.201.175')
// var interval;

const path = require('path')

function createWindow () {
  const win = new BrowserWindow({
    width: 500,
    height: 150,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration:true
    }
  })
  win.webContents.openDevTools()
  win.removeMenu()

  win.loadFile('index.html')
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
    var uuid=uuidv4;
    socket.emit('join-message',uuid)
    event.sender.send('uuid',uuid);


})
ipcMain.on('stop-share',()=>{
    //stop broadcasting & screen capturing

})