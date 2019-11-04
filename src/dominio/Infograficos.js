module.exports = class Infograficos {

  /**
   * Atributos imutáveis
   * @param {*} conteudo
   */
  constructor(conteudo) {
    this._nome = conteudo.nome;
    this._data = conteudo.data;
    this._url = conteudo.url;
    this._url_midia = conteudo.url_midia;
    this._url_thumb_midia = conteudo.url_thumb_midia;
    Object.freeze(this);
  }

  get nome () {
    return this._nome;
  }

  get data () {
    return this._data;
  }

  get url () {
    return this._url;
  }

  get url_midia () {
    return this._url_midia;
  }

  get url_thumb_midia () {
    return this._url_thumb_midia;
  }
};
