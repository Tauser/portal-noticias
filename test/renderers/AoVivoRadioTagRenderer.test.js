const AoVivoRadioTagRenderer = require('../../src/renderers/AoVivoRadioTagRenderer');
const ServiceCMS = require('../../src/service/service-cms');
const controllerTest = require('../config/config-controller-test');
const RenderHandlebarsUtil = require('../../src/util/RenderHandlebarsUtil');
const mockHomeRadio = require('../mocks/mock-home-radio');
const renderizador = async (arquivoHandlebars, contexto) => {
    return RenderHandlebarsUtil.render(controllerTest.expressHandlebars(), arquivoHandlebars, contexto);
};

//Mock ServiceCMS
jest.mock('../../src/service/service-cms', () => {
    return () => {
      return {
        obterHome: () => { return mockHomeRadio; }
      };
    };
  });
  
describe('Caso de test da classe AoVivoRadioTagRenderer', () => {

    test('test AoVivoRadioTagRenderer', async done => {
        const home = await new ServiceCMS().obterHome('noticias');
        const aoVivoRadioTagRenderer = new AoVivoRadioTagRenderer();
        aoVivoRadioTagRenderer.setConteudoRequest(home);
        const destaqueTopoPartial = await aoVivoRadioTagRenderer.renderizarHtml(renderizador);
        expect(aoVivoRadioTagRenderer.nomeTag).toEqual('[eh-radio-ao-vivo-container]');
        expect(destaqueTopoPartial.tag).toEqual('[eh-radio-ao-vivo-container]');
        expect(destaqueTopoPartial.html).toEqual(expect.stringContaining('Ao Vivo'));
        expect(destaqueTopoPartial.html).toEqual(expect.stringContaining('96.9 FM'));
        done();
    }, 5000);
    
});
