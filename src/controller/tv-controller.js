const ExpressUtil = require('../util/ExpressUtil');
const BreadCrumbsUtil = require('../util/BreadCrumbsUtil');
const winston = require('../config/logger/winston');
const isEmpty = require('is-empty');
const RenderTags = require('../renderers/RenderTags');
const UrlUtil = require('../util/UrlUtil');
const ConteudoDinamico = require('../dominio/ConteudoDinamico');
const ProgramasCategorias = require('../dominio/ProgramasCategorias');
const Paginador = require('../dominio/Paginador');

const tituloProgramas = 'Programas Tv Câmara';
const breadcrumbsProgramas = '[{"rotulo": "TV", "link": "/tv"}]';
const notFound = true;

class TvController {

    constructor(serviceCMS, serviceAssistaYoutubeAPI, serviceProgramacaoTv, tagRenderers) {

        this.serviceCMS = serviceCMS;
        this.serviceAssistaYoutubeAPI = serviceAssistaYoutubeAPI;
        this.serviceProgramacaoTv = serviceProgramacaoTv;
        this.tagRenderers = tagRenderers;

    }

    async visualizarHomeTvCamara(req, res, next) {
        let conteudoWP = await this._obterHome(req, 'tv');
        const paginaHome = 'tv/home';
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

    async visualizarProgramacaoTvCamara(req, res, next) {
        try {
            const titulo = 'Tv Câmara';
            const breadcrumbs = '[{"rotulo": "TV", "link": "/tv"}]';
            const semana  = this.serviceProgramacaoTv.getDiasDaSemana();
            const programacaoCompletaSemanal = await this.serviceProgramacaoTv.obterProgramacaoCompleta();
            
            return res.render('tv/programacao-tv', {
                titulo,
                breadcrumbs,
                semana, 
                programacaoCompletaSemanal 
            });
        } catch (error) {
            winston.error(__filename + ' - ' + error.message);
            ExpressUtil.error(error, res, next);
        }
    }

    async _obterHome(req, home) {
        return !isEmpty(req.body) ? req.body : this.serviceCMS.obterHome(home);
    }

    async vizualizarProgramasTvCamaraCategotia(req, res, next) {
        const titulo = tituloProgramas;
        const breadcrumbs = breadcrumbsProgramas;
        
        try {
            req = this._validaUrl(req, next);
            const slug = ProgramasCategorias.geraSlug(req.params.categoria);
            const conteudosWP = await this._conteudosWpPrograma(slug);
            res.render('tv/programas/index', {
                titulo,
                breadcrumbs,
                dados: conteudosWP });
     
        } catch(error) {
          winston.error(__filename + ' - ' + error.message);
          ExpressUtil.error(error, res, next);
        }
    }

    async visualizarEdiçõesDeProgramaPorCategoria(req, res, next) {
        const titulo = tituloProgramas;
        const breadcrumbs = breadcrumbsProgramas;

        try {
            const dados = await this._conteudosWpDocumentarios(req);

            res.render('tv/programas/index', {
                titulo,
                breadcrumbs,
                dados
            });
        } catch(error) {
            winston.error(__filename + ' - ' + error.message);
            ExpressUtil.error(error, res, next);
        }

    }

    async visualizarProgramasTvCamara(req, res, next) { 
        try {
            const titulo = 'Programas Tv Câmara';
            const breadcrumbs = '[{"rotulo": "TV", "link": "/tv"}]';
            const dados = ProgramasCategorias.getLinkTituloCategoria('tv');
            
            res.render('tv/programas/index', {
                titulo,
                breadcrumbs,  
                dados 
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

     async _conteudosWpPrograma(slug) {
        const resultado = [];
        const urlWp  =  ConteudoDinamico.criaUrlProgramasPorCategoria('tv', slug);
        const url = `/tv/programa/${slug}`;
        const categoria = ProgramasCategorias.categoriaPorSlug(slug);
        const conteudos = await this.serviceCMS.obterConteudoPorCategoriaPrograma(urlWp);
        
        if (conteudos.length >= 1) {
            resultado.push({ categoria, url, conteudos });
        } else {
            resultado.push({ categoria, url, notFound });
        }
        return resultado;
    }

    async _conteudosWpDocumentarios(req) {
        const output = [];

        // const id = 103; // Desenvolvimento
        const id = 136; // Produção
        const pagina = req.query.pagina;

        const urlWp = ConteudoDinamico.criaUrlDocumentarios(id, pagina, '');
        const categoria = 'Documentários';
        const url = '/tv/programa/documentarios';
        const wpConteudos = await this.serviceCMS.obterConteudoPorUrl(urlWp);
        const paginador = Paginador.getPaginador(wpConteudos.paginacao, 'documentários');
        const conteudos = wpConteudos.conteudos;
        const currentPage = wpConteudos.paginacao.pagina;

        if (conteudos) {
            output.push({ categoria, url, paginador, conteudos, currentPage });
        } else {
            output.push({ categoria, url, notFound });
        }

        return output;
    }
}

module.exports = TvController;