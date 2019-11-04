const mockAssista = require('../mocks/mock-assista');
const AssistaTagRenderer = require('../../src/renderers/AssistaTagRenderer');
const ServiceAssista = require('../../src/service/service-assista');
const controllerTest = require('../config/config-controller-test');
const RenderHandlebarsUtil = require('../../src/util/RenderHandlebarsUtil');
const renderizador = async (arquivoHandlebars, contexto) => {
    return RenderHandlebarsUtil.render(controllerTest.expressHandlebars(), arquivoHandlebars, contexto);
};

//Mock ServiceAssista
jest.mock('../../src/service/service-assista', () => {
    return () => {
        return {
            retornarVideosAssista: () => { return mockAssista; }
        };
    };
});

describe('Caso de test da classe AssistaTagRenderer', () => {
    test('test AssistaTagRenderer', async done => {
        const assistaTagRenderer = new AssistaTagRenderer(new ServiceAssista());
        const assistaPartial = await assistaTagRenderer.renderizarHtml(renderizador);
        expect(assistaTagRenderer.nomeTag).toEqual('[eh-assista-container]');
        expect(assistaPartial.tag).toEqual('[eh-assista-container]');
        expect(assistaPartial.html).toEqual(expect.stringContaining('Assista'));
        expect(assistaPartial.html).toEqual(expect.stringContaining('Práticas violadoras de direitos humanos no comportamento de psicopatas e sociopatas'));
        
        done();
    }, 5000);

});
