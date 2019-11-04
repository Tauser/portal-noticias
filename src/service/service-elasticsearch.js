
const winston = require('../config/logger/winston');
const rpn = require('request-promise-native');

class ServiceElasticsearch {
  async retornaUltimosProgramas (programa, pagina = 1, porPagina = 4) {
    const url = 'https://www.camara.leg.br/api/v2/busca/programas-radio/_search';
    const data = {
      order: 'data',
      pagina: pagina,
      q: `programa:"${programa}"`,
      size: porPagina
    };

    const ultimas = await this._getRequest(url, data);
    return ultimas;
  }

  async _getRequest (url, data) {
    const options = {
      method: 'POST',
      headers: {
        'User-Agent': 'Request-Promise-Native'
      },
      uri: url,
      body: data,
      json: true,
      timeout: 30000
    };
    return rpn(options)
      .then(response => response)
      .catch(e => {
        winston.error(`${__filename} - retornaUltimosProgramasRadio: ${url} - ${e.message}`);
        return [];
      });
  }

}
module.exports =  new ServiceElasticsearch();
