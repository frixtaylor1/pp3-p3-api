const { MajorHandler }          = require("./MajorHandler.js");
const { UserHandler }           = require("./UserHandler.js");
const { preinscriptionHandler } = require("./PreInscriptionHandler.js");
const { dataBaseHandler }       = require("./DataBaseHandler.js");
const getCurrentDate            = require('../Utils/Date.js');


class APIPreinscription {
  /**
   * @brief Inicia el proceso de inscripcion...
   * 
   * @apidoc `/startPreinscription`
   * @method  HTTP:POST 
   * 
   * @param {JSON} requestData
   * @param {Callable} responseCallback
   * 
   * @return {JSON}
   **/
  async startPreinscription(requestData, responseCallback) 
  {
    let results = {};

    try 
    {
      await dataBaseHandler.loadConfig();
      await dataBaseHandler.connect();
      
      preinscriptionHandler.changeState('preinscription_on_proc');

      let data = {
        id_user             : requestData['id_user'],
        major_name          : requestData['major_name'],
        preinscription_date : getCurrentDate(),
        state               : preinscriptionHandler.getCurrentState(),
      };

      results = await preinscriptionHandler.create(data);

      console.log('START PREINSCRIPTION >>', results);

      responseCallback(200, results[0]);
    } 
    catch (error) 
    {
      console.error('Error:', error);
    } 
    finally 
    {
      await dataBaseHandler.close();
    }

    return results;
  }

  /**
   * @brief Confirma la Preinscripcion...
   * 
   * @apidoc /confirmPreinscription
   * @method HTTP:POST 
   * 
   * @param {JSON} data // id_user, id_preinscription, name, surname, dni, birthdate, email
   * 
   * @return {JSON}
   **/
  async confirmPreinscription(data) 
  {
    let results       = {};
    let userHandler   = new UserHandler(dataBaseHandler);
    let majorHanlder  = new MajorHandler(dataBaseHandler);

    // Actualizo los datos del usuario al confirmar la inscripcion...
    let userData = {
      id        : data.id_user,
      name      : data.name,
      surname   : data.surname,
      dni       : data.dni,
      birthdate : data.birthdate,
      email     : data.email,
    };

    await dataBaseHandler.loadConfig();
    await dataBaseHandler.connect();

    results[0] = await userHandler.update(userData);

    let preinscriptionObj = {
      id_preinsciption: data.id_preinscription,
      state: undefined
    };
    let majorData = {};
    let preInscriptionHandler  = new PreInscriptionHandler(dataBaseHandler);
    
    preInscriptionHandler.read({id_preinsciption: preinscriptionObj.id_preinsciption}).then(res => {
      majorData = majorHanlder.read({id_major: res[0][0].id_major});
    });
 
    this.nbPreinscription++;
 
    if (this.nbPreinscription >= majorData.capacity) 
    {
      preinscriptionHandler.changeState('preinscription_in_list');
      preinscriptionObj.state = preinscriptionHandler.getCurrentState();

 
      let mailOptions =
      { 
        from: 'sofia.dubuque@ethereal.email',
        to: 'jevon.kautzer@ethereal.email',
        subject: 'Preinscipción en lista de espera',
        text: 'Tu preinscipción esta en lista de espera,nos comunicaremos contigo cuando se haya liberado lugar',
        attachments: //an object for each files to be send 
          [
            {
              filename: 'api-specification.pdf',
              path: '../MailResources/api-specification.pdf',
              contentType: 'application/pdf'
            }
          ],
      }
    } 
    else 
    {
      preinscriptionHandler.changeState('preinscript');
      preinscriptionObj.state = preinscriptionHandler.getCurrentState();

      let mailOptions =
      { 
        from: 'sofia.dubuque@ethereal.email',
        to: 'jevon.kautzer@ethereal.email',
        subject: 'Preinscipción aprobada',
        text: 'Tu preinscipción ha sido aprobada',
        attachments: //an object for each files to be send 
          [
            {
              filename: 'api-specification.pdf',
              path: '../MailResources/api-specification.pdf',
              contentType: 'application/pdf'
            }
          ],
      }
    }
    results[1] = await dataBaseHandler.executeStoreProcedure('usp_change_state_preinscription', preinscriptionObj);
    
    await dataBaseHandler.close();
    return results;
  }

  /**
   * @brief Cancela una Preinscripcion...
   * 
   * @apidoc /cancelPreinscription
   * @method  HTTP:POST 
   * 
   * @param {JSON} data // idpreinscription
   * @return {JSON}
   **/
  async cancelPreinscription(data)
  {
    let results = {};

    await this.dbHandler.loadConfig();
    await this.dbHandler.connect();

    preinscriptionHandler.changeState('annulled');
    data.preinscriprionState = preinscriptionHandler.getCurrentState();
    results[1] = await this.dbHandler.executeStoreProcedure('usp_change_state_preinscription', data);

    await this.dbHandler.close();

    let mailOptions =
    { 
      from: 'sofia.dubuque@ethereal.email',
      to: 'jevon.kautzer@ethereal.email',
      subject: 'Preinscipción cancelada',
      text: 'Tu preinscipción ha sido cancelada',
      attachments: //an object for each files to be send 
        [
          {
            filename: 'api-specification.pdf',
            path: '../MailResources/api-specification.pdf',
            contentType: 'application/pdf'
          }
        ],
    }

    return results;
  }

  /**
   * @brief crea un usuario y devuelve su id...
   * 
   * @apidoc /signUp
   * @method  HTTP:POST 
   * 
   * @param {JSON} requestData
   * @param {CallableFunction} responseCallback
   * 
   * @return {Promise<JSON>}
   **/
  async signUp(requestData, responseCallback) {
    let results = {};
    try {
      const userHandler = new UserHandler(dataBaseHandler);

      let data = {
        username: requestData.username,
        password: requestData.password,
      };
  
      console.log('SIGNUPDATA : ', requestData);

      await dataBaseHandler.connect();
      
      results = await userHandler.create(data);
  
      await dataBaseHandler.close();
      
      responseCallback(200, results);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = { APIPreinscription };