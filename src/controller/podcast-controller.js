
class PodcastController {
    constructor(serviceCMS, servicePodcast) {
        this.serviceCMS = serviceCMS;
        this.servicePodcast = servicePodcast;

    }

    async podcastPorPrograma (req, res) {
        let conteudoprograma  = await this.serviceCMS.obterConteudoPorId(req.originalUrl, true);

        console.log(conteudoprograma);

        const feed = this.servicePodcast.criaFeed(conteudoprograma);
        res.type('xml');
        res.send(feed);
    }
    
}

module.exports = PodcastController;

