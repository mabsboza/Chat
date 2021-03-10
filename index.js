// Express server
const express = require('express');
const app = express()
const server = require('http').createServer(app);

// Socket Io server
const io = require('socket.io')(server);
app.use(express.static(__dirname + '/public'))

//Conections
io.on('connection', (socket) => { 
    socket.emit('connection_server', { mesg: 'Welcome', date: new Date() });
    socket.on('connection_server', (data) =>{
        io.emit('connection_to_server_client', data);
    });
});

server.listen(8080, ()=> {
    console.log('Server Up');
});