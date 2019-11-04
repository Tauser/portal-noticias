const path = require('path');
const handlebarsHelpers = require('handlebars-helpers')();
const exphbs = require('express-handlebars');

class ConfigHandleBarsMocks {

    config(app) {
        app.expressHandlebars = exphbs.create({
                extname: '.hbs',
                partialsDir: ['test/mocks/templates','test/mocks/', 'src/'],
                helpers: handlebarsHelpers
        });
        app.engine('.hbs', app.expressHandlebars.engine);
        app.set('views', path.join('src/pages'));
        app.set('view engine', 'hbs');
        
    }

}

module.exports = new ConfigHandleBarsMocks();

