const http = require('http');

const { parseYAML } = require('../Configurations/parseYAML.js');

class Server {
  constructor() {
    this.routes = {};
    this.headers = {};

    this.__loadServerParameters();
  }

  get(path, handler) {
    this.routes['GET ' + path] = handler;
  }

  post(path, handler) {
    this.routes['POST ' + path] = handler;
  }

  handleRequest(req, res) {
    const method = req.method;
    const url = req.url;
    const key = method + ' ' + url;

    const handler = this.routes[key];
    if (handler) {
      if (method === 'OPTIONS') {
        this.handleOptions(res);
      } else {
        let body = '';

        req.on('data', function(chunk) {
          body += chunk.toString();
        });

        req.on('end', function() {
          const requestData = body ? JSON.parse(body) : {};
          handler(requestData, function(statusCode, responseData) {
            this.sendResponse(res, statusCode, responseData);
          }.bind(this));
        }.bind(this));
      }
    } else {
      this.sendResponse(res, 404, { error: 'Endpoint not found' });
    }
  }

  handleOptions(res) {
    res.writeHead(204, this.headers);
    res.end();
  }

  sendResponse(res, statusCode, responseData) {
    res.writeHead(statusCode, this.headers);
    res.end(JSON.stringify(responseData));
  }

  start(port) {
    const server = http.createServer(this.handleRequest.bind(this));
    server.listen(port, function() {
      console.log('Servidor HTTP iniciado en el puerto ' + port);
    });
  }

  async __loadServerParameters() {
    try {
      const yamlContent = fs.readFileSync('./configuration/parameters.yml', 'utf8');
      const data = await parseYAML(yamlContent);
      const serverParametersObj = data.server;

      this.headers = {
        'Access-Control-Allow-Origin' : serverParametersObj.sv_allow_origins,
        'Access-Control-Allow-Methods': serverParametersObj.sv_allow_methods,
        'Access-Control-Allow-Headers': serverParametersObj.sv_allow_headers,
        'Content-Type'                : serverParametersObj.sv_content_type,
      };
    } catch (error) {
      console.error('Error reading yml file server parameters:', error);
    }
  }
}

module.exports = { Server };