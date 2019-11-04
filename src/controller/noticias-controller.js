const ExpressUtil = require('../util/ExpressUtil');
const UrlUtil = require('../util/UrlUtil');
const BreadCrumbsUtil = require('../util/BreadCrumbsUtil');
const RenderHandlebarsUtil = require('../util/RenderHandlebarsUtil');
const winston = require('../config/logger/winston');
const isEmpty = require('is-empty');
const url = require('url');
const ConteudoFactory = require('../dominio/ConteudoFactory');
const ConteudoDinamico = require('../dominio/ConteudoDinamico');
const RenderTags = require('../renderers/RenderTags');
const replaceall = require('replaceall');
const Mensagem = require('carteiro-cliente').Mensagem;
const Paginador = require('../dominio/Paginador');

class NoticiasController {

  constructor(serviceCMS, comentariosURL, serviceDadosAbertosAPI, serviceDeputadosWS, serviceComentariosWS,
    tagRenderers, clienteCarteiro) {

    this.serviceCMS = serviceCMS;
    this.comentariosURL = comentariosURL;
    this.serviceDadosAbertosAPI = serviceDadosAbertosAPI;
    this.serviceDeputadosWS = serviceDeputadosWS;
    this.serviceComentariosWS = serviceComentariosWS;
    this.tagRenderers = tagRenderers;
    this.clienteCarteiro = clienteCarteiro;
  }

  async visualizar (req, res, next) {
    try {
      const wpBody = req.body;
      const conteudoWP = ConteudoFactory.criar(JSON.parse(wpBody.data)[0]);
      conteudoWP.conteudo = await RenderHandlebarsUtil.converterTagsDinamicas(req.app.expressHandlebars, conteudoWP.conteudo);      
      let proposicoes = null;
      if (!isEmpty(conteudoWP.projetosDeLei)) {
        proposicoes = await this.serviceDadosAbertosAPI.retornarProjetosDeLei(conteudoWP.projetosDeLei);
      }
      const quantidadeComentarios = await this.serviceComentariosWS.retornaQuantidadeComentarios(conteudoWP.id);
      res.render(conteudoWP.pagina(), {
        dados: conteudoWP,
        quantidadeComentarios: quantidadeComentarios['quantidadeComentarios'],
        proposicoes: proposicoes,
        breadcrumbs: BreadCrumbsUtil.converterFormatHandlebars(conteudoWP.breadcrumbs),
        urlComentarios: this.comentariosURL + conteudoWP.id,
        baseUrl: UrlUtil.url()
      });
    } catch (error) {
      winston.error(__filename + ' - ' + error.message);
      ExpressUtil.error(error, res, next);
    }
  }

  async visualizarComentariosPorId (req, res, next) {
    if (UrlUtil.naoEhUrlDoConteudo(req.originalUrl)) {
      next();
      return;
    }
    let path = req.path;

    Promise.all([this.serviceCMS.obterConteudoPorId(req.originalUrl)])
      .then(async ([conteudoWP]) => {
        res.render('comum/comentario/comentarios-anteriores', {
          dados: conteudoWP,
          path: path,
          breadcrumbs: BreadCrumbsUtil.converterFormatHandlebars(conteudoWP.breadcrumbs),
          baseUrl: UrlUtil.url()
        });
      }).catch(error => {
        winston.error(__filename + ' - ' + error.message);
        ExpressUtil.error(error, res, next);
      });
  }

  async visualizarUltimas (req, res, next) {
    try {
      if (UrlUtil.naoEhUrlDoConteudo(req.originalUrl)) {
        next();
        return;
      }
      const ultimas = ConteudoDinamico.criarUrlUltimas(req);
      
      const conteudoWP = await this.serviceCMS.obterConteudoPorUrl(ultimas.url);
      res.render(ultimas.pagina, {
        dados: conteudoWP,
        dataFiltro: req.query.data,
        breadcrumbs: BreadCrumbsUtil.converterFormatHandlebars(conteudoWP.breadcrumbs),
        baseUrl: UrlUtil.url(),
        currentPage: ultimas.numeroDaPagina
      });
    } catch (error) {
      winston.error(__filename + ' - ' + error.message);
      ExpressUtil.error(error, res, next);
    }
  }
  
