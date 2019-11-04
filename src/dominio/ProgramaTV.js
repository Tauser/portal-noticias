const Conteudo = require('./Conteudo');
module.exports = class ProgramaTV extends Conteudo {

  /**
   * Atributos imutáveis
   * @param {*} conteudo
   */
  constructor(conteudo) {
    super(conteudo, 'tv/noticia-programa');

    this._acervo = conteudo.acervo;
    this._ordem = conteudo.ordem;
    this._quantidadeDeDestaques = conteudo.quantidade_de_destaques;
    this._horario = conteudo.horario;
    this._permitirDownloads = conteudo.permitir_downloads;
    this._ultimasPrim = conteudo.ultimas.slice(0)[0];
    this._ultimas = conteudo.ultimas;
    this._programa = true;
    

    //dados do programa relacionado
    this._tituloPrograma = conteudo.titulo;
    this._conteudoPrograma = conteudo.conteudo;
    this._horarioPrograma = conteudo.horario;
    this._imagemPrograma = this.verificaObjeto(conteudo.imagens);
    this._linkPrograma = conteudo.link;
    this._imagens = conteudo.imagens;

  }

  get programa () {
    return this._programa;
  }

  get imagens () {
    return this._imagens;
  }

  get tipoEdicao () {
    return this._acervo;
  }

  get dataEstreia () {
    return this._ordem;
  }

  get dataEstreiaFormatada () {
    return this._quantidadeDeDestaques;
  }

  get horaEstreiaFormatada () {
    return this._horario;
  }

  get ultimasPrim () {
    return this._ultimasPrim;
  }

  get listaVideos () {
    if (this.ultimasPrim) {
      if (this.ultimasPrim.videos) {
        return this._ultimasPrim.videos;
      } else return null;
    } else return null;
  }

  get videoPoster () {
    if (this.verificaObjeto(this._ultimasPrim.imagem_destaque)) {
      return this._ultimasPrim.imagem_destaque.url;
    } else return null;
  }

  get tituloEdicao () {
    return this._ultimasPrim.titulo;
  }

  get conteudoEdicao () {
    return this._ultimasPrim.conteudo;
  }

  get dataEdicao () {
    return this._ultimasPrim.data_formatada;
  }

  get horaEdicao () {
    return this._ultimasPrim.hora_formatada;
  }

  get tituloPrograma () {
    return this._tituloPrograma;
  }

  get conteudoPrograma () {
    return this._conteudoPrograma;
  }

  get horarioPrograma () {
    return this._horarioPrograma;
  }

  get imagemPrograma () {
    return this._imagemPrograma;
  }

  get linkPrograma () {
    return this._linkPrograma;
  }

  get ultimas () {
    return this.removerPubEquivalente(this._ultimas.slice(0, 5), this._ultimasPrim.id);
  }

  verificaObjeto (obj) {
    if (obj && obj.length >= 1) return obj[0].url;
    return null;
  }

  //remove o elemento da lista que for igual à edição sendo apresentada
  removerPubEquivalente (ultimasEdicoes, edicaoAtual) {
    ultimasEdicoes.forEach(function (element, index) {
      if (element.id == edicaoAtual) {
        delete ultimasEdicoes[index];
      }
    });
    return ultimasEdicoes;
  }

};
