module.exports = class Conteudo {

  /**
   * Atributos imutáveis
   * @param {*} conteudo 
   */
  constructor(conteudo) {
    this._id = conteudo.id;
    this._uri = conteudo.uri;
    this._nome = conteudo.nome;
    this._siglaPartido = conteudo.siglaPartido;
    this._uriPartido = conteudo.uriPartido;
    this._siglaUf = conteudo.siglaUf;
    this._idLegislatura = conteudo.idLegislatura;
    this._urlFoto = conteudo.urlFoto;
    this._email = conteudo.email;
    
  }

  get id () {
    return this._id;
  }

  get uri () {
    return this._uri;
  }

  get nome () {
    return this._nome;
  }

  get siglaPartido () {
    return this._siglaPartido;
  }

  get uriPartido () {
    return this._uriPartido;
  }

  get siglaUf () {
    return this._siglaUf;
  }

  get idLegislatura () {
    return this._idLegislatura;
  }

  get urlFoto () {
    return this._urlFoto;
  }

  get email () {
    return this._email;
  }
};
