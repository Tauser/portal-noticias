const Conteudo = require('./Conteudo');
const DestaqueTopo = require('./DestaqueTopo');
const DestaqueEstreia = require('./DestaqueEstreia');
module.exports = class Home extends Conteudo {

  /**
   * Atributos imutáveis
   * @param {*} conteudo
   */
  constructor(conteudo) {
    super(conteudo);
    this._html = conteudo.home_conteudo_html;
    this._destaqueTopo = conteudo.destaqueTopo ? new DestaqueTopo(conteudo.destaqueTopo) : null;
    this._destaqueEstreia = conteudo.estreia ? new DestaqueEstreia(conteudo.estreia) : null;

  }

  get destaqueTopo () {
    return this._destaqueTopo;
  }

  get destaqueEstreia () {
    return this._destaqueEstreia;
  }

  get html () {
    return this._html;
  }

  set html (html) {
    this._html = html;
  }
};
