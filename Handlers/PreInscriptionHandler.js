/**
 * @file PeInscriptionHandler.js
 * @license GPL-3.0
 * 
 * Copyright (c) 2023 Omar Lopez, 
 *                    Evelyn Flores, 
 *                    Karen Manchado, 
 *                    Facundo Caminos, 
 *                    Ignacio Moreno,
 *                    Kevin Taylor,
 *                    Matias Cardenas
 *                    ISFT N° 151
 *
 *  Project Supervisor: Prof. Matias Santiago Gastón
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 * Year: 2023
 */

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

    let readObj = {
      id_preisncription: data.id_preisncription,
    };

    results = await this.dbHandler.executeStoreProcedure('usp_read_preinscription', readObj);

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
   * @brief Obtiene la cantidad de preinscripciones a determinada carrera...
   * 
   * @param {JSON} data - id_major
   *
   * @return {Promise<JSON>}
   **/
  async getNbPreinscriptionsByMajorId(data) {
    let results = await this.dbHandler.executeStoreProcedure('usp_get_nb_of_preiscriptions', data);

    console.log('COUNT (', results, ')');
    return results[0];
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

module.exports = { preinscriptionHandler };