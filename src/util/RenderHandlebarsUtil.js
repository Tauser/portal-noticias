const winston = require('../config/logger/winston');
const urlBaseHbs = 'src/pages';
const Midia = require('../dominio/Midia');
const Infografico = require('../dominio/Infografico');
module.exports = class RenderHandlebarsUtil {

    static async render(expressHandlebars, urlHbs, params) {
        return expressHandlebars.render(urlBaseHbs + urlHbs, params).then((hbsCompilado) => {
            return hbsCompilado;
        }).catch(error => {
            winston.error(__filename + ' - ' + error.message);
        });
    }

    /**
     * Conversao das tags do conteudo que vem do CMS.
     * Ex: video, audio, iframe
     * @param {} expressHandlebars 
     * @param {*} conteudo 
     */
    static async converterTagsDinamicas(expressHandlebars, conteudo) {
        let resultadoRegexAudio = conteudo.match(new RegExp(Midia.regexAudio()));
        let resultadoRegexVideo = conteudo.match(new RegExp(Midia.regexVideo()));
        let resultadoRegexInfografico = conteudo.match(new RegExp(Infografico.regex()));
        conteudo = resultadoRegexAudio ? await this._replaceTags(resultadoRegexAudio, '/midias/audio.hbs', expressHandlebars, conteudo, /(http)(.*)(mp3)/g) : conteudo;
        conteudo = resultadoRegexVideo ? await this._replaceTags(resultadoRegexVideo, '/midias/video.hbs', expressHandlebars, conteudo, /(http)(.*)(mp4)/g) : conteudo;
        conteudo = resultadoRegexInfografico ? await this._replaceTags(resultadoRegexInfografico, '/infografico/infografico.hbs', expressHandlebars, conteudo, Infografico.regexUrl()) : conteudo;
        conteudo = conteudo.replace(new RegExp('tag-dinamica', 'g'), 'iframe');
        return conteudo;
    }

    static async _replaceTags(resultadoRegex, urlHbs, expressHandlebars, conteudo, regexUrlMidia) {
        if (resultadoRegex && resultadoRegex.map) {
            for (let i in resultadoRegex) {
                const regexUrl = new RegExp(regexUrlMidia);
                const url = resultadoRegex[i].match(regexUrl);
                let audio = await RenderHandlebarsUtil.render(expressHandlebars, urlHbs, { url: url });
                conteudo = conteudo.replace(resultadoRegex[i], audio);
            }
        }
        return conteudo;
    }
};