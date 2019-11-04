const ExpressUtil = require('../util/ExpressUtil');
const winston = require('../config/logger/winston');
const conteudoDinamico = require('../dominio/ConteudoDinamico');
const moment = require('moment');
const boletinsHtml = require('../dominio/BoletinsHtml');

const semana  = [
    'Domingo', 
    'Segunda-Feira', 
    'Terça-Feira', 
    'Quarta-Feira', 
    'Quinta-Feira', 
    'Sexta-Feira', 
    'Sábado'
];

class BoletinsController {
    constructor(serviceCMS, tagRenderers) {
        this.serviceCMS = serviceCMS;
        this.tagRenderers = tagRenderers;
    }

    async visualizarBoletins(req, res, next) {
        try {
            const hoje = moment().format('DD-MM-YYYY');
            const data = (req.params.data) ? req.params.data : hoje;
            const dia = this._dataCompleta(data);
            const conteudo = await this._conteudo(data);
            const dados = boletinsHtml.geraBoletinsHtml({dia, conteudo});

            res.status(200).json(dados);
        } catch(error) {
            winston.error(__filename + ' - ' + error.message);
            ExpressUtil.error(error, res, next);
        }
    }

    _dataCompleta(data) {
        const dia = (data) ? moment(data, 'DD-MM-YYYY').format('d') : moment().format('d');
        const diaSemana = semana[dia];
        const dataFormatada = (data) ? moment(data, 'DD-MM-YYYY').format('DD/MM/YYYY') : moment().format('DD/MM/YYYY');

        return `${diaSemana} ${dataFormatada}`;
    }

    async _conteudo(data) {
        const url = conteudoDinamico.criaUrlBoletins(data);
        const conteudoWP = await this.serviceCMS.obterConteudoPorUrl(url);

        return conteudoWP;
    }

}

module.exports = BoletinsController;