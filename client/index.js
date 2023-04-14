const ipcRenderer=window.require('electron').ipcRenderer
const fs = require("fs")
console.log('hello world')
window.onload= function(){
    ipcRenderer.on('uuid',(event,data)=>{
        document.getElementById('code').innerText=data
    })
}
let roomId;
document.getElementById('connect').onclick=()=>{
      roomId=document.getElementById('userId').value
}
document.getElementById('start').onclick=()=>{
    console.log('start share clicked')
    ipcRenderer.send('start-share',roomId)
    document.getElementById('start').style.display='none'
    document.getElementById('stop').style.display='block'

}
document.getElementById('stop').onclick=()=>{
    ipcRenderer.send('stop-share',{})
    document.getElementById('stop').style.display='none'
    document.getElementById('start').style.display='block'
    document.getElementById('code').innerText=""
}


    