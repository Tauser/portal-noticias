const ServiceCMS = require('../../service/service-cms');
const ServiceAssistaAPI = require('../../service/service-assista');
const ServiceAssistaYoutubeAPI = require('../../service/service-assista-youtube');
const ServiceProgramacaoTv = require('../../service/service-tv-camara');
const ServiceDadosAbertosAPI = require('../../service/service-dados-abertos');
const ServiceDeputadosWS = require('../../service/service-deputados');
const ServiceComentariosWS = require('../../service/service-comentarios');
const ServiceBancoImagensAPI = require('../../service/service-banco-imagens');
const ServiceRSS = require('../../service/service-rss');
const ServiceInfograficosAPI = require('../../service/service-infograficos');
const ServiceJornalAPI = require('../../service/service-jornal');
const ServiceCMSMidias = require('../../service/service-cms-midias');
const ServicePodcast = require ('../../service/service-podcast');

class ConfigService {
  constructor(servicoCache, clienteHttp, profile, servicoElasticSearch) {
    this.serviceCMS = new ServiceCMS(servicoCache, profile.wpURL, clienteHttp, servicoElasticSearch);
    this.serviceAssistaAPI = new ServiceAssistaAPI(servicoCache, profile.baseUrlEventosLegislativos, clienteHttp);
    this.serviceAssistaYoutubeAPI = new ServiceAssistaYoutubeAPI(servicoCache, profile.baseUrlEventosLegislativos, clienteHttp);
    this.serviceProgramacaoTv = new ServiceProgramacaoTv(servicoCache, profile.programacaoTvURL, clienteHttp);
    this.serviceDadosAbertosAPI = new ServiceDadosAbertosAPI(servicoCache, profile.integraDaPropostaURL, clienteHttp);
    this.serviceDeputadosWS = new ServiceDeputadosWS(servicoCache, profile.parlamentarWS, clienteHttp);
    this.serviceComentariosWS = new ServiceComentariosWS(servicoCache, profile.comentariosURLAPI, clienteHttp);
    this.serviceBancoImagensAPI = new ServiceBancoImagensAPI(servicoCache, profile.bancoImagensURL, clienteHttp);
    this.serviceRSS = new ServiceRSS(servicoCache, profile.wpURL, clienteHttp, profile.rssMeta);
    this.serviceInfograficosAPI = new ServiceInfograficosAPI(servicoCache, profile.wpURL, clienteHttp);
    this.serviceJornalAPI = new ServiceJornalAPI(servicoCache, profile.jornalURL, clienteHttp);
    this.serviceCMSMidias = new ServiceCMSMidias(servicoCache, profile.wpURLCMSMidias, clienteHttp);
    this.servicePodcast = new ServicePodcast();
  }
}
module.exports = ConfigService;