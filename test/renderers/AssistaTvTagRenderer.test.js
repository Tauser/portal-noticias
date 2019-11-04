const AssistaTvTagRenderer = require('../../src/renderers/AssistaTvTagRenderer');
const ServiceAssistaYoutubeAPI = require('../../src/service/service-assista-youtube');
const controllerTest = require('../config/config-controller-test');
const RenderHandlebarsUtil = require('../../src/util/RenderHandlebarsUtil');
const mockAssistaYoutubeMaisAtualPlayLists = require('../mocks/mock-assista-youtube-mais-atual-playlists');
const mockAssistaYotubeSecaoPlayists = require('../mocks/mock-assista-youtube-secao-playlists');
const renderizador = async (arquivoHandlebars, contexto) => {
    return RenderHandlebarsUtil.render(controllerTest.expressHandlebars(), arquivoHandlebars, contexto);
};

//Mock ServiceAssistaYoutubeAPI
jest.mock('../../src/service/service-assista-youtube', () => {
    return () => {
        return {
            retornarVideosAssistaYoutubeSecaoPlaylists: () => { return mockAssistaYotubeSecaoPlayists; },
            retornarVideosAssistaMaisAtualPlaylist: () => { return mockAssistaYoutubeMaisAtualPlayLists; }
        };
    };
});

describe('Caso de test da classe AssistaTvTagRenderer', () => {
    test('test AssistaTvTagRenderer', async done => {
        const assistaTvTagRenderer = new AssistaTvTagRenderer(new ServiceAssistaYoutubeAPI());
        const assistaTvPartial = await assistaTvTagRenderer.renderizarHtml(renderizador);
        expect(assistaTvTagRenderer.nomeTag).toEqual('[eh-assista-tv-container]');
        expect(assistaTvPartial.tag).toEqual('[eh-assista-tv-container]');
        expect(assistaTvPartial.html).toEqual(expect.stringContaining('Assista'));
        expect(assistaTvPartial.html).toEqual(expect.stringContaining('Bolsonaro veta 36 pontos da Lei de Abuso de Autoridade - 05/09/19'));
        done();
    }, 5000);
});
