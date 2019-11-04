const TagRenderer = require('./TagRenderer');
// const assert = require('assert');

module.exports = class EntendaTvTagRenderer extends TagRenderer {

    //TODO No momento sera estatico ate solucionadar no editor de home
    constructor() {
        // assert.notEqual(servicoAssista, null);
        super('[eh-bloco-entenda]');
        // this._servicoAssista = servicoAssista;
    }

    renderizarHtml(renderizador) {
        return new Promise(async (resolve, reject) => {
            try {
                const html =  await renderizador('/tv/_tventenda.hbs', { });
                resolve({tag: this.nomeTag, html});
            } catch (erro) {
                reject(erro);
            }
        });
    }
};