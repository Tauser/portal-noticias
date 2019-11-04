
module.exports = class Boletins {
    
   /**
    * Atributos imutáveis
    * @param {*} conteudo 
    */ 
   constructor(conteudo) {
    //    super(conteudo);
       
       this._tema = conteudo.tema;
       this._linkTema = conteudo.link;
       this._noticias = this._setNoticias(conteudo.noticias);
   }

   _setNoticias(noticias) {
       const output = [];

       noticias.forEach(noticia => {
           const id = noticia.id;
           const titulo = noticia.titulo;
           const link = noticia.link;
           const data = noticia.data;
           const tipoConteudo = noticia.tipo_conteudo;
           const dataFormatada = noticia.data_formatada;
           const horaFormatada = noticia.hora_formatada;

           output.push({ id, titulo, link, data, tipoConteudo, dataFormatada, horaFormatada });
       });

       return output;
   }

   get tema() {
       return this._tema;
   }

   get linkTema() {
       return this._linkTema;
   }

   get noticias() {
       return this._noticias;
   }
};