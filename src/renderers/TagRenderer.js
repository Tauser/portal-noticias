const assert = require('assert');

module.exports = class TagRenderer {

    constructor(nomeTag) {
        assert.notEqual(nomeTag, null);
        this._nomeTag = nomeTag;
    }

    dependeDoRequest() {
        return false;
    }

    // eslint-disable-next-line no-unused-vars
    setConteudoRequest(conteudo) {
    }

    get nomeTag() {
        return this._nomeTag;
    }

    // eslint-disable-next-line no-unused-vars
    renderizarHtml(renderizador) {
        //deve retornar Promise
    }
};