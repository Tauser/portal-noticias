// const ServiceAssista = require('../../src/service/service-assista-api');
// const serviceAssistaAPISemCache = new ServiceAssista();
// const serviceDI = require('../../src/config/di/service-di');
const request = require('../../src/config/request/request');
const ServiceAssistaYoutube = require('../../src/service/service-assista-youtube');
const serviceAssistaYoutube = new ServiceAssistaYoutube(null, 'http://localhost:8080/assista', request);
const mockAssistaYoutubeSecaoPlaylists = require('../mocks/mock-assista-youtube-secao-playlists.json');
const mockAssistaYoutubeMaisAtualPlaylists = require('../mocks/mock-assista-youtube-mais-atual-playlists.json');
// import MockRequestPromise from '../mocks/mock-request-promise';
describe('Caso de teste para o servico assista youtube', () => {
    test('Verificar se o servico esta retornando os videos do assista youtube - secao playlists', async (done) => {
        // MockRequestPromise.get(mockAssistaYoutubeSecaoPlaylists);
        const assista = await serviceAssistaYoutube.retornarVideosAssistaYoutubeSecaoPlaylists();
        expect(assista[0]).toEqual(expect.objectContaining(mockAssistaYoutubeSecaoPlaylists[0]));
        expect(assista[1]).toEqual(expect.objectContaining(mockAssistaYoutubeSecaoPlaylists[1]));
        done();
    });
    test('Verificar se o servico esta retornando os videos do assista youtube - mais atual playlists', async (done) => {
        // MockRequestPromise.get(mockAssistaYoutubeMaisAtualPlaylists);
        const assista = await serviceAssistaYoutube.retornarVideosAssistaMaisAtualPlaylist();
        expect(assista[0]).toEqual(expect.objectContaining(mockAssistaYoutubeMaisAtualPlaylists[0]));
        done();
    });
});