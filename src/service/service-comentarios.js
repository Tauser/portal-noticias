const winston = require('../config/logger/winston');
const profile = require('../config/profile/profiles').profile();

class serviceComentariosWS {
  constructor(configCache, comentariosURLAPI, clienteHttp) {
    this.configCache = configCache;
    this.comentariosURLAPI = comentariosURLAPI;
    this.clienteHttp = clienteHttp;
  }

  async retornaQuantidadeComentarios (idNoticia) {
    const secretComentario = process.env.SECRET_COMENTARIO || profile.secretComentario;
    let conteudo = null;
    const url = this.comentariosURLAPI + idNoticia;
    conteudo = await this._getRequest(url,secretComentario);
    return conteudo;
  }

  async _getRequest (url, secretComentario) {
      return this.clienteHttp.get({
        headers:{'User-Agent': 'Request-Promise', 'Accept': 'text/html, application/xhtml+xml, application/xml;q=0.9, */*;q=0.8'},
        auth: {'user': 'portal-noticias', 'pass': secretComentario, 'sendImmediately': false}, 
      url: url}).then(response => {
      return response;
    })
      .catch(e => {
        winston.error(`${__filename} - retornaQuantidadeComentarios: ${url} - ${e.message}`);
        return [];
      });
  }

}
module.exports = serviceComentariosWS;
