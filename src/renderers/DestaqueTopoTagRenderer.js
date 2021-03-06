const TagRenderer = require('./TagRenderer');
const isEmpty = require('is-empty');

module.exports = class DestaqueTopoTagRenderer extends TagRenderer {

    constructor() {
        super('[eh-noticias-destaque-topo-container]');
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
                const html =  this._destaqueTopo ? await renderizador('/agencia/_home--chamada-topo.hbs', { destaqueTopo: this._destaqueTopo }) : '';
                resolve({tag: this.nomeTag, html});
            } catch (erro) {
                reject(erro);
            }
        });
    }
};