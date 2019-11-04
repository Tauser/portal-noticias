class ServiceCMS {
  constructor(servicoCache, urlCMS, clienteHttp, serviceElasticsearch) {
    this.servicoCache = servicoCache;
    this.urlCMS = urlCMS;
    this.clienteHttp = clienteHttp;
    this.serviceElasticsearch = serviceElasticsearch;
  }

  async obterConteudoPorCategoriaPrograma(url) {
    const conteudos = await this._obterConteudo(url, true, 5);
    const programas = [];
    if(conteudos.map) {
      conteudos.map((c) => {
        programas.push(new CategoriaPrograma(c));
      });
    }
    return programas;
  }

  async obterConteudoPorUrl(url) {
    return await this._obterConteudo(url);
  }

  async obterConteudoPorUrlTags(url) {
    let novaUrl = this.trataUrl(url);
    return await this._obterConteudo(novaUrl);
  }

  trataUrl(url) {
    let urlTratada = url;
    urlTratada = urlTratada.replace(new RegExp(/[àáâãäå]/g),'a');
    urlTratada = urlTratada.replace(new RegExp(/æ/g),'ae');
    urlTratada = urlTratada.replace(new RegExp(/ç/g),'c');
    urlTratada = urlTratada.replace(new RegExp(/[èéêë]/g),'e');
    urlTratada = urlTratada.replace(new RegExp(/[ìíîï]/g),'i');
    urlTratada = urlTratada.replace(new RegExp(/ñ/g),'n');
    urlTratada = urlTratada.replace(new RegExp(/[òóôõö]/g),'o');
    urlTratada = urlTratada.replace(new RegExp(/œ/g),'oe');
    urlTratada = urlTratada.replace(new RegExp(/[ùúûü]/g),'u');
    urlTratada = urlTratada.replace(new RegExp(/[ýÿ]/g),'y');
    return urlTratada;
  }

  async obterConteudoPorId(url, notFactory=false) {
    let pagina = this._recuperarPaginaUrl(url) || 1;
    let finalDoPermalink = '/' + this._recuperarIdUrl(url);
    return await this._obterConteudo(finalDoPermalink, notFactory, null, pagina);
  }

  async purgeConteudoPorId(url) {
    let finalDoPermalink = '/' + this._recuperarIdUrl(url);
    return this._purgeConteudo(finalDoPermalink);
  }

  async obterConteudoPorIdSisnews(url) {
    let conteudo = undefined;
    conteudo = await this._obterConteudo(url,true,0);
    return conteudo;
  }

  async obterHome(nomeHome) {
    let conteudo = null;
    const url = '/home/' + nomeHome;
    if (this.servicoCache) {
      conteudo = await this.servicoCache.get(['conteudo', url], cacheMinutos, () => { return this._getRequest(url); });
    } else {
      conteudo = await this._getRequest(url);
    }
    return new Home(conteudo);
  }

  async _obterConteudo(url, notFactory, cacheAlterado, pagina) {
    const cache = !isEmpty(cacheAlterado) ? cacheAlterado : cacheMinutos;
    let conteudo = null;
    if (this.servicoCache) {
      conteudo = await this.servicoCache.get(['conteudo', url], cache, () => { return this._getRequest(url); });
    } else {
      conteudo = await this._getRequest(url);
    }

    if(notFactory) {
      return conteudo;
    }

    if (conteudo.tipo_conteudo == 'edicao_programa_radi') {
      var ultimas = [];
      var paginador = {
        pagina: pagina,
        count: 0,
        paginas: 1
      };
      var porPagina = 4;

      await this.serviceElasticsearch.retornaUltimosProgramas(conteudo.programa_principal.titulo, pagina, porPagina)
      .then(res => {
        if (res && res.hits && res.hits.hits.length) {
          paginador.count = res.hits.total;
          if (res.hits.total > 0) {
            paginador.paginas = Math.ceil(res.hits.total / porPagina);
          }
          ultimas = res.hits.hits.map(ultima => {
            return {
              id: ultima._source.id,
              titulo: ultima._source.titulo,
              link: `/radio/programas/${ultima._source.id}-${this.trataUrl(ultima._source.titulo).toLowerCase().replace(/[\W]/g, '-')}`,
              data: moment(ultima._source.data).format('YYYY-MM-DD hh:mm:ss'),
              data_formatada: moment(ultima._source.data).format('DD/MM/YYYY'),
              hora_formatada: moment(ultima._source.data).format('hh:mm')
            };
          });
        }
      });
      conteudo.ultimas = ultimas;
      conteudo.paginador = paginador;
    }
    return ConteudoFactory.criar(conteudo);
  }

  async _purgeConteudo(url) {
      return this.servicoCache.del(['conteudo', url]);
  }

  async _getRequest(finalDoPermalink) {
    return this.clienteHttp.get(this.urlCMS + finalDoPermalink).then(response => {
      return response;
    })
    .catch(e => {
      winston.error(`${__filename} - ${this.urlCMS}${finalDoPermalink} - ${e.message}`);
      return [];
    });
  }
  _recuperarIdUrl (url) {
    const index = url.match(new RegExp('(/)\\d+(?=\\-)'))[0];
    if (!index) {
      return '';
    }
    return index.replace('/', '');
  }

  _recuperarPaginaUrl (url) {
    const index = url.match(new RegExp('pagina=\\d+'));
    if (!index) {
      return '';
    }
    return parseInt(index[0].replace('pagina=', ''));
  }
}
const winston = require('../config/logger/winston');
const ConteudoFactory = require('../dominio/ConteudoFactory');
const CategoriaPrograma = require('../dominio/CategoriaPrograma');
const Home = require('../dominio/Home');
const isEmpty = require('is-empty');
const moment = require('moment');

let cacheMinutos = 1;
module.exports = ServiceCMS;
