const http = require('http');
// const debug = require('debug')('server:server');

const app = require('./app');

function normalizePort(val) {
  const port = parseInt(val, 10);
  if (Number.isNaN(port)) { return val; }
  if (port >= 0) { return port; }
  return false;
}

const port = normalizePort(process.env.PORT || '8000');
app.set('port', port);

function onError(error) {
  console.log(error);
  /* if (error.syscall !== 'listen') { throw error; }
  switch (error.code) {
    case 'EACCES':
      process.exit(1);
      break;
    case 'EADDRINUSE':
      process.exit(1);
      break;
    default:
      throw error;
  } */
}

const server = http.createServer(app);

function onListening() {
  const addr = server.address();
  const bind = typeof addr === 'string' ? `Pipe ${port}` : `Port ${port}`;
  console.log('Listening on port', bind);
  // debug(`Listening on ${bind}`);
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
