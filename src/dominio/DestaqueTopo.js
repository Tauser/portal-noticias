module.exports = class DestaqueTopo {

  /**
   * Atributos imutáveis
   * @param {*} conteudo
   */
  constructor(conteudo) {

    this._id = conteudo.id;
    this._titulo = conteudo.titulo;
    this._link = conteudo.link;

    Object.freeze(this);
  }

  get id () {
    return this._id;
  }

  get titulo () {
    return this._titulo;
  }

  get link () {
    return this._link;
  }

};
