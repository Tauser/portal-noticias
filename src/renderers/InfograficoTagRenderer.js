const TagRenderer = require('./TagRenderer');
const assert = require('assert');

module.exports = class InfograficoTagRenderer extends TagRenderer {

    constructor(serviceInfograficosAPI) {
        assert.notEqual(serviceInfograficosAPI, null);
        super('[eh-infograficos-container]');
        this._serviceInfograficosAPI = serviceInfograficosAPI;
    }

    renderizarHtml(renderizador) {
        return new Promise(async (resolve, reject) => {
            try {
                const infograficos = await this._serviceInfograficosAPI.retornarInfograficos();
                const html =  await renderizador('/agencia/_home--infograficos.hbs', { infograficos: infograficos });
                resolve({tag: this.nomeTag, html});
            } catch (erro) {
                reject(erro);
            }
        });
    }
};