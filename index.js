const Server = require('./models/server')
require('dotenv').config();

const initServer = new Server();

initServer.execute();
