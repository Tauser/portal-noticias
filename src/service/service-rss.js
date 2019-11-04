const NoticiaRSS = require('../dominio/NoticiaRSS');
const Feed = require('feed').Feed;

class ServiceRSS {

    constructor(configCache, urlCMS, clienteHttp, rssMeta) {
        this.configCache = configCache;
        this.urlCMS = urlCMS;
        this.clienteHttp = clienteHttp;
        this.rssMeta = rssMeta;
    }

    async converteJsonParaRSS (host, feed, conteudoWP) {
      conteudoWP.forEach(item => {
        feed.addItem(new NoticiaRSS(host, item));
      });
      return feed;
    }

    gerarCabecalhoRSS () {
      const feed = new Feed({
        id: this.rssMeta.link,
        title: this.rssMeta.titulo,
        description: 'Câmara notícias',
        link: this.rssMeta.link,
        copyright: this.rssMeta.copyright,
        generator: this.rssMeta.geradoPor,
        updated: new Date(),
        author: { 
          name: this.rssMeta.titulo,
          link: this.rssMeta.link
        }
      });
      return feed;
    }
}
module.exports = ServiceRSS;