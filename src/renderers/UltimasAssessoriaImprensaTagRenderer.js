const TagRenderer = require('./TagRenderer');
const assert = require('assert');

module.exports = class UltimasAssessoriaImprensaTagRenderer extends TagRenderer {

    constructor(serviceCMS) {
        assert.notEqual(serviceCMS, null);
        super('[ultimas-noticias-container]');
        this._serviceCMS = serviceCMS;
    }

    renderizarHtml(renderizador) {
        return new Promise(async (resolve, reject) => {
            try {
                const ultimas = await this._serviceCMS.obterConteudoPorUrl('/dinamica?tipo=institucional&total=2&visivel_home=1');
                const html =  await renderizador('/assessoria-imprensa/_assessoria-imprensa__ultimas-noticias.hbs', { ultimas: ultimas });
                resolve({tag: this.nomeTag, html});
            } catch (erro) {
                reject(erro);
            }
        });
    }
};