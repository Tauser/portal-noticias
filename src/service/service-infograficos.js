const winston = require('../config/logger/winston');
const Infograficos = require('../dominio/Infograficos');
const cacheMinutos = 3;

class ServiceInfograficosAPI {
  constructor(configCache, infograficosURL, clienteHttp) {
    this.configCache = configCache;
    this.infograficosURL = infograficosURL + '/dinamica-midia?area-conteudo=noticias&total=9&tipo=infografico';
    this.clienteHttp = clienteHttp;
  }
  async retornarInfograficos () {
    let conteudo = null;
    if (this.configCache) {
      conteudo = await this.configCache.get(['conteudo', this.infograficosURL], cacheMinutos, () => { return this._getRequest(this.InfograficosURL); });
    } else {
      conteudo = await this._getRequest(this.infograficosURL);
    }
    let infograficos = [];
    conteudo.forEach(element => {
      infograficos.push(new Infograficos(element));
    });
    return infograficos.splice(0, 4);
  }

  async _getRequest () {
    return this.clienteHttp
      .get(this.infograficosURL)
      .then(response => {
        return response;
      })
      .catch(e => {
        winston.error(`${__filename} - retornarInfograficos: ${this.infograficosURL} - ${e.message}`);
        return [];
      });
  }

}
module.exports = ServiceInfograficosAPI;
