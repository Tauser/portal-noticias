const EstreiaTvTagRenderer = require('../../src/renderers/EstreiaTvTagRenderer');
const ServiceCMS = require('../../src/service/service-cms');
const controllerTest = require('../config/config-controller-test');
const RenderHandlebarsUtil = require('../../src/util/RenderHandlebarsUtil');
const mockHomeTv = require('../mocks/mock-tv-camara');
const renderizador = async (arquivoHandlebars, contexto) => {
    return RenderHandlebarsUtil.render(controllerTest.expressHandlebars(), arquivoHandlebars, contexto);
};

//Mock ServiceCMS
jest.mock('../../src/service/service-cms', () => {
    return () => {
      return {
        obterHome: () => { return mockHomeTv; }
      };
    };
});
  
describe('Caso de test da classe EstreiaTvTagRenderer', () => {
    test('test EstreiaTvTagRenderer', async done => {
        const home = await new ServiceCMS().obterHome('noticias');
        const destaqueTopoTvTagRenderer = new EstreiaTvTagRenderer();
        destaqueTopoTvTagRenderer.setConteudoRequest(home);
        const destaqueTopoTvPartial = await destaqueTopoTvTagRenderer.renderizarHtml(renderizador);
        expect(destaqueTopoTvTagRenderer.nomeTag).toEqual('[eh-tv-estreia-container]');
        expect(destaqueTopoTvPartial.tag).toEqual('[eh-tv-estreia-container]');
        expect(destaqueTopoTvPartial.html).toEqual(expect.stringContaining('Estreia'));
        done();
    }, 5000);
});
