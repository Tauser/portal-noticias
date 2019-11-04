const controllerTest = require('../config/config-controller-test');
const mockHomeNoticias = require('../mocks/mock-home-noticias');
const mockUltimas = require('../mocks/mock-ultimas');
const mockAssista = require('../mocks/mock-assista');
const mockBancoImagens = require('../mocks/mock-banco-imagens');
const mockInfograficos = require('../mocks/mock-infograficos');
const mockJornal = require('../mocks/mock-jornal');

//Mock ServiceCMS
jest.mock('../../src/service/service-cms', () => {
  return () => {
    return {
      obterHome: () => { return mockHomeNoticias; },
      obterConteudoPorUrl: () => { return mockUltimas; }
    };
  };
});

//Mock ServiceAssista
jest.mock('../../src/service/service-assista', () => {
  return () => {
    return {
      retornarVideosAssista: () => { return mockAssista; }
    };
  };
});

//Mock ServiceBancoImagens
jest.mock('../../src/service/service-banco-imagens', () => {
  return () => {
    return {
      retornarImagemPrincipal: () => { return mockBancoImagens; },
      retornarImagensSecundarias: () => { return mockBancoImagens; }
    };
  };
});

//Mock ServiceInfograficos
jest.mock('../../src/service/service-infograficos', () => {
  return () => {
    return {
      retornarInfograficos: () => { return mockInfograficos; }
    };
  };
});

//Mock ServiceJornal
jest.mock('../../src/service/service-jornal', () => {
  return () => {
    return {
      retornarJornal: () => { return mockJornal; }
    };
  };
});


describe('Caso de test noticias controller para homes: noticias', () => {
  test('Home Noticias', async done => {
    const response = await controllerTest.get('/noticias');
    expect(response.statusCode).toBe(200);
    done();
  }, 10000);
});
