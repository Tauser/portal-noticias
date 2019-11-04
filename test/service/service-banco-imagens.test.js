const request = require('../../src/config/request/request');
const ServiceBancoImagensAPI = require('../../src/service/service-banco-imagens');
const serviceBancoImagensAPI = new ServiceBancoImagensAPI(null, 'http://localhost:8080/banco-imagens', request);
const mockBancoImagensJSON = require('../mocks/banco-imagens/mock-banco-imagens.json');
const mockBancoImagensDominioJSON = require('../mocks/mock-banco-imagens.json');
import MockRequestPromise from '../mocks/mock-request-promise';
describe('Caso de teste para o servico banco imagens', () => {
    test('Verificar se o servico esta retornando as imagens', async (done) => {
        MockRequestPromise.get(mockBancoImagensJSON);
        const imagemPrincipal = await serviceBancoImagensAPI.retornarImagemPrincipal();
        const bancoImagens = await serviceBancoImagensAPI.retornarImagensSecundarias();
        expect(imagemPrincipal).toEqual(expect.objectContaining(mockBancoImagensDominioJSON[0]));
        expect(bancoImagens[0]).toEqual(expect.objectContaining(mockBancoImagensDominioJSON[1]));
        expect(bancoImagens[1]).toEqual(expect.objectContaining(mockBancoImagensDominioJSON[2]));
        expect(bancoImagens[2]).toEqual(expect.objectContaining(mockBancoImagensDominioJSON[3]));
        expect(bancoImagens[3]).toEqual(expect.objectContaining(mockBancoImagensDominioJSON[4]));
        done();
    });
});