const http = require('http');
const app = require('./app');
const netatmoRouter = require('./routes/netatmo');
require('dotenv').config();

/**
 * Preventing the server from having bugs on setup
 * Checking the port given
 */
const normalizePort = val => {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };
  const port = normalizePort(process.env.PORT || '3000');
  // Setting the port
  app.set('port', port);
  
  // Listen for error so that we have the server error
  const errorHandler = error => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    }
  };

// creating an http server for the requests to be handled
const server = http.createServer(app);

// Calling the methods previously written
server.on('error', errorHandler);
server.on('listening', () => {
const address = server.address();
const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
console.log('Listening on ' + bind);
});

// Using the Netatmo Router that contains all the routes created
app.use('/netatmo',netatmoRouter);

server.listen(port);