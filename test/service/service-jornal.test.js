const request = require('../../src/config/request/request');
const ServiceJornalAPI = require('../../src/service/service-jornal');
const serviceJornalAPI = new ServiceJornalAPI(null, 'http://localhost:8080/jornal', request);
const fs = require('fs');
const mockJornalDominioJSON = require('../mocks/mock-jornal.json');
import MockRequestPromise from '../mocks/mock-request-promise';
describe('Caso de teste para o servico jornal', () => {
    test('Verificar se o servico esta retornando o jornal mais recente', async (done) => {
        MockRequestPromise.get(fs.readFileSync('test/mocks/jornal/jornal.html', 'utf8'));
        const jornal = await serviceJornalAPI.retornarJornal();
        expect(jornal).toEqual(expect.objectContaining(mockJornalDominioJSON));
        done();

    });
});