const TagRenderer = require('./TagRenderer');
const isEmpty = require('is-empty');

module.exports = class EstreiaTvTagRenderer extends TagRenderer {

    constructor() {
        super('[eh-tv-estreia-container]');
        this._conteudo = null;
    }

    dependeDoRequest() {
        return true;
    }

    setConteudoRequest(conteudo) {
        this._estreia = null;
        if(conteudo.estreia && !isEmpty(conteudo.estreia.titulo)) {
            this._estreia = conteudo.estreia;
        }
    }

    renderizarHtml(renderizador) {
        return new Promise(async (resolve, reject) => {
            try {
                const html =  this._estreia ? await renderizador('/tv/_tvcamara__estreia.hbs', { destaqueEstreia: this._estreia }) : '';
                resolve({tag: this.nomeTag, html});
            } catch (erro) {
                reject(erro);
            }
        });
    }
};