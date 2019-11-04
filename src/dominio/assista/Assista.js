const empty = require('is-empty');

module.exports = class Assista {
  /**
   * Atributos imutáveis
   * @param {*}
   */
  constructor(assista) {
    this._id = assista.id;
    this._descricao = !empty(assista.descricao) ? assista.descricao : '';
    this._retranca = !empty(assista.retranca) ? assista.retranca : '';
    this._estadoVideoYoutube = assista.estadoVideoYoutube;
    this._idYoutube = assista.idYoutube;
    this._principal = assista.principal;
    this._eventoInterativo = assista.eventoInterativo;
    this._urlYoutube = assista.urlYoutube;
    this._dataSessao = assista.dataSessao;
    this._thumbnailDefault = !empty(assista.thumbnailDefault) ? assista.thumbnailDefault : './foradoar.png';
    this._thumbnailMedium = !empty(assista.thumbnailMedium) ? assista.thumbnailMedium : './foradoar.png';
    this._linkVideo = assista.urlVideoWebCamara;
    this._linkAudienciaInterativa = assista.urlInterativa;
    Object.freeze(this);
  }

  static verificarSeExistemVideos(videosAssista) {
    if (empty(videosAssista) || !videosAssista.filter) {
      return false;
    }
    return true;
  }

  get id() {
    return this._id;
  }

  get titulo() {
    return this._titulo;
  }

  get retranca() {
    return this._retranca;
  }

  get estadoVideoYoutube() {
    return this._estadoVideoYoutube;
  }

  get idYoutube() {
    return this._idYoutube;
  }

  get urlYoutube() {
    return this._urlYoutube;
  }

  get eventoInterativo() {
    return this._eventoInterativo;
  }

  get principal() {
    return this._principal;
  }

  get dataSessao() {
    return this._dataSessao;
  }

  get descricao() {
    return this._descricao;
  }

  get linkVideo() {
    return this._linkVideo;
  }

  get thumbnailDefault() {
    return this._thumbnailDefault;
  }

  get thumbnailMedium() {
    return this._thumbnailMedium;
  }

  get linkAudienciaInterativa () {
    return this._linkAudienciaInterativa;
  }
};
