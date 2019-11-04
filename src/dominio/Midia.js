module.exports = class Midia {

    constructor(midia) {
        this._nome = midia.nome;
        this._descricao = midia.descricao;
        this._legenda = midia.legenda;
        this._texto_alternativo = midia.texto_alternativo;
        this._autor = midia.autor;
        this._local = midia.local;
        this._tema = midia.tema;
        this._data = midia.data;
        this._institucional = midia.institucional;
        this._sizes = midia.sizes;
        this._url = midia.url;

        Object.freeze(this);
    }

    static regexAudio() {
        return /(\[audio)(.*?)[^g]+(\[\/audio\])/g;
    }

    static regexVideo() {
        return /(\[video)(.*?)[^g](\[\/video\])/g;
    }

    get nome() {
        return this._nome;
    }

    get descricao() {
        return this._descricao;
    }

    get legenda() {
        return this._legenda;
    }

    get texto_alternativo() {
        return this._texto_alternativo;
    }

    get autor() {
        return this._autor;
    }

    get local() {
        return this._local;
    }

    get tema() {
        return this._tema;
    }

    get data() {
        return this._data;
    }

    get institucional() {
        return this._institucional;
    }

    get sizes() {
        return this._sizes;
    }

    get url() {
        return this._url;
    }
    
};