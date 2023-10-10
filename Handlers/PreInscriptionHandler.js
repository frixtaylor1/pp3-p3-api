class PreInscriptionHandler {
  constructor(dbHandler) {
    this.dbHandler = dbHandler;
  }

  /**
   *  Crea una pre-inscription...
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
   *  Elimina una pre-inscription...
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
   *  Lee los datos de la pre-inscription...
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
   *  Actualiza los datos de la pre-inscription...
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
   * @apicall /startPreinscription
   * @method  HTTP:POST 
   * 
   * @param   object data // name, surname, dni, mail, birthdate, age
   * @return  object
   **/
  async startPreinscription(data)
  {
    let results = {};

    results = await this.dbHandler.executeStoreProcedure('usp_start_preinscription', data);

    return results;
  }

  /**
   * @brief Confirma la Preinscripcion...
   * 
   * @apicall /confirmPreinscription
   * @method  HTTP:POST 
   * 
   * @param   object data // idpreinscription
   * @return  object
   **/
  async confirmPreinscription(data)
  {
    let results = {};

    results = await this.dbHandler.executeStoreProcedure('usp_confirm_preinscription', data);

    return results;
  }

  /**
   * @brief Cancela una Preinscripcion...
   * 
   * @apicall /cancelPreinscription
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
}

module.exports = { PreInscriptionHandler };