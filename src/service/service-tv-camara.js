const winston = require('../config/logger/winston');
const soap = require('soap');
const cacheMinutos = 3;
const conteudoDinamico = require('../dominio/ConteudoDinamico');
const moment = require('moment');

const diasDaSemana = [
    'Domingo',
    'Segunda-Feira',
    'Terça-Feira',
    'Quarta-Feira',
    'Quinta-Feira',
    'Sexta-Feira',
    'Sabádo'
];

let active = false;

module.exports = class ServiceProgramacaoTv {

    constructor(servicoCache, urlWebService, clienteHttp) {
        this.servicoCache = servicoCache;
        this.urlWebService = urlWebService;
        this.clienteHttp = clienteHttp;
    }

    async obterProgramacaoDoDia(dataGrade) {
        return await this._getRequestSoup(this.urlWebService, {'dataGrade': dataGrade});
    }

    async _getRequestSoup(url, args) {
        return soap.createClientAsync(url).then((client) => {
            return client.gradediaAsync(args);
        }).then((response) => {
            return this._format_result(response);
        }).catch(e => {
            winston.error(`${__filename} - obterProgramacaoDoDia: ${this.url} : args: ${args} - ${e.message}`);
            return [];
        });
    }

    async _format_result (resultado) {
        var parseString = require('xml2js').parseString;
        let resultadosJson = [];

        // Converte o resultado xml para json
        parseString(resultado[1], function (err, resultParsed) {
            let resultadosSoap = resultParsed['SOAP-ENV:Envelope']['SOAP-ENV:Body'][0]['gradediaResponse'][0]['gradediaResult'][0]['diffgr:diffgram'][0]['DefaultDataSet'][0]['SQL'];
            
            if (resultadosSoap != undefined && resultadosSoap.length > 0 ) {
                // Converte os valores de resultados para json
                resultadosSoap.forEach(programacao => {
                    let json = {
                        'horaPrograma': programacao['horaPrograma'][0],
                        'dscPrograma': programacao['dscPrograma'][0]
                    };
                    resultadosJson.push(json);
                });   
            }
        });
        return resultadosJson;    
    }

    getDataFormatada(soma) {
        const dia = moment().add(soma, 'days').calendar('MM/DD/YYYY');
        return moment(dia, 'MM/DD/YYYY').format('DD/MM/YYYY');
    }

    getDiasDaSemana(hoje = moment().format('d')) {
        const semana = [];

        diasDaSemana.forEach(dia => {
            const id = this._geraId(dia);
            semana.push({id, dia, active });
        });

        semana[hoje].active = true;

        return semana;
    }

    _geraId(dia) {
        const diaTratado = conteudoDinamico.trataTag(dia);
        return diaTratado.toLowerCase().replace(/[\W]/g, '_');
    }

    _geraSeteDatas() {
        const output = [];

        for(let i = 0; i <= 6; i++) {
            if(i == 0) {
                output[i] = moment().format('DD/MM/YYYY'); 
            } else {
                output[i] = this.getDataFormatada(i);
            }
        }

        return output;
    }
    
    async obterProgramacaoCompleta () {

        const hoje = moment().format('d');
        let diasProgramacao = [];
        
        if (this.servicoCache) {
            diasProgramacao = await this.servicoCache.get(['programacaoTvSemanal', 'dataAtualFormatada'], cacheMinutos, () => { 
                return this.ciraGradeProgramacao(hoje); 
            });
        } else {
            diasProgramacao = this.ciraGradeProgramacao(hoje);
        }
        
        return diasProgramacao;
    }

    async ciraGradeProgramacao(hoje) {
        const semanaDatas = this._geraSeteDatas();
        const semana = this.getDiasDaSemana(hoje);
        const gradeComDatas = this._dataDodia(semanaDatas, semana);
        const gradeCompleta = await this._gradeDoDia(gradeComDatas); 
        
        return gradeCompleta;
    }

    _dataDodia(semanaDatas, semana) {
        semanaDatas.forEach(data => {
            const posicao = moment(data, 'DD/MM/YYYY').format('d');  
            const hojePosicao = moment().format('d');

            if (posicao == hojePosicao) semana[posicao].dataAtualFormatada = semana[posicao].dia;
            semana[posicao].dataDoDia = data;
        });

        return semana;
    }

    async _gradeDoDia(gradeComDatas) {
        const grade = gradeComDatas;
        for (let i = 0; i < grade.length; i++) {
            grade[i].resultado = await this._getRequestSoup(this.urlWebService, {'dataGrade': grade[i].dataDoDia});
        }
        return grade;
    }
};