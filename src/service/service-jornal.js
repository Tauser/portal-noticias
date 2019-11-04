const winston = require('../config/logger/winston');
const Jornal = require('../dominio/Jornal');
const cacheMinutos = 3;
const {parse} = require('node-html-parser');

class ServiceJornalAPI {
  constructor(configCache, jornalURL, clienteHttp) {
    this.configCache = configCache;
    this.jornalURL = jornalURL;
    this.clienteHttp = clienteHttp;
  }
  async retornarJornal() {
    let conteudo = null;
    if (this.configCache) {
      conteudo = await this.configCache.get(['conteudo', this.jornalURL], cacheMinutos, () => { return this._getRequest(this.jornalURL); });
    } else {
      conteudo = await this._getRequest(this.jornalURL);
    }
    return new Jornal(conteudo);
  }

  async _getRequest() {
    return this.clienteHttp
      .get({
        url: this.jornalURL,
        headers: { 'User-Agent': 'Request-Promise' },
      })
      .then(response => {
        const root = parse(response);
        return { 'nomepdf': root.querySelector('#nomepdf').structuredText.replace('.pdf', ''), 
                 'dataextenso': root.querySelector('#dataextenso').structuredText };
      })
      .catch(e => {
        winston.error(`${__filename} - retornarJornal: ${this.jornalURL} - ${e.message}`);
      });
  }

}
module.exports = ServiceJornalAPI;
