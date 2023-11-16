/**
 * @file StateMachine.js
 * @license GPL-3.0
 * 
 * Copyright (c) 2023 Omar Lopez, 
 *                    Evelyn Oliva, 
 *                    Karen Manchado, 
 *                    Facundo Caminos, 
 *                    Ignacio Moreno,
 *                    Kevin Taylor,
 *                    Matias Cardenas
 *                    Daniel Beinat
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

class StateMachine 
{
  constructor() 
  {
    this.states       = {}; 
    this.currentState = null;
  }

  /**
   * @brief Agrega un estado...
   * 
   * @param {string} name 
   * 
   * @returns {void}
   **/
  addState(name) 
  {
    if (!this.states[name]) 
    {
      this.states[name] = {
        transitions: {},
      };
    }
  }

  /**
   * @brief Agregar una transición entre dos estados
   * 
   * @param {string} fromState
   * @param {string} toState 
   * 
   * @returns {void}
   **/
  addTransition(fromState, toState) 
  {
    if (!this.states[fromState] || !this.states[toState]) 
    {
      console.error("Los estados no existen.");
      return;
    }

    if (!this.states[fromState].transitions[toState]) 
    {
      this.states[fromState].transitions[toState] = [];
    }
  }

  /**
   * @brief  Cambiar al estado especificado
   * 
   * @param {string} newState
   * 
   * @returns {void}
   **/

  changeState(newState) 
  {
    if (!this.states[newState]) 
    {
      console.error("El estado no existe.");
      return;
    }

    this.currentState = newState;
  }

  /**
   * @brief Muestra las transiciones desde el estado actual
   * 
   * @param {void}
   * 
   * @returns {void}
   **/
  showTransitions() 
  {
    if (!this.currentState) 
    {
      console.error("No hay un estado actual.");
      return;
    }

    const transitions = this.states[this.currentState].transitions;
    if (Object.keys(transitions).length === 0) 
    {
      console.log("No hay transiciones desde este estado.");
    } 
    else 
    {
      console.log(`Transiciones desde ${this.currentState}:`);
      for (const nextState in transitions) 
      {
        console.log(`- Hacia ${nextState}`);
      }
    }
  }

  /**
   * @brief Obtiene el estado actual
   * 
   * @returns {string} currentState
   **/
  getCurrentState() 
  {
    return this.currentState;
  }
}

module.exports = { StateMachine };
