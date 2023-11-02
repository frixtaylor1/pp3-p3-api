const { PreInscriptionHandler } = require('../Handlers/PreInscriptionHandler.js');
const dataBaseHandler = require('../Handlers/DataBaseHandler.js');


/**
 * @brief Asigna los endpoint y sus respectivas callbacks
 * 
 * @param {Server} api 
 **/
module.exports = function routes(api) {
  const preinscriptionHandler = new PreInscriptionHandler(dataBaseHandler);
  /**
   * @API_TEST Prueba para la api...
   */
  api.get('/greet', greet);

  /**
   * @API_METHODS   
   */ 
  api.post('/startPreInscription', preinscriptionHandler.startPreinscription);

  /**
   * @API_METHODS   
   */ 
  api.post('/confirmPreinscription', preinscriptionHandler.confirmPreinscription);

  /**
   * @API_METHODS   
   */ 
  api.post('/cancelPreinscription', preinscriptionHandler.cancelPreinscription);
};

function greet(req, resCallback) {
  resCallback(200, { 'message': 'Hello, World!' });
}
