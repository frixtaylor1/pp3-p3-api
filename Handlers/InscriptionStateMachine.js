const fs = require('fs').promises;
const parseYAML = require('../Configurations/ParseYAML.js');

class StateMachine 
{
  constructor() 
  {
    this.states       = {}; 
    this.currentState = null;
    this.configData = {};
    this.configFilePath = '../Configurations/parameters.yml';
  }
  async loadConfig() 
  {
    try 
    {
      const yamlString = await fs.readFile(this.configFilePath, 'utf8');
      this.configData  = await parseYAML(yamlString);
    } catch (error) 
    {
      console.error('Error loading config:', error.message);
    }
  }

  init() { 
    foreach ( this.configData.stateMachine) 
    {
      this.addState("PI-PROC");
      this.addState("PRE-I");
      this.addState("PRE-LIST");
      this.addState("INSCR");

      this.addTransition("PI-PROC", "PRE-I");
      this.addTransition("PRE-I", "PRE-LIST");
      this.addTransition("PRE-I", "INSCR");
      this.addTransition("PRE-LIST", "INSCR");

      this.changeState("PRE-I");

      this.showTransitions();
    }
  }

  /**
   * @brief Agrega un estado...
   * 
   * @param string name 
   * 
   * @return void
   **/
  addState(name) 
  {
    if (!this.states[name]) 
    {
      this.states[name] = 
      {
        transitions: {},
      };
    }
  }

  /**
   * @brief Agregar una transición entre dos estados
   * 
   * @param string fromState
   * @param string toState 
   * 
   * @return void
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
      console.log(this.states)
    }
  }

  /**
   * @brief  Cambiar al estado especificado
   * 
   * @param string newState
   * 
   * @return void
   **/
  changeState(newState) 
  {
    if (!this.states[newState]) 
    {
      console.error("El estado no existe.");
      return;
    }

    this.currentState = newState;
    console.log('Estado actual: ${this.currentState}');
  }

  /**
   * @brief Muestra las transiciones desde el estado actual
   * 
   * @param void
   * 
   * @return void
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
    } else 
    {
      console.log('Transiciones desde ${this.currentState}:');
      for (const nextState in transitions) 
      {
        console.log('- Hacia ${nextState}');
      }
    }
  }
}

