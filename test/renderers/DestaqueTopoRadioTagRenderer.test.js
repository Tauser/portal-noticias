const DestaqueTopoRadioTagRenderer = require('../../src/renderers/DestaqueTopoRadioTagRenderer');
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
  
describe('Caso de test da classe DestaqueTopoRadioTagRenderer', () => {
    test('test DestaqueTopoRadioTagRenderer', async done => {
        const home = await new ServiceCMS().obterHome('noticias');
        const destaqueTopoRadioTagRenderer = new DestaqueTopoRadioTagRenderer();
        destaqueTopoRadioTagRenderer.setConteudoRequest(home);
        const destaqueTopoRadioPartial = await destaqueTopoRadioTagRenderer.renderizarHtml(renderizador);
        expect(destaqueTopoRadioTagRenderer.nomeTag).toEqual('[eh-radio-destaque-topo-container]');
        expect(destaqueTopoRadioPartial.tag).toEqual('[eh-radio-destaque-topo-container]');
        expect(destaqueTopoRadioPartial.html).toEqual(expect.stringContaining('g-hot-call'));
        expect(destaqueTopoRadioPartial.html).toEqual(expect.stringContaining('Deputado esclarece importância da regulamentação do canabidiol para uso terapêutico no Brasil'));
        done();
    }, 5000);
});
