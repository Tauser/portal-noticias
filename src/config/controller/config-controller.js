const NoticiasController = require('../../controller/noticias-controller');
const RadioController = require('../../controller/radio-controller');
const TvController = require('../../controller/tv-controller');
const MidiasController = require('../../controller/midias-controller');

const AssessoriaImprensaController = require('../../controller/assessoria-imprensa-controller');
const RssController = require('../../controller/rss-controller');
const ConfigRenderTags = require('../render/ConfigRenderTags');
const BoletinsController = require('../../controller/boletim-controller');
const LegadoController = require('../../controller/legado-controller');
const PodcastController = require('../../controller/podcast-controller');
const ConfereController = require('../../controller/confere-controller.js');

class ConfigController {
  constructor(servicos, profile, clienteCarteiro) {

    const configRenderTags = new ConfigRenderTags(
      servicos.serviceAssistaAPI,
      servicos.serviceCMS,
      servicos.serviceBancoImagensAPI,
      servicos.serviceJornalAPI,
      servicos.serviceInfograficosAPI,
      servicos.serviceAssistaYoutubeAPI).initTagsRenderers();

    this.noticiasController = new NoticiasController(
      servicos.serviceCMS,
      profile.comentariosURL,
      servicos.serviceDadosAbertosAPI,
      servicos.serviceDeputadosWS,
      servicos.serviceComentariosWS,
      configRenderTags,
      clienteCarteiro
    );

    this.radioController = new RadioController(servicos.serviceCMS, configRenderTags);
    this.assessoriaImprensaController = new AssessoriaImprensaController(servicos.serviceCMS, configRenderTags);
    this.tvController = new TvController(servicos.serviceCMS, servicos.serviceAssistaYoutubeAPI, servicos.serviceProgramacaoTv, configRenderTags);
    this.boletinsController  = new BoletinsController(servicos.serviceCMS, ConfigRenderTags);
    this.rssController = new RssController(servicos.serviceCMS, servicos.serviceRSS);
    this.midiasController = new MidiasController(servicos.serviceCMSMidias);
    this.legadoController = new LegadoController(servicos.serviceCMS);
    this.podcastController = new PodcastController(servicos.serviceCMS, servicos.servicePodcast);
    this.confereController = new ConfereController(servicos.serviceCMS, configRenderTags);
  }
}

module.exports =  ConfigController;