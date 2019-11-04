const winston = require('../config/logger/winston');
const Imagens = require('../dominio/banco-imagens/BancoImagens');
const cacheMinutos = 3;

class ServiceBancoImagensAPI {
  constructor(configCache, urlBancoImagens, clienteHttp) {
    this.configCache = configCache;
    this.urlBancoImagens = urlBancoImagens;
    this.clienteHttp = clienteHttp;
  }
  async retornarImagemPrincipal () {
    let conteudo = null;
    if (this.configCache) {
      conteudo = await this.configCache.get(['conteudo', this.urlBancoImagens], cacheMinutos, () => { return this._getRequest(this.urlBancoImagens); });
    } else {
      conteudo = await this._getRequest(this.urlBancoImagens);
    }
    let bImgPrincipal = new Imagens(conteudo[0]);
    return bImgPrincipal;
  }
  async retornarImagensSecundarias () {
    let conteudo = null;
    if (this.configCache) {
      conteudo = await this.configCache.get(['conteudo', this.urlBancoImagens], cacheMinutos, () => { return this._getRequest(this.urlBancoImagens); });
    } else {
      conteudo = await this._getRequest(this.urlBancoImagens);
    }
    let bImgSecundarias = [];
    conteudo.forEach(element => {
      bImgSecundarias.push(new Imagens(element));
    });
    return bImgSecundarias.slice(1, 5);
  }

  async _getRequest () {
    return this.clienteHttp
      .get(this.urlBancoImagens)
      .then(response => {
        return response;
      })
      .catch(e => {
        winston.error(`${__filename} - ${this.urlBancoImagens} - ${e.message}`);
      });
  }

}
module.exports = ServiceBancoImagensAPI;
