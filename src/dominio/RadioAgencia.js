const Conteudo = require('./Conteudo');
const Midia = require('./Midia');
const isEmpty = require('is-empty');
module.exports = class RadioAgencia extends Conteudo {

    /**
     * Atributos imutáveis
     * @param {*} conteudo 
     */
    constructor(conteudo) {
        super(conteudo, 'radio-agencia/conteudo-single-radio-agencia.hbs', 'radio-agencia/home');

        this._tipoNoticia = conteudo.tipo_noticia;
        this._audios = this._adicionarAudios(conteudo.audios);
        this._audioPrincipal = isEmpty(conteudo.audios) ? '' : new Midia(conteudo.audios[0]);
        this._arquivoAnexo = conteudo.arquivo_anexo;
        this._continuacaoNoticia = conteudo.continuacao_noticia;
        this._relacionadas = conteudo.relacionadas;
        this._relacionadasAgencia = conteudo.relacionadas_agencia;
        this._programasRelacionadosTV = conteudo.programas_relacionados_tv;
        this._programasRelacionadosRadio = conteudo.programas_relacionados_radio;
        this._noticias = conteudo.noticias;
        this._ultimasRadioAgencia = conteudo.ultimasRadioAgencia;

        //TODO solucao ate resolver dinamicamente - redmine: #48824
        this._breadcrumbs = [{'name': 'Rádio', 'link': '/radio'}];
        
    }

    _adicionarAudios(audios) {
        let midias = [];
        if (!isEmpty(audios) && audios.map) {
            midias = audios.map((audio) => {
                return new Midia(audio);
            });
        }
        return midias;
    }

    get audioPrincipal() {
        return this._audioPrincipal;
    }

    get tipoNoticia() {
        return this._tipoNoticia;
    }

    get audios() {
        return this._audios;
    }

    get arquivoAnexo() {
        return this._arquivoAnexo;
    }

    get continuacaoNoticia() {
        return this._continuacaoNoticia;
    }

    get relacionadas() {
        return this._relacionadas;
    }

    get relacionadasAgencia() {
        return this._relacionadasAgencia;
    }

    get programasRelacionadosTV() {
        return this._programasRelacionadosTV;
    }

    get programasRelacionadosRadio() {
        return this._programasRelacionadosRadio;
    }

    get noticias() {
        return this._noticias;
    }

    get ultimasRadioAgencia() {
        return this._ultimasRadioAgencia;
    }

};