  async visualizarTags (req, res, next) {
    try {
      if (UrlUtil.naoEhUrlDoConteudo(req.originalUrl)) {
        next();
        return;
      }
      const ultimas = ConteudoDinamico.criarUrlUltimas(req);
      const conteudoWP = await this.serviceCMS.obterConteudoPorUrlTags(ultimas.url);
      res.render(ultimas.pagina, {
        dados: conteudoWP,
        tagPesquisada: req.query.tag.toUpperCase(),
        breadcrumbs: BreadCrumbsUtil.converterFormatHandlebars(conteudoWP.breadcrumbs),
        baseUrl: UrlUtil.url(),
        currentPage: ultimas.numeroDaPagina
      });
    } catch (error) {
      winston.error(__filename + ' - ' + error.message);
      ExpressUtil.error(error, res, next);
    }
  }

  async visualizarNoticiasPorId (req, res, next) {
    if (UrlUtil.naoEhUrlDoConteudo(req.originalUrl)) {
      next();
      return;
    }
    Promise.all([this.serviceCMS.obterConteudoPorId(req.originalUrl)])
      .then(async ([conteudoWP]) => {
        let argsHbs = {};
        const usuarioLogado = res.locals.usuarioAutenticado;
        let path = req.path;
        const quantidadeComentarios = await this.serviceComentariosWS.retornaQuantidadeComentarios(conteudoWP.id);

        conteudoWP.conteudo = await RenderHandlebarsUtil.converterTagsDinamicas(req.app.expressHandlebars, conteudoWP.conteudo);
        switch (conteudoWP.tipoConteudo) {
          case 'agencia': {
            const deputados = !isEmpty(conteudoWP.deputados) ? await this.serviceDeputadosWS.retornaDeputados(conteudoWP.deputados) : null;                    
            const proposicoes = !isEmpty(conteudoWP.projetosDeLei) ?  await this.serviceDadosAbertosAPI.retornarProjetosDeLei(conteudoWP.projetosDeLei) : [];
            argsHbs = {
              usuarioLogado: usuarioLogado,
              quantidadeComentarios: quantidadeComentarios['quantidadeComentarios'],
              path:path,
              dados: conteudoWP,
              title: conteudoWP.titulo,
              description: conteudoWP.resumo,
              proposicoes: proposicoes,
              deputados: deputados,
              breadcrumbs: BreadCrumbsUtil.converterFormatHandlebars(conteudoWP.breadcrumbs),
              urlComentarios: this.comentariosURL + conteudoWP.id,
              baseUrl: UrlUtil.url()
            };
            break;
          }
          case 'edicao_programa_radi': {
            argsHbs = {
              dados: conteudoWP,
              paginador: Paginador.getPaginador(conteudoWP.paginador),
              breadcrumbs: BreadCrumbsUtil.converterFormatHandlebars(conteudoWP.breadcrumbs),
              urlComentarios: this.comentariosURL + conteudoWP.id,
              baseUrl: UrlUtil.url()
            };
            break;
          }
          default:
            argsHbs = {
              dados: conteudoWP,
              breadcrumbs: BreadCrumbsUtil.converterFormatHandlebars(conteudoWP.breadcrumbs),
              urlComentarios: this.comentariosURL + conteudoWP.id,
              baseUrl: UrlUtil.url()
            };
        }
        res.render(conteudoWP.pagina(), argsHbs);
      }).catch(error => {
        winston.error(__filename + ' - ' + error.message);
        ExpressUtil.error(error, res, next);
      });
  }

