//const Tipo = require('./Tipo');

module.exports = class TipoConteudo {
    
    /**
     * Atributos imutáveis
     * @param {*} objeto - 'agencia, tv, radio etc...'
     * @param {*} tipo - 'post ou page
     */
    constructor(objeto, tipo) {
        this._objeto = objeto;
        // TODO verificar se possui mais tipos - remover para não acoplar informações do WP.
        //this._tipo = tipo === Tipo.POST ? Tipo.POST : Tipo.PAGE;
        this._tipo = tipo;
        Object.freeze(this);
    }

    get objeto () {
        return this._objeto;
    }

    get tipo () {
        return this._tipo;
    }
};