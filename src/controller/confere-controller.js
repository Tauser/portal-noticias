const ExpressUtil = require('../util/ExpressUtil');
// const UrlUtil = require('../util/UrlUtil');
const BreadCrumbsUtil = require('../util/BreadCrumbsUtil');
// const RenderHandlebarsUtil = require('../util/RenderHandlebarsUtil');
const winston = require('../config/logger/winston');
const isEmpty = require('is-empty');
// const url = require('url');
// const ConteudoFactory = require('../dominio/ConteudoFactory');
// const ConteudoDinamico = require('../dominio/ConteudoDinamico');
const RenderTags = require('../renderers/RenderTags');
const replaceall = require('replaceall');
// const Paginador = require('../dominio/Paginador');

class ConfereController {

  constructor(serviceCMS, comentariosURL, serviceDadosAbertosAPI, serviceDeputadosWS, serviceComentariosWS,
              tagRenderers) {

    this.serviceCMS = serviceCMS;
    this.comentariosURL = comentariosURL;
    this.serviceDadosAbertosAPI = serviceDadosAbertosAPI;
    this.serviceDeputadosWS = serviceDeputadosWS;
    this.serviceComentariosWS = serviceComentariosWS;
    this.tagRenderers = tagRenderers;
  }

  async visualizarHomeConfere(req, res, next) {
    let conteudoWP = await this._obterHome(req, 'confere');
    const paginaHome = 'confere/index';
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

module.exports = ConfereController;