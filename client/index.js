const ipcRenderer=window.require('electron').ipcRenderer
const fs = require("fs")
console.log('hello world')
window.onload= function(){
    ipcRenderer.on('uuid',(event,data)=>{
        document.getElementById('code').innerText=data
    })
}
document.getElementById('start').onclick=()=>{
    console.log('start share clicked')
    ipcRenderer.send('start-share',{})
    document.getElementById('start').style.display='none'
    document.getElementById('stop').style.display='block'

}
document.getElementById('stop').onclick=()=>{
    ipcRenderer.send('stop-share',{})
    document.getElementById('stop').style.display='none'
    document.getElementById('start').style.display='block'
    document.getElementById('code').innerText=""

}
// const start=document.getElementById('start')
// console.log('hello world')
// // start.onclick=(e)=>{
// //     console.log('helloworld')
// // }
// const startShare=()=>{
//         console.log('start share clicked')
//         // ipcRenderer.send('start-share',{})
//         // document.getElementById('start').style.display='none'
//         // document.getElementById('stop').style.display='block'
// }
    