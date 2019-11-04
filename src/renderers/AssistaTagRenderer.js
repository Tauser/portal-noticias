const TagRenderer = require('./TagRenderer');
const assert = require('assert');

module.exports = class AssistaTagRenderer extends TagRenderer {

    constructor(servicoAssista) {
        assert.notEqual(servicoAssista, null);
        super('[eh-assista-container]');
        this._servicoAssista = servicoAssista;
    }

    renderizarHtml(renderizador) {
        return new Promise(async (resolve, reject) => {
            try {
                const dadosAssista = await this._servicoAssista.retornarVideosAssista();
                const html =  await renderizador('/agencia/_home--assista.hbs', { videosAssista: dadosAssista });
                resolve({tag: this.nomeTag, html});
            } catch (erro) {
                reject(erro);
            }
        });
    }
};