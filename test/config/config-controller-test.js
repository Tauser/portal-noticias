const requestSuperTest = require('supertest');
const request = require('../../src/config/request/request');
const profile = require('../../src/config/profile/profiles').profile();
const ConfigService = require('../../src/config/service/config-service');
const mockServicoElasticsearh = require ('../../test/mocks/mock-service-elasticsearch');
const servicos = new ConfigService(null, request, profile,mockServicoElasticsearh);
const ConfigController = require('../../src/config/controller/config-controller.js');
const ClienteCarteiro = require('../../test/mocks/mock-cliente-carteiro');
const controllers = new ConfigController(servicos, profile, new ClienteCarteiro());
const ConfigHandlebarsMocks = require('../config/config-handlebars-mocks');
const app = require('../../app')({}, controllers, null);

class ConfigControllerTest {

    constructor() {
        ConfigHandlebarsMocks.config(app);

    }

    get(url) {
        return requestSuperTest(app).get(url);
    }

    expressHandlebars() {
        return app.expressHandlebars;
    }


}

module.exports = new ConfigControllerTest();

