const empty = require('is-empty');

module.exports = class AssistaYoutube {
  /**
   * Atributos imutáveis
   * @param {*}
   */
  constructor(assistaYoutube) {
    this._idYoutube = assistaYoutube.idYoutube;
    this._titulo = !empty(assistaYoutube.titulo) ? assistaYoutube.titulo : '';
    this._tituloPlaylist = assistaYoutube.tituloPlaylist;
    this._urlYoutube = assistaYoutube.urlYoutube;
    this._dataPublicacao = assistaYoutube.dataPublicacao;
    this._thumbnailDefault = !empty(assistaYoutube.thumbnailDefault) ? assistaYoutube.thumbnailDefault : './foradoar.png';
    this._thumbnailMedium = !empty(assistaYoutube.thumbnailMedium) ? assistaYoutube.thumbnailMedium : './foradoar.png';
    Object.freeze(this);
  }

  static verificarSeExistemVideos(videosAssistaYoutube) {
    if (empty(videosAssistaYoutube) || !videosAssistaYoutube.filter) {
      return false;
    }
    return true;
  }

  get titulo() {
    return this._titulo;
  }

  get tituloPlaylist() {
    return this._tituloPlaylist;
  }

  get idYoutube() {
    return this._idYoutube;
  }

  get urlYoutube() {
    return this._urlYoutube;
  }

  get dataPublicacao() {
    return this._dataPublicacao;
  }

  get thumbnailDefault() {
    return this._thumbnailDefault;
  }

  get thumbnailMedium() {
    return this._thumbnailMedium;
  }

};
