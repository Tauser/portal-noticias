const ExpressUtil = require('../util/ExpressUtil');
const BreadCrumbsUtil = require('../util/BreadCrumbsUtil');
// const RenderHandlebarsUtil = require('../util/RenderHandlebarsUtil');
const winston = require('../config/logger/winston');
const isEmpty = require('is-empty');
const RenderTags = require('../renderers/RenderTags');
const UrlUtil = require('../util/UrlUtil');
const ConteudoDinamico = require('../dominio/ConteudoDinamico');
const ProgramasCategorias = require('../dominio/ProgramasCategorias');
const moment = require('moment');
const programacaoRadio = require('../dominio/ProgramacaoRadio');

class RadioController {

    constructor(serviceCMS, tagRenderers) {

        this.serviceCMS = serviceCMS;
        this.tagRenderers = tagRenderers;

    }

    async visualizarHomeRadioCamara(req, res, next) {

        let conteudoWP = await this._obterHome(req, 'radio');
        const paginaHome = 'radio/home';
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

    async visualizarProgramasRadioCamaraCategoria(req, res, next) {
        const titulo = 'Programas Rádio Câmara';
        const breadcrumbs = '[{"rotulo": "Rádio", "link": "/radio"}]';

        try {
           req = this._validaUrl(req, next);
           const slug = req.params.categoria;
           const dados = await this._conteudosWpRadio(slug);

           res.render('radio/programas/index', {
               titulo,
               breadcrumbs, 
               dados
            });

        } catch (error) {
            winston.error(`${__filename} - ${error.message}`);
            ExpressUtil.error(error, res, next);
        }
    }

    async visualizarProgramasRadioCamara(req, res, next) {
        try {
            const titulo = 'Programas Rádio Câmara';
            const breadcrumbs = '[{"rotulo": "Rádio", "link": "/radio"}]';
            const dados = ProgramasCategorias.getLinkTituloCategoria('radio');
            
            res.render('radio/programas/index', {
                titulo,
                breadcrumbs,  
                dados 
            });
        } catch(error) {
            winston.error(__filename + ' - ' + error.message);
            ExpressUtil.error(error, res, next);
        }
    }

    async vizulizarProgramacaoRadioCamara(req, res, next) {
        try{
            const titulo = 'Rádio Câmara';
            const breadcrumbs = '[{"rotulo": "Rádio", "link": "/radio"}]';
            const hoje = moment().format('d');
            const semana = programacaoRadio.diasDaSemana(hoje);
            const interprogramas = programacaoRadio.getIterprogramas();
            const programacao = programacaoRadio.getProgramacaoSemanal(hoje);

            res.render('radio/programacao/index', {
                titulo,
                breadcrumbs,
                semana,
                interprogramas,
                programacao
            });

        } catch(error) {
            winston.error(__filename + ' - ' + error.message);
            ExpressUtil.error(error, res, next);
        }
    }

    _validaUrl(req, next) {
        if(UrlUtil.naoEhUrlDoConteudo(req.originalUrl)) {
            next();
            return;
        }
        req.originalUrl = req.originalUrl.trim();

        return req;
    }

    async _conteudosWpRadio(slug) {
        const resultado = [];
        const urlWp  = ConteudoDinamico.criaUrlProgramasPorCategoria('radio', slug);
        const url = `/radio/programa/${slug}`;
        const categoria = ProgramasCategorias.categoriaPorSlug(slug);
        const conteudos = await this.serviceCMS.obterConteudoPorCategoriaPrograma(urlWp);
        const notFound = true;

        if (conteudos.length >= 1) {
            resultado.push({ categoria, url, conteudos });
        } else {
            resultado.push({ categoria, url, notFound });
        }

        return resultado;
    }

    async _obterHome(req, home) {
        return !isEmpty(req.body) ? req.body : this.serviceCMS.obterHome(home);
    }
}


module.exports = RadioController;