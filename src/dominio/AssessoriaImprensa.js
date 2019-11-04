const Conteudo = require('./Conteudo');
module.exports = class AssessoriaImprensa extends Conteudo {
  /**
   * Atributos imutáveis
   * @param {*} conteudo
   */
  constructor(conteudo) {
    super(conteudo, 'assessoria-imprensa/assessoria-imprensa-noticia-interna', 'assessoria-imprensa/assessoria-imprensa');
    this._comentariosSisnews = conteudo.comentarios_sisnews;
    this._countComentariosSisnews = conteudo.total_comentarios_sisnews;
    this._linkComentariosAnteriores = '/noticias/comentarios/' + this.pathSeparado[1];
    this._pagina_tematica = conteudo.pagina_tematica;

    //TODO solucao ate resolver dinamicamente - redmine: #48824
    this._breadcrumbs = [{'name': 'Assessoria de Imprensa', 'link': '/assessoria-de-imprensa'}];
  }

  get comentariosSisnews () {
    return this._comentariosSisnews;
  }

  get countComentariosSisnews () {
    return this._countComentariosSisnews;
  }

  get linkComentariosAnteriores () {
    return this._linkComentariosAnteriores;
  }
};