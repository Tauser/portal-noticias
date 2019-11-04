const ExpressUtil = require('../util/ExpressUtil');
const BreadCrumbsUtil = require('../util/BreadCrumbsUtil');
// const RenderHandlebarsUtil = require('../util/RenderHandlebarsUtil');
const winston = require('../config/logger/winston');
const isEmpty = require('is-empty');
const RenderTags = require('../renderers/RenderTags');

class AssessoriaImprensaController {

    constructor(serviceCMS, tagRenderers) {

        this.serviceCMS = serviceCMS;
        this.tagRenderers = tagRenderers;

    }

    async visualizarHomeAssessoriaImprensa(req, res, next) {

        let conteudoWP = await this._obterHome(req, 'assessoria-de-imprensa');
        const paginaHome = 'assessoria-imprensa/assessoria-imprensa';
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

    async _obterHome(req, home) {
        return !isEmpty(req.body) ? req.body : this.serviceCMS.obterHome(home);
    }
}


module.exports = AssessoriaImprensaController;