const Conteudo = require('./Conteudo');
const Agencia = require('./Agencia');
const ProgramaRadio = require('./ProgramaRadio');
const EdicaoProgramaRadio = require('./EdicaoProgramaRadio');
const ProgramaTV = require('./ProgramaTV');
const EdicaoProgramaTV = require('./EdicaoProgramaTV');
const RadioAgencia = require('./RadioAgencia');
const PaginaDinamica = require('./PaginaDinamica');
const AssessoriaImprensa = require('./AssessoriaImprensa');
const Boletins = require('./Boletins');
const ProgramasDocumentarios = require('./ProgramasDocumentarios');

module.exports = class ConteudoFactory {

  static criar (conteudo) {
    //console.log('cont.: ', conteudo);
    let arrayConteudo = [];
    if (conteudo && conteudo.map) {
      conteudo.map((array) => {
        arrayConteudo.push(this._criarConteudo(array));
      });
    }else{
      return this._criarConteudo(conteudo);
    }
    
    return arrayConteudo;
  }

  static _criarConteudo (conteudo) {
    switch (conteudo.tipo_conteudo) {
      case 'agencia':
        return new Agencia(conteudo);
      case 'programa_radio':
        return new ProgramaRadio(conteudo);
      case 'edicao_programa_radi':
        return new EdicaoProgramaRadio(conteudo);
      case 'programa_tv':
        return new ProgramaTV(conteudo);
      case 'edicao_programa_tv':
        return new EdicaoProgramaTV(conteudo);
      case 'radioagencia':
        return new RadioAgencia(conteudo);
      case 'pagina_dinamica':
        return new PaginaDinamica(conteudo);
      case 'institucional':
        return new AssessoriaImprensa(conteudo);
      case 'boletim':
        return new Boletins(conteudo);
      case 'documentario':
        return new ProgramasDocumentarios(conteudo);     
      default:
        return new Conteudo(conteudo, 'estaticas/index');
    }
    
  }

};