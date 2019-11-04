const request = require('../../src/config/request/request');
const ServiceDadosAbertosAPI = require('../../src/service/service-dados-abertos');
const serviceDadosAbertosAPI = new ServiceDadosAbertosAPI(null, 'http://localhost:8080/dados-abertos-proposicoes', request);
const mockDadosAbertosProposicoesJSON = require('../mocks/dados-abertos/mock-dados-abertos-proposicoes.json');
const mockDadosAbertosProposicoesDominioJSON = require('../mocks/mock-dados-abertos-proposicoes.json');
import MockRequestPromise from '../mocks/mock-request-promise';
describe('Caso de teste para o servico dados abertos proposicoes', () => {
    test('Verificar se o servico esta retornando as proposicoes', async (done) => {
        MockRequestPromise.get(mockDadosAbertosProposicoesJSON);
        const proposicoes = await serviceDadosAbertosAPI.retornarProjetosDeLei();
        expect(proposicoes[0]).toEqual(expect.objectContaining(mockDadosAbertosProposicoesDominioJSON[0]));
        expect(proposicoes[1]).toEqual(expect.objectContaining(mockDadosAbertosProposicoesDominioJSON[1]));
        expect(proposicoes[2]).toEqual(expect.objectContaining(mockDadosAbertosProposicoesDominioJSON[2]));
        done();
    });
});