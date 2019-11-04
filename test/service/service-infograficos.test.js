const request = require('../../src/config/request/request');
const ServiceInfograficosAPI = require('../../src/service/service-infograficos');
const serviceInfograficosAPI = new ServiceInfograficosAPI(null, 'http://localhost:8080/infograficos', request);
const mockInfograficosJSON = require('../mocks/cms/mock-infograficos.json');
const mockInfograficosDominioJSON = require('../mocks/mock-infograficos.json');
import MockRequestPromise from '../mocks/mock-request-promise';
describe('Caso de teste para o servico infograficos', () => {
    test('Verificar se o servico esta retornando os infograficos', async (done) => {
        MockRequestPromise.get(mockInfograficosJSON);
        const infograficos = await serviceInfograficosAPI.retornarInfograficos();
        expect(infograficos[0]).toEqual(expect.objectContaining(mockInfograficosDominioJSON[0]));
        expect(infograficos[1]).toEqual(expect.objectContaining(mockInfograficosDominioJSON[1]));
        expect(infograficos[2]).toEqual(expect.objectContaining(mockInfograficosDominioJSON[2]));
        done();
    });
});