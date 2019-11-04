const BancoDeImagemTagRenderer = require('../../src/renderers/BancoDeImagemTagRenderer');
const ServiceBancoImagens = require('../../src/service/service-banco-imagens');
const ServiceJornal = require('../../src/service/service-jornal');
const controllerTest = require('../config/config-controller-test');
const RenderHandlebarsUtil = require('../../src/util/RenderHandlebarsUtil');
const mockBancoImagens = require('../mocks/banco-imagens/mock-banco-imagens');
const mockJornal = require('../mocks/mock-jornal');
const renderizador = async (arquivoHandlebars, contexto) => {
    return RenderHandlebarsUtil.render(controllerTest.expressHandlebars(), arquivoHandlebars, contexto);
};

//Mock ServiceBancoImagens
jest.mock('../../src/service/service-banco-imagens', () => {
    return () => {
        return {
            retornarImagemPrincipal: () => { return mockBancoImagens[0]; },
            retornarImagensSecundarias: () => { return mockBancoImagens.slice(1, mockBancoImagens.length - 2); }
        };
    };
});

//Mock ServiceJornal
jest.mock('../../src/service/service-jornal', () => {
    return () => {
        return {
            retornarJornal: () => { return mockJornal; }
        };
    };
});

describe('Caso de test da classe BancoDeImagemTagRenderer', () => {
    test('test BancoDeImagemTagRenderer', async done => {
        const bancoDeImagemTagRenderer = new BancoDeImagemTagRenderer(new ServiceBancoImagens(), new ServiceJornal());
        const bancoImagensPartial = await bancoDeImagemTagRenderer.renderizarHtml(renderizador);
        expect(bancoDeImagemTagRenderer.nomeTag).toEqual('[eh-banco-imagens-jornal-container]');
        expect(bancoImagensPartial.tag).toEqual('[eh-banco-imagens-jornal-container]');
        expect(bancoImagensPartial.html).toEqual(expect.stringContaining('Banco de Imagens'));
        expect(bancoImagensPartial.html).toEqual(expect.stringContaining('https://www.camara.leg.br/internet/bancoimagem/banco/2019/06/img20190618101338497MED.jpg'));
        expect(bancoImagensPartial.html).toEqual(expect.stringContaining('https://www.camara.leg.br/internet/bancoimagem/banco/2019/06/img20190618101334980PEQ.jpg'));
        expect(bancoImagensPartial.html).toEqual(expect.stringContaining('https://www.camara.leg.br/internet/bancoimagem/banco/2019/06/img20190618101331278PEQ.jpg'));
        expect(bancoImagensPartial.html).toEqual(expect.stringContaining('https://www.camara.leg.br/internet/bancoimagem/banco/2019/06/img20190618101326792PEQ.jpg'));
        expect(bancoImagensPartial.html).toEqual(expect.stringContaining('https://www.camara.leg.br/internet/bancoimagem/banco/2019/06/img20190618101322301PEQ.jpg'));
        expect(bancoImagensPartial.html).toEqual(expect.stringContaining('https://www.camara.leg.br/internet/bancoimagem/banco/2019/06/img20190618101318212PEQ.jpg'));
        done();
    }, 5000);
});
