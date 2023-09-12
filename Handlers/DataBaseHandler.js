const mysql = require('mysql');
const fs = require('fs');

const { parseYAML } = require('../Configurations/parseYAML.js');

class DataBaseHandler {
  constructor(configFilePath = './Configurations/parameters.yml') {
    this.configFilePath = configFilePath;
    this.config         = null;
    this.__connection   = null;

    this.__loadConfig();
  }

  async __loadConfig() {
    try {
      const yamlString = fs.readFileSync(this.configFilePath, 'utf8');
      this.config = parseYAML(yamlString).database;
    } catch (error) {
      throw new Error('Error loading database configuration: ' + error.message);
    }
  }

  connect() {
    if (!this.config) {
      throw new Error('Database configuration not loaded. Call loadConfig() first.');
    }

    this.__connection = mysql.createConnection({
      host: this.config.db_host,
      port: this.config.db_port,
      user: this.config.db_user,
      password: this.config.db_password,
      database: this.config.db_name
    });

    return new Promise((resolve, reject) => {
      this.__connection.connect((error) => {
        if (error) {
          console.error('Error connecting to DataBase!', error);
          reject(error);
        } else {
          console.log('Connection success!');
          resolve();
        }
      });
    });
  }

  executeStoreProcedure(name, data) {
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
      this.__connection.end((error) => {
        if (error) {
          console.error('Error closing DataBase connection!', error);
          reject(error);
        } else {
          console.log('Connection closed!');
          resolve();
        }
      });
    });
  }
}

module.exports = { DataBaseHandler };
