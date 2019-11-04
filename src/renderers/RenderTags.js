const assert = require('assert');
const RenderHandlebarsUtil = require('../util/RenderHandlebarsUtil');

module.exports = class RenderTags {

    static createHtml(expressHandlebars, variaveisGlobaisContexto, conteudoWP, tagRenderers) {
        assert.notEqual(expressHandlebars, null);
        assert.notEqual(conteudoWP, null);
        const htmlTags = [];

        const renderizador = async (arquivoHandlebars, contexto) => {
            let contextoCompleto = {};
            Object.assign(contextoCompleto, variaveisGlobaisContexto);
            Object.assign(contextoCompleto, contexto);
            return RenderHandlebarsUtil.render(expressHandlebars, arquivoHandlebars, contextoCompleto);
        };

        tagRenderers.map(tag => {
            if (conteudoWP.html.indexOf(tag.nomeTag) > -1) {
                if (tag.dependeDoRequest()) {
                    tag.setConteudoRequest(conteudoWP);
                }
                const promise = tag.renderizarHtml(renderizador);
                htmlTags.push(promise);
            }
        });

        return htmlTags;
    }

};