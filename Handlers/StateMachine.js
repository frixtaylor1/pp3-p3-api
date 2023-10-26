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
    console.log(`Estado actual: ${this.currentState}`);
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
