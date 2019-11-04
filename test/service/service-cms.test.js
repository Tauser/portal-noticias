const request = require('../../src/config/request/request');
const ServiceCMS = require('../../src/service/service-cms');
const servicoElastic = require('../../src/service/service-elasticsearch');
const serviceCMS = new ServiceCMS(null, 'http://localhost:8080/cms', request, servicoElastic);
const mockNoticiaAgencia = require('../mocks/cms/mock-noticia-agencia');
const Agencia = require('../../src/dominio/Agencia');
const mockProgramaRadio = require('../mocks/cms/mock-programa-radio.json');
const ProgramaRadio = require('../../src/dominio/ProgramaRadio');
const mockEdicaoProgramaRadio = require('../mocks/cms/mock-edicao-programa-radio.json');
const EdicaoProgramaRadio = require('../../src/dominio/EdicaoProgramaRadio');
const mockProgramaTV = require('../mocks/cms/mock-programa-tv.json');
const ProgramaTV = require('../../src/dominio/ProgramaTV');
const mockRadioAgencia = require('../mocks/cms/mock-radio-agencia.json');
const RadioAgencia = require('../../src/dominio/RadioAgencia');
const mockEdicaoProgramaTV = require('../mocks/cms/mock-edicao-programa-tv.json');
const EdicaoProgramaTV = require('../../src/dominio/EdicaoProgramaTV');
const mockUltimasNoticias = require('../mocks/cms/mock-ultimas-noticias.json');
const PaginaDinamica = require('../../src/dominio/PaginaDinamica');
const mockHomeNoticias = require('../mocks/cms/mock-home-noticias.json');
const mockHomeRadioCamara = require('../mocks/cms/mock-radio-camara.json');
const mockHomeTvCamara = require('../mocks/cms/mock-tv-camara.json');
const Home = require('../../src/dominio/Home');
import MockRequestPromise from '../mocks/mock-request-promise';
describe('Caso de teste para Service CMS', () => {
  test('obterConteudoPorId - Agencia', async (done) => {
    MockRequestPromise.get(mockNoticiaAgencia);
    const agencia = await serviceCMS.obterConteudoPorId('/agencia/2208-asdfskajfdksajfl');
    expect(agencia).toBeInstanceOf(Agencia);
    expect(agencia.tipoConteudo).toEqual('agencia');
    done();
  });
  test('obterConteudoPorId - ProgramaRadio', async (done) => {
    MockRequestPromise.get(mockProgramaRadio);
    const programaRadio = await serviceCMS.obterConteudoPorId('/programa_radio/999-asdfskajfdksajfl');
    expect(programaRadio).toBeInstanceOf(ProgramaRadio);
    expect(programaRadio.tipoConteudo).toEqual('programa_radio');
    done();
  });
  test('obterConteudoPorId - EdicaoProgramaRadio', async (done) => {
    MockRequestPromise.get(mockEdicaoProgramaRadio);
    const edicaoProgramaRadio = await serviceCMS.obterConteudoPorId('/edicao_programa_radi/3366-asdfskajfdksajfl');
    expect(edicaoProgramaRadio).toBeInstanceOf(EdicaoProgramaRadio);
    expect(edicaoProgramaRadio.tipoConteudo).toEqual('edicao_programa_radi');
    done();
  });
  test('obterConteudoPorId - ProgramaTV', async (done) => {
    MockRequestPromise.get(mockProgramaTV);
    const programaTV = await serviceCMS.obterConteudoPorId('/programa_tv/2218-asdfskajfdksajfl');
    expect(programaTV).toBeInstanceOf(ProgramaTV);
    expect(programaTV.tipoConteudo).toEqual('programa_tv');
    done();
  });
  test('obterConteudoPorId - RadioAgencia', async (done) => {
    MockRequestPromise.get(mockRadioAgencia);
    const radioAgencia = await serviceCMS.obterConteudoPorId('/radio_agencia/2219-asdfskajfdksajfl');
    expect(radioAgencia).toBeInstanceOf(RadioAgencia);
    expect(radioAgencia.tipoConteudo).toEqual('radioagencia');
    done();
  });
  test('obterConteudoPorId - EdicaoProgramaTV', async (done) => {
    MockRequestPromise.get(mockEdicaoProgramaTV);
    const radioAgencia = await serviceCMS.obterConteudoPorId('/edicao_programa_tv/2219-asdfskajfdksajfl');
    expect(radioAgencia).toBeInstanceOf(EdicaoProgramaTV);
    expect(radioAgencia.tipoConteudo).toEqual('edicao_programa_tv');
    done();
  });
  test('obterConteudoPorId - UltimasNoticias', async (done) => {
    MockRequestPromise.get(mockUltimasNoticias);
    const ultimasNoticias = await serviceCMS.obterConteudoPorId('/ultimas-noticias/2010-asdfskajfdksajfl');
    expect(ultimasNoticias).toBeInstanceOf(PaginaDinamica);
    expect(ultimasNoticias.areaConteudo.slug).toEqual('noticias');
    expect(ultimasNoticias.tipoConteudo).toEqual('pagina_dinamica');
    done();
  });

  test('obterHome - Home Noticias', async (done) => {
    MockRequestPromise.get(mockHomeNoticias);
    const home = await serviceCMS.obterHome('noticias');
    expect(home).toBeInstanceOf(Home);
    expect(home.tipoConteudo).toEqual('area_conteudo');
    expect(home.html).toEqual(expect.anything());
    done();
  });

  test('obterHome - Home Radio', async (done) => {
    MockRequestPromise.get(mockHomeRadioCamara);
    const home = await serviceCMS.obterHome('radio-camara');
    expect(home).toBeInstanceOf(Home);
    expect(home.tipoConteudo).toEqual('areaconteudo');
    expect(home.html).toEqual(expect.anything());
    done();
  });
  test('obterHome - Home TV', async (done) => {
    MockRequestPromise.get(mockHomeTvCamara);
    const home = await serviceCMS.obterHome('tv-camara');
    expect(home).toBeInstanceOf(Home);
    expect(home.tipoConteudo).toEqual('area_conteudo');
    expect(home.html).toEqual(expect.anything());
    done();
  });
});