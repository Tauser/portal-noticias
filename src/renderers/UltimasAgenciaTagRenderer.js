const TagRenderer = require('./TagRenderer');
const assert = require('assert');

module.exports = class UltimasAgenciaTagRenderer extends TagRenderer {

    constructor(serviceCMS) {
        assert.notEqual(serviceCMS, null);
        super('[eh-ultimas-noticias-container]');
        this._serviceCMS = serviceCMS;
    }

    renderizarHtml(renderizador) {
        return new Promise(async (resolve, reject) => {
            try {
                const ultimas = await this._serviceCMS.obterConteudoPorUrl('/dinamica?tipo=agencia&total=4&visivel_home=1');
                const html =  await renderizador('/agencia/_home--ultimas.hbs', { noticias: ultimas });
                resolve({tag: this.nomeTag, html});
            } catch (erro) {
                reject(erro);
            }
        });
    }
};