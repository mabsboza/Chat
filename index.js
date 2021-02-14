const express = require('express');
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
app.use(express.static(__dirname + '/public'))
io.on('connection', (socket) => { 
    socket.emit("connection", { mesg: "Welcome", date: new Date() });
});
server.listen(8080, ()=> {
    console.log('Server Up');
});