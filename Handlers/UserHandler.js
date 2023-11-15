/**
 * @file UserHandler.js
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

const { dataBaseHandler } = require("./DataBaseHandler.js");

class UserHandler {
  constructor(dbHandler = dataBaseHandler) {
    this.dbHandler = dbHandler;
  }

  /**
   *  Crea un usuario...
   * 
   * @param object userData // username, password
   * @return object
   **/
  async create(userData) {
    let results = {};
    results = await this.dbHandler.executeStoreProcedure('usp_create_user', userData);

    return results;
  }

  /**
   *  elimina un usuario...
   * 
   * @param object userData // userid
   * @return object
   **/
  async remove(userData) {
    let results = {};
    results = await this.dbHandler.executeStoreProcedure('usp_remove_user', userData);

    return results;
  }

  /**
   *  obtiene información de un usuario...
   * 
   * @param object userData // userid
   * @return object
   **/
  async read(userData) {
    let results = {};
    results = await this.dbHandler.executeStoreProcedure('usp_read_user', userData);

    return results;
  }
  /**
   *  actualiza información de un usuario...
   * 
   * @param object userData // name, surname, DNI, mail, birthdate, age
   * @return object
   **/
  async update(userData) {
    let results = {};
    results = await this.dbHandler.executeStoreProcedure('usp_update_user', userData);

    return results;
  }


  /**
   *  Guarda la foto de un usuario...
   * 
   * @param {JSON} data - id_user, imageData
   * 
   * @return {Promise<JSON>}
   **/
  async savePhoto(data) {
    let results = {};
    results = await this.dbHandler.executeStoreProcedure('usp_save_user_photo', data);

    return results;
  }
}

module.exports = { UserHandler };