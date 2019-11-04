const BreadCrumbsUtil = require('../../src/util/BreadCrumbsUtil');
const BreadCrumbsMock = require('../mocks/breadcrumbs.json');

describe('Caso de teste para BreadCrumbsUtil', () => {
    test('converterFormatHandlebars', (done) => {
        const breadCrumbsHandlebars = BreadCrumbsUtil.converterFormatHandlebars(BreadCrumbsMock.breadcrumbs);
        expect(breadCrumbsHandlebars).toContain('Notícias');
        expect(breadCrumbsHandlebars).toContain('/portal/1925-noticias');
        expect(breadCrumbsHandlebars).toContain('NOTICIA TESTE AGENCIA');
        expect(breadCrumbsHandlebars).toContain('/portal/noticias/2208-noticia-teste-agencia');
        done();
    });
});