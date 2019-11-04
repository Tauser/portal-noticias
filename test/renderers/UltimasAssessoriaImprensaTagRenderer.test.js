const UltimasAssessoriaImprensaTagRenderer = require('../../src/renderers/UltimasAssessoriaImprensaTagRenderer');
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
  
describe('Caso de test da classe UltimasAssessoriaImprensaTagRenderer', () => {
    test('test UltimasAssessoriaImprensaTagRenderer', async done => {
        const ultimasAssessoriaImprensaTagRenderer = new UltimasAssessoriaImprensaTagRenderer(new ServiceCMS());
        const ultimasAgenciaPartial = await ultimasAssessoriaImprensaTagRenderer.renderizarHtml(renderizador);
        expect(ultimasAssessoriaImprensaTagRenderer.nomeTag).toEqual('[ultimas-noticias-container]');
        expect(ultimasAgenciaPartial.tag).toEqual('[ultimas-noticias-container]');
        expect(ultimasAgenciaPartial.html).toEqual(expect.stringContaining('Últimas'));
        expect(ultimasAgenciaPartial.html).toEqual(expect.stringContaining('Comissões vão discutir permanência de indígenas e quilombolas nas universidades'));
        done();
    }, 5000);
});