  async purgeNoticiasPorId (req, res) {
    let promisePurge = this.serviceCMS.purgeConteudoPorId(req.originalUrl);
    promisePurge.then(result => {
      winston.info('Purge da url '+req.originalUrl+' realizado com sucesso. Quantidade de chave apagadas: '+result);
      res.status(200).send('Purge realizado com sucesso');
    }) 
    .catch (err => {
      res.status(500).send('Não foi possivel realizar o purge: '+err);
    });
  }

  async carregaModalOpiniaoDeputados (req, res) {
      res.render('agencia/_noticia-interna__md_mande__sua-opiniao');
  }

  async enviaOpiniaoDeputados (req, res, next) {
    try {
      let referer = req.headers['referer'].split('/');
      let url = '/' + referer[3] + '/' + referer[4];
      
      if (UrlUtil.naoEhUrlDoConteudo(url)) {
        next();
        return;
      }
      const conteudoWP = await this.serviceCMS.obterConteudoPorId(url);

      conteudoWP.conteudo = await RenderHandlebarsUtil.converterTagsDinamicas(req.app.expressHandlebars, conteudoWP.conteudo);
      const deputados = await this.serviceDeputadosWS.retornaDeputados(conteudoWP.deputados);  
      const email = [];

      for (let index = 0; index < deputados.length; index++) {
        const dadosDeputados = deputados[index];
        let dadosEmail = {nome: dadosDeputados.nome, email: dadosDeputados.email };
          email.push(dadosEmail);
       }
      
      const assunto = conteudoWP.titulo;
      const usuarioLogado = res.locals.usuarioAutenticado;
      const textoEmail = req.body.opiniaoDeputados;      
      const mensagem = new Mensagem()
        .solicitante('P_XXXX', 'portal-notícias')
        .texto(textoEmail)
        .html(`<html><body>${textoEmail}</body></html>`)
        .assunto(assunto)
        .remetente(usuarioLogado.email, usuarioLogado.nome)
        .cco(email);
      await this.clienteCarteiro.enviarMensagem(mensagem);

      res.redirect(req.headers['referer']);
    } catch(error) {
      winston.error(__filename + ' - ' + error.message);
      ExpressUtil.error(error, res, next);
    }
  }


  async visualizarPaginasEstativas (req, res, next) {
    try {
      const urlParts = url.parse(req.url, true);
      const conteudoWP = await this.serviceCMS.obterConteudoPorUrl(urlParts.pathname);
      res.render(conteudoWP.pagina(), {
        dados: conteudoWP,
        breadcrumbs: BreadCrumbsUtil.converterFormatHandlebars(conteudoWP.breadcrumbs)
      });
    } catch (error) {
      winston.error(__filename + ' - ' + error.message);
      ExpressUtil.error(error, res, next);
    }
  }

 
  async visualizarHomeNoticias (req, res, next) {
    let conteudoWP = await this._obterHome(req, 'noticias');
    const paginaHome = 'agencia/home';
    conteudoWP.html = replaceall('#video-player-modal', '#video-modal-mediaelement', conteudoWP.html);
    const htmlTags = RenderTags.createHtml(req.app.expressHandlebars, req.app.locals, conteudoWP, this.tagRenderers);
    Promise.all(htmlTags)
      .then(htmlsPorNomeTag => {
        htmlsPorNomeTag.forEach(htmlPorNomeTag => {
          conteudoWP.html = conteudoWP.html.replace(htmlPorNomeTag.tag, htmlPorNomeTag.html);
        });
        res.render(paginaHome, {
          dados: conteudoWP,
          breadcrumbs: BreadCrumbsUtil.converterFormatHandlebars(conteudoWP.breadcrumbs)
        });
      })
      .catch(error => {
        winston.error(__filename + ' - ' + error.message);
        ExpressUtil.error(error, res, next);
      });
  }

  async _obterHome (req, home) {
    return !isEmpty(req.body) ? req.body : this.serviceCMS.obterHome(home);
  }
}

module.exports = NoticiasController;


