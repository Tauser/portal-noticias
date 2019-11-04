module.exports = class Paginador {

    static getPaginador(paginacao, tipo) {
        const paginaAtual = paginacao.pagina;
        const count = paginacao.count;
        const totalPaginas = paginacao.paginas;
        const buscaAvancada = this._setBuscaAvancada(paginaAtual, tipo);
        const anterior = this._setPreviPage(paginaAtual);
        const proxima = this._setNextPage(paginaAtual, totalPaginas);
        const paginas = this._setPagination(paginacao);

        return { paginaAtual, count, totalPaginas, anterior, proxima, buscaAvancada, paginas };
    }

    static _setBuscaAvancada(paginaAtual, tipo) {
        let buscaAvancada = false;
        if(paginaAtual > 10 && tipo == 'noticias') buscaAvancada = true;
        return buscaAvancada;
    }

    static _setNextPage(pagina, total) {
        if(pagina < total) return { disabled: false, avancar : pagina + 1 };
        return { disabled: true };
    }

    static _setPreviPage(pagina) {
        if(pagina > 1) return { disabled: false, voltar : pagina - 1 };
        return { disabled: true };
    }

    static _setPagination(paginacao) {
        let active = false;
        const paginas = [];

        for (let i = 0; i < paginacao.paginas; i++ ) {
            const pagina = i + 1;

            if(pagina == paginacao.pagina){
                paginas.push({ pagina, active: !active });
            } else {
                paginas.push({pagina, active});
            }
        }

        paginas.forEach(item => {
            const visible = paginacao.pagina + 10;

            if(item.pagina >= paginacao.pagina - 2 && item.pagina <= visible) {
                item.hidden = false;
            } else {
                item.hidden = true;
            }
        });

        return paginas;
    }

};