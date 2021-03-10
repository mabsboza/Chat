class Sockets {
  constructor (io) {
    this.io = io;
    this.socketEvents();
  }

  socketEvents() {
    //Conections
    this.io.on('connection', (socket) => { 
        // main conecction
        socket.emit('connection_server', { mesg: 'Welcome', date: new Date() });

        // Listen connection
        socket.on('connection_server', (data) =>{
            // Emit conecction
            this.io.emit('connection_to_server_client', data);
        });
    });
  }
}

module.exports = Sockets; 