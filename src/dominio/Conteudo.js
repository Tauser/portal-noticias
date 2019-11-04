const ObjetoWP = require('./ObjetoWP');
//TODO analisar um nome melhor para esta classe de acordo com o negocio
module.exports = class Conteudo {

  /**
   * Atributos imutáveis
   * @param {*} conteudo 
   */
  constructor(conteudo, detalhes, home) {
    this._id = conteudo.id;
    this._tipoConteudo = conteudo.tipo_conteudo;
    this._objetoWP = conteudo.objeto_wp;
    this._areaConteudo = conteudo.area_conteudo;
    this._link = conteudo.link;
    this._pathSeparado = conteudo.path_separado;
    this._breadcrumbs = conteudo.breadcrumbs;
    this._menuLocal = conteudo.menu_local;
    this._titulo = conteudo.titulo;
    this._data = new Date(conteudo.data);
    this._dataFormatada = conteudo.data_formatada;
    this._horaFormatada = conteudo.hora_formatada;
    this._dataAtualizacao = new Date(conteudo.data_atualizacao);
    this._dataAtualizacaoFormatada = conteudo.data_atualizacao_formatada;
    this._horaAtualizacaoFormatada = conteudo.hora_atualizacao_formatada;
    this._resumo = conteudo.resumo;
    this._temaPrincipal = conteudo.tema_principal;
    this._imagemDestaque = conteudo.imagem_destaque;
    this._conteudo = conteudo.conteudo;
    this._rodape = conteudo.rodape;
    this._deputados = conteudo.deputados;
    this._projetosDeLei = conteudo.proposicoes;
    this._tags = conteudo.tags_conteudo;
    this._detalhes = detalhes;
    this._home = home;
    this._catgoria = conteudo.categoria; 
  }

  pagina () {
    return this._objetoWP.capability === ObjetoWP.POST ? this._detalhes : this._home;
  }

  get id () {
    return this._id;
  }

  get tipoConteudo () {
    return this._tipoConteudo;
  }

  get objetoWP () {
    return this._objetoWP;
  }

  get areaConteudo () {
    return this._areaConteudo;
  }

  get link () {
    return this._link;
  }

  get pathSeparado () {
    return this._pathSeparado;
  }

  get breadcrumbs () {
    return this._breadcrumbs;
  }

  get menuLocal () {
    return this._menuLocal;
  }

  get titulo () {
    return this._titulo;
  }

  get data () {
    return this._data;
  }

  get dataFormatada () {
    return this._dataFormatada;
  }

  get horaFormatada () {
    return this._horaFormatada;
  }

  get dataAtualizacao () {
    return this._dataAtualizacao;
  }

  get dataAtualizacaoFormatada () {
    return this._dataAtualizacaoFormatada;
  }

  get horaAtualizacaoFormatada () {
    return this._horaAtualizacaoFormatada;
  }

  get resumo () {
    return this._resumo;
  }

  get temaPrincipal () {
    return this._temaPrincipal;
  }

  get imagemDestaque () {
    return this._imagemDestaque;
  }

  get conteudo () {
    return this._conteudo;
  }

  set conteudo (conteudo) {
    return this._conteudo = conteudo;
  }

  get rodape () {
    return this._rodape;
  }

  get deputados () {
    return this._deputados;
  }

  get projetosDeLei () {
    return this._projetosDeLei;
  }

  get tags () {
    return this._tags;
  }

  get categoria () {
    return this._catgoria;
  }
  /*
      get breadCrumb () {
          return new BreadCrumb(this._breadCrumb);
      }
  */
};