const Conteudo = require('./Conteudo');
const Midia = require('./Midia');
const isEmpty = require('is-empty');
module.exports = class Agencia extends Conteudo {

  /**
   * Atributos imutáveis
   * @param {*} conteudo
   */
  constructor(conteudo) {
    super(conteudo, 'agencia/noticia-interna', 'agencia/home');

    this._tipoNoticia = conteudo.tipo_noticia;
    this._imagens = this._adicionarImagens(conteudo.imagens);
    this._imagemPrincipal = isEmpty(conteudo.imagens) ? '' : new Midia(conteudo.imagens[0]);
    this._video = conteudo.videos;
    this._imagemPoster = conteudo.imagem_poster;
    this._audio = conteudo.audios;
    this._continuacaoNoticia = conteudo.continuacao;
    this._relacionadas = conteudo.materias_relacionadas;
    this._programasRelacionadosTV = conteudo.programas_relacionados_tv;
    this._programasRelacionadosRadio = conteudo.programas_relacionados_radio;
    this._comentariosSisnews = conteudo.comentarios_sisnews;
    this._countComentariosSisnews = conteudo.total_comentarios_sisnews;
    this._projetoLeiPrincipal = conteudo.proposicoes;
    this._linkComentariosAnteriores = '/noticias/comentarios/' + this.pathSeparado[1];
    this._pagina_tematica = conteudo.pagina_tematica;
    this._tempo_real = conteudo.tempo_real;
    this._hora_formatada = conteudo.hora_formatada;
    this._data_formatada = conteudo.data_formatada;
    //TODO solucao ate resolver dinamicamente - redmine: #48824
    this._breadcrumbs = [{'name': 'Notícias', 'link': '/noticias'}];
  }

  _adicionarImagens(imagens) {
    let midias = [];
    if (!isEmpty(imagens) && imagens.map) {
      midias = imagens.map((imagem) => {
        return new Midia(imagem);
      });
    }
    return midias;
  }

  get dataFormatada () {
    return this._data_formatada;
  }

  get horaFormatada () {
    return this._hora_formatada;
  }

  get tempoReal () {
    return this._tempo_real;
  }

  get imagemPrincipal() {
    return this._imagemPrincipal;
  }

  get tipoNoticia() {
    return this._tipoNoticia;
  }

  get video() {
    return this._video;
  }

  get imagemPoster() {
    return this._imagemPoster;
  }

  get audio() {
    return this._audio;
  }

  get continuacaoNoticia() {
    return this._continuacaoNoticia;
  }

  get relacionadas() {
    return this._relacionadas;
  }

  get programasRelacionadosTV() {
    return this._programasRelacionadosTV;
  }

  get programasRelacionadosRadio() {
    return this._programasRelacionadosRadio;
  }

  get comentariosSisnews() {
    return this._comentariosSisnews;
  }

  get countComentariosSisnews() {
    return this._countComentariosSisnews;
  }

  get projetoLeiPrincipal() {
    return this._projetoLeiPrincipal;
  }

  get linkComentariosAnteriores() {
    return this._linkComentariosAnteriores;
  }
};
