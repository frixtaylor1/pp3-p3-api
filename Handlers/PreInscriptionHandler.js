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

  
}

module.exports = { PreInscriptionHandler };