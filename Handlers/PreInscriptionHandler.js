const fs                  = require('fs').promises;
const { parseYAML }       = require('../Configurations/ParseYAML.js');

const { StateMachine }    = require('./StateMachine.js');
const { ISFT151Mailer }   = require('./MailerHandler.js');
const { dataBaseHandler } = require('./DataBaseHandler.js');

class PreInscriptionHandler {
  constructor(dbHandler = dataBaseHandler, mailer = new ISFT151Mailer()) {
    this.dbHandler        = dbHandler;
    this._fsm             = new StateMachine();
    this.nbPreinscription = 0;
    this.mailer           = mailer;
  }

  set fsm(obj) {
    this._fsm = obj;
  }

  get fsm() {
    return this._fsm;
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

  async __loadStateTransitions(configFilePath) {
    let parameters;
    try {
      const yamlString = await fs.readFile(configFilePath, 'utf8');
      parameters = await parseYAML(yamlString);

    } catch (error) {
      console.error('Error loading config:', error.message);
    }

    let states = parameters.states_machine.states;

    if (states) {
      const parsedStates = states.split(', ').map(value => value.trim());
      for (const state of parsedStates) {
        this._fsm.addState(state);
      }
    }

    let transitions = parameters.state_machine_transitions;

    if (transitions) {
      for (const state in transitions) {
        if (transitions.hasOwnProperty(state)) {
          const values = transitions[state].split(', ').map(value => value.trim());
          for (const transition of values) {
            this._fsm.addTransition(state, transition);
          }
        }
      }
    }
  }
  changeState(state) {
    this.fsm.changeState(state);
  }

  showTransitions() {
    this.fsm.showTransitions();
  }

  getCurrentState() {
    this.fsm.getCurrentState();
  }
}

let preinscriptionHandler = new PreInscriptionHandler();

preinscriptionHandler.__loadStateTransitions('./Configurations/parameters.yml');
setTimeout(() => {
  preinscriptionHandler.fsm.changeState('void');
  preinscriptionHandler.fsm.showTransitions();
}, 100);

/*
setTimeout(() => {
  preinscriptionHanlder.fsm.changeState('void');
  preinscriptionHanlder.fsm.showTransitions();
}, 1000);

//  id_user, id_preinscription, name, surname, dni, birthdate, email
let preinscriptionData = {
  id_user           : 1,
  id_preinscription : 1,
  name              : 'Aldo',
  surname           : 'Capurro',
  dni               : '123123123',
  birthdate         : '1987/12/31',
  email             : 'aldo@capurro.com', 
};
preinscriptionHanlder.confirmPreinscription(preinscriptionData).then(res => {
  console.log(res);
}); */
// preinscriptionHanlder.cancelPreinscription({user_id: 1,id_major: 1,preinscriptionState: undefined}).then(res => {
//   console.log(res);
// });


module.exports = { preinscriptionHandler };