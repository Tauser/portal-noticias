const express = require('express');
const cookieParser = require('cookie-parser');
const configHandleBars = require('./src/config/views/config-handlebars');
const profile = require('./src/config/profile/profiles').profile();
const indexRouter = require('./src/routes/index');
const configHelmet = require('./src/config/security/config-helmet');
const configErrorHandler = require('./src/config/errors/config-error-handler');
const logger = require('./src/config/logger/winston');
const morgan = require('morgan');
const middlewaresLoginCidadao = require('login-cidadao-cliente-express').middlewareExpress;


module.exports = (variaveisDoTema, controllers, dadosRedis) => {
    const app = express();
    configHandleBars.config(app, variaveisDoTema);
    configHelmet.config(app);

    //Client Login Cidadao
    if(dadosRedis) {
        const secretCookies = process.env.SECRET_COOKIES || profile.secretCookies;
        middlewaresLoginCidadao.configurarSessao(app, secretCookies, dadosRedis);
    }


    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(profile.baseURL + 'noticias/static',express.static('public'));
    app.use(profile.baseURL, indexRouter(controllers));
    app.use(morgan('combined', { stream: logger.stream }));

    // Tratamento de Erros
    configErrorHandler.config(app);

    return app;
};
