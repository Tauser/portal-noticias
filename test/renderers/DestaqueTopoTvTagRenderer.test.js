const DestaqueTopoTvTagRenderer = require('../../src/renderers/DestaqueTopoTvTagRenderer');
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
  
describe('Caso de test da classe DestaqueTopoTvTagRenderer', () => {
    test('test DestaqueTopoTvTagRenderer', async done => {
        const home = await new ServiceCMS().obterHome('noticias');
        const destaqueTopoTvTagRenderer = new DestaqueTopoTvTagRenderer();
        destaqueTopoTvTagRenderer.setConteudoRequest(home);
        const destaqueTopoTvPartial = await destaqueTopoTvTagRenderer.renderizarHtml(renderizador);
        expect(destaqueTopoTvTagRenderer.nomeTag).toEqual('[eh-tv-destaque-topo-container]');
        expect(destaqueTopoTvPartial.tag).toEqual('[eh-tv-destaque-topo-container]');
        expect(destaqueTopoTvPartial.html).toEqual(expect.stringContaining('g-hot-call'));
        expect(destaqueTopoTvPartial.html).toEqual(expect.stringContaining('Reforma da Previdência: regime de capitalização (episódio 4)'));
        done();
    }, 5000);
});
