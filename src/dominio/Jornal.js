module.exports = class Jornal {

  /**
   * Atributos imutáveis
   * @param {*} conteudo
   */
  constructor(conteudo) {
    this._nomepdf = conteudo.nomepdf;
    this._dataextenso = conteudo.dataextenso;
    this._urlImagem = '';
    this._setUrlImagem();
    Object.freeze(this);
  }
  _setUrlImagem () {
    this._urlImagem = 'https://www.camara.leg.br/internet/Jornal/' + this._nomepdf + '/content/medium/page1.jpg';
  }

  get dataextenso() {
    return this._dataextenso;
  }

  get nomepdf() {
    return this._nomepdf;
  }

  get urlImagem() {
    return this._urlImagem;
  }
};
