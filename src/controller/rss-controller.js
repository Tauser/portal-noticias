const ExpressUtil = require('../util/ExpressUtil');
const winston = require('../config/logger/winston');
const ConteudoDinamico = require('../dominio/ConteudoDinamico');
const UrlUtil = require('../util/UrlUtil');

class RssController {

    constructor(serviceCMS, serviceRSS) {

        this.serviceCMS = serviceCMS;
        this.serviceRSS = serviceRSS;

    }

    async visualizarPaginaAssinaturaRSS(req, res, next) {
        /** Página statica de assinatura rss */
        try {
          return res.render('rss/home');
        } catch (error) {
          winston.error(__filename + ' - ' + error.message);
          ExpressUtil.error(error, res, next);
        }
      }
    
      async visualiarUltimasNoticiasRSS(req, res, next) {
        try {
          if (UrlUtil.naoEhUrlDoConteudo(req.originalUrl)) {
            next();
            return;
          }
          req.originalUrl = '/noticias/ultimas';
          const ultimas = ConteudoDinamico.criarUrlUltimas(req);
          const conteudosWP = await this.serviceCMS.obterConteudoPorUrl(ultimas.url);
          const feed = await this.serviceRSS.gerarCabecalhoRSS('ultimas-noticias');
          const feedItems = await this.serviceRSS.converteJsonParaRSS(req.headers.host, feed, conteudosWP);
          res.type('xml');
          res.send(feedItems.rss2());
    
        } catch (error) {
          winston.error(__filename + ' - ' + error.message);
          ExpressUtil.error(error, res, next);
        }
      }
    
      async visualiarRssPorTema(req, res, next) {
        try {
    
          let tema = req.params.tema;
          if (tema == null) {
            next();
            return;
          }
          const ultimas = ConteudoDinamico.criarUrlNoticiasPorTema(req, tema);
          const conteudosWP = await this.serviceCMS.obterConteudoPorUrl(ultimas.url);
          const feed = await this.serviceRSS.gerarCabecalhoRSS(tema);
          const feedItems = await this.serviceRSS.converteJsonParaRSS(req.headers.host, feed, conteudosWP);
          res.type('xml');
          res.send(feedItems.rss2());
        } catch (error) {
          winston.error(__filename + ' - ' + error.message);
          ExpressUtil.error(error, res, next);
        }
      }
    
}

module.exports = RssController;