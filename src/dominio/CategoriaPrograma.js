module.exports = class CategoriaPrograma {

    constructor(conteudo) {
        this._categoria = conteudo.categoria;
        this._titulo = conteudo.titulo;
        this._link = conteudo.link;
        this._urlImagem = conteudo.urlImagem;

        Object.freeze(this);
    }

    get categoria() {
        return this._categoria;
    }

    get titulo() {
        return this._titulo;
    }

    get link() {
        return this._link;
    }

    get urlImagem() {
        return this._urlImagem;
    }

};