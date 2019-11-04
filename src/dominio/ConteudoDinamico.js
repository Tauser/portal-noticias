module.exports = class ConteudoDinamico {
   
    static _recuperarTipoPagina(url){
        let paths = url.split('/');
        if(url.indexOf('tags') !== -1) {
            return paths[3].substr(0,4); 
        } else {
            return paths[1]; 
        }
    }

    static trataTag(tag) {
        let tagTratada = tag.toLowerCase();
        tagTratada = tagTratada.replace(new RegExp(/[àáâãäå]/g),'a');
        tagTratada = tagTratada.replace(new RegExp(/æ/g),'ae');
        tagTratada = tagTratada.replace(new RegExp(/ç/g),'c');
        tagTratada = tagTratada.replace(new RegExp(/[èéêë]/g),'e');
        tagTratada = tagTratada.replace(new RegExp(/[ìíîï]/g),'i');
        tagTratada = tagTratada.replace(new RegExp(/ñ/g),'n');
        tagTratada = tagTratada.replace(new RegExp(/[òóôõö]/g),'o');
        tagTratada = tagTratada.replace(new RegExp(/œ/g),'oe');
        tagTratada = tagTratada.replace(new RegExp(/[ùúûü]/g),'u');
        tagTratada = tagTratada.replace(new RegExp(/[ýÿ]/g),'y');
        
        return tagTratada;
      }

    static criarUrlUltimas(req){       
        let ultimas = null;
        const url = req.originalUrl;
               
        if(url != null){
            let tipo = this._recuperarTipoPagina(url);
            let data = req.query.data;
            let tags = req.query.tag;
            switch (tipo){
                
                case 'tags':
                    ultimas = new Ultimas('/dinamica?tipo=agencia&total=50&tags='+ this.trataTag(tags) + '&pagina='+req.query.pagina, '../pages/agencia/tags/index', req.query.pagina);
                break;
                case 'noticias':
                ultimas = new Ultimas('/dinamica?tipo=agencia&visivel_home=1&pagina='+req.query.pagina, '../pages/agencia/ultimas-noticias/index', req.query.pagina);
                break;
                case 'radio':
                if(data === undefined){
                        data = '';
                }else {
                    data = data.replace(/\//g, '-');
                }
                ultimas = new Ultimas('/dinamica?tipo=radioagencia&visivel_home=1&data_inicio=' + data + '&data_final=' + data + '&pagina=' + req.query.pagina, 'radio-agencia/ultimas-noticias/index', req.query.pagina);
                break;
                case 'assessoria-de-imprensa':
                ultimas = new Ultimas('/dinamica?tipo=institucional&visivel_home=1&pagina='+req.query.pagina, '../pages/assessoria-imprensa/ultimas-noticias/index', req.query.pagina);
                break;
            }
        }
        return ultimas;
    }

    static criarUrlNoticiasPorTema (req, tema) {
        let ultimas = null;              
        if(tema != null){
            ultimas = new Ultimas('/dinamica?tipo=agencia&visivel_home=1&pagina='+req.query.pagina + '&temas='+ tema +'&total=10','', 1);
        }
        return ultimas;
    }

    static criaUrlProgramasPorCategoria( tipo, categoria) {
        const url = `/programa/${tipo}/${categoria}`;
        // const urlCategoria = (categoria) ? `&categorias=${categoria}` : '';
        // const elementos = (total) ? `&total=${total}` : '';
        // return `${url}${urlCategoria}${elementos}`;
        return url;
    }

    static criaUrlBoletins(data) {
        return `/boletim?tipo=agencia&data=${data}`;
    }

    static criaUrlRedirectSisnews(idsisnews) {
        return `/busca-idsisnews/${idsisnews}`;
    }

    static criaUrlDocumentarios(id, pagina, total) {
        const edicaoId =(id) ?`&id=${id}` : '';
        const numPagina =(pagina) ? `&pagina=${pagina}` : '';
        const totalDeProgramas =(total) ? `&total=${total}` : '';

        const queryParams  = `${edicaoId}${numPagina}${totalDeProgramas}`;

        return `/documentarios?tipo=edicao_programa_tv${(queryParams) ? queryParams : ''}`;
    }
};

class Ultimas {
    constructor(url, pagina, numeroDaPagina) {
        this._url = url;
        this._pagina = pagina;
        this._numeroDaPagina = numeroDaPagina;
    }

    get url() {
        return this._url;
    }
    
    get pagina () {
        return this._pagina;
    }

    get numeroDaPagina(){
        return this._numeroDaPagina || '1';
    }
}