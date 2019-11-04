const winston = require('../config/logger/winston');
const Proposicoes = require('../dominio/dados-abertos/Proposicoes');
const cacheMinutos = 3;

class ServiceDadosAbertosAPI {
  constructor(configCache, urlDadosAbertos, clienteHttp) {
    this.configCache = null;
    this.urlDadosAbertos = urlDadosAbertos;
    this.clienteHttp = clienteHttp;
  }

  async retornarProjetosDeLei (projetosDeLei) {
  
   
    let conteudo = null;
    let ids = [];

    for (const key in projetosDeLei) {
      if (projetosDeLei.hasOwnProperty(key)) {
        const element = projetosDeLei[key];
        ids.push(element);
      }
    }
    //console.log('IDS do projeto: ', ids);

    const url = this.urlDadosAbertos + '/proposicoes?id=' + ids + '&ordem=ASC&ordenarPor=id';
    //console.log('URL do projeto: ', url);

    if (this.configCache) {
      conteudo = await this.configCache.get(['projetos-lei', url], cacheMinutos, () => { return this._getRequest(url); });
    } else {
      conteudo = await this._getRequest(url);
    }
    //console.log('conteudo: ', conteudo);
    //return new Proposicoes(conteudo);
    return this._criarProposicao(conteudo);
  }

  _criarProposicao (conteudo) {
    //console.log('prop.: ', conteudo.dados)
    let prop = [];

    if (conteudo.dados && conteudo.dados.map) {
      conteudo.dados.map((proposicao) => {
        prop.push(new Proposicoes(proposicao));
      });
    }
    return prop;
  }

  async _getRequest (url) {
    return this.clienteHttp.get(url).then(response => {
      return response;
    })
      .catch(e => {
        winston.error(`${__filename} - retornarProjetosDeLei: ${url} - ${e.message}`);
        return [];
      });
  }

}
module.exports = ServiceDadosAbertosAPI;
