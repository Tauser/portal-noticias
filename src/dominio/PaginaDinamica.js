const Conteudo = require('./Conteudo');
const isEmpty = require('is-empty');
const Noticia = require('./Noticia');
module.exports = class PaginaDinamica extends Conteudo {

    /**
    * Atributos imutáveis
    * @param {*} conteudo
    */
    constructor(conteudo) {
        super(conteudo, 'ultimas-noticias/index');
        this._noticias = [];
        if(!isEmpty(conteudo.posts)) {
            conteudo.posts.map((p) => {
                this._noticias.push(new Noticia(p));
            });
        }

        Object.freeze(this);
    }

    get noticias() {
        return this._noticias;
    }

};