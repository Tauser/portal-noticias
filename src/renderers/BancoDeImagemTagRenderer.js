const TagRenderer = require('./TagRenderer');
const assert = require('assert');

module.exports = class BancoDeImagemTagRenderer extends TagRenderer {

    constructor(serviceBancoImagensAPI, serviceJornalAPI) {
        assert.notEqual(serviceBancoImagensAPI, null);
        super('[eh-banco-imagens-jornal-container]');
        this._serviceBancoImagensAPI = serviceBancoImagensAPI;
        this._serviceJornalAPI = serviceJornalAPI;
    }

    renderizarHtml(renderizador) {
        return new Promise(async (resolve, reject) => {
            try {
                const imagemPrincipal = await this._serviceBancoImagensAPI.retornarImagemPrincipal();
                const imagemSecuntaria = await this._serviceBancoImagensAPI.retornarImagensSecundarias();
                // const jornal = await this._serviceJornalAPI.retornarJornal();

                const html =  await renderizador('/agencia/_home--banco-imagens.hbs', { bImgSecundarias: imagemSecuntaria, bImgPrincipal: imagemPrincipal});
                
                resolve({tag: this.nomeTag, html});
            } catch (erro) {
                reject(erro);
            }
        });
    }
};