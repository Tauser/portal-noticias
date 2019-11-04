const profiles = require('../config/profile/profiles');
module.exports = class UrlUtil {
    static url() {
        const profile = profiles.profile();
        return (profile.ambiente === 'desenvolvimento' ? (profile.host + ':' + profile.porta + profile.baseURL) : (profile.host + profile.baseURL + '/'));
    }
    static naoEhUrlDoConteudo(originalUrl) {
        return originalUrl.indexOf('/api/') !== -1  || originalUrl.indexOf('/mock-wp/') !== -1;
    }

    static validaUrl(req, next) {
        if (this.naoEhUrlDoConteudo(req.orginalUrl)) {
            next();
            return;
        }

        req.orginalUrl = req.orginalUrl.trim();
        return req;
    }
};