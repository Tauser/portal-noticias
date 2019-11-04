const path = require('path');
const exphbs = require('express-handlebars');
const profile = require('../../config/profile/profiles').profile();
/*eslint-disable*/
const helpers = require('../../helpers/helpers');
/*eslint-enable*/

class ConfigHandleBars {

  config (app, variaveisDoTema) {
    app.expressHandlebars = exphbs.create({
      extname: '.hbs',
      partialsDir: ['dist/templates', 'dist/', 'src/']
    });
    app.engine('.hbs', app.expressHandlebars.engine);
    app.set('views', path.join('src/pages'));
    app.set('view engine', 'hbs');
    this._configurarLocals(app, variaveisDoTema);
  }

  _configurarLocals (app, variaveisDoTema) {
    app.locals.baseUrl = profile.ambiente === 'desenvolvimento' ? ('http://localhost:' + profile.porta + profile.baseURL) : variaveisDoTema['baseUrlPortal'];
    app.locals.enqueteURL = profile.enqueteURL;
    app.locals.integraDaPropostaURL = profile.integraDaPropostaURL;
    app.locals.buscaURL = profile.buscaURL;
    app.locals.proposicoesURL = profile.proposicoesURL;

    //registra todas variáveis do tema
    for (let variavel in variaveisDoTema) {
      app.locals[variavel] = variaveisDoTema[variavel];
    }
  }
}

module.exports = new ConfigHandleBars();
