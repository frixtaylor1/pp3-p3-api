const dataBaseHandler           = require('../Handlers/DataBaseHandler.js');
const { APIPreinscription }     = require('../API/APIPreinscription.js');

/**
 * @brief Asigna los endpoint y sus respectivas callbacks
 * 
 * @param {Server} api 
 **/
module.exports = function routes(api) {
  const apiPreinscription = new APIPreinscription(dataBaseHandler);

  /**
   * @API_TEST Prueba para la api...
   */
  api.post('/greet', greet);

  /**
   * @API_METHODS_PREINSCRIPTION_AVAILABLE   
   */ 
  api.post('/startPreinscription', apiPreinscription.startPreinscription);

  /**
   * @API_METHODS_PREINSCRIPTION_AVAILABLE   
   */ 
  api.post('/confirmPreinscription', apiPreinscription.confirmPreinscription);

  /**
   * @API_METHODS_PREINSCRIPTION_AVAILABLE   
   */ 
  api.post('/cancelPreinscription', apiPreinscription.cancelPreinscription);

  /**
   * @API_METHODS_PREINSCRIPTION_AVAILABLE   
   */ 
  api.post('/signUp', apiPreinscription.signUp);
};

function greet(req, resCallback) {
  resCallback(200, { 'message': 'Hello, World!' });
  console.log('HELLO; WORLD!'); 
}