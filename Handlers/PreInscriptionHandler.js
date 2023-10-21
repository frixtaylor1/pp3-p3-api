const { UserHandler }       = require('./UserHandler.js');
const { MajorHandler }      = require('./MajorHandler.js');
const { dataBaseHandler }   = require('./DataBaseHandler.js');
const fs                    = require('fs').promises;
const { parseYAML }         = require('../Configurations/parseYAML.js');
const { StateMachine }      = require('./StateMachine.js'); 

/**
 * @todo Integrar la finit state machine en el preinscription handler...
 */
class PreInscriptionHandler 
{
  constructor(dbHandler) 
  {
    this.dbHandler  = dbHandler;
    this.fsm        = new StateMachine();
  }

  /**
   * @brief Crea una pre-inscription...
   * 
   * @param object data // iduser, idmajor
   * @return object
   **/
  async create(data) 
  {
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
  async remove(data) 
  {
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
  async read(data) 
  {
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
  async update(data) 
  {
    let results = {};

    results = await this.dbHandler.executeStoreProcedure('usp_update_preinscription', data);

    return results;
  }

  /**
   * @brief Inicia el proceso de inscripcion...
   * 
   * @apidoc `/startPreinscription`
   * @method  HTTP:POST 
   * 
   * @param  {JSON} requestData
   * @param  {Callable} responseCallback}
   * @return  object
   **/
  async startPreinscription(requestData, responseCallback) 
  {
    const getCurrentDate = require('../Utils/Date.js');
    
    let results = {};
    let data = requestData.data;

    try {
      await this.dbHandler.loadConfig();
      await this.dbHandler.connect();
      
      let startPreinscription = {
        id_user             : data.id_user,
        id_major            : data.id_major,
        preinscription_date : getCurrentDate('es-AR'),
        state               : 'PRE-PROC',
      };

      results = await this.create(startPreinscription);

      responseCallback(200, results[0]);

      console.log('Hello, World!');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      await this.dbHandler.close();
    }

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
  async confirmPreinscription(data) 
  {
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
  async cancelPreinscription(data) 
  {
    let results = {};

    results = await this.dbHandler.executeStoreProcedure('usp_cancel_preinscription', data);

    return results;
  }

  async __loadStateTransitions(configFilePath) 
  {
    let parameters;
    try 
    {
      const yamlString  = await fs.readFile(configFilePath, 'utf8');
      parameters        = await parseYAML(yamlString);

    } catch (error) 
    {
      console.error('Error loading config:', error.message);
    }

    let states = parameters.states_machine.states;

    console.log(states);

    if (states) 
    {
      const parsedStates = states.split(', ').map(value => value.trim());
        for (const state of parsedStates) {
          this.fsm.addState(state);
        }
    }

    let transitions = parameters.state_machine_transitions;

    if (transitions) 
    {
      for (const state in transitions) {
        if (transitions.hasOwnProperty(state)) {
          const values = transitions[state].split(', ').map(value => value.trim());
          for (const transition of values) {
            this.fsm.addTransition(state, transition);
          }
        }
      }
    }
  }
}

let preinscriptionHanlder = new PreInscriptionHandler();

preinscriptionHanlder.__loadStateTransitions('../Configurations/parameters.yml');

setTimeout(() => {
  preinscriptionHanlder.fsm.changeState('void');
  preinscriptionHanlder.fsm.showTransitions();
}, 1000);

module.exports = { PreInscriptionHandler };