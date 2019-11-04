const controllerTest = require('../config/config-controller-test');
const mockProgramaTV = require('../mocks/cms/mock-programa-tv');
const mockEdicaoProgramaTV = require('../mocks/cms/mock-edicao-programa-tv');
const mockCategoriaSimples = require('../mocks/cms/programas-categorias/mock-programas-categoria');
const mockCategoriaComEspacoSimples = require('../mocks/cms/programas-categorias/mock-programas-categoria-espaco');
const mockCategoriaComMultiplosEspacos = require('../mocks/cms/programas-categorias/mock-programas-categoria-espaco-mult');
const mockProgramasCategorias = require('../mocks/cms/mock-categorias-programas');
const mockProgramasCategoriaDocumentaros = require('../mocks/cms/programas-categorias/mock-proramas-categoria-documentarios');
import MockRequestPromise from '../mocks/mock-request-promise';

describe('Caso de test tv controller', () => {

  test('Programa TV', async done => {
    MockRequestPromise.get(mockProgramaTV);
    const response = await controllerTest.get('/programa_tv/2218-asd');
    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual(expect.stringContaining('g-artigo__titulo'));
    expect(response.text).toEqual(expect.stringContaining('g-artigo__descricao'));
    done();
  });

  test('Edicao Programa TV', async done => {
    MockRequestPromise.get(mockEdicaoProgramaTV);
    const response = await controllerTest.get('/edicao_programa_tv/2220-asd');
    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual(expect.stringContaining('g-artigo__categoria'));
    expect(response.text).toEqual(expect.stringContaining('g-artigo__titulo'));
    expect(response.text).toEqual(expect.stringContaining('g-artigo__descricao'));
    done();
  });

  test('Programas Por Categoria', async done => {
    MockRequestPromise.get(mockCategoriaSimples);
    const response = await controllerTest.get('/tv/programa/cultura');

    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual(expect.stringContaining('Aqui Se Faz História'));
    expect(response.text).toEqual(expect.stringContaining('g-chamada__imagem'));
    expect(response.text).toEqual(expect.stringContaining('l-grid__item'));
    expect(response.text).toEqual(expect.stringContaining('titulo-secao__texto'));
    done();
  });

  test('Programas Por Categoria com Espaco e Letras Maiúsculas', async done => {
    MockRequestPromise.get(mockCategoriaComEspacoSimples);
    const response = await controllerTest.get('/tv/programa/Outras Procducoes');
    
    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual(expect.stringContaining('Fator de Risco'));
    expect(response.text).toEqual(expect.stringContaining('l-grid__item'));
    expect(response.text).toEqual(expect.stringContaining('titulo-secao__texto'));
    done();
  });

  test('Programas Por Categoria com Multipos Espacos', async done => {
    MockRequestPromise.get(mockCategoriaComMultiplosEspacos);
    const response = await controllerTest.get('/tv/programa/entrevistas e debates');

    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual(expect.stringContaining('g-chamada__titulo-link'));
    expect(response.text).toEqual(expect.stringContaining('15 Minutos de Cidadania'));
    expect(response.text).toEqual(expect.stringContaining('l-grid__item'));
    expect(response.text).toEqual(expect.stringContaining('titulo-secao__texto'));
    done();
  });

  test('Programas Tv Câmara', async done => {
    MockRequestPromise.get(mockProgramasCategorias);
    const response = await controllerTest.get('/tv/programas');

    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual(expect.stringContaining('/tv/programa/acervo'));
    expect(response.text).toEqual(expect.stringContaining('Documentários'));
    expect(response.text).toEqual(expect.stringContaining('secao-assista'));
    expect(response.text).toEqual(expect.stringContaining('Programas com Audiodescrição'));
    done();
  });

  test('Programas TV Categoria Documentários', async done => {
    MockRequestPromise.get(mockProgramasCategoriaDocumentaros);
    const response = await controllerTest.get('/tv/programa/documentarios');

    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual(expect.stringContaining('https://socithom.camara.gov.br/tv/387484-jornal-da-camara-18-07-2019/'));
    expect(response.text).toEqual(expect.stringContaining('Documentários'));
    expect(response.text).toEqual(expect.stringContaining('Gervásio Maia conversa sobre reforma da Previdência'));
    expect(response.text).toEqual(expect.stringContaining('Teste Bruno videos'));
    done();
  });
});
