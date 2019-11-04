const winston = require('../config/logger/winston');
const ConteudoDinamico = require('../dominio/ConteudoDinamico');

class LegadoController {

  constructor(serviceCMS) {
    this.serviceCMS = serviceCMS;
  }

  // redireciona chamadas ao site antigo para o site novo  
  async redirecionaParaNovoSite(req, res) {
    try { 
      let urlRedirect = await ConteudoDinamico.criaUrlRedirectSisnews(req.params.idsisnews);

      let conteudoWP = await this.serviceCMS.obterConteudoPorIdSisnews(urlRedirect);
      
      if (conteudoWP !== undefined && conteudoWP.length>0) {
        res.redirect(301, conteudoWP[0].link);
      }
      else {
        res.status(404).send('Página não encontada');
      }
    } catch (error) {
      console.error(error.message);
      winston.error(__filename + ' - ' + error.message);
      res.status(500).send('Erro ao processar');
    }
  }
}

module.exports = LegadoController;
