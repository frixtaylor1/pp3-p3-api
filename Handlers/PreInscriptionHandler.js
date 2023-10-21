const { UserHandler }       = require('./UserHandler.js');
const { MajorHandler }      = require('./MajorHandler.js');
const { dataBaseHandler }   = require('./DataBaseHandler.js');
const { StateMachine }      = require('./StateMachine.js');
/**
 * @todo Integrar la finit state machine en el preinscription handler...
 */
class PreInscriptionHandler 
{
  constructor(dbHandler,fms = new StateMachine()) 
  {
    this.dbHandler = dbHandler;
    this.fms = fms;

    //states
      this.fsm.addState("VOID");
      this.fsm.addState("PRE-PROC");
      this.fsm.addState("PRE-I");
      this.fsm.addState("PRE-LIST");
      this.fsm.addState("INSCR");
      this.fsm.addState("ANLD");
      this.fsm.addState("ANLD-I");

      this.addTransition('VOID','PRE-PROC');

      this.addTransition('PRE-PROC','PRE-I');
      this.addTransition('PRE-PROC','PRE-LIST');
      this.addTransition('PRE-PROC','ANLD');

      this.addTransition('PRE-I','INSCR');
      this.addTransition('PRE-I','PRE-LIST');
      this.addTransition('PRE-I','ANLD');

      this.addTransition('PRE-LIST','INSCR');
      this.addTransition('PRE-LIST','ANLD');

      this.addTransition('INSCR','PRE-LIST');
      this.addTransition('INSCR','ANLD');
      this.addTransition('INSCR','ANLD-I');

      this.addTransition('ANLD','PRE-PROC');
      this.addTransition('ANLD','PRE-I');
      this.addTransition('ANLD','PRE-LIST');
      this.addTransition('ANLD','INSCR');

      this.addTransition('ANLD-I','INSCR');


  }

  /**
   * @brief Crea una pre-inscription...
   * 
   * @param object data // iduser, idmajor
   * @return object
   **/
  async create(data) {
    let results = {};

    results = await this.dbHandler.executeStoreProcedure('usp_create_preinscription', data);

    return results;
  }

  /**
   * @brief Elimina una pre-inscription...
   * 
   * @param object data // idpreinscription
   * @return object
   **/
  async remove(data) {
    let results = {};

    results = await this.dbHandler.executeStoreProcedure('usp_remove_preinscription', data);

    return results;
  }

  /**
   * @brief Lee los datos de la pre-inscription...
   * 
   * @param object data // idpreinscription
   * @return object
   **/
  async read(data) {
    let results = {};

    results = await this.dbHandler.executeStoreProcedure('usp_read_preinscription', data);

    return results;
  }

  /**
   * @brief Actualiza los datos de la pre-inscription...
   * 
   * @param object data // state
   * @return object
   **/
  async update(data) {
    let results = {};

    results = await this.dbHandler.executeStoreProcedure('usp_update_preinscription', data);

    return results;
  }

  /**
   * @brief Inicia el proceso de inscripcion...
   * 
   * @apidoc /startPreinscription
   * @method  HTTP:POST 
   * 
   * @param   object data // iduser, idmajor
   * @return  object
   **/
  async startPreinscription(data) {
    
    let results = {};

    results = await this.create(data);

    return results;
  }

  /**
   * @brief Confirma la Preinscripcion...
   * 
   * @apidoc /confirmPreinscription
   * @method  HTTP:POST 
   * 
   * @param   object data // id_user, id_preinscription, name, surname, dni, birthdate, email
   * @return  object
   **/
  async confirmPreinscription(data) {
    let results       = {};
    let userHandler   = new UserHandler(this.dbHandler);
    let majorHanlder  = new MajorHandler(this.dbHandler);

    // Actualizo los datos del usuario al confirmar la inscripcion...
    let userData = {
      id        : data.id_user,
      name      : data.name,
      surname   : data.surname,
      dni       : data.dni,
      birthdate : data.birthdate,
      email     : data.email,
    };

    results[0] = await userHandler.update(userData);

    let preinscriptionObj = {
      id_preinsciption: data.id_preinsciption,
      state: undefined
    };

    let preInscriptionHandler  = new PreInscriptionHandler(this.dbHandler);
    let preinscriptionData     = await preInscriptionHandler.read(data.id_preinsciption);
    let majorData              = await majorHanlder.read(preinscriptionData.id_major);

    if (capacity > majorData.capacity) {
      preinscriptionObj.state = 'PRE-LIS-ESP';
    } else {
      preinscriptionObj.state = 'PRE-INS';
    }
    results[1] = await this.dbHandler.executeStoreProcedure('usp_confirm_preinscription', preinscriptionObj);

    return results;
  }

  /**
   * @brief Cancela una Preinscripcion...
   * 
   * @apidoc /cancelPreinscription
   * @method  HTTP:POST 
   * 
   * @param   object data // idpreinscription
   * @return  object
   **/
  async cancelPreinscription(data) {
    let results = {};

    results = await this.dbHandler.executeStoreProcedure('usp_cancel_preinscription', data);

    return results;
  }
}

(async () => {
  const getCurrentDate = require('../Utils/Date.js');
  
  try {
    // Load the database configuration before connecting.
    const preinscriptionHandler = new PreInscriptionHandler(
      dataBaseHandler
    );

    await dataBaseHandler.loadConfig();
    await dataBaseHandler.connect();
    
    let startPreinscription = {
      id_user             : 1,
      id_major            : 1,
      preinscription_date : getCurrentDate('es-AR'),
      state               : 'PRE-PROC',
    };

    preinscriptionHandler.startPreinscription(startPreinscription).then((response) => {
      console.log(response);
    });

    console.log('Hello, World!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await dataBaseHandler.close();
  }
})();

module.exports = { PreInscriptionHandler };