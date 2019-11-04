// const winston = require('../config/logger/winston');
const AssistaYoutube = require('../dominio/assista/AssistaYoutube');
const cacheMinutos = 3;
// const idSecaoCanalNoticiasTVRadioCamara = 'UC-ZkSRh-7UEuwXJQ9UMCFJA.0VMEPAJuK7Y';
// const idSecaoCanalProgramasDocumentarios = 'UC-ZkSRh-7UEuwXJQ9UMCFJA.HvfQ0AKougw';
// const idPlaylistDestaques = 'PLitz1J-q25kMrWNkYlHibdXGabhUZDz6D';

class ServiceAssistaYoutubeAPI {

  constructor(configCache, urlAssita, clienteHttp) {
    this.configCache = configCache;
    this.urlAssita = urlAssita;
    this.clienteHttp = clienteHttp;
  }

  async retornarVideosAssistaYoutubeSecaoPlaylists() {
    // const urlApi = '/assista/secao-playlists?ids=' + idSecaoCanalNoticiasTVRadioCamara + ','+ idSecaoCanalProgramasDocumentarios;
        let assista = null;
    if (this.configCache) {
      assista = await this.configCache.get(['portal-noticias-assista-youtube-secao-playlists'], cacheMinutos, () => { return this.retornarVideosAssistaYoutubeSecaoPlaylistsJson(); });
    } else {
      assista = await this.retornarVideosAssistaYoutubeSecaoPlaylistsJson();
    }
    return AssistaYoutube.verificarSeExistemVideos(assista) ? this._criarVideosAssistaYoutube(assista) : null;

  }

  async retornarVideosAssistaMaisAtualPlaylist() {
    // const urlApi = '/assista/mais-atual-playlist?ids=' + idPlaylistDestaques;
        let assista = null;
    if (this.configCache) {
      assista = await this.configCache.get(['portal-noticias-assista-mais-atual-playlist'], cacheMinutos, () => { return this.retornarVideosAssistaMaisAtualPlaylistJson(); });
    } else {
      assista = await this.retornarVideosAssistaMaisAtualPlaylistJson();
    }
    return AssistaYoutube.verificarSeExistemVideos(assista) ? this._criarVideosAssistaYoutube(assista) : null;

  }

  _criarVideosAssistaYoutube(assista) {
    let videosAssista = [];
    if (assista.map) {
      assista.map((videos) => {
        videosAssista.push(new AssistaYoutube(videos));
      });
    }
    return videosAssista;
  }
  //TODO no momento foi comentado ate definir como vai ser a nova implementacao para retornar videos do youtube
  // async _getRequest(urlApi) {
  //   return this.clienteHttp
  //     .get(this.urlAssita + urlApi)
  //     .then(response => {
  //       return response.assista || response;
  //     })
  //     .catch(e => {
  //       winston.error(`${__filename} - ${this.urlAssita}${urlApi} - ${e.message}`);
  //     });
  // }

  async retornarVideosAssistaYoutubeSecaoPlaylistsJson() {
    return [
      {
        'idYoutube': 'z11G3Nd0I6A',
        'titulo': 'Especialistas divergem do prazo de transição do sistema tributário - 03/09/19',
        'thumbnailDefault': 'https://i.ytimg.com/vi/z11G3Nd0I6A/default.jpg',
        'thumbnailMedium': 'https://i.ytimg.com/vi/z11G3Nd0I6A/mqdefault.jpg',
        'urlYoutube': 'https://www.youtube.com/watch?v=z11G3Nd0I6A&list=PLitz1J-q25kMVJN-86KGBvo5D7AtL9wj9&index=2&t=0s',
        'tituloPlaylist': 'Reforma Tributária',
        'dataPublicacao': '03/09/2019'
      },
      {
        'idYoutube': 'Msk84XDDZPg',
        'titulo': 'Câmara amplia debate sobre preservação da Amazônia - 06/09/19',
        'thumbnailDefault': 'https://i.ytimg.com/vi/Msk84XDDZPg/default.jpg',
        'thumbnailMedium': 'https://i.ytimg.com/vi/Msk84XDDZPg/mqdefault.jpg',
        'urlYoutube': 'https://www.youtube.com/watch?v=Msk84XDDZPg&list=PLitz1J-q25kPtuvnoK0ABrqoGrJH_2-gl&index=2&t=0s',
        'tituloPlaylist': 'Reportagem - Setembro 2019',
        'dataPublicacao': '06/09/2019'
      }
    ];
  }

  async retornarVideosAssistaMaisAtualPlaylistJson() {
    return [
      {
        'idYoutube': 'ERV0MM2CkxE',
        'titulo': 'Bolsonaro veta 36 pontos da Lei de Abuso de Autoridade - 05/09/19',
        'thumbnailDefault': 'https://i.ytimg.com/vi/ERV0MM2CkxE/default.jpg',
        'thumbnailMedium': 'https://i.ytimg.com/vi/ERV0MM2CkxE/mqdefault.jpg',
        'urlYoutube': 'https://www.youtube.com/watch?v=ERV0MM2CkxE&list=PLitz1J-q25kMB5dfH18GnfW_bX3CZ6a3j&index=2&t=0s',
        'tituloPlaylist': 'Destaques – Setembro 2019',
        'dataPublicacao': '05/09/2019'
      }
    ];
  }
}

module.exports = ServiceAssistaYoutubeAPI;
