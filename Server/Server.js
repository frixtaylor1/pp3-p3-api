const http = require('http');

class Server {
  constructor() {
    this.routes = {};
    this.headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'content-type',
      'Content-Type': 'application/json'
    };
  }

  get(path, handler) {
    this.routes['GET ' + path] = handler;
  }

  post(path, handler) {
    this.routes['POST ' + path] = handler;
  }

  handleRequest(req, res) {
    const method  = req.method;
    const url     = req.url;
    const key     = method + ' ' + url;

    if (method === 'OPTIONS') {
      this.handleOptions(res);
      return;
    }

    const handler = this.routes[key];
    if (!handler) {
      this.sendResponse(res, 404, { error: 'Endpoint not found' });
      return;
    }

    req.on('data', function (chunk) {
      body += chunk.toString();
    });

    req.on('end', function () {
      const requestData = body ? JSON.parse(body) : {};
      handler(requestData, function (statusCode, responseData) {
        this.sendResponse(res, statusCode, responseData);
      }.bind(this));
    }.bind(this));
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
    server.listen(port, function () {
      console.log('Servidor HTTP iniciado en el puerto ' + port);
    });
  }
}

module.exports = { Server };