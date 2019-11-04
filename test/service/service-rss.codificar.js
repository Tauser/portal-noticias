// const request = require('../../src/config/request/request');
const profile = require('../../src/config/profile/profiles').profile();
const serviceCMSAPI = require('../../src/service/service-cms')();
const mockUltimasJSON = require('../mocks/cms/dinamica/mock-ultimas-noticias-agencia.json');
const ServiceRSSAPI = require('../../src/service/service-rss');
const serviceRSSAPI = new ServiceRSSAPI(null, null, null, profile.rssMeta);
const mockRssJSON = require('../mocks/mock-rss.json');
jest.mock('../../src/service/service-cms', () => {
    return () => {
        return {
            obterConteudoPorUrl: () => { return mockUltimasJSON; }
        };
    };
});
describe('Caso de teste para o servico rss', () => {
    test('Verificar se o servico esta retornando o objeto rss', async (done) => {
        const conteudoWP = await serviceCMSAPI.obterConteudoPorUrl('dinamica?tipo=agencia');
        const feed = await serviceRSSAPI.gerarCabecalhoRSS();
        const rss = await serviceRSSAPI.converteJsonParaRSS('host-selva', feed, conteudoWP);
        expect(JSON.stringify(rss)).toEqual(JSON.stringify(mockRssJSON));
        done();

    });
});