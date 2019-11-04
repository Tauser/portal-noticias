const TagRenderer = require('./TagRenderer');
const assert = require('assert');

module.exports = class AssistaTvTagRenderer extends TagRenderer {

    constructor(serviceAssistaYoutubeAPI) {
        assert.notEqual(serviceAssistaYoutubeAPI, null);
        super('[eh-assista-tv-container]');
        this._serviceAssistaYoutubeAPI = serviceAssistaYoutubeAPI;
    }

    renderizarHtml(renderizador) {
        return new Promise(async (resolve, reject) => {
            try {
                const assistaYoutubeSecaoPlaylists = await this._serviceAssistaYoutubeAPI.retornarVideosAssistaYoutubeSecaoPlaylists();
                const assistaMaisAtualPlaylist = await this._serviceAssistaYoutubeAPI.retornarVideosAssistaMaisAtualPlaylist();
                const html =  await renderizador('/tv/_home--assista.hbs', { videosAssistaSecaoPlaylists: assistaYoutubeSecaoPlaylists, videosAssistaMaisAtualPlaylist: assistaMaisAtualPlaylist });
                resolve({tag: this.nomeTag, html});
            } catch (erro) {
                reject(erro);
            }
        });
    }
};