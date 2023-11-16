const { Server } = require('./Server/Server.js');
const routes = require('./Routes/routes.js');

function start_api() 
{  
  const api = new Server();

  routes(api);

  api.start(3300);
}

start_api();