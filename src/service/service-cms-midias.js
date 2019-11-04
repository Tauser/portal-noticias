const winston = require('../config/logger/winston');
const https = require('https');

class ServiceCMSMidias {

  constructor(servicoCache, urlCMSMidias, clienteHttp) {
    this.servicoCache = servicoCache;
    this.urlCMSMidias = urlCMSMidias;
    this.clienteHttp = clienteHttp;
  }

  obterMidia(url, streamSaida) {
    this._getRequest(url, streamSaida);
  }

  _getRequest(finalDoPermalink, responseSaida) {
    const req = https.request(this.urlCMSMidias + finalDoPermalink, (response) => {
      for(let nomeHeader in response.headers) {
        responseSaida.setHeader(nomeHeader, response.headers[nomeHeader]);
      }
      response.pipe(responseSaida);
    });
    req.on('error', (error) => {
      winston.error(`${__filename} - obterMidia: ${this.urlCMSMidias}${finalDoPermalink} - ${error.message}`);
      responseSaida.sendStatus(500);
    });
    req.end();
  }

}
module.exports = ServiceCMSMidias;
