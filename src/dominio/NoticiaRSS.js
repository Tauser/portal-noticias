module.exports = class NoticiaRSS {

  /**
  * Atributos imutáveis
  * @param {*} conteudoWP
  */
  constructor(host, conteudoWP) {
    let dataConvertida = this.getDataHoraModificao (conteudoWP);
    this.title = conteudoWP.titulo;
    this.link = host + conteudoWP.link;
    this.description = conteudoWP.resumo;
    this.content = conteudoWP.conteudo;
    this.pubDate = dataConvertida;
    this.guid = host + conteudoWP.link;
    this.date = dataConvertida;
    this.author = [
      {name: 'Câmara dos Deputados'}
    ];
    Object.freeze(this);
  }
  getDataHoraModificao(conteudoWP) {
    var dataConvertida = null;
    if (conteudoWP._data_formatada && conteudoWP._hora_formatada) {
      let dtStr = conteudoWP._data_formatada.split('/');
      let hora = conteudoWP._hora_formatada.split(':');
      dataConvertida = new Date(dtStr[2], dtStr[1]-1, dtStr[0], hora[0], hora[1]);
    }
    return dataConvertida;
  }

};
