const TagRenderer = require('./TagRenderer');

module.exports = class AoVivoRadioTagRenderer extends TagRenderer {

    constructor() {
        super('[eh-radio-ao-vivo-container]');
        this._conteudo = null;
    }

    dependeDoRequest() {
        return true;
    }

    renderizarHtml(renderizador) {
        return new Promise(async (resolve, reject) => {
            try {
                const html =  await renderizador('/radio/_radio__ao-vivo.hbs', {});
                resolve({tag: this.nomeTag, html});
            } catch (erro) {
                reject(erro);
            }
        });
    }
};