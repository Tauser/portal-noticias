const categorias = require('./catetorias-programas/categorias');
const conteudoDinamico = require('./ConteudoDinamico');

let fundo = false;

module.exports = class ProgramasCategorias  { 
    
    static programasPorCategoria(conteudoBruto) {
        let resultado = [];
        resultado = this.setPogramas(categorias, conteudoBruto);
        return resultado;
    }

    static  getLinkTituloCategoria(tipo) {
        const dados = [];
        categorias.forEach(item => {
            fundo = !fundo;
            const categoria = item.titulo;
            const slug = this.geraSlug(categoria);
            const url = (item.url) ? item.url : `/${tipo.toLowerCase()}/programa/${slug}`;
            const valida = (tipo == 'tv') ? item.tv : item.radio;
                
            if(valida) dados.push({categoria,fundo, url });
        });

        dados.forEach(dado => {
            fundo = !fundo;
            dado.fundo = fundo;
        });

        
        return dados;
    }

    static setPogramas(todasCatetorias, bruto) {
        const dados = [];
        todasCatetorias.forEach(categoria => {
            fundo = !fundo;
            const conteudos = this.setProgramasPorCategoria(categoria, bruto);
            if(conteudos >= 1) dados.push({
                categoria: categoria.titulo,
                fundo,
                conteudos
            });
        });
        return dados;
    }

    static setProgramasPorCategoria(catetogoria, conteudos) {
        const dados = [];
        conteudos.forEach(conteudo => {
            if(conteudo.categoria.titulo == catetogoria.titulo) dados.push(conteudo);
        });
        return dados;
    }

    static geraSlug(slug) {
        slug = conteudoDinamico.trataTag(slug);
        return slug.toLowerCase().replace(/[\W]/g, '-');
    }

    static categoriaPorSlug(slug) {
        let categoria = '';
        categorias.forEach(linha => {
            let compara = this.geraSlug(linha.titulo);
            if(slug == compara) categoria = linha.titulo;
        });
        return categoria;
    }
};