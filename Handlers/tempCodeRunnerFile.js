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

    await this.dbHandler.loadConfig();
    await this.dbHandler.connect();

    results[0] = await userHandler.update(userData);

    let preinscriptionObj = {
      id_preinsciption: data.id_preinscription,
      state: undefined
    };
    let majorData = {};
    let preInscriptionHandler  = new PreInscriptionHandler(this.dbHandler);
    
    preInscriptionHandler.read({id_preinsciption: preinscriptionObj.id_preinsciption}).then(res => {
      majorData = majorHanlder.read({id_major: res[0][0].id_major});
    });
 
    this.nbPreinscription++;
 
    if (this.nbPreinscription >= majorData.capacity) 
    {
      this.fsm.changeState('preinscription_in_list');
      preinscriptionObj.state = this.fsm.getCurrentState();
    } 
    else 
    {
      this.fsm.changeState('preinscript');
      preinscriptionObj.state = this.fsm.getCurrentState();
    }
    results[1] = await this.dbHandler.executeStoreProcedure('usp_confirm_preinscription', preinscriptionObj);
    
    await this.dbHandler.close();
    return results;
  }