#!/usr/bin/env node

/**
 * Module dependencies.
 */
const profile = require('../src/config/profile/profiles').profile();
const clienteTema = require('portal-tema-downloader');

console.log('Baixando arquivos do tema do portal');
const urlDownloadTema = (profile.ambiente === 'desenvolvimento') ? 'https://socittes.camara.gov.br/tema' : 'http://portal-tema:3001/tema';
clienteTema.baixarArquivosTema(urlDownloadTema, 'dist/templates')
  .then((variaveis) => {
    console.log('Tema e variáveis baixados com sucesso.');
    iniciarAplicacao(variaveis);
  })
  .catch(e => {
    console.error('Erro ao baixar arquivos do tema do portal', e);
    process.exit(1);
  });

/**
* Get port from environment and store in Express.
*/

function iniciarAplicacao(variaveis) {
  const configCache = require('../src/config/cache/config-cache');
  const servicoElastic = require('../src/service/service-elasticsearch');
  const request = require('../src/config/request/request');
  const ConfigService = require('../src/config/service/config-service.js');
  const servicos = new ConfigService(configCache, request, profile, servicoElastic);
  const ConfigCarteiro = require('../src/config/carteiro/config-carteiro');
  const clienteCarteiro = new ConfigCarteiro().clienteCarteiro;
  const ConfigController = require('../src/config/controller/config-controller.js');
  const controllers = new ConfigController(servicos, profile, clienteCarteiro);

  const app = require('../app')(variaveis, controllers, profile.redis);
  // const app = require('../app')(variaveis);
  const debug = require('debug')('teste:server');
  const http = require('http');


  const port = normalizePort(process.env.PORT || profile.porta);
  app.set('port', port);

  /**
   * Create HTTP server.
   */

  const server = http.createServer(app);

  /**
   * Listen on provided port, on all network interfaces.
   */

  server.listen(port);
  server.on('error', onError);
  server.on('listening', onListening);

  /**
   * Normalize a port into a number, string, or false.
   */

  function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
      // named pipe
      return val;
    }

    if (port >= 0) {
      // port number
      return port;
    }

    return false;
  }

  /**
   * Event listener for HTTP server "error" event.
   */

  function onError(error) {
    if (error.syscall !== 'listen') {
      throw error;
    }

    var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * Event listener for HTTP server "listening" event.
   */

  function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
    debug('Listening on ' + bind);
    if (profile.ambiente === 'desenvolvimento') {
      const browserSync = require('browser-sync');
      browserSync({
        files: ['src/**/*.{html,js,css,hbs}'],
        online: false,
        open: false,
        port: addr.port,
        proxy: 'localhost:' + addr.port,
        ui: false
      });
    }
  }
}