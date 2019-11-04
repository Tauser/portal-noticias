module.exports = class ProgramasDocumentarios {
    
    /**
     * @param {*} conteudo 
     */
    constructor(conteudo) {
        this._id = conteudo.id;
        this._paginacao = this._setPaginacao(conteudo.programas[0]);
        this._conteudos = this._setConteudos(conteudo.programas);
    }

    _setPaginacao(programa) {
        const output = {};

        if (programa && programa.info_paginador) {

            output.pagina = (programa.info_paginador.pagina > 0) ? programa.info_paginador.pagina: 1;
            output.count = parseInt(programa.info_paginador.count);
            output.paginas = programa.info_paginador.paginas;
        }

        return output;
    }

    _setConteudos(programas){
        const output = [];

        programas.forEach(programa => {
            const id = programa.id;
            const titulo = programa.titulo;
            const link  = programa.link;
            const dataFormatada = programa.data_formatada;
            const horaFormatada = programa.hora_formatada;
            const urlImagem = this._setUrlImagem(programa);

            output.push({ id, titulo, link, dataFormatada, horaFormatada, urlImagem });
        });

        return output;
    }

    _setUrlImagem(programa) {
        let output = '';
        if (programa.imagens.length > 0 ) output = programa.imagens[0].url;
        return output;
    }

    get id () {
        return this._id;
    }

    get paginacao() {
        return this._paginacao;
    }

    get conteudos() {
        return this._conteudos;
    }
}; 