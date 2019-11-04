module.exports = class Noticia {

  /**
   * Atributos imutáveis
   * @param {*} post
   */
  constructor(post) {
    this._id = post.id;
    this._titulo = post.titulo;
    this._link = post.link;
    this._data = post.data;
    this._dataFormatada = post.data_formatada;
    this._horaFormatada = post.hora_formatada;
    this._resumo = post.resumo;
    this._area = post.area;
    this._imagemDestaque = post.imagem_destaque;
    this._video = post.video;
    this._audio = post.audio;

    Object.freeze(this);
  }

  get id () {
    return this._id;
  }

  get titulo () {
    return this._titulo;
  }

  get data () {
    return this._data;
  }

  get dataFormatada () {
    return this._dataFormatada;
  }

  get horaFormatada () {
    return this._horaFormatada;
  }

  get resumo () {
    return this._resumo;
  }

  get area () {
    return this._area;
  }

  get imagemDestaque () {
    return this._imagemDestaque;
  }

  get video () {
    return this._video;
  }

  get link() {
    return this._link;
  }
};
