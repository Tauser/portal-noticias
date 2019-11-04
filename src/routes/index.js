const express = require('express');
const router = express.Router();
const camaraRoute = require('./camara-route');

module.exports = (controllers) => {
    router.use('/', camaraRoute(controllers.noticiasController, 
                                controllers.radioController, 
                                controllers.tvController,
                                controllers.boletinsController, 
                                controllers.assessoriaImprensaController,
                                controllers.rssController,
                                controllers.midiasController,
                                controllers.legadoController,
                                controllers.podcastController,
                                controllers.confereController
                                ));
    return router;
};
