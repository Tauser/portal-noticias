const request = require('../../src/config/request/request');
const ServiceAssista = require('../../src/service/service-assista');
const serviceAssista = new ServiceAssista(null, 'http://localhost:8080/assista', request);
const mockAssistaJSON = require('../mocks/mock-assista.json');
import MockRequestPromise from '../mocks/mock-request-promise';
describe('Caso de teste para o servico assista', () => {
    test('Verificar se o servico esta retornando os videos do assista', async (done) => {
        MockRequestPromise.get(mockAssistaJSON);
        const assista = await serviceAssista.retornarVideosAssista();
        expect(assista[0]).toEqual(expect.objectContaining(mockAssistaJSON[0]));
        expect(assista[1]).toEqual(expect.objectContaining(mockAssistaJSON[1]));
        expect(assista[2]).toEqual(expect.objectContaining(mockAssistaJSON[2]));
        expect(assista[3]).toEqual(expect.objectContaining(mockAssistaJSON[3]));
        done();
    });
});