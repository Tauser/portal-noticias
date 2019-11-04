const UltimasAgenciaTagRenderer = require('../../src/renderers/UltimasAgenciaTagRenderer');
const ServiceCMS = require('../../src/service/service-cms');
const controllerTest = require('../config/config-controller-test');
const RenderHandlebarsUtil = require('../../src/util/RenderHandlebarsUtil');
const mockUltimas = require('../mocks/mock-ultimas');
const mockHomeNoticias = require('../mocks/mock-home-noticias');
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
  
describe('Caso de test da classe UltimasAgenciaTagRenderer', () => {
    test('test UltimasAgenciaTagRenderer', async done => {
        const ultimasAgenciaTagRenderer = new UltimasAgenciaTagRenderer(new ServiceCMS());
        const ultimasAgenciaPartial = await ultimasAgenciaTagRenderer.renderizarHtml(renderizador);
        expect(ultimasAgenciaTagRenderer.nomeTag).toEqual('[eh-ultimas-noticias-container]');
        expect(ultimasAgenciaPartial.tag).toEqual('[eh-ultimas-noticias-container]');
        expect(ultimasAgenciaPartial.html).toEqual(expect.stringContaining('Últimas'));
        expect(ultimasAgenciaPartial.html).toEqual(expect.stringContaining('Comissões vão discutir permanência de indígenas e quilombolas nas universidades'));
        done();
    }, 5000);
});
