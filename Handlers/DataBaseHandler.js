/**
 * @file DataBaseHandler.js
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

const mysql         = require('mysql');
const fs            = require('fs').promises;
const { parseYAML } = require('../Configurations/ParseYAML.js');

class DataBaseHandler {
  constructor(configFilePath = './Configurations/parameters.yml') {
    this.configFilePath = configFilePath;
    this.configData     = null;
    this.__connection   = null;
    this.connect        = this.connect.bind(this);
  }

  async loadConfig() {
    try {
      const yamlString  = await fs.readFile(this.configFilePath, 'utf8');
      this.configData   = await parseYAML(yamlString);
      
      console.log(this.configData.database);
    } catch (error) {
      console.error('Error loading config:', error.message);
    }
  }

  connect() {
    if (!this.configData) {
      throw new Error('Database configuration not loaded. Call loadConfig() first.');
    }

    this.__connection = mysql.createConnection({
      host    : this.configData.database.db_host,
      port    : this.configData.database.db_port,
      user    : this.configData.database.db_user,
      password: this.configData.database.db_password,
      database: this.configData.database.db_name,
    });

    return new Promise((resolve, reject) => {
      this.__connection.connect((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  executeStoreProcedure(name, data) {
    if (!this.__connection) {
      throw new Error('Database connection not established. Call connect() first.');
    }
  
    const queryParams = Object.values(data)
      .map((value) => `'${value}'`)
      .join(", ");
    const query = `CALL ${name}(${queryParams})`;
  
    return new Promise((resolve, reject) => {
      this.__connection.query(query, (error, results, fields) => {
        if (error) {
          console.error('StoreProcedure execution failed: ', error);
          reject(error);
        } else {
          console.log('Results: ', results);
          resolve(results);
        }
      });
    });
  }
  
  close() {
    return new Promise((resolve, reject) => {
      if (this.__connection) {
        this.__connection.end((error) => {
          if (error) {
            console.error('Error closing DataBase connection!', error);
            reject(error);
          } else {
            console.log('Connection closed!');
            resolve();
          }
        });
      } else {
        console.log('No active connection to close.');
        resolve();
      }
    });
  }
}

const dataBaseHandler = new DataBaseHandler();
dataBaseHandler.loadConfig();

module.exports = { dataBaseHandler };