const { Server } = require('./Server/Server.js');

function start_api() {  
  const api = new Server();

  /**
   * @API_TEST Prueba para la api...
   */
  api.get('/greet', greet);

  /**
   * @API_METHODS   
   */ 
  api.post('/startPreInscription', )



  api.start(3000);
}

function greet(req, responseCallback) {
  responseCallback(200, { 'message': 'Hello, World!' });
}

module.exports = { start_api };