const controllerTest = require('../config/config-controller-test');
const mockNoticiaAgencia = require('../mocks/cms/mock-noticia-agencia');
const mockUltimasNoticiasLista = require('../mocks/cms/mock-ultimas-noticias-lista');
import MockRequestPromise from '../mocks/mock-request-promise';

describe('Caso de test noticias controller', () => {
  test('Noticias Agenda completo', async done => {
    MockRequestPromise.get(mockNoticiaAgencia);
    const response = await controllerTest.get('/agencia/2556-seminario-no-parana-debate-o-fim-do-foro-privilegiado');
    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual(expect.stringContaining('g-artigo__categoria'));
    expect(response.text).toEqual(expect.stringContaining('g-artigo__titulo'));
    expect(response.text).toEqual(expect.stringContaining('g-artigo__descricao'));
    expect(response.text).toEqual(expect.stringContaining('07/08/2018'));
    expect(response.text).toEqual(expect.stringContaining('Comissão temporária criada para analisar e votar proposta de emenda à Constituição (PEC), projeto de código e propostas que envolvam matéria de competência de mais de três comissões de mérito.'));
    expect(response.text).toEqual(expect.stringContaining('mejs__player'));
    expect(response.text).toEqual(expect.stringContaining('noticia-audio'));
    expect(response.text).toEqual(expect.stringContaining('comentarios-conteiner'));
    expect(response.text).toEqual(expect.stringContaining('veja-tambem-conteiner'));
    expect(response.text).toEqual(expect.stringContaining('g-chamada'));
    expect(response.text).toEqual(expect.stringContaining('g-chamada__retranca'));
    expect(response.text).toEqual(expect.stringContaining('g-chamada__titulo'));
    expect(response.text).toEqual(expect.stringContaining('mais-conteudo-conteiner'));
    expect(response.text).toEqual(expect.stringContaining('Mais conteúdo sobre'));
    expect(response.text).toEqual(expect.stringContaining('Lista de assuntos relacionados a esta notícia'));
    expect(response.text).toEqual(expect.stringContaining('siga-noticia'));
    done();
  });

  test('Ultimas Noticias', async done => {
    MockRequestPromise.get(mockUltimasNoticiasLista);
    const response = await controllerTest.get('/noticias/ultimas/2010-asd');
    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual(expect.stringContaining('l-lista-noticias'));
    expect(response.text).toEqual(expect.stringContaining('chamada--ultimas'));
    expect(response.text).toEqual(expect.stringContaining('Novo presidente do Inep garante que não haverá censura de temas nas provas do Enem'));
    done();
  });

});
