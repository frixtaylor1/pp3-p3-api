const { Server } = require('./Server/Server.js');

function start_api() {  
  const api = new Server();
  
  //API TEST...
  api.get('/greet', greet);

  api.start(3000);
}

function greet(req, responseCallback) {
  responseCallback(200, { 'message': 'Hello, World!' });
}

module.exports = { start_api };