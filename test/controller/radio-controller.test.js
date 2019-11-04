const controllerTest = require('../config/config-controller-test');
const mockProgramaRadio = require('../mocks/cms/mock-programa-radio');
const mockEdicaoProgramaRadio = require('../mocks/cms/mock-edicao-programa-radio');
const mockRadioAgenciaLista = require('../mocks/cms/mock-radio-agencia-lista');
const mockHomeRadioCamara = require('../mocks/cms/mock-radio-camara');
const mockProgramaRadioCategoria = require('../mocks/cms/radio-programas-categorias/mock-radio-categoria');
const mockProgramaRadioCategoriaEspaco = require('../mocks/cms/radio-programas-categorias/mock-radio-categoria-espaco');
const mockProgramaRadioCategoriaMultiEspaco = require('../mocks/cms/radio-programas-categorias/mock-radio-categoria-espaco-mult');
const mockProgramasCategorias = require('../mocks/cms/mock-categorias-programas');
const mockProgramacaoSemanal = require('../mocks/cms/programacao/mock-programacao-semanal-radio');
import MockRequestPromise from '../mocks/mock-request-promise';

describe('Caso de test radio controller', () => {

  test('Programa Radio', async done => {
    MockRequestPromise.get(mockProgramaRadio);
    const response = await controllerTest.get('/programa_radio/2216-label');
    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual(expect.stringContaining('g-artigo__titulo'));
    expect(response.text).toEqual(expect.stringContaining('g-artigo__descricao'));
    done();
  });

  test('Edicao Programa Radio', async done => {
    MockRequestPromise.get(mockEdicaoProgramaRadio);
    const response = await controllerTest.get('/edicao_programa_radio/2217-label');
    expect(response.text).toEqual(expect.stringContaining('g-artigo__titulo'));
    expect(response.text).toEqual(expect.stringContaining('g-artigo__descricao'));
    expect(response.statusCode).toBe(200);
    done();
  });

  test('Radio Agencia', async done => {
    MockRequestPromise.get(mockRadioAgenciaLista);
    const response = await controllerTest.get('/radio/ultimas/2219-asd');
    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual(expect.stringContaining('l-lista-noticias'));
    expect(response.text).toEqual(expect.stringContaining('Entidades defendem PEC que torna Fundeb permanente'));
    done();
  });

  test('Home Radio Camara', async done => {
    MockRequestPromise.get(mockHomeRadioCamara);
    const response = await controllerTest.get('/radio/');
    expect(response.statusCode).toBe(200);
    done();
  });

  test('Programa de Radio por Categoria Maiúscula', async done => {
    MockRequestPromise.get(mockProgramaRadioCategoria);
    const response = await controllerTest.get('/radio/programa/Jornalismo');
    
    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual(expect.stringContaining('g-chamada__titulo-link'));
    expect(response.text).toEqual(expect.stringContaining('Vida Longa'));
    expect(response.text).toEqual(expect.stringContaining('l-grid__item'));
    expect(response.text).toEqual(expect.stringContaining('titulo-secao__texto'));
    done();
  });

  test('Programa de Rádio por Categoria', async done => {
    MockRequestPromise.get(mockProgramaRadioCategoriaEspaco);
    const response = await controllerTest.get('/radio/programa/cultura');

    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual(expect.stringContaining('g-chamada__titulo-link'));
    expect(response.text).toEqual(expect.stringContaining('Câncer de pele'));
    expect(response.text).toEqual(expect.stringContaining('l-grid__item'));
    expect(response.text).toEqual(expect.stringContaining('titulo-secao__texto'));
    done();
  });

  test('Programa de radio por Categoria Multi Espaço', async done => {
    MockRequestPromise.get(mockProgramaRadioCategoriaMultiEspaco);
    const response = await controllerTest.get('/radio/programa/spots e campanhas');
    
    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual(expect.stringContaining('g-chamada__titulo-link'));
    expect(response.text).toEqual(expect.stringContaining('Fim de jogo para o racismo'));
    expect(response.text).toEqual(expect.stringContaining('l-grid__item'));
    expect(response.text).toEqual(expect.stringContaining('titulo-secao__texto'));
    done();
  });

  test('Programas Rádio Câmara', async done => {
    MockRequestPromise.get(mockProgramasCategorias);
    const response = await controllerTest.get('/radio/programas');

    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual(expect.stringContaining('/radio/programa/acervo'));
    expect(response.text).toEqual(expect.stringContaining('Documentários'));
    expect(response.text).toEqual(expect.stringContaining('secao-assista'));
    expect(response.text).toEqual(expect.stringContaining('Outras produções'));
    expect(response.text).toEqual(expect.stringContaining('Programas com Audiodescrição'));
    done();
  });

  test('Programação Semanal Rádio Câmara', async done => {
    MockRequestPromise.get(mockProgramacaoSemanal);
    const response = await controllerTest.get('/radio/programacao');

    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual(expect.stringContaining('/radio/166-a-musica-do-dia'));
    expect(response.text).toEqual(expect.stringContaining('Reportagem Especial'));
    expect(response.text).toEqual(expect.stringContaining('table-striped'));
    expect(response.text).toEqual(expect.stringContaining('Aqui se Faz Hostória'));
    expect(response.text).toEqual(expect.stringContaining('/radio/396-primeiros-paragrafos'));
    done();
  });

});
