const resultado = require ('./mock-resultado-elasticsearch.json');

class MockServiceElasticsearch {
  async retornaUltimosProgramas (programa, pagina) {
    if (pagina === undefined) {
      pagina=1;
    }
    return resultado;
  }
}
module.exports =  new MockServiceElasticsearch();