const Conteudo = require('./Conteudo');
const moment = require('moment');
module.exports = class EdicaoProgramaTV extends Conteudo {

  /**
   * Atributos imutáveis
   * @param {*} conteudo 
   */
  constructor(conteudo) {
    super(conteudo, 'tv/noticia-edicao-programa', 'tv/home');
    this._programaPrincipal = conteudo.programa_principal;
    this._videos = conteudo.videos;
    this._dataFormatada = conteudo.data_formatada;
    this._horaFormatada = conteudo.hora_formatada;
    this._ultimas = conteudo.ultimas;
    this._dataEstreia = conteudo.data_estreia;
    this._horaEstreia = conteudo.hora_estreia;
    this._rodape = conteudo.rodape;
    this._imagens = conteudo.imagens;

    //TODO solucao ate resolver dinamicamente - redmine: #48824
    this._breadcrumbs = [{ 'name': 'TV', 'link': '/tv' }];
  }

  get programaPrincipal () {
    return this.verificaObjeto(this._programaPrincipal);
  }
  get rodape () {
    return this.verificaObjeto(this._rodape);
  }
  get videos () {
    return this.verificaObjeto(this._videos);
  }
  get imagens () {
    return this._imagens;
  }
  get dataFormatada () {
    return this.verificaObjeto(this._dataFormatada);
  }
  get horaFormatada () {
    return this.verificaObjeto(this._horaFormatada);
  }
  get dataEstreia () {
    return this._dataEstreia ? moment(String(this._dataEstreia)).format('DD/MM/YYYY') : '';
  }
  get horaEstreia () {
    return this._horaEstreia || '';
  }
  get dataHora () {
    if (this.dataEstreia) {
      return `Estreia: ${this.dataEstreia}${this.horaEstreia ? ' - ' + this.horaEstreia : ''}`;
    }
    return `Publicação: ${this.dataFormatada} - ${this.horaFormatada}`;
  }
  get ultimas () {
    let ultimasEdicoes = this.removerPubEquivalente(this._ultimas.slice(0, 5), this.id);
    return this.verificaObjeto(ultimasEdicoes);
  }

  // verifica se o atributo existe e se é maior que 1
  verificaObjeto (obj) {
    return obj || null;
  }

  //remove o elemento da lista que for igual à edição sendo apresentada
  removerPubEquivalente (ultimasEdicoes, edicaoAtual) {
    let index = ultimasEdicoes.findIndex(element => element.id == edicaoAtual);
    delete ultimasEdicoes[index];
    return ultimasEdicoes;
  }
};