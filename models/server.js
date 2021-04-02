const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // DB connection
    dbConnection();
    //Http server
    this.server = http.createServer(this.app);
    // Socket server
    this.io = socketIo(this.server);
  }

  middelware() {
    this.app.use(express.static(path.resolve(__dirname, '../public')));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use('/api/login', require('../router/auth'));
  }

  configSockets() {
    new Sockets(this.io);
  }

  execute () {
    // Init middleware
    this.middelware();

    // Init Sockets
    this.configSockets();

    // Init Server
    this.server.listen(this.port, ()=> {
      console.log('Server Up');
    });
  }

}

module.exports = Server;