const controllerTest = require('../config/config-controller-test');
const mockAssistaYoutubeSecaoPlaylists = require('../mocks/mock-assista-youtube-secao-playlists.json');
const mockAssistaYoutubeMaisAtualPlaylist = require('../mocks/mock-assista-youtube-mais-atual-playlists.json');
const mockHomeTvCamara = require('../mocks/mock-tv-camara.json');
//Mock ServiceCMS
jest.mock('../../src/service/service-cms', () => {
  return () => {
    return {
      obterHome: () => { return mockHomeTvCamara; }
    };
  };
});
//Mock ServiceAssistaYoutube
jest.mock('../../src/service/service-assista-youtube', () => {
  return () => {
    return {
      retornarVideosAssistaYoutubeSecaoPlaylists: () => { return mockAssistaYoutubeSecaoPlaylists; },
      retornarVideosAssistaMaisAtualPlaylist: () => { return mockAssistaYoutubeMaisAtualPlaylist; }
    };
  };
});
describe('Caso de test tv controller', () => {
  test('HOME TV', async () => {
    const response = await controllerTest.get('/tv');
    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual(expect.stringContaining('Assista'));
    expect(response.text).toEqual(expect.stringContaining('Estreia'));
    expect(response.text).toEqual(expect.stringContaining('Reforma da Previdência: regime de capitalização (episódio 4)'));
  }, 10000);
});
