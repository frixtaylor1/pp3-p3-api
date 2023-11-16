/**
 * @file APIPreinscription.js
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

const { MajorHandler }          = require("../Handlers/MajorHandler.js");
const { UserHandler }           = require("../Handlers/UserHandler.js");
const { preinscriptionHandler } = require("../Handlers/PreInscriptionHandler.js");
const { dataBaseHandler }       = require("../Handlers/DataBaseHandler.js");
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
  async confirmPreinscription(requestData, responseCallback) 
  {
    let results       = {};
    let userHandler   = new UserHandler(dataBaseHandler);
    let majorHanlder  = new MajorHandler(dataBaseHandler);

    let birthData = requestData.birthdate.split('-');
    let birthDate = birthData[2] + '-' + birthData[1] + '-' + birthData[0];

    // Actualizo los datos del usuario al confirmar la inscripcion...
    let userData = {
      id_user   : requestData.id_user,
      name      : requestData.name,
      surname   : requestData.surname,
      dni       : requestData.dni,
      birthdate : birthDate,
      email     : requestData.email,
    };

    await dataBaseHandler.loadConfig();
    await dataBaseHandler.connect();

    await userHandler.update(userData);

    let preinscriptionObj = {
      id_preinsciption: requestData.id_preinscription,
      state           : undefined
    };

    let majorDataInput = {
      id: requestData.id_major,
    };

    let majorData          = await majorHanlder.read(majorDataInput);
    let nbOfPreinscription = await preinscriptionHandler.getNbPreinscriptionsByMajorId(majorDataInput);  
 
    if (nbOfPreinscription >= majorData.capacity) 
    {
      preinscriptionHandler.changeState('preinscription_in_list');
      preinscriptionObj.state = preinscriptionHandler.getCurrentState();

      let mailOptions =
      { 
        from: 'sofia.dubuque@ethereal.email',
        to: 'kevinmusic123@gmail.com',
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
        from        : 'sofia.dubuque@ethereal.email',
        to          : 'jevon.kautzer@ethereal.email',
        subject     : 'Preinscipción aprobada',
        text        : 'Tu preinscipción ha sido aprobada',
        attachments :
          [
            {
              filename    : 'api-specification.pdf',
              path        : '../MailResources/api-specification.pdf',
              contentType : 'application/pdf'
            }
          ],
      }
    }
    results = await dataBaseHandler.executeStoreProcedure('usp_change_state_preinscription', preinscriptionObj);

    await dataBaseHandler.close();

    responseCallback(200, { preinscription_state: preinscriptionObj.state, results });
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

  /**
   * @brief Guarda una foto...
   * 
   * @apidoc /sendPhoto
   * @method  HTTP:POST 
   * 
   * @param {JSON} requestData
   * @param {CallableFunction} responseCallback
   * 
   * @return {Promise<JSON>}
   **/
  async sendPhoto(requestData, responseCallback) {
    let results = {};
  
    try {
      const userHandler = new UserHandler(dataBaseHandler);
      await dataBaseHandler.connect();
  
      let data = {
        id_user: requestData.id_user,
        imageData: requestData.imageData,
      };
  
      results = await userHandler.savePhoto(data);
    } catch (error) {
      console.error(error);
      results = {
        error: error.message,
      };
    }
  
    responseCallback(200, results);
  }
}

module.exports = { APIPreinscription };