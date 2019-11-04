const assert = require('assert');
const AssistaTagRenderer = require('../../renderers/AssistaTagRenderer');
const DestaqueTopoTagRenderer = require('../../renderers/DestaqueTopoTagRenderer');
const UltimasAgenciaTagRenderer = require('../../renderers/UltimasAgenciaTagRenderer');
const BancoDeImagemTagRenderer = require('../../renderers/BancoDeImagemTagRenderer');
const InfograficoTagRenderer = require('../../renderers/InfograficoTagRenderer');
const DestaqueTopoRadioTagRenderer = require('../../renderers/DestaqueTopoRadioTagRenderer');
const AoVivoRadioTagRenderer = require('../../renderers/AoVivoRadioTagRenderer');
const DestaqueTopoTvTagRenderer = require('../../renderers/DestaqueTopoTvTagRenderer');
const AssistaTvTagRenderer = require('../../renderers/AssistaTvTagRenderer');
const EstreiaTvTagRenderer = require('../../renderers/EstreiaTvTagRenderer');
const UltimasAssessoriaImprensaTagRenderer = require('../../renderers/UltimasAssessoriaImprensaTagRenderer');
const EntendaTvTagRenderer = require('../../renderers/EntendaTvTagRenderer');

module.exports = class ConfigRenderTags {

    constructor(serviceAssistaAPI, serviceCMS, serviceBancoImagensAPI, serviceJornalAPI, serviceInfograficosAPI, serviceAssistaYoutubeAPI) {
        assert.notEqual(serviceAssistaAPI, null);
        this._serviceAssistaAPI = serviceAssistaAPI;
        this._serviceCMS = serviceCMS;
        this._serviceJornalAPI = serviceJornalAPI;
        this._serviceBancoImagensAPI = serviceBancoImagensAPI;
        this._serviceInfograficosAPI = serviceInfograficosAPI;
        this._serviceAssistaYoutubeAPI = serviceAssistaYoutubeAPI;
    }

    initTagsRenderers() {
        return [new AssistaTagRenderer(this._serviceAssistaAPI),
                new DestaqueTopoTagRenderer(),
                new DestaqueTopoRadioTagRenderer(),
                new AoVivoRadioTagRenderer(),
                new DestaqueTopoTvTagRenderer(),
                new EstreiaTvTagRenderer(),
                new UltimasAgenciaTagRenderer(this._serviceCMS),
                new BancoDeImagemTagRenderer(this._serviceBancoImagensAPI, this._serviceJornalAPI),
                new InfograficoTagRenderer(this._serviceInfograficosAPI),
                new AssistaTvTagRenderer(this._serviceAssistaYoutubeAPI),
                new UltimasAssessoriaImprensaTagRenderer(this._serviceCMS),
                new EntendaTvTagRenderer()];
    }

};