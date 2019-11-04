const empty = require('is-empty');
module.exports = class BreadCrumbsUtil {
    static converterFormatHandlebars(breadCrumbs) {
        let breadCrumbsHandlebars = '[';
        if (!empty(breadCrumbs) && breadCrumbs.map) {
            breadCrumbs.map((breadCrumb) => {
                breadCrumbsHandlebars += '{"rotulo":"' + breadCrumb.name  + '", "link":"' + breadCrumb.link +'"},';
            });
            breadCrumbsHandlebars += ']';
            breadCrumbsHandlebars = breadCrumbsHandlebars.replace('},]', '}]');
            return breadCrumbsHandlebars;
        }
        return;
    }
};