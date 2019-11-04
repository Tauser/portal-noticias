const winston = require('../config/logger/winston');
const Deputados = require('../dominio/deputados/Deputados');
const cacheMinutos = 3;

class serviceDeputadosWS {
  constructor(configCache, parlamentarWS, clienteHttp) {
    this.configCache = configCache;
    this.urlParlamentarWS = parlamentarWS;
    this.clienteHttp = clienteHttp;
  }

  async retornaDeputados (idDeputados) {    
    let conteudo = null;
    let ids = [];
    let entrou = false;
    for (const key in idDeputados) {
      if (idDeputados.hasOwnProperty(key) && entrou === false) {
        entrou = true;
        const element = '?id='+idDeputados[key];
        ids.push(element);
        
      } else {
        const element = '&id='+idDeputados[key];        
        ids.push(element);
      }
    }
   
    
    const url = this.urlParlamentarWS + ids;
    const urlTratada = url.split(',').join('');

    if (this.configCache) {
      conteudo = await this.configCache.get(['deputados', urlTratada], cacheMinutos, () => { return this._getRequest(urlTratada); });
    } else {
      conteudo = await this._getRequest(urlTratada);
    }
    return this._criarDeputados(conteudo);
  }

  _criarDeputados (conteudo) {
    let dep = [];
    let dados = conteudo.dados;
    if (dados){
      for (let index = 0; index < dados.length; index++) {
        const dadosDeputados = conteudo.dados[index];
        dep.push(new Deputados(dadosDeputados));
       }
    }
    return dep;
  }

  async _getRequest (url) {
      return this.clienteHttp.get({headers:{'User-Agent': 'Request-Promise', 'Accept': 'text/html, application/json, application/xml;q=0.9, */*;q=0.8'},
                                 url: url}).then(response => {
      return response;
    })
      .catch(e => {
        winston.error(`${__filename} - retornaDeputados: ${url} - ${e.message}`);
        return [];
      });
  }

}
module.exports = serviceDeputadosWS;
