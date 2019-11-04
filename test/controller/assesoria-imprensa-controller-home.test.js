const controllerTest = require('../config/config-controller-test');
const mockHomeAssessoriaImprensa = require('../mocks/mock-home-assessoria-imprensa');
const mockUltimas = require('../mocks/mock-ultimas-assessoria-imprensa');
//Mock ServiceCMS
jest.mock('../../src/service/service-cms', () => {
  return () => {
    return {
      obterHome: () => { return mockHomeAssessoriaImprensa; },
      obterConteudoPorUrl: () => { return mockUltimas; }
    };
  };
});
describe('Caso de test noticias controller para assessoria de Imprensa: noticias', () => {
  test('Assessoria de Imprensa', async done => {
    const response = await controllerTest.get('/assessoria-de-imprensa/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toEqual(expect.stringContaining('Assessoria de Imprensa'));
    expect(response.text).toEqual(expect.stringContaining('Uso da Logomarca'));
    expect(response.text).toEqual(expect.stringContaining('l-lista-noticias'));
    expect(response.text).toEqual(expect.stringContaining('Últimas'));
    done();
  }, 10000);
});
