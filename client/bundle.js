(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
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


    
},{"fs":1}]},{},[2]);
