module.exports = class BancoImagens {

  /**
   * Atributos imutáveis
   * @param {*} conteudo
   */
  constructor(conteudo) {
    this._nomeAutor = conteudo.nomeAutor;
    this._desImagem = conteudo.desImagem;
    this._pathImagemG = conteudo.pathImagemG;
    this._pathImagemM = conteudo.pathImagemM;
    this._pathImagemP = conteudo.pathImagemP;
    Object.freeze(this);
  }

  get nomeAutor () {
    return this._nomeAutor;
  }

  get desImagem () {
    return this._desImagem;
  }

  get pathImagemG () {
    return this._pathImagemG;
  }

  get pathImagemM () {
    return this._pathImagemM;
  }

  get pathImagemP () {
    return this._pathImagemP;
  }

};
