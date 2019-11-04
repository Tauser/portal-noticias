const DestaqueTopoTagRenderer = require('../../src/renderers/DestaqueTopoTagRenderer');
const ServiceCMS = require('../../src/service/service-cms');
const controllerTest = require('../config/config-controller-test');
const RenderHandlebarsUtil = require('../../src/util/RenderHandlebarsUtil');
const mockHomeNoticias = require('../mocks/mock-home-noticias');
const mockUltimas = require('../mocks/mock-ultimas');
const renderizador = async (arquivoHandlebars, contexto) => {
    return RenderHandlebarsUtil.render(controllerTest.expressHandlebars(), arquivoHandlebars, contexto);
};

//Mock ServiceCMS
jest.mock('../../src/service/service-cms', () => {
    return () => {
      return {
        obterHome: () => { return mockHomeNoticias; },
        obterConteudoPorUrl: () => { return mockUltimas; }
      };
    };
});
  
describe('Caso de test da classe DestaqueTopoTagRenderer', () => {
    test('test DestaqueTopoTagRenderer', async done => {
        const home = await new ServiceCMS().obterHome('noticias');
        const destaqueTopoTagRenderer = new DestaqueTopoTagRenderer();
        destaqueTopoTagRenderer.setConteudoRequest(home);
        const destaqueTopoPartial = await destaqueTopoTagRenderer.renderizarHtml(renderizador);
        expect(destaqueTopoTagRenderer.nomeTag).toEqual('[eh-noticias-destaque-topo-container]');
        expect(destaqueTopoPartial.tag).toEqual('[eh-noticias-destaque-topo-container]');
        expect(destaqueTopoPartial.html).toEqual(expect.stringContaining('Urgente'));
        expect(destaqueTopoPartial.html).toEqual(expect.stringContaining('Economia esperada com reforma da Previdência cai para R$ 915 bilhões em dez anos'));
        done();
    }, 5000);
});
