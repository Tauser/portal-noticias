const winston = require('../config/logger/winston');
const Assista = require('../dominio/assista/Assista');
const cacheMinutos = 3;

class ServiceAssistaAPI {
  constructor(configCache, urlAssita, clienteHttp) {
    this.configCache = configCache;
    this.urlAssita = urlAssita;
    this.clienteHttp = clienteHttp;
  }
  async retornarVideosAssista() {
    let assista = null;
    if (this.configCache) {
      assista = await this.configCache.get(['portal-noticias-assista'], cacheMinutos, () => { return this._getRequest(); });
    } else {
      assista = await this._getRequest();
    }
    return Assista.verificarSeExistemVideos(assista) ? this._criarVideosAssista(assista) : null;

  }
  _criarVideosAssista(assista) {
    let videosAssista = [];
    if (assista.map) {
      assista.map((videos) => {
        videosAssista.push(new Assista(videos));
      });
    }
    return videosAssista;
  }
  async _getRequest() {
    return this.clienteHttp
      .get(this.urlAssita + '/assista/aoVivo/home')
      .then(response => {
        return response.assista || response;
      })
      .catch(e => {
        winston.error(`${__filename} - ${this.urlAssita}/assista/aoVivo/home - ${e.message}`);
      });
  }
}

module.exports = ServiceAssistaAPI;