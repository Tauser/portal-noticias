const controllerTest = require('../config/config-controller-test');
const mockPaginaAgencia = require('../mocks/estaticas/mock-pagina-agencia');
const mockPaginaTv = require('../mocks/estaticas/mock-pagina-tv');
const mockPaginaRadio = require('../mocks/estaticas/mock-pagina-radio');
import MockRequestPromise from '../mocks/mock-request-promise';

describe('Caso de test noticias controller', () => {
  test('Página Agencia', async done => {
    MockRequestPromise.get(mockPaginaAgencia);
    const response = await controllerTest.get('/conteudo/agencia/expediente');
    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual(expect.stringContaining('NOTÍCIAS'));
    expect(response.text).toEqual(expect.stringContaining('Expediente'));
    expect(response.text).toEqual(expect.stringContaining('SECRETARIA DE COMUNICAÇÃO SOCIAL'));
    expect(response.text).toEqual(expect.stringContaining('Dep. Márcio Marinho (PRB-BA)'));
    expect(response.text).toEqual(expect.stringContaining('DIRETORIA-EXECUTIVA DE COMUNICAÇÃO SOCIAL'));
    expect(response.text).toEqual(expect.stringContaining('David Miranda – (61) 3216-1501'));
    expect(response.text).toEqual(expect.stringContaining('MÍDIAS INTEGRADAS'));
    expect(response.text).toEqual(expect.stringContaining('Wilson Silveira – (61) 3216-1858'));
    expect(response.text).toEqual(expect.stringContaining('AGÊNCIA CÂMARA NOTÍCIAS'));
    expect(response.text).toEqual(expect.stringContaining('Natalia Doederlein – (61) 3216-1862'));
    done();
  });

  test('Página TV', async done => {
    MockRequestPromise.get(mockPaginaTv);
    const response = await controllerTest.get('/noticias/conteudo/tv/expediente');
    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual(expect.stringContaining('TV Câmara'));
    expect(response.text).toEqual(expect.stringContaining('Expediente'));
    expect(response.text).toEqual(expect.stringContaining('SECRETARIA DE COMUNICAÇÃO SOCIAL'));
    expect(response.text).toEqual(expect.stringContaining('Dep. Márcio Marinho (PRB-BA)'));
    expect(response.text).toEqual(expect.stringContaining('DIRETORIA-EXECUTIVA DE COMUNICAÇÃO SOCIAL'));
    expect(response.text).toEqual(expect.stringContaining('David Miranda – (61) 3216-1501'));
    expect(response.text).toEqual(expect.stringContaining('MÍDIAS INTEGRADAS'));
    expect(response.text).toEqual(expect.stringContaining('Wilson Silveira – (61) 3216-1858'));
    expect(response.text).toEqual(expect.stringContaining('AGÊNCIA CÂMARA NOTÍCIAS'));
    expect(response.text).toEqual(expect.stringContaining('Natalia Doederlein – (61) 3216-1862'));
    done();
  });
  test('Página RADIO', async done => {
    MockRequestPromise.get(mockPaginaRadio);
    const response = await controllerTest.get('/noticias/conteudo/radio/expediente');
    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual(expect.stringContaining('Rádio Câmara'));
    expect(response.text).toEqual(expect.stringContaining('Expediente'));
    expect(response.text).toEqual(expect.stringContaining('SECRETARIA DE COMUNICAÇÃO SOCIAL'));
    expect(response.text).toEqual(expect.stringContaining('Dep. Márcio Marinho (PRB-BA)'));
    expect(response.text).toEqual(expect.stringContaining('DIRETORIA-EXECUTIVA DE COMUNICAÇÃO SOCIAL'));
    expect(response.text).toEqual(expect.stringContaining('David Miranda – (61) 3216-1501'));
    expect(response.text).toEqual(expect.stringContaining('MÍDIAS INTEGRADAS'));
    expect(response.text).toEqual(expect.stringContaining('Wilson Silveira – (61) 3216-1858'));
    expect(response.text).toEqual(expect.stringContaining('AGÊNCIA CÂMARA NOTÍCIAS'));
    expect(response.text).toEqual(expect.stringContaining('Natalia Doederlein – (61) 3216-1862'));
    done();
  });
});
