const TagRenderer = require('./TagRenderer');
const isEmpty = require('is-empty');

module.exports = class DestaqueTopoTvTagRenderer extends TagRenderer {

    constructor() {
        super('[eh-tv-destaque-topo-container]');
        this._conteudo = null;
    }

    dependeDoRequest() {
        return true;
    }

    setConteudoRequest(conteudo) {
        this._destaqueTopo = null;
        if(conteudo.destaqueTopo && !isEmpty(conteudo.destaqueTopo.titulo)) {
            this._destaqueTopo = conteudo.destaqueTopo;
        }
    }

    renderizarHtml(renderizador) {
        return new Promise(async (resolve, reject) => {
            try {
                const html =  this._destaqueTopo ? await renderizador('/tv/_tvcamara__hotcall.hbs', { destaqueTopo: this._destaqueTopo }) : '';
                resolve({tag: this.nomeTag, html});
            } catch (erro) {
                reject(erro);
            }
        });
    }
};