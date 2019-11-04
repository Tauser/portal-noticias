module.exports = class Proposicoes {
  /**
   * Atributos imutáveis
   * @param {*} proposicoes
   */
  constructor(proposicoes) {
    //console.log(proposicoes);
    this._idecadastro = proposicoes.id;
    this._siglaTipo = proposicoes.siglaTipo;
    this._numero = proposicoes.numero;
    this._ano = proposicoes.ano;

    Object.freeze(this);
  }

  get idecadastro () {
    return this._idecadastro;
  }

  get siglaTipo () {
    return this._siglaTipo;
  }

  get numero () {
    return this._numero;
  }
  get ano () {
    return this._ano;
  }
};
