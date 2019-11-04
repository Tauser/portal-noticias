module.exports = class DestaqueEstreia {

  /**
   * Atributos imutáveis
   * @param {*} conteudo
   */
  constructor(conteudo) {

    this._id = conteudo.id;
    this._titulo = conteudo.titulo;
    this._tema = conteudo.tema;
    this._link = conteudo.link;
    this._resumo = conteudo.resumo;

    Object.freeze(this);
  }

  get id () {
    return this._id;
  }

  get titulo () {
    return this._titulo;
  }

  get tema () {
    return this._tema;
  }

  get link () {
    return this._link;
  }

  get resumo () {
    return this._resumo;
  }

};